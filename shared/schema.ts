import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define schema for storing analysis results
export const seoAnalyses = pgTable("seo_analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  score: integer("score"),
  metaTags: jsonb("meta_tags"),
  ogTags: jsonb("og_tags"),
  twitterTags: jsonb("twitter_tags"),
  otherTags: jsonb("other_tags"),
  issues: jsonb("issues"),
  warnings: jsonb("warnings"),
  success: jsonb("success"),
  recommendations: jsonb("recommendations"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

// Define schema for users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Create insert schemas
export const insertSeoAnalysisSchema = createInsertSchema(seoAnalyses).omit({ 
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Define types
export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalyses.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define types for API request/response
export const seoAnalysisRequestSchema = z.object({
  url: z.string().url(),
});

export type SeoAnalysisRequest = z.infer<typeof seoAnalysisRequestSchema>;

// Define meta tag status types
export const metaTagStatusEnum = z.enum(["success", "warning", "error"]);
export type MetaTagStatus = z.infer<typeof metaTagStatusEnum>;

// Define meta tag schema
export const metaTagSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
  status: metaTagStatusEnum,
  description: z.string().optional(),
  lengthMax: z.number().optional(),
  lengthCurrent: z.number().optional()
});

export type MetaTag = z.infer<typeof metaTagSchema>;

// Define SEO analysis response schema
export const seoAnalysisResponseSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  description: z.string().optional(), 
  score: z.number(),
  metaTags: z.array(metaTagSchema),
  success: z.number(),
  warnings: z.number(),
  errors: z.number(),
  recommendations: z.array(z.object({
    type: metaTagStatusEnum,
    title: z.string(),
    description: z.string(),
    example: z.string().optional(),
  })),
  ogTags: z.record(z.string(), z.string().optional()),
  twitterTags: z.record(z.string(), z.string().optional()),
});

export type SeoAnalysisResponse = z.infer<typeof seoAnalysisResponseSchema>;
