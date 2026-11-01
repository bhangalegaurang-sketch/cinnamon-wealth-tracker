import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  PORTFOLIO_SUMMARY,
  MOCK_HOLDINGS,
  BENCHMARK_HISTORY_12M,
  SECTOR_ALLOCATIONS,
} from '../../data/mockPortfolio';
import { Holding, ActiveTab, Timeframe } from '../../types';
import { formatGBP, formatPercent } from '../../utils/formatters';

interface UnifiedDashboardProps {
  isPrivate: boolean;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectHolding: (holding: Holding) => void;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  isPrivate,
  onNavigateTab,
  onSelectHolding,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [showFtse, setShowFtse] = useState<boolean>(true);
  const [showSp500, setShowSp500] = useState<boolean>(true);

  const getFilteredChartData = () => {
    switch (timeframe) {
      case '1M':
        return BENCHMARK_HISTORY_12M.slice(-2);
      case '3M':
        return BENCHMARK_HISTORY_12M.slice(-4);
      case '6M':
        return BENCHMARK_HISTORY_12M.slice(-7);
      case '1Y':
      case 'ALL':
      default:
        return BENCHMARK_HISTORY_12M;
    }
  };

  const chartData = getFilteredChartData();
  const topHoldings = [...MOCK_HOLDINGS].sort((a, b) => b.totalValueGBP - a.totalValueGBP).slice(0, 3);

