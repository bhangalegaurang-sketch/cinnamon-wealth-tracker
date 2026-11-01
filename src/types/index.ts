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

export type ActiveTab = 'dashboard' | 'holdings' | 'allocation' | 'fees';
export type Timeframe = '1M' | '3M' | '6M' | '1Y' | 'ALL';
