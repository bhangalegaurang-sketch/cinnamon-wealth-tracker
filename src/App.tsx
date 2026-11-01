import React, { useState, useEffect } from 'react';
import { MobileAppShell } from './components/layout/MobileAppShell';
import { UnifiedDashboard } from './components/dashboard/UnifiedDashboard';
import { HoldingsList } from './components/holdings/HoldingsList';
import { AssetAllocationView } from './components/allocation/AssetAllocationView';
import { TransparentFeesView } from './components/fees/TransparentFeesView';
import { KnowledgeView } from './components/learn/KnowledgeView';
import { HoldingDetailModal } from './components/common/HoldingDetailModal';
import { FeeTaxInfoModal } from './components/fees/FeeTaxInfoModal';
import { ActiveTab, Holding } from './types';
import { MOCK_HOLDINGS } from './data/mockPortfolio';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isFeeInfoOpen, setIsFeeInfoOpen] = useState<boolean>(false);

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
      onOpenFeeInfo={() => setIsFeeInfoOpen(true)}
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
        <TransparentFeesView
          isPrivate={isPrivate}
          onOpenFeeInfo={() => setIsFeeInfoOpen(true)}
        />
      )}

      {activeTab === 'learn' && (
        <KnowledgeView />
      )}

      {/* Holding Detail Sheet */}
      <HoldingDetailModal
        holding={selectedHolding}
        onClose={() => setSelectedHolding(null)}
        isPrivate={isPrivate}
      />

      {/* Fee Rules & UK Tax Wrappers Info Modal */}
      <FeeTaxInfoModal
        isOpen={isFeeInfoOpen}
        onClose={() => setIsFeeInfoOpen(false)}
      />
    </MobileAppShell>
  );
};

export default App;
