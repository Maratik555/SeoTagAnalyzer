import { SeoAnalysisResponse } from "./types";
import { apiRequest } from "./queryClient";

/**
 * Submit a URL for SEO analysis
 * 
 * @param url The website URL to analyze
 * @returns Promise with the analysis result
 */
export async function analyzeSeoMetaTags(url: string): Promise<SeoAnalysisResponse> {
  const response = await apiRequest("POST", "/api/analyze", { url });
  return response.json();
}

/**
 * Extract the domain from a URL
 */
export function extractDomain(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    return url;
  }
}

/**
 * Format the URL for display in search results
 */
export function formatUrlForDisplay(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    const path = parsedUrl.pathname === "/" ? "" : parsedUrl.pathname;
    return `${domain}${path}`;
  } catch (error) {
    return url;
  }
}

/**
 * Get a color code for a score
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "success";
  if (score >= 70) return "warning";
  return "error";
}

/**
 * Get a text label for a score
 */
export function getScoreLabel(score: number): string {
  if (score >= 90) return "Отлично";
  if (score >= 70) return "Хорошо";
  if (score >= 50) return "Удовлетворительно";
  return "Плохо";
}
