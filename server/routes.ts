import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { db } from "@db";
import { subscriptionPlans, insertSubscriptionPlanSchema } from "@db/schema";
import { eq, sql } from "drizzle-orm";

interface ChatMessage {
  type: 'message' | 'system';
  content: string;
  sender?: string;
  timestamp: number;
  id?: string;
}

export function registerRoutes(app: Express): Server {
  // Health check endpoint for Render.com
  app.get('/api/health', async (_req: Request, res: Response) => {
    try {
      // Check database connection
      const dbCheck = await db.execute(sql`SELECT 1`);

      // Additional health checks
      const memoryUsage = process.memoryUsage();
      const uptime = process.uptime();

      res.json({ 
        status: 'ok',
        checks: {
          database: dbCheck ? 'connected' : 'error',
          websocket: 'enabled',
          memory: {
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
          },
          uptime: Math.round(uptime) + 's'
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(503).json({ 
        status: 'error',
        message: 'Service unavailable',
        timestamp: new Date().toISOString()
      });
    }
  });

  const httpServer = createServer(app);

  // Initialize WebSocket server with specific configuration
  const wss = new WebSocketServer({ 
    server: httpServer,
    verifyClient: ({ req }) => {
      // Skip Vite HMR WebSocket connections
      const protocol = req.headers['sec-websocket-protocol'];
      return protocol !== 'vite-hmr';
    }
  });

  // WebSocket connection handling
  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    // Send initial connection success message
    ws.send(JSON.stringify({
      type: 'system',
      content: 'Welcome to AIConsult Hub! You are now connected to the chat server.',
      timestamp: Date.now()
    }));

    // Handle incoming messages
    ws.on('message', (data: string) => {
      try {
        const message: ChatMessage = JSON.parse(data.toString());
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        ws.send(JSON.stringify({
          type: 'system',
          content: 'Error processing message',
          timestamp: Date.now()
        }));
      }
    });

    // Handle WebSocket errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Handle client disconnection
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return httpServer;
}