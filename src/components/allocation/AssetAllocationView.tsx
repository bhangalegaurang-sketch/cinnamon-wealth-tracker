import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { SECTOR_ALLOCATIONS, PORTFOLIO_SUMMARY } from '../../data/mockPortfolio';
import { formatGBP } from '../../utils/formatters';

interface AssetAllocationViewProps {
  isPrivate: boolean;
}

export const AssetAllocationView: React.FC<AssetAllocationViewProps> = ({ isPrivate }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'sector' | 'assetClass'>('sector');

  const assetClassData = [
    {
      name: 'Global Equities',
      value: 26094.45,
      percentage: 75.6,
      color: '#B25D2E', // Warm cinnamon
      assetsCount: 4,
    },
    {
      name: 'Fixed Income (Gilts)',
      value: 6617.00,
      percentage: 19.2,
      color: '#16A34A', // Forest green
      assetsCount: 1,
    },
    {
      name: 'Cash Reserve (4.65%)',
      value: 1788.55,
      percentage: 5.2,
      color: '#78716C', // Stone
      assetsCount: 1,
    },
  ];

  const currentData = viewMode === 'sector' ? SECTOR_ALLOCATIONS : assetClassData;
  const activeItem = activeIndex !== null ? currentData[activeIndex] : null;

  return (
    <div className="space-y-4 pb-24">
      {/* Top Header & Donut Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Asset allocation
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Portfolio distribution
            </p>
          </div>

          {/* Segment switch */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-950 p-1 rounded-xl text-xs">
            <button
              onClick={() => {
                setViewMode('sector');
                setActiveIndex(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                viewMode === 'sector'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              By sector
            </button>
            <button
              onClick={() => {
                setViewMode('assetClass');
                setActiveIndex(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                viewMode === 'assetClass'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              By type
            </button>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="relative h-56 w-full flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={92}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {currentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent"
                    className="cursor-pointer transition-transform"
                    style={{
                      transform: activeIndex === index ? 'scale(1.04)' : 'scale(1)',
                      transformOrigin: 'center center',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as (typeof currentData)[0];
                    return (
                      <div className="rounded-xl bg-stone-900 text-white dark:bg-stone-950 p-2 border border-stone-800 shadow-lg text-xs space-y-0.5">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-stone-300 font-mono text-[11px]">
                          {isPrivate ? '••••' : formatGBP(item.value)} · {item.percentage}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
              {activeItem ? activeItem.name : 'Total'}
            </span>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-50 font-mono mt-0.5">
              {isPrivate
                ? '••••••'
                : activeItem
                ? formatGBP(activeItem.value, true)
                : formatGBP(PORTFOLIO_SUMMARY.totalValue, true)}
            </span>
            <span className="text-xs font-semibold text-cinnamon-600 dark:text-cinnamon-400">
              {activeItem ? `${activeItem.percentage}%` : '100%'}
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle divide-y divide-stone-100 dark:divide-stone-800/80">
        {currentData.map((item, idx) => (
          <div
            key={item.name}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            className="py-3 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 block">
                  {item.name}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {item.assetsCount} {item.assetsCount === 1 ? 'asset' : 'assets'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono block">
                {isPrivate ? '••••••' : formatGBP(item.value)}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
