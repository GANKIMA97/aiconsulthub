import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { db } from "@db";
import { subscriptionPlans, insertSubscriptionPlanSchema } from "@db/schema";
import { eq } from "drizzle-orm";

interface ChatMessage {
  type: 'message' | 'system';
  content: string;
  sender?: string;
  timestamp: number;
  id?: string;
}

export function registerRoutes(app: Express): Server {
  // Health check endpoint for Render.com
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Admin verification endpoint
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'default-secure-token-replace-in-production';

  const verifyAdminToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).json({ message: 'Invalid admin token' });
    }

    next();
  };

  // Subscription plans management endpoints
  app.get('/api/admin/plans', verifyAdminToken, async (req, res) => {
    try {
      const plans = await db.select().from(subscriptionPlans);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch subscription plans' });
    }
  });

  app.post('/api/admin/plans', verifyAdminToken, async (req, res) => {
    try {
      const result = insertSubscriptionPlanSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid input', 
          errors: result.error.issues 
        });
      }

      const [plan] = await db.insert(subscriptionPlans)
        .values(result.data)
        .returning();

      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create subscription plan' });
    }
  });

  app.put('/api/admin/plans/:id', verifyAdminToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertSubscriptionPlanSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid input', 
          errors: result.error.issues 
        });
      }

      const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id)).limit(1);

      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }

      const [updatedPlan] = await db.update(subscriptionPlans)
        .set(result.data)
        .where(eq(subscriptionPlans.id, id))
        .returning();

      res.json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update subscription plan' });
    }
  });

  app.post('/api/admin/plans/:id/toggle-status', verifyAdminToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id)).limit(1);

      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }

      const [updatedPlan] = await db.update(subscriptionPlans)
        .set({ isActive: !plan.isActive })
        .where(eq(subscriptionPlans.id, id))
        .returning();

      res.json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update plan status' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}