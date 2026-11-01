import { Holding, SectorAllocation, BenchmarkPoint, FeeItem } from '../types';

export const PORTFOLIO_SUMMARY = {
  totalValue: 34500.0,
  currency: 'GBP',
  currencySymbol: '£',
  todayReturn: 120.0,
  todayReturnPercent: 0.35,
  allTimeReturn: 3400.0,
  allTimeReturnPercent: 10.93,
  initialInvestment: 31100.0,

  // Nutmeg-accurate fee numbers
  portfolioType: 'fullyManaged' as const, // 'fullyManaged' | 'fixedAllocation'

  // Fully Managed: 0.75% on first £100k, 0.35% thereafter
  fullyManagedRateBelow100k: 0.75,
  fullyManagedRateAbove100k: 0.35,

  // Fixed Allocation: 0.45% on first £100k, 0.25% thereafter
  fixedAllocationRateBelow100k: 0.45,
  fixedAllocationRateAbove100k: 0.25,

  // Underlying ETF fund costs & market spread
  underlyingFundCostPercent: 0.20, // 0.14% - 0.39% range, avg ~0.20%
  marketSpreadPercent: 0.04, // ~0.04%

  // Current calculation on £34,500 (Fully Managed by default):
  // Management Fee = 34,500 * 0.75% / 12 = £21.56/mo (£258.75/yr)
  // Underlying Fund Cost = 34,500 * 0.20% / 12 = £5.75/mo (£69.00/yr)
  // Market Spread = 34,500 * 0.04% / 12 = £1.15/mo (£13.80/yr)
  // Total All-In = £28.46/mo (£341.55/yr or 0.99%)
  monthlyManagementFee: 21.56,
  monthlyFundCost: 5.75,
  monthlyMarketSpread: 1.15,
  monthlyTotalCost: 28.46,

  // Fixed Allocation alternative:
  // Management Fee = 34,500 * 0.45% / 12 = £12.94/mo
  monthlyFixedAllocFee: 12.94,

  // Cinnamon Case Study Unit Economics
  operatingCostPerAccount: 20.0, // £20 annual operating cost per account
  customerAcquisitionCost: 230.0, // £230 CAC
  aumBreakevenThreshold: 20000.0, // £20,000 threshold to offset CAC

  userProfile: {
    name: 'Alexander Ward',
    location: 'Richmond, London',
    accountNumber: 'CN-849204',
    isaAllowanceUsed: 18500,
    isaAllowanceTotal: 20000,
    lastUpdated: '11:42 AM',
    marketStatus: 'London open',
  },
};

export const MOCK_HOLDINGS: Holding[] = [
  {
    id: 'vanguard-sp500',
    name: 'Vanguard S&P 500 UCITS ETF',
    ticker: 'VUSA',
    assetClass: 'ETF',
    sector: 'Global Index',
    sharesOwned: 135,
    avgBuyPrice: 71.20,
    currentPrice: 83.45,
    currency: 'GBP',
    dayChangePercent: 0.42,
    dayChangeAmount: 47.30,
    totalValueGBP: 11265.75,
    totalReturnGBP: 1653.75,
    totalReturnPercent: 17.21,
    allocationPercent: 32.65,
    accountType: 'Stocks & Shares ISA',
    isin: 'IE00B3XXRP09',
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    assetClass: 'Equities',
    sector: 'Technology',
    sharesOwned: 42,
    avgBuyPrice: 172.50,
    currentPrice: 198.80,
    currency: 'USD',
    gbpExchangeRate: 0.79,
    dayChangePercent: 0.68,
    dayChangeAmount: 44.80,
    totalValueGBP: 6596.20,
    totalReturnGBP: 873.30,
    totalReturnPercent: 15.25,
    allocationPercent: 19.12,
    accountType: 'Stocks & Shares ISA',
    isin: 'US0378331005',
  },
  {
    id: 'uk-gilts',
    name: 'UK Treasury Gilt 4.25% 2032',
    ticker: 'TG32',
    assetClass: 'Fixed Income',
    sector: 'Bonds',
    sharesOwned: 65,
    avgBuyPrice: 98.40,
    currentPrice: 101.80,
    currency: 'GBP',
    dayChangePercent: 0.05,
    dayChangeAmount: 3.30,
    totalValueGBP: 6617.00,
    totalReturnGBP: 221.00,
    totalReturnPercent: 3.46,
    allocationPercent: 19.18,
    accountType: 'Stocks & Shares ISA',
    isin: 'GB00BM8Z2S21',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    assetClass: 'Equities',
    sector: 'Technology',
    sharesOwned: 14,
    avgBuyPrice: 385.00,
    currentPrice: 422.30,
    currency: 'USD',
    gbpExchangeRate: 0.79,
    dayChangePercent: 0.31,
    dayChangeAmount: 14.50,
    totalValueGBP: 4670.60,
    totalReturnGBP: 413.20,
    totalReturnPercent: 9.70,
    allocationPercent: 13.54,
    accountType: 'Stocks & Shares ISA',
    isin: 'US5949181045',
  },
  {
    id: 'astrazeneca',
    name: 'AstraZeneca PLC',
    ticker: 'AZN',
    assetClass: 'Equities',
    sector: 'Healthcare',
    sharesOwned: 31,
    avgBuyPrice: 108.60,
    currentPrice: 114.90,
    currency: 'GBP',
    dayChangePercent: 0.22,
    dayChangeAmount: 7.80,
    totalValueGBP: 3561.90,
    totalReturnGBP: 195.30,
    totalReturnPercent: 5.80,
    allocationPercent: 10.32,
    accountType: 'General Investment Account (GIA)',
    isin: 'GB0009895292',
  },
  {
    id: 'cash-reserve',
    name: 'Sterling Cash Yield (4.65%)',
    ticker: 'CASH',
    assetClass: 'Cash Equivalent',
    sector: 'Cash',
    sharesOwned: 1,
    avgBuyPrice: 1788.55,
    currentPrice: 1788.55,
    currency: 'GBP',
    dayChangePercent: 0.01,
    dayChangeAmount: 0.25,
    totalValueGBP: 1788.55,
    totalReturnGBP: 43.45,
    totalReturnPercent: 2.49,
    allocationPercent: 5.19,
    accountType: 'Stocks & Shares ISA',
    isin: 'GB-CASH-465',
  },
];

