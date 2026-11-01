import React from 'react';
import {
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { ActiveTab } from '../../types';

interface MobileAppShellProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  holdingsCount: number;
  isPrivate: boolean;
  onTogglePrivacy: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenFeeInfo?: () => void;
  children: React.ReactNode;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  activeTab,
  onChangeTab,
  holdingsCount,
  isPrivate,
  onTogglePrivacy,
  theme,
  onToggleTheme,
  onOpenFeeInfo,
  children,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return undefined;
      case 'holdings':
        return 'Holdings';
      case 'allocation':
        return 'Allocation';
      case 'fees':
        return 'Fees';
    }
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'holdings':
        return 'Active portfolio investments';
      case 'allocation':
        return 'Diversification breakdown';
      case 'fees':
        return 'Tiered fee structure & breakdown';
      default:
        return undefined;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-150/70 text-stone-900'
      } flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 font-sans transition-colors`}
    >
      {/* Outer Phone Frame Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Physical Button Accents (Left: Volume / Right: Power) */}
        <div className="hidden md:block absolute -left-[14px] top-[140px] w-[5px] h-[32px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
        <div className="hidden md:block absolute -left-[14px] top-[185px] w-[5px] h-[48px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
        <div className="hidden md:block absolute -left-[14px] top-[245px] w-[5px] h-[48px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
        <div className="hidden md:block absolute -right-[14px] top-[200px] w-[5px] h-[64px] bg-stone-700 dark:bg-stone-800 rounded-r-md" />

        {/* Main Phone Device Container */}
        <div
          className="w-full sm:w-[393px] h-screen sm:h-[852px] sm:max-h-[calc(100vh-48px)] sm:aspect-[393/852] sm:rounded-[52px] sm:border-[10px] sm:border-stone-900 dark:sm:border-stone-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950 relative"
        >
          {/* iOS Status Bar with Dynamic Island */}
          <div className="shrink-0 relative h-11 px-7 flex items-center justify-between text-xs text-stone-800 dark:text-stone-200 select-none bg-stone-50/90 dark:bg-stone-950/90 z-40">
            {/* Left Time */}
            <span className="font-semibold text-xs tracking-tight">9:41</span>

            {/* Centered Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[116px] h-[28px] bg-black rounded-full flex items-center justify-between px-3 shadow-inner pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-stone-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950/80 border border-stone-800" />
            </div>

            {/* Right Status Icons */}
            <div className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Header */}
          <div className="shrink-0">
            <Header
              isPrivate={isPrivate}
              onTogglePrivacy={onTogglePrivacy}
              theme={theme}
              onToggleTheme={onToggleTheme}
              title={getTabTitle()}
              subtitle={getTabSubtitle()}
              onOpenFeeInfo={onOpenFeeInfo}
            />
          </div>

          {/* Scrollable Screen Content Body */}
          <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pt-3 pb-24 scroll-smooth">
            {children}
          </main>

          {/* Pinned Bottom Navigation inside Phone Frame */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={onChangeTab}
            holdingsCount={holdingsCount}
            isDeviceFrame={true}
          />
        </div>
      </div>
    </div>
  );
};
