import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Holding } from '../../types';
import { formatGBP, formatPercent, formatShares } from '../../utils/formatters';

interface HoldingDetailModalProps {
  holding: Holding | null;
  onClose: () => void;
  isPrivate: boolean;
}

export const HoldingDetailModal: React.FC<HoldingDetailModalProps> = ({
  holding,
  onClose,
  isPrivate,
}) => {
  if (!holding) return null;

  const isPositive = holding.totalReturnGBP >= 0;
  const isDayPositive = holding.dayChangeAmount >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 border-t sm:border border-stone-200 dark:border-stone-800 rounded-t-3xl sm:rounded-3xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag bar */}
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-5 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-mono font-medium text-stone-900 dark:text-stone-100">{holding.ticker}</span>
              <span>·</span>
              <span>{holding.sector}</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              {holding.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Main value */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950">
            <span className="text-xs text-stone-500 dark:text-stone-400">Position value</span>
            <div className="text-3xl font-bold text-stone-900 dark:text-stone-50 font-mono mt-1">
              {isPrivate ? '••••••' : formatGBP(holding.totalValueGBP)}
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Total return</span>
                <span className={`font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isPrivate ? '••••' : formatGBP(holding.totalReturnGBP)} ({formatPercent(holding.totalReturnPercent)})
                </span>
              </div>

              <div className="text-right">
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Today</span>
                <span className={`font-semibold ${isDayPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isPrivate ? '•••' : `${isDayPositive ? '+' : ''}${formatGBP(holding.dayChangeAmount)}`} ({formatPercent(holding.dayChangePercent)})
                </span>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
              <span className="text-stone-400 block text-[11px]">Shares owned</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                {formatShares(holding.sharesOwned)}
              </span>
            </div>

            <div className="p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
              <span className="text-stone-400 block text-[11px]">Average cost</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                {holding.currency === 'USD' ? '$' : '£'}{holding.avgBuyPrice.toFixed(2)}
              </span>
            </div>

            <div className="p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
              <span className="text-stone-400 block text-[11px]">Market price</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                {holding.currency === 'USD' ? '$' : '£'}{holding.currentPrice.toFixed(2)}
              </span>
            </div>

            <div className="p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
              <span className="text-stone-400 block text-[11px]">Account</span>
              <span className="font-medium text-stone-900 dark:text-stone-100 mt-0.5 block truncate">
                {holding.accountType}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 dark:text-stone-500 text-center">
            ISIN: {holding.isin} · Custody with Winterflood Securities
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
