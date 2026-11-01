import React from 'react';
import { Eye, EyeOff, Sun, Moon, Info } from 'lucide-react';
import { PORTFOLIO_SUMMARY } from '../../data/mockPortfolio';

interface HeaderProps {
  isPrivate: boolean;
  onTogglePrivacy: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  title?: string;
  subtitle?: string;
  onOpenFeeInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isPrivate,
  onTogglePrivacy,
  theme,
  onToggleTheme,
  title,
  subtitle,
  onOpenFeeInfo,
}) => {
  return (
    <header className="sticky top-0 z-30 px-5 pt-3 pb-3 backdrop-blur-md transition-colors border-b dark:bg-stone-950/80 dark:border-stone-850 dark:border-stone-800/80 bg-stone-50/85 border-stone-200">
      <div className="flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cinnamon-600 flex items-center justify-center text-white font-serif font-semibold text-base shadow-sm">
            C
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-stone-900 dark:text-stone-100">
                Cinnamon
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                · ISA
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              {PORTFOLIO_SUMMARY.userProfile.name}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Privacy button */}
          <button
            onClick={onTogglePrivacy}
            title={isPrivate ? "Show balances" : "Hide balances"}
            aria-label="Toggle balance visibility"
            className="p-2 rounded-xl transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            {isPrivate ? (
              <EyeOff className="w-4 h-4 text-cinnamon-600 dark:text-cinnamon-400" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Avatar / Profile initial */}
          <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-xs flex items-center justify-center ml-1">
            AW
          </div>
        </div>
      </div>

      {title && (
        <div className="mt-3 pt-1 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
                {title}
              </h1>
              {title === 'Fees' && onOpenFeeInfo && (
                <button
                  onClick={onOpenFeeInfo}
                  title="View fee percentages & UK tax rules"
                  aria-label="Fee and tax rules info"
                  className="p-1 rounded-full text-stone-400 hover:text-cinnamon-600 dark:hover:text-cinnamon-400 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {title === 'Fees' && onOpenFeeInfo && (
            <button
              onClick={onOpenFeeInfo}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 transition-colors shrink-0"
            >
              <Info className="w-3 h-3 text-cinnamon-600 dark:text-cinnamon-400" />
              <span>Tax & rules</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
