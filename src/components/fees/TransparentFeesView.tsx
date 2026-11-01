import React, { useState } from 'react';
import {
  Download,
  Check,
  ShieldCheck,
  Info,
  ChevronRight,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { PORTFOLIO_SUMMARY, MOCK_FEES } from '../../data/mockPortfolio';
import { PortfolioType } from '../../types';
import { formatGBP } from '../../utils/formatters';

interface TransparentFeesViewProps {
  isPrivate: boolean;
}

export const TransparentFeesView: React.FC<TransparentFeesViewProps> = ({ isPrivate }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [portfolioStyle, setPortfolioStyle] = useState<PortfolioType>('fullyManaged');
  const [customAum, setCustomAum] = useState<number>(34500);

  // Nutmeg Tiered Fee Calculation
  // Fully Managed: 0.75% on first £100,000, 0.35% on anything above
  // Fixed Allocation: 0.45% on first £100,000, 0.25% on anything above
  const calculateTieredManagementFee = (aum: number, style: PortfolioType) => {
    const rateBelow = style === 'fullyManaged' ? 0.0075 : 0.0045;
    const rateAbove = style === 'fullyManaged' ? 0.0035 : 0.0025;

    if (aum <= 100000) {
      return aum * rateBelow;
    } else {
      const firstTier = 100000 * rateBelow;
      const secondTier = (aum - 100000) * rateAbove;
      return firstTier + secondTier;
    }
  };

  const fundCostRate = portfolioStyle === 'fullyManaged' ? 0.0020 : 0.0017; // 0.14% - 0.39% range
  const marketSpreadRate = 0.0004; // 0.04%

  const annualManagementFee = calculateTieredManagementFee(customAum, portfolioStyle);
  const annualFundCost = customAum * fundCostRate;
  const annualSpread = customAum * marketSpreadRate;
  const annualTotalCost = annualManagementFee + annualFundCost + annualSpread;

  const monthlyManagementFee = annualManagementFee / 12;
  const monthlyFundCost = annualFundCost / 12;
  const monthlySpread = annualSpread / 12;
  const monthlyTotalCost = annualTotalCost / 12;
  const effectiveAnnualRate = (annualTotalCost / customAum) * 100;

  // Comparison with traditional wealth manager (1.75% + 0.3% trading = 2.05%)
  const traditionalAnnualFee = customAum * 0.0175;
  const annualSavings = traditionalAnnualFee - annualTotalCost;

  const handleDownloadStatement = (month: string) => {
    setDownloadSuccess(month);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Portfolio Style Switcher */}
      <div className="p-1 rounded-2xl bg-stone-200/70 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center text-xs">
        <button
          onClick={() => setPortfolioStyle('fullyManaged')}
          className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all ${
            portfolioStyle === 'fullyManaged'
              ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Fully Managed (0.75% / 0.35%)
        </button>
        <button
          onClick={() => setPortfolioStyle('fixedAllocation')}
          className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all ${
            portfolioStyle === 'fixedAllocation'
              ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Fixed Allocation (0.45% / 0.25%)
        </button>
      </div>

      {/* Primary Monthly Fee Card */}
      <section className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Monthly fee ({portfolioStyle === 'fullyManaged' ? 'Fully Managed' : 'Fixed Allocation'})</span>
          <span className="font-mono text-[11px]">November 2026</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
            {isPrivate ? '••••••' : `£${monthlyTotalCost.toFixed(2)}`}
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">
            / month all-in ({effectiveAnnualRate.toFixed(2)}% p.a.)
          </span>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
          Full transparency breakdown on your portfolio balance of {isPrivate ? '••••••' : formatGBP(PORTFOLIO_SUMMARY.totalValue)}. Deducted automatically with zero out-of-pocket bills.
        </p>

        {/* 3-Pillar Cost Breakdown (Nutmeg Real Structure) */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-2 text-xs">
          {/* 1. Management Fee */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>Cinnamon Management Fee</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                  {portfolioStyle === 'fullyManaged' ? '0.75%' : '0.45%'}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Tiered: drops to {portfolioStyle === 'fullyManaged' ? '0.35%' : '0.25%'} over £100k
              </span>
            </div>
            <div className="text-right font-mono font-semibold text-stone-900 dark:text-stone-100">
              £{monthlyManagementFee.toFixed(2)}/mo
            </div>
          </div>

          {/* 2. Underlying ETF Fund Costs */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>Underlying ETF Fund Costs</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                  {(fundCostRate * 100).toFixed(2)}%
                </span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Paid to ETF providers (range: 0.14% – 0.39%)
              </span>
            </div>
            <div className="text-right font-mono font-semibold text-stone-900 dark:text-stone-100">
              £{monthlyFundCost.toFixed(2)}/mo
            </div>
          </div>

          {/* 3. Market Spread */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>Estimated Market Spread</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                  0.04%
                </span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Minor bid/ask market effect of ETF trading
              </span>
            </div>
            <div className="text-right font-mono font-semibold text-stone-900 dark:text-stone-100">
              £{monthlySpread.toFixed(2)}/mo
            </div>
          </div>
        </div>
      </section>

      {/* Zero Fee Guarantee (Nutmeg exact policy) */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Zero Additional Charges
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'Setup & Onboarding', val: '£0.00 Free' },
            { label: 'Trading Commissions', val: '£0.00 Free' },
            { label: 'Withdrawal Fees', val: '£0.00 Free' },
            { label: 'Account Exit Fees', val: '£0.00 Free' },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
              <span className="text-stone-600 dark:text-stone-400 text-[11px]">{item.label}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Tier Calculator (£100k breakpoint showcase) */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Tiered Fee Calculator
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Rates automatically drop for balances over £100,000
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-lg">
            {formatGBP(customAum, true)}
          </span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="10000"
          max="200000"
          step="5000"
          value={customAum}
          onChange={(e) => setCustomAum(Number(e.target.value))}
          className="w-full accent-cinnamon-600 bg-stone-200 dark:bg-stone-800 h-1.5 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
          <span>£10,000</span>
          <span className="text-cinnamon-600 dark:text-cinnamon-400 font-semibold">£100,000 Tier Drop</span>
          <span>£200,000</span>
        </div>

        {/* Calculated result */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-3 rounded-2xl bg-cinnamon-50/70 dark:bg-cinnamon-950/20 border border-cinnamon-200 dark:border-cinnamon-900/50">
            <span className="text-cinnamon-700 dark:text-cinnamon-400 text-[11px] block font-medium">
              Cinnamon All-In Cost
            </span>
            <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono mt-0.5">
              £{monthlyTotalCost.toFixed(2)}/mo
            </div>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
              £{annualTotalCost.toFixed(2)} / year
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
            <span className="text-stone-500 dark:text-stone-400 text-[11px] block font-medium">
              Typical Adviser (1.75%)
            </span>
            <div className="text-base font-bold text-stone-700 dark:text-stone-300 font-mono mt-0.5">
              £{(traditionalAnnualFee / 12).toFixed(2)}/mo
            </div>
            <span className="text-[10px] text-stone-400 block mt-0.5">
              £{traditionalAnnualFee.toFixed(2)} / year
            </span>
          </div>
        </div>

        {/* Case Economics Callout */}
        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 text-xs border border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
            <span>Annual operating cost per account:</span>
            <span className="font-mono font-semibold">£20.00</span>
          </div>
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 mt-1">
            <span>Customer acquisition cost (CAC):</span>
            <span className="font-mono font-semibold">£230.00</span>
          </div>
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            <span>AUM threshold to offset CAC:</span>
            <span className="font-mono font-bold">£20,000 (Met: £34.5k)</span>
          </div>
        </div>
      </section>

      {/* UK Tax Wrappers Section */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle space-y-3">
        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          UK Tax Wrappers & Rules
        </h4>

        <div className="space-y-2 text-xs">
          {/* Stocks & Shares ISA */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Stocks & Shares ISA
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                100% Tax-Free
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Capital gains and dividends earned inside your ISA are completely tax-free under UK rules. You have utilized £18,500 of your £20,000 allowance this tax year.
            </p>
          </div>

          {/* Lifetime ISA */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Lifetime ISA (LISA)
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                25% Bonus / Rule Notice
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Includes 25% government bonus on deposits up to £4,000/yr. Subject to a 25% government withdrawal charge if withdrawn for reasons other than buying a first home (up to £450k), age 60, or terminal illness.
            </p>
          </div>

          {/* General Investment Account */}
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                General Investment Account (GIA)
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                Standard UK Tax
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              No tax wrapper. Investors are personally responsible for calculating UK capital gains tax (above £3,000 allowance) and dividend tax (above £500 allowance).
            </p>
          </div>
        </div>
      </section>

      {/* Historical Monthly Invoices */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
          Monthly Invoices
        </h4>

        {downloadSuccess && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>Downloaded statement for {downloadSuccess} (PDF)</span>
          </div>
        )}

        <div className="divide-y divide-stone-100 dark:divide-stone-800/80">
          {MOCK_FEES.map((fee) => (
            <div key={fee.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">{fee.month}</span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                  Mgmt: £{fee.managementFee.toFixed(2)} · ETFs: £{fee.fundCosts.toFixed(2)} · Spread: £{fee.marketSpread.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  £{fee.totalCost.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDownloadStatement(fee.month)}
                  title={`Download statement for ${fee.month}`}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
