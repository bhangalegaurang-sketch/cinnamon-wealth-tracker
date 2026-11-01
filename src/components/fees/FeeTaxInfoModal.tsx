import React from 'react';
import { X, Percent, ShieldCheck, Scale, AlertCircle, Check } from 'lucide-react';
import { PORTFOLIO_SUMMARY } from '../../data/mockPortfolio';
import { formatGBP } from '../../utils/formatters';

interface FeeTaxInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeeTaxInfoModal: React.FC<FeeTaxInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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

        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-cinnamon-600 dark:text-cinnamon-400 font-semibold">
              <Percent className="w-3.5 h-3.5" />
              <span>Fee Rules & UK Tax Information</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              Rates, Tiers & Tax Wrappers
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Section 1: Exact Percentage of Fees Paying */}
          <section className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Fee Percentages & Tier Rules
            </h4>

            {/* Current Account Rate Card */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Your Current AUM</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  {formatGBP(PORTFOLIO_SUMMARY.totalValue)}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 space-y-2 text-xs">
                {/* Fully Managed Tier Rule */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      Fully Managed Portfolio
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Tier 1: Up to £100,000
                    </span>
                  </div>
                  <span className="font-mono font-bold text-cinnamon-600 dark:text-cinnamon-400">
                    0.75% / yr
                  </span>
                </div>
                <div className="flex items-start justify-between text-[11px] text-stone-500 dark:text-stone-400 pl-2 border-l-2 border-cinnamon-500/30">
                  <span>Portion over £100,000 (Tier 2)</span>
                  <span className="font-mono font-semibold text-stone-700 dark:text-stone-300">
                    0.35% / yr
                  </span>
                </div>

                {/* Fixed Allocation Tier Rule */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                      Fixed Allocation Portfolio
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Tier 1: Up to £100,000
                    </span>
                  </div>
                  <span className="font-mono font-bold text-cinnamon-600 dark:text-cinnamon-400">
                    0.45% / yr
                  </span>
                </div>
                <div className="flex items-start justify-between text-[11px] text-stone-500 dark:text-stone-400 pl-2 border-l-2 border-cinnamon-500/30">
                  <span>Portion over £100,000 (Tier 2)</span>
                  <span className="font-mono font-semibold text-stone-700 dark:text-stone-300">
                    0.25% / yr
                  </span>
                </div>

                {/* Underlying ETF & Spread */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-stone-700 dark:text-stone-300 font-medium">Underlying ETF Costs</span>
                    <span className="text-[10px] text-stone-400 block">Vanguard/iShares cut</span>
                  </div>
                  <span className="font-mono text-stone-800 dark:text-stone-200">
                    0.14% – 0.39% (~0.20%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-stone-700 dark:text-stone-300 font-medium">Market Spread</span>
                    <span className="text-[10px] text-stone-400 block">Bid/ask price difference</span>
                  </div>
                  <span className="font-mono text-stone-800 dark:text-stone-200">
                    ~0.04% / yr
                  </span>
                </div>
              </div>
            </div>

            {/* Zero Additional Fees Guarantee */}
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span className="text-[11px]">Trading Commissions & Exit Fees:</span>
              <span className="font-mono font-bold">£0.00 (100% Free)</span>
            </div>
          </section>

          {/* Section 2: UK Tax Wrappers & Rules */}
          <section className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              UK Tax Wrappers & Rules
            </h4>

            {/* Stocks & Shares ISA */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 dark:text-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Stocks & Shares ISA</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  100% Tax-Free
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                Under UK legislation, any capital gains and dividends earned within your ISA are 100% tax-free.
              </p>
              <div className="pt-1.5 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <span>Annual UK Allowance:</span>
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">
                  £20,000 / tax year
                </span>
              </div>
            </div>

            {/* Lifetime ISA (LISA) */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 dark:text-stone-100">
                  <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Lifetime ISA (LISA)</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  25% Bonus & Rules
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                Receive a 25% government bonus on deposits up to £4,000/year (up to £1,000 free bonus).
              </p>
              {/* LISA Warning Rule */}
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  A <strong>25% government withdrawal charge</strong> applies if withdrawn for any reason other than buying a first home (£450k or less), reaching age 60, or terminal illness.
                </span>
              </div>
            </div>

            {/* General Investment Account (GIA) */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 dark:text-stone-100">
                  <Percent className="w-4 h-4 text-stone-500" />
                  <span>General Investment Account (GIA)</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  Taxable Account
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                No tax wrapper. Investors are personally responsible for calculating and paying standard UK capital gains tax (above the £3,000 allowance) and dividend tax (above the £500 allowance).
              </p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
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
