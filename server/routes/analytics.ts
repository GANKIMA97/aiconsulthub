import { Router } from 'express';
import { db } from '@db';
import { payments, users } from '@db/schema';
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

    // Get total revenue
    const revenue = await db.select({
      total: sql<number>`sum(amount)`
    })
    .from(payments)
    .where(sql`status = 'completed'`)
    .then(result => Number(result[0].total || 0));

    // Calculate conversion rate (users who made payments / total users)
    const payingUsers = await db.select({
      count: sql<number>`count(distinct user_id)`
    })
    .from(payments)
    .where(sql`status = 'completed'`)
    .then(result => Number(result[0].count));

    const conversionRate = totalUsers ? (payingUsers / totalUsers) * 100 : 0;

    // Get time series data for the last 30 days
    const timeSeriesData = await db.select({
      date: sql<string>`date_trunc('day', created_at)::date`,
      revenue: sql<number>`sum(amount)`,
      visits: sql<number>`count(distinct user_id)`
    })
    .from(payments)
    .where(sql`created_at >= now() - interval '30 days'`)
    .groupBy(sql`date_trunc('day', created_at)`)
    .orderBy(sql`date_trunc('day', created_at)`);

    // Get user type distribution
    const userTypes = [
      { name: 'Premium', value: payingUsers },
      { name: 'Free', value: totalUsers - payingUsers }
    ];

    return res.json({
      visits: totalUsers * 3, // Assuming each user visits 3 times on average
      revenue,
      users: totalUsers,
      conversionRate,
      timeSeriesData: timeSeriesData.map(item => ({
        date: item.date,
        revenue: Number(item.revenue || 0),
        visits: Number(item.visits || 0)
      })),
      userTypes
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Error fetching analytics data' });
  }
});

export default router;
