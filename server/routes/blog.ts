import { Router } from 'express';
import { db } from '@db';
import { blogPosts } from '@db/schema';
import { desc } from 'drizzle-orm';
import type { Request, Response } from 'express';

const router = Router();

router.get('/api/posts', async (_req: Request, res: Response) => {
  try {
    const posts = await db.query.blogPosts.findMany({
      orderBy: desc(blogPosts.createdAt),
    });

    return res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({ 
      message: 'Unable to fetch blog posts',
      error: process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : String(error))
        : undefined
    });
  }
});

export default router;
