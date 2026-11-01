import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import knowledgeData from '../../data/cinnamon_knowledge_base.json';
import { FinancialConcept } from '../../types';
import { ConceptDetailModal } from './ConceptDetailModal';

interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  categories: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 'fundamentals',
    number: 1,
    title: 'Fundamentals of Investing',
    description: 'Compounding, real returns, purchasing power, and growth calculations.',
    categories: ['Fundamentals of Finance', 'Financial Calculations'],
  },
  {
    id: 'inflation-rates',
    number: 2,
    title: 'Inflation & Interest Rates',
    description: 'How rising price levels erode cash and how central bank rates respond.',
    categories: ['Inflation and Interest Rates'],
  },
  {
    id: 'bonds-gilts',
    number: 3,
    title: 'UK Gilts & Fixed Income',
    description: 'Sovereign gilts, corporate debt, coupons, yields, and duration sensitivity.',
    categories: ['Bonds and Fixed Income'],
  },
  {
    id: 'stocks-valuation',
    number: 4,
    title: 'Stocks & Company Valuation',
    description: 'Equity ownership, market capitalisation, price-to-earnings, and valuation models.',
    categories: ['Stocks and Equity Markets'],
  },
  {
    id: 'funds-etfs',
    number: 5,
    title: 'Index Funds & ETFs',
    description: 'Passive index tracking, exchange traded funds, and expense ratios.',
    categories: ['Mutual Funds and ETFs'],
  },
  {
    id: 'risk-protection',
    number: 6,
    title: 'Risk & Capital Protection',
    description: 'Diversification, managing drawdowns, volatility, correlation, and beta.',
    categories: ['Risk and Diversification'],
  },
  {
    id: 'portfolio-management',
    number: 7,
    title: 'Portfolio Architecture',
    description: 'Asset allocation, rebalancing rules, and strategic weighting.',
    categories: ['Portfolio Management'],
  },
  {
    id: 'macro-central-banks',
    number: 8,
    title: 'Central Banks & Macroeconomics',
    description: 'Monetary policy, quantitative easing, GDP, and national fiscal health.',
    categories: ['Banking and Monetary Policy', 'Macroeconomics'],
  },
];

export const KnowledgeView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>('fundamentals');
  const [selectedConcept, setSelectedConcept] = useState<FinancialConcept | null>(null);

  const concepts: FinancialConcept[] = (knowledgeData.concepts || []) as FinancialConcept[];

  const getChapterConcepts = (chapter: Chapter) => {
    return concepts.filter((c) => chapter.categories.includes(c.category));
  };

  // Search filtering across all concepts
  const searchResults = searchTerm.trim()
    ? concepts.filter((c) => {
        const query = searchTerm.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.tagline.toLowerCase().includes(query) ||
          c.beginnerDef.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectConceptById = (id: string) => {
    const found = concepts.find((c) => c.id === id);
    if (found) {
      setSelectedConcept(found);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Intro Header */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <span className="text-xs font-bold uppercase tracking-wider text-cinnamon-700 dark:text-cinnamon-400">
          Knowledge Base
        </span>
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 mt-0.5">
          Investing Chapters
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
          Select a chapter below to explore its modules in plain British English without market jargon.
        </p>
      </section>

      {/* Live Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search all 30 investing topics..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-cinnamon-500 transition-colors shadow-subtle"
        />
      </div>

      {/* When Searching: Show Search Results Directly */}
      {searchTerm.trim() ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs text-stone-500 dark:text-stone-400">
            <span>Search Results ({searchResults.length})</span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-cinnamon-600 dark:text-cinnamon-400 hover:underline"
            >
              Clear search
            </button>
          </div>

          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle divide-y divide-stone-100 dark:divide-stone-800/80 overflow-hidden">
            {searchResults.map((concept) => (
              <div
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className="p-4 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-cinnamon-600 dark:group-hover:text-cinnamon-400 transition-colors">
                      {concept.name}
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {concept.tagline}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-3 mt-1" />
                </div>
              </div>
            ))}
            {searchResults.length === 0 && (
              <div className="p-8 text-center text-xs text-stone-500 dark:text-stone-400">
                No topics matched your search.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* When Not Searching: Structured Chapter List */
        <div className="space-y-3">
          <div className="px-1 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Chapters ({CHAPTERS.length})
          </div>

          <div className="space-y-2.5">
            {CHAPTERS.map((chapter) => {
              const isSelected = selectedChapterId === chapter.id;
              const chapterConcepts = getChapterConcepts(chapter);

              return (
                <div
                  key={chapter.id}
                  className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle overflow-hidden transition-all"
                >
                  {/* Chapter Header Button */}
                  <div
                    onClick={() =>
                      setSelectedChapterId(isSelected ? null : chapter.id)
                    }
                    className="p-4 cursor-pointer flex items-start justify-between hover:bg-stone-50/80 dark:hover:bg-stone-850/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-cinnamon-600 dark:text-cinnamon-400">
                          Chapter {chapter.number}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          · {chapterConcepts.length} {chapterConcepts.length === 1 ? 'module' : 'modules'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="p-1 rounded-full text-stone-400 shrink-0 ml-2 mt-1">
                      {isSelected ? (
                        <ChevronDown className="w-4 h-4 text-cinnamon-600 dark:text-cinnamon-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Modules Inside This Chapter */}
                  {isSelected && (
                    <div className="border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/40 divide-y divide-stone-100 dark:divide-stone-800/60">
                      {chapterConcepts.map((concept) => (
                        <div
                          key={concept.id}
                          onClick={() => setSelectedConcept(concept)}
                          className="p-4 pl-5 hover:bg-stone-100/70 dark:hover:bg-stone-850 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-cinnamon-600 dark:group-hover:text-cinnamon-400 transition-colors">
                                {concept.name}
                              </h5>
                              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                                {concept.tagline}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-3 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Concept Breakdown Sheet */}
      <ConceptDetailModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
        onSelectConceptById={handleSelectConceptById}
        allConcepts={concepts}
      />
    </div>
  );
};
