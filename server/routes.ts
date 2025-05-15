import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeSeoMetaTags } from "./analyzer";
import { seoAnalysisRequestSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to analyze SEO meta tags from a URL
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate the request
      const { url } = seoAnalysisRequestSchema.parse(req.body);
      
      // Perform the analysis
      const result = await analyzeSeoMetaTags(url);
      
      // Save the analysis result to database (optional)
      try {
        await storage.saveSeoAnalysis({
          url,
          title: result.title,
          description: result.description,
          score: result.score,
          metaTags: result.metaTags,
          ogTags: result.ogTags,
          twitterTags: result.twitterTags,
          issues: result.metaTags.filter(tag => tag.status === "error"),
          warnings: result.metaTags.filter(tag => tag.status === "warning"),
          success: result.metaTags.filter(tag => tag.status === "success"),
          recommendations: result.recommendations
        });
      } catch (error) {
        console.error("Failed to save analysis:", error);
        // Continue even if saving fails
      }
      
      // Return the analysis results
      return res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid URL format", details: error.issues });
      }
      
      if (error instanceof Error) {
        // Handle fetch errors or HTML parsing errors
        return res.status(500).json({ message: error.message });
      }
      
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  });
  
  // Get recent analyses (could be used for analytics or history)
  app.get("/api/analyses", async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses();
      return res.json(analyses);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
