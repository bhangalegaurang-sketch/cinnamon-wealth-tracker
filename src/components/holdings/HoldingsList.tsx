import React, { useState } from 'react';
import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Holding } from '../../types';
import { MOCK_HOLDINGS, PORTFOLIO_SUMMARY } from '../../data/mockPortfolio';
import { formatGBP, formatPercent, formatShares } from '../../utils/formatters';

interface HoldingsListProps {
  isPrivate: boolean;
  onSelectHolding: (holding: Holding) => void;
}

type SortField = 'value' | 'return' | 'name';

export const HoldingsList: React.FC<HoldingsListProps> = ({
  isPrivate,
  onSelectHolding,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const sectors = ['ALL', ...Array.from(new Set(MOCK_HOLDINGS.map((h) => h.sector)))];

  const filteredHoldings = MOCK_HOLDINGS.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || h.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'value') {
      comparison = b.totalValueGBP - a.totalValueGBP;
    } else if (sortField === 'return') {
      comparison = b.totalReturnPercent - a.totalReturnPercent;
    } else if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    }
    return sortAsc ? -comparison : comparison;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Top Summary */}
      <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-500 dark:text-stone-400">Total invested</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-sans mt-0.5">
            {isPrivate ? '••••••' : formatGBP(PORTFOLIO_SUMMARY.totalValue)}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 dark:text-stone-400">Holdings</span>
          <div className="text-2xl font-bold text-cinnamon-600 dark:text-cinnamon-400 font-sans mt-0.5">
            {MOCK_HOLDINGS.length} assets
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search holdings..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-cinnamon-500 transition-colors shadow-subtle"
          />
        </div>

        {/* Sector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedSector === sec
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {sec === 'ALL' ? 'All sectors' : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting bar */}
      <div className="flex items-center justify-between px-1 text-xs text-stone-500 dark:text-stone-400">
        <span>Sort by</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSort('value')}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              sortField === 'value'
                ? 'font-semibold text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800'
                : 'hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>Value</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => toggleSort('return')}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              sortField === 'return'
                ? 'font-semibold text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800'
                : 'hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>Return</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Clean Holdings Grouped List */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle divide-y divide-stone-100 dark:divide-stone-800/80 overflow-hidden">
        {sortedHoldings.map((h) => {
          const isPositive = h.totalReturnGBP >= 0;
          return (
            <div
              key={h.id}
              onClick={() => onSelectHolding(h)}
              className="p-4 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                      {h.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    <span className="font-mono text-stone-700 dark:text-stone-300 font-medium">
                      {h.ticker}
                    </span>
                    <span>·</span>
                    <span>{formatShares(h.sharesOwned)} units</span>
                    <span>·</span>
                    <span>{h.sector}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono">
                    {isPrivate ? '••••••' : formatGBP(h.totalValueGBP)}
                  </div>
                  <div className={`text-xs font-medium flex items-center justify-end gap-1 mt-0.5 ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    <span>{isPrivate ? '••••' : formatGBP(h.totalReturnGBP)}</span>
                    <span>({formatPercent(h.totalReturnPercent)})</span>
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <div>
                  <span>Avg: </span>
                  <span className="font-mono text-stone-700 dark:text-stone-300">
                    {h.currency === 'USD' ? '$' : '£'}{h.avgBuyPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span>Current: </span>
                  <span className="font-mono text-stone-700 dark:text-stone-300">
                    {h.currency === 'USD' ? '$' : '£'}{h.currentPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span>Portfolio: </span>
                  <span className="font-mono text-stone-700 dark:text-stone-300 font-medium">
                    {h.allocationPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedHoldings.length === 0 && (
        <div className="p-8 text-center text-xs text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          No holdings match your search.
        </div>
      )}
    </div>
  );
};
