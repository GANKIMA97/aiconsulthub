import { Router } from 'express';
import { db } from '@db';
import { payments, users, analytics } from '@db/schema';
import { sql } from 'drizzle-orm';
import type { Request, Response } from 'express';

const router = Router();

// Get dashboard analytics data
router.get('/api/analytics/dashboard', async (_req: Request, res: Response) => {
  try {
    // Get total number of users
    const totalUsers = await db.select({ count: sql<number>`count(*)` })
      .from(users)
      .then(result => Number(result[0].count));

    // Get total revenue and paying users
    const [revenueResult] = await db.select({
      total: sql<number>`COALESCE(sum(amount), 0)`,
      uniqueUsers: sql<number>`COUNT(DISTINCT user_id)`
    })
    .from(payments)
    .where(sql`status = 'completed'`);

    const revenue = Number(revenueResult.total);
    const payingUsers = Number(revenueResult.uniqueUsers);

    // Calculate conversion rate
    const conversionRate = totalUsers ? (payingUsers / totalUsers) * 100 : 0;

    // Get pageviews for the last 30 days
    const pageviews = await db.select({
      count: sql<number>`count(*)`
    })
    .from(analytics)
    .where(sql`event_type = 'pageview' AND created_at >= now() - interval '30 days'`)
    .then(result => Number(result[0].count || 0));

    // Get time series data for the last 30 days
    const timeSeriesData = await db.execute<{
      date: string;
      revenue: number;
      visits: number;
    }>(sql`
      WITH dates AS (
        SELECT generate_series(
          date_trunc('day', now()) - interval '29 days',
          date_trunc('day', now()),
          interval '1 day'
        )::date as date
      )
      SELECT 
        dates.date,
        COALESCE(SUM(p.amount), 0) as revenue,
        COUNT(DISTINCT a.user_id) as visits
      FROM dates 
      LEFT JOIN ${payments} p ON date_trunc('day', p.created_at) = dates.date 
        AND p.status = 'completed'
      LEFT JOIN ${analytics} a ON date_trunc('day', a.created_at) = dates.date 
        AND a.event_type = 'pageview'
      GROUP BY dates.date
      ORDER BY dates.date ASC
    `);

    // Get user type distribution
    const userTypes = [
      { name: 'Exclusive', value: payingUsers },
      { name: 'Free', value: totalUsers - payingUsers }
    ];

    return res.json({
      visits: pageviews,
      revenue,
      users: totalUsers,
      conversionRate,
      timeSeriesData,
      userTypes
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error fetching analytics data',
      error: error instanceof Error ? error.stack : String(error)
    });
  }
});

export default router;