export const SECTOR_ALLOCATIONS: SectorAllocation[] = [
  {
    name: 'US Large Cap (S&P 500)',
    value: 11265.75,
    percentage: 32.6,
    color: '#B25D2E', // Warm cinnamon
    assetsCount: 1,
  },
  {
    name: 'Technology',
    value: 11266.8,
    percentage: 32.7,
    color: '#2563EB', // Blue
    assetsCount: 2,
  },
  {
    name: 'UK Gilts',
    value: 6617.0,
    percentage: 19.2,
    color: '#16A34A', // Forest Green
    assetsCount: 1,
  },
  {
    name: 'Healthcare',
    value: 3561.9,
    percentage: 10.3,
    color: '#7C3AED', // Heather Purple
    assetsCount: 1,
  },
  {
    name: 'Cash (4.65%)',
    value: 1788.55,
    percentage: 5.2,
    color: '#78716C', // Stone
    assetsCount: 1,
  },
];

export const BENCHMARK_HISTORY_12M: BenchmarkPoint[] = [
  { date: 'Nov 2025', month: 'Nov', portfolioValue: 31100, portfolioPercent: 0.0, ftse100Percent: 0.0, sp500Percent: 0.0 },
  { date: 'Dec 2025', month: 'Dec', portfolioValue: 31580, portfolioPercent: 1.5, ftse100Percent: 0.8, sp500Percent: 1.4 },
  { date: 'Jan 2026', month: 'Jan', portfolioValue: 32040, portfolioPercent: 3.0, ftse100Percent: 1.2, sp500Percent: 2.8 },
  { date: 'Feb 2026', month: 'Feb', portfolioValue: 31820, portfolioPercent: 2.3, ftse100Percent: 0.9, sp500Percent: 2.2 },
  { date: 'Mar 2026', month: 'Mar', portfolioValue: 32410, portfolioPercent: 4.2, ftse100Percent: 1.7, sp500Percent: 3.9 },
  { date: 'Apr 2026', month: 'Apr', portfolioValue: 32900, portfolioPercent: 5.8, ftse100Percent: 2.3, sp500Percent: 5.1 },
  { date: 'May 2026', month: 'May', portfolioValue: 32650, portfolioPercent: 5.0, ftse100Percent: 2.1, sp500Percent: 4.8 },
  { date: 'Jun 2026', month: 'Jun', portfolioValue: 33200, portfolioPercent: 6.8, ftse100Percent: 3.0, sp500Percent: 6.2 },
  { date: 'Jul 2026', month: 'Jul', portfolioValue: 33750, portfolioPercent: 8.5, ftse100Percent: 3.9, sp500Percent: 7.6 },
  { date: 'Aug 2026', month: 'Aug', portfolioValue: 33450, portfolioPercent: 7.6, ftse100Percent: 3.4, sp500Percent: 7.1 },
  { date: 'Sep 2026', month: 'Sep', portfolioValue: 34050, portfolioPercent: 9.5, ftse100Percent: 4.5, sp500Percent: 8.8 },
  { date: 'Oct 2026', month: 'Oct', portfolioValue: 34380, portfolioPercent: 10.5, ftse100Percent: 5.2, sp500Percent: 9.8 },
  { date: 'Nov 2026', month: 'Now', portfolioValue: 34500, portfolioPercent: 10.9, ftse100Percent: 5.8, sp500Percent: 10.2 },
];

export const MOCK_FEES: FeeItem[] = [
  {
    id: 'fee-nov-26',
    month: 'November 2026',
    date: '1 Nov 2026',
    aumAtBilling: 34500.0,
    managementFee: 21.56,
    fundCosts: 5.75,
    marketSpread: 1.15,
    totalCost: 28.46,
    ratePercent: 0.75,
    status: 'Upcoming',
  },
  {
    id: 'fee-oct-26',
    month: 'October 2026',
    date: '1 Oct 2026',
    aumAtBilling: 34050.0,
    managementFee: 21.28,
    fundCosts: 5.68,
    marketSpread: 1.14,
    totalCost: 28.10,
    ratePercent: 0.75,
    status: 'Billed',
  },
  {
    id: 'fee-sep-26',
    month: 'September 2026',
    date: '1 Sep 2026',
    aumAtBilling: 33450.0,
    managementFee: 20.91,
    fundCosts: 5.58,
    marketSpread: 1.12,
    totalCost: 27.61,
    ratePercent: 0.75,
    status: 'Billed',
  },
  {
    id: 'fee-aug-26',
    month: 'August 2026',
    date: '1 Aug 2026',
    aumAtBilling: 33750.0,
    managementFee: 21.09,
    fundCosts: 5.63,
    marketSpread: 1.13,
    totalCost: 27.85,
    ratePercent: 0.75,
    status: 'Billed',
  },
];
