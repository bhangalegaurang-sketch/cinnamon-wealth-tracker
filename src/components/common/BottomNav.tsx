import React from 'react';
import { LayoutDashboard, Layers, PieChart, Receipt } from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  holdingsCount: number;
  isDeviceFrame?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  holdingsCount,
  isDeviceFrame = false,
}) => {
  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Summary',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'holdings' as ActiveTab,
      label: 'Holdings',
      icon: Layers,
      badge: holdingsCount,
    },
    {
      id: 'allocation' as ActiveTab,
      label: 'Allocation',
      icon: PieChart,
      badge: null,
    },
    {
      id: 'fees' as ActiveTab,
      label: 'Fees',
      icon: Receipt,
      badge: null,
    },
  ];

  return (
    <nav
      className={`${
        isDeviceFrame
          ? 'absolute bottom-0 left-0 right-0 z-40'
          : 'fixed bottom-0 left-0 right-0 z-40 max-w-xl mx-auto'
      } backdrop-blur-xl border-t px-3 pt-2 pb-2 transition-colors bg-stone-50/95 dark:bg-stone-950/95 border-stone-200 dark:border-stone-800 select-none`}
    >
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-cinnamon-600 dark:text-cinnamon-400 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className="w-5 h-5 transition-transform"
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {tab.badge !== null && (
                  <span className="absolute -top-1 -right-2 text-[10px] font-mono font-medium px-1.5 py-0.2 rounded-full leading-tight bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-2" />
    </nav>
  );
};
