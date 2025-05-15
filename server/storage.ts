import { InsertSeoAnalysis, SeoAnalysis, InsertUser, User } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getRecentAnalyses(limit?: number): Promise<SeoAnalysis[]>;
  getAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private analyses: Map<number, SeoAnalysis>;
  private userIdCounter: number;
  private analysisIdCounter: number;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
    this.userIdCounter = 1;
    this.analysisIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async saveSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis> {
    const id = this.analysisIdCounter++;
    const timestamp = new Date().toISOString();
    const newAnalysis: SeoAnalysis = { ...analysis, id, createdAt: timestamp };
    this.analyses.set(id, newAnalysis);
    return newAnalysis;
  }

  async getRecentAnalyses(limit: number = 10): Promise<SeoAnalysis[]> {
    const allAnalyses = Array.from(this.analyses.values());
    return allAnalyses
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getAnalysisByUrl(url: string): Promise<SeoAnalysis | undefined> {
    return Array.from(this.analyses.values()).find(
      (analysis) => analysis.url === url
    );
  }
}

// Export a singleton instance of storage
export const storage = new MemStorage();
