import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import authRoutes from "./routes/auth";
import paymentRoutes from "./routes/payments";

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

  return httpServer;
}