  return (
    <div className="space-y-4 pb-24">
      {/* Clean Balance Overview */}
      <section className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Portfolio balance</span>
          <span className="font-mono text-[11px] text-stone-400 dark:text-stone-500">
            Updated {PORTFOLIO_SUMMARY.userProfile.lastUpdated}
          </span>
        </div>

        {/* Primary figure */}
        <div className="mt-1">
          <div className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 font-sans">
            {isPrivate ? '••••••••' : formatGBP(PORTFOLIO_SUMMARY.totalValue)}
          </div>
        </div>

        {/* Return indicators */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Today</span>
            <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isPrivate ? '••••' : `+${formatGBP(PORTFOLIO_SUMMARY.todayReturn)}`}</span>
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (+{PORTFOLIO_SUMMARY.todayReturnPercent}%)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">All-time</span>
            <div className="flex items-center justify-end gap-1 font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              <span>{isPrivate ? '••••' : `+${formatGBP(PORTFOLIO_SUMMARY.allTimeReturn)}`}</span>
              <span className="font-normal text-stone-500 dark:text-stone-400">
                (+{PORTFOLIO_SUMMARY.allTimeReturnPercent}%)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Chart */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Performance vs market
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Compared over 12 months
            </p>
          </div>

          {/* Timeframe pill selector */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-950 p-1 rounded-xl text-xs">
            {(['1M', '3M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Interactive Legend Toggles */}
        <div className="flex items-center gap-3 py-2 text-xs border-b border-stone-100 dark:border-stone-800 mb-2">
          <div className="flex items-center gap-1.5 font-medium text-stone-900 dark:text-stone-100">
            <span className="w-2.5 h-0.5 bg-cinnamon-600 rounded-full"></span>
            <span>Your portfolio (+10.9%)</span>
          </div>

          <button
            onClick={() => setShowFtse(!showFtse)}
            className={`flex items-center gap-1.5 transition-opacity ${
              showFtse ? 'opacity-100 text-stone-600 dark:text-stone-300' : 'opacity-40 text-stone-400'
            }`}
          >
            <span className="w-2.5 h-0.5 bg-blue-500 rounded-full"></span>
            <span>FTSE 100 (+5.8%)</span>
          </button>

          <button
            onClick={() => setShowSp500(!showSp500)}
            className={`flex items-center gap-1.5 transition-opacity ${
              showSp500 ? 'opacity-100 text-stone-600 dark:text-stone-300' : 'opacity-40 text-stone-400'
            }`}
          >
            <span className="w-2.5 h-0.5 bg-stone-400 rounded-full"></span>
            <span>S&P 500 (+10.2%)</span>
          </button>
        </div>

        {/* Minimalist Line Chart */}
        <div className="h-52 w-full -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="rgba(120, 113, 108, 0.15)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#A8A29E"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A8A29E"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `+${val}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as (typeof BENCHMARK_HISTORY_12M)[0];
                    return (
                      <div className="rounded-xl bg-stone-900 text-white dark:bg-stone-950 p-2.5 border border-stone-800 shadow-lg text-xs space-y-1">
                        <div className="font-medium text-stone-300 pb-0.5 border-b border-stone-800">
                          {data.date}
                        </div>
                        <div className="flex items-center justify-between gap-4 text-cinnamon-300">
                          <span>Portfolio:</span>
                          <span className="font-mono font-semibold">
                            {isPrivate ? '••••' : formatGBP(data.portfolioValue)} (+{data.portfolioPercent}%)
                          </span>
                        </div>
                        {showFtse && (
                          <div className="flex items-center justify-between gap-4 text-blue-300">
                            <span>FTSE 100:</span>
                            <span className="font-mono">+{data.ftse100Percent}%</span>
                          </div>
                        )}
                        {showSp500 && (
                          <div className="flex items-center justify-between gap-4 text-stone-400">
                            <span>S&P 500:</span>
                            <span className="font-mono">+{data.sp500Percent}%</span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="portfolioPercent"
                stroke="#B25D2E"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#B25D2E' }}
              />
              {showFtse && (
                <Line
                  type="monotone"
                  dataKey="ftse100Percent"
                  stroke="#3B82F6"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
              {showSp500 && (
                <Line
                  type="monotone"
                  dataKey="sp500Percent"
                  stroke="#A8A29E"
                  strokeWidth={1.5}
                  strokeDasharray="2 2"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Holdings Section (Grouped List Style) */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Holdings
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {MOCK_HOLDINGS.length} assets owned
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('holdings')}
            className="flex items-center gap-0.5 text-xs font-medium text-cinnamon-600 dark:text-cinnamon-400 hover:underline"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-800/80">
          {topHoldings.map((h) => (
            <div
              key={h.id}
              onClick={() => onSelectHolding(h)}
              className="py-3 flex items-center justify-between cursor-pointer group"
            >
              <div>
                <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-cinnamon-600 dark:group-hover:text-cinnamon-400 transition-colors">
                  {h.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {h.sharesOwned} units · {h.ticker}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono">
                  {isPrivate ? '••••••' : formatGBP(h.totalValueGBP)}
                </div>
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  +{h.totalReturnPercent.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Asset Allocation Preview */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Allocation
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              By sector
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('allocation')}
            className="flex items-center gap-0.5 text-xs font-medium text-cinnamon-600 dark:text-cinnamon-400 hover:underline"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal segmented allocation bar */}
        <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 flex overflow-hidden mb-3">
          {SECTOR_ALLOCATIONS.map((sec) => (
            <div
              key={sec.name}
              style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }}
              className="h-full"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {SECTOR_ALLOCATIONS.slice(0, 4).map((sec) => (
            <div key={sec.name} className="flex items-center justify-between py-1 text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sec.color }} />
                <span className="truncate max-w-[100px]">{sec.name}</span>
              </div>
              <span className="font-mono text-stone-900 dark:text-stone-100 font-medium">
                {sec.percentage}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Honest Fee Card */}
      <section
        onClick={() => onNavigateTab('fees')}
        className="p-5 rounded-3xl bg-cinnamon-50/70 dark:bg-cinnamon-950/20 border border-cinnamon-200/80 dark:border-cinnamon-900/40 cursor-pointer group transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-cinnamon-700 dark:text-cinnamon-400">
              Fee transparency
            </div>
            <div className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              £{PORTFOLIO_SUMMARY.monthlyManagementFee.toFixed(2)}/mo management
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
              Tiered at 0.75% (drops to 0.35% over £100k) · No trading or exit fees.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-cinnamon-600 dark:text-cinnamon-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
        </div>
      </section>
    </div>
  );
};
