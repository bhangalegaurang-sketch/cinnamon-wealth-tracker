import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Compass,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Shield,
  Layers,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import knowledgeData from '../../data/cinnamon_knowledge_base.json';
import { FinancialConcept, LearningPathway } from '../../types';
import { ConceptDetailModal } from './ConceptDetailModal';

export const KnowledgeView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [activePathwayId, setActivePathwayId] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<FinancialConcept | null>(null);

  const concepts: FinancialConcept[] = (knowledgeData.concepts || []) as FinancialConcept[];
  const pathways: LearningPathway[] = (knowledgeData.learningPathways || []) as LearningPathway[];
  const categories = ['ALL', ...Array.from(new Set(concepts.map((c) => c.category)))];

  // Filtering
  const filteredConcepts = concepts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.beginnerDef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'ALL' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleSelectConceptById = (id: string) => {
    const found = concepts.find((c) => c.id === id);
    if (found) {
      setSelectedConcept(found);
    }
  };

  const activePathway = pathways.find((p) => p.id === activePathwayId) || null;

  return (
    <div className="space-y-4 pb-24">
      {/* Intro Summary Banner */}
      <section className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-cinnamon-600 dark:text-cinnamon-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-cinnamon-700 dark:text-cinnamon-400">
            Financial Foundations
          </span>
        </div>
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
          30 Curated Concepts for Long-Term Wealth
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
          From gilts, duration, and inflation mathematics to portfolio drawdowns and equity valuation multiples — written in plain British English without jargon.
        </p>
      </section>

      {/* Guided Learning Pathways Carousel */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Guided Learning Pathways
          </h4>
          <span className="text-[11px] text-stone-400 font-mono">
            {pathways.length} curriculums
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {pathways.map((pw) => {
            const isActive = activePathwayId === pw.id;
            return (
              <div
                key={pw.id}
                onClick={() => setActivePathwayId(isActive ? null : pw.id)}
                className={`min-w-[240px] max-w-[260px] p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between shrink-0 ${
                  isActive
                    ? 'bg-cinnamon-50/90 dark:bg-cinnamon-950/30 border-cinnamon-300 dark:border-cinnamon-800 shadow-sm'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1 font-mono">
                    <span>{pw.steps.length} steps</span>
                    <span>{pw.estimatedMinutes} mins</span>
                  </div>
                  <h5 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                    {pw.title}
                  </h5>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {pw.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-cinnamon-600 dark:text-cinnamon-400 font-medium">
                  <span>{isActive ? 'Hide pathway' : 'Explore steps'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expanded Pathway Step-by-Step Viewer */}
      {activePathway && (
        <section className="p-5 rounded-3xl bg-cinnamon-50/70 dark:bg-cinnamon-950/20 border border-cinnamon-200 dark:border-cinnamon-900/40 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cinnamon-700 dark:text-cinnamon-400">
                Active Pathway
              </span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {activePathway.title}
              </h4>
            </div>
            <button
              onClick={() => setActivePathwayId(null)}
              className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300">
            {activePathway.description}
          </p>

          <div className="space-y-2 pt-1">
            {activePathway.steps.map((st) => (
              <div
                key={st.stepNumber}
                onClick={() => handleSelectConceptById(st.conceptId)}
                className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-cinnamon-400 cursor-pointer transition-colors flex items-start gap-3 group"
              >
                <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {st.stepNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-cinnamon-600 dark:group-hover:text-cinnamon-400 transition-colors">
                      {st.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {st.summary}
                  </p>
                  {st.numericalInsight && (
                    <span className="text-[10px] text-cinnamon-600 dark:text-cinnamon-400 block mt-1 font-mono">
                      {st.numericalInsight}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search 30 financial concepts (e.g. Gilts, YTM, PE ratio)..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-cinnamon-500 transition-colors shadow-subtle"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {cat === 'ALL' ? 'All categories' : cat}
          </button>
        ))}
      </div>

      {/* Difficulty Filter Chips */}
      <div className="flex items-center justify-between px-1 text-xs text-stone-500 dark:text-stone-400">
        <span>Filter level:</span>
        <div className="flex items-center gap-1">
          {(['ALL', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Concepts List */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-subtle divide-y divide-stone-100 dark:divide-stone-800/80 overflow-hidden">
        {filteredConcepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConcept(concept)}
            className="p-4 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-cinnamon-600 dark:group-hover:text-cinnamon-400 transition-colors">
                    {concept.name}
                  </h5>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-medium ${
                      concept.difficulty === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : concept.difficulty === 'Intermediate'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {concept.difficulty}
                  </span>
                </div>
                <span className="text-[11px] text-cinnamon-700 dark:text-cinnamon-400 block mt-0.5 font-medium">
                  {concept.category}
                </span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {concept.tagline}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <div className="p-8 text-center text-xs text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          No concepts match your search.
        </div>
      )}

      {/* Selected Concept Detail Modal */}
      <ConceptDetailModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
        onSelectConceptById={handleSelectConceptById}
        allConcepts={concepts}
      />
    </div>
  );
};
