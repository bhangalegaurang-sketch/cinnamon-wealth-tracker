import React, { useState } from 'react';
import {
  Smartphone,
  Maximize2,
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
  children,
}) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

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
      } flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 font-sans transition-colors`}
    >
      {/* View Switcher Controls (Desktop) */}
      <div className="hidden md:flex items-center justify-between w-[393px] mb-3 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs shadow-subtle">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            Cinnamon
          </span>
          <span className="text-[11px] text-stone-400">· iPhone 16 Pro (19.5:9)</span>
        </div>

        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors font-medium text-[11px]"
        >
          {deviceFrameMode ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-cinnamon-600 dark:text-cinnamon-400" />
              <span>Frame: On</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cinnamon-600 dark:text-cinnamon-400" />
              <span>Full width</span>
            </>
          )}
        </button>
      </div>

      {/* Outer Phone Frame Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Physical Button Accents (Left: Volume / Right: Power) */}
        {deviceFrameMode && (
          <>
            {/* Action / Volume buttons */}
            <div className="hidden md:block absolute -left-[14px] top-[140px] w-[5px] h-[32px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
            <div className="hidden md:block absolute -left-[14px] top-[185px] w-[5px] h-[48px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
            <div className="hidden md:block absolute -left-[14px] top-[245px] w-[5px] h-[48px] bg-stone-700 dark:bg-stone-800 rounded-l-md" />
            {/* Power button */}
            <div className="hidden md:block absolute -right-[14px] top-[200px] w-[5px] h-[64px] bg-stone-700 dark:bg-stone-800 rounded-r-md" />
          </>
        )}

        {/* Main Phone Device Container */}
        <div
          className={`w-full transition-all relative ${
            deviceFrameMode
              ? 'w-[393px] h-[852px] max-h-[calc(100vh-64px)] aspect-[393/852] md:rounded-[52px] md:border-[10px] md:border-stone-900 dark:md:border-stone-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950'
              : 'max-w-xl w-full min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col'
          }`}
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
            isDeviceFrame={deviceFrameMode}
          />
        </div>
      </div>
    </div>
  );
};
