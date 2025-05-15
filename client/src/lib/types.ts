import { SeoAnalysisResponse, MetaTag, MetaTagStatus } from "@shared/schema";

export type { SeoAnalysisResponse, MetaTag, MetaTagStatus };

// Types for tab content
export type TabType = "meta-tags" | "google-preview" | "social-preview" | "recommendations";

// Type for recommendation
export interface Recommendation {
  type: MetaTagStatus;
  title: string;
  description: string;
  example?: string;
}
