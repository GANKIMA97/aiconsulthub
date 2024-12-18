import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import { WebSocketServer } from "ws";
import authRoutes from "./routes/auth";
import paymentRoutes from "./routes/payments";

interface ChatMessage {
  type: 'message' | 'system';
  content: string;
  sender?: string;
  timestamp: number;
}

export function registerRoutes(app: Express): Server {
  // Setup session middleware
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      cookie: { maxAge: 86400000 }, // 24 hours
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'development_secret',
    })
  );

  // Register route handlers
  app.use(authRoutes);
  app.use(paymentRoutes);

  const httpServer = createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws/chat'
  });

  // Store active connections
  const clients = new Set<WebSocket.WebSocket>();

  wss.on('connection', (ws: WebSocket.WebSocket) => {
    clients.add(ws);

    // Send welcome message
    const welcomeMessage: ChatMessage = {
      type: 'system',
      content: 'Welcome to AIConsult Hub! How can we help you today?',
      timestamp: Date.now()
    };
    ws.send(JSON.stringify(welcomeMessage));

    ws.on('message', (data: WebSocket.RawData) => {
      try {
        const message: ChatMessage = JSON.parse(data.toString());
        // Broadcast message to all connected clients
        clients.forEach((client) => {
          if (client.readyState === WebSocket.WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  return httpServer;
}
