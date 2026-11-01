export interface Holding {
  id: string;
  name: string;
  ticker: string;
  assetClass: 'Equities' | 'Fixed Income' | 'Cash Equivalent' | 'ETF';
  sector: 'Technology' | 'Healthcare' | 'Bonds' | 'Cash' | 'Global Index';
  sharesOwned: number;
  avgBuyPrice: number;
  currentPrice: number;
  currency: 'GBP' | 'USD';
  gbpExchangeRate?: number; // For USD assets
  dayChangePercent: number;
  dayChangeAmount: number;
  totalValueGBP: number;
  totalReturnGBP: number;
  totalReturnPercent: number;
  allocationPercent: number;
  accountType: 'Stocks & Shares ISA' | 'General Investment Account (GIA)';
  isin: string;
}

export interface SectorAllocation {
  name: string;
  value: number;
  percentage: number;
  color: string;
  assetsCount: number;
}

export interface BenchmarkPoint {
  date: string;
  month: string;
  portfolioValue: number;
  portfolioPercent: number;
  ftse100Percent: number;
  sp500Percent: number;
}

export type PortfolioType = 'fullyManaged' | 'fixedAllocation';

export interface FeeItem {
  id: string;
  month: string;
  date: string;
  aumAtBilling: number;
  managementFee: number;
  fundCosts: number;
  marketSpread: number;
  totalCost: number;
  ratePercent: number;
  status: 'Billed' | 'Upcoming';
}

export interface FinancialConcept {
  id: string;
  name: string;
  category: string;
  tagline: string;
  beginnerDef: string;
  intermediateDef: string;
  advancedDef: string;
  whyItMatters: string;
  howItWorks: string;
  formula?: string;
  formulaExplanation?: string;
  practicalExample: string;
  realWorldApplication: string;
  commonMisconceptions: string[];
  relatedConceptIds: string[];
  suggestedNextConceptId?: string;
  sources: string[];
  lastReviewed: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface LearningPathwayStep {
  stepNumber: number;
  conceptId: string;
  title: string;
  summary: string;
  numericalInsight: string;
}

export interface LearningPathway {
  id: string;
  title: string;
  category: string;
  description: string;
  estimatedMinutes: number;
  steps: LearningPathwayStep[];
}

export interface KnowledgeCategory {
  id: string;
  label: string;
  count: number;
  description: string;
}

export type ActiveTab = 'dashboard' | 'holdings' | 'allocation' | 'fees' | 'learn';
export type Timeframe = '1M' | '3M' | '6M' | '1Y' | 'ALL';
