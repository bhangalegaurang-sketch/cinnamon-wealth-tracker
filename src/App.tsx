import React, { useState, useEffect } from 'react';
import { MobileAppShell } from './components/layout/MobileAppShell';
import { UnifiedDashboard } from './components/dashboard/UnifiedDashboard';
import { HoldingsList } from './components/holdings/HoldingsList';
import { AssetAllocationView } from './components/allocation/AssetAllocationView';
import { TransparentFeesView } from './components/fees/TransparentFeesView';
import { HoldingDetailModal } from './components/common/HoldingDetailModal';
import { ActiveTab, Holding } from './types';
import { MOCK_HOLDINGS } from './data/mockPortfolio';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const togglePrivacy = () => {
    setIsPrivate((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MobileAppShell
      activeTab={activeTab}
      onChangeTab={setActiveTab}
      holdingsCount={MOCK_HOLDINGS.length}
      isPrivate={isPrivate}
      onTogglePrivacy={togglePrivacy}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      {activeTab === 'dashboard' && (
        <UnifiedDashboard
          isPrivate={isPrivate}
          onNavigateTab={setActiveTab}
          onSelectHolding={setSelectedHolding}
        />
      )}

      {activeTab === 'holdings' && (
        <HoldingsList
          isPrivate={isPrivate}
          onSelectHolding={setSelectedHolding}
        />
      )}

      {activeTab === 'allocation' && (
        <AssetAllocationView isPrivate={isPrivate} />
      )}

      {activeTab === 'fees' && (
        <TransparentFeesView isPrivate={isPrivate} />
      )}

      {/* Holding Detail Sheet */}
      <HoldingDetailModal
        holding={selectedHolding}
        onClose={() => setSelectedHolding(null)}
        isPrivate={isPrivate}
      />
    </MobileAppShell>
  );
};

export default App;
