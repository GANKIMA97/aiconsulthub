import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import authRoutes from "./routes/auth";
import paymentRoutes from "./routes/payments";
import analyticsRoutes from "./routes/analytics";

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
  app.use(analyticsRoutes);
  app.use(analyticsRoutes);

  const httpServer = createServer(app);

  // Create WebSocket server with more robust configuration
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws/chat',
    verifyClient: (info, cb) => {
      const protocol = info.req.headers['sec-websocket-protocol'];
      // Explicitly reject vite-hmr connections
      if (protocol === 'vite-hmr') {
        cb(false);
        return;
      }
      // Accept chat connections
      if (!protocol || protocol === 'chat') {
        cb(true);
        return;
      }
      // Reject unknown protocols
      cb(false);
    },
    clientTracking: true // Enable built-in client tracking
  });

  // Store active chat clients separately from vite-hmr connections
  const chatClients = new Set<WebSocket>();

  wss.on('connection', (ws, req) => {
    const protocol = req.headers['sec-websocket-protocol'];
    
    // Immediately close vite-hmr connections
    if (protocol === 'vite-hmr') {
      ws.close();
      return;
    }

    // Only handle chat protocol connections
    if (!protocol || protocol === 'chat') {
      chatClients.add(ws);

      // Send welcome message
      const welcomeMessage: ChatMessage = {
        type: 'system',
        content: 'Welcome to AIConsult Hub! How can we help you today?',
        timestamp: Date.now()
      };
      
      try {
        ws.send(JSON.stringify(welcomeMessage));
      } catch (error) {
        console.error('Error sending welcome message:', error);
      }

      ws.on('message', (data) => {
        try {
          const message: ChatMessage = JSON.parse(data.toString());
          
          // Broadcast message to all connected chat clients
          chatClients.forEach(client => {
            if (client.readyState === 1) { // 1 = OPEN
              try {
                client.send(JSON.stringify(message));
              } catch (err) {
                console.error('Error broadcasting message:', err);
              }
            }
          });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      });

      ws.on('close', () => {
        chatClients.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        chatClients.delete(ws);
        try {
          ws.close();
        } catch (err) {
          console.error('Error closing errored connection:', err);
        }
      });
    }
  });

  // Periodic cleanup of dead connections
  setInterval(() => {
    chatClients.forEach(client => {
      if (client.readyState === 3 || client.readyState === 2) { // 3 = CLOSED, 2 = CLOSING
        chatClients.delete(client);
      }
    });
  }, 30000); // Clean up every 30 seconds

  return httpServer;
}