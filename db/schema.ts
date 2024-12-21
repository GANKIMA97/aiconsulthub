import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Amount in cents
  currency: text("currency").notNull(),
  duration: integer("duration").notNull(), // Duration in days
  features: jsonb("features"), // Array of features included in this plan
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(), // Amount in cents
  currency: text("currency").notNull(),
  status: text("status").notNull(), // 'pending', 'completed', 'failed'
  provider: text("provider").notNull(), // 'wechat', 'alipay', 'visa', 'mastercard', 'paypal'
  providerTransactionId: text("provider_transaction_id"),
  customerEmail: text("customer_email"), // Optional email for receipt
  metadata: jsonb("metadata"), // Store provider-specific data
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  accessToken: text("access_token").unique().notNull(), // Unique token for subscription access
  planId: integer("plan_id").references(() => subscriptionPlans.id),
  status: text("status").notNull(), // 'active', 'cancelled', 'expired'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  paymentId: integer("payment_id").references(() => payments.id),
  customerEmail: text("customer_email"), // Optional email for notifications
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorEmail: text("author_email"), // Store email instead of user ID
  isExclusive: boolean("is_exclusive").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  slug: text("slug").unique().notNull(),
  language: text("language").notNull(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(), // Store email instead of user ID
  postId: integer("post_id").references(() => blogPosts.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  email: text("email"), // Store email instead of user ID
  eventType: text("event_type").notNull(), // 'pageview', 'subscription_purchase', etc.
  path: text("path"), // For pageviews
  metadata: jsonb("metadata"), // Additional event data
  createdAt: timestamp("created_at").defaultNow(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;

// Schemas for input validation
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export const selectSubscriptionPlanSchema = createSelectSchema(subscriptionPlans);
export const insertPaymentSchema = createInsertSchema(payments);
export const selectPaymentSchema = createSelectSchema(payments);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const selectSubscriptionSchema = createSelectSchema(subscriptions);
export const insertBlogPostSchema = createInsertSchema(blogPosts);
export const selectBlogPostSchema = createSelectSchema(blogPosts);
export const insertAnalyticsSchema = createInsertSchema(analytics);
export const selectAnalyticsSchema = createSelectSchema(analytics);