import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure database connection with SSL for production
const connectionOptions = {
  connection: process.env.DATABASE_URL,
  schema,
  ws: ws,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
  } : undefined,
};

export const db = drizzle(connectionOptions);