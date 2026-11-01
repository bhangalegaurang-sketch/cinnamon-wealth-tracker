import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  FileText,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { FinancialConcept } from '../../types';

interface ConceptDetailModalProps {
  concept: FinancialConcept | null;
  onClose: () => void;
  onSelectConceptById: (id: string) => void;
  allConcepts: FinancialConcept[];
}

export const ConceptDetailModal: React.FC<ConceptDetailModalProps> = ({
  concept,
  onClose,
  onSelectConceptById,
  allConcepts,
}) => {
  const [activeTier, setActiveTier] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  if (!concept) return null;

  const getTierDefinition = () => {
    switch (activeTier) {
      case 'beginner':
        return concept.beginnerDef;
      case 'intermediate':
        return concept.intermediateDef;
      case 'advanced':
        return concept.advancedDef;
    }
  };

  const relatedConcepts = (concept.relatedConceptIds || [])
    .map((id) => allConcepts.find((c) => c.id === id))
    .filter(Boolean) as FinancialConcept[];

  const nextConcept = concept.suggestedNextConceptId
    ? allConcepts.find((c) => c.id === concept.suggestedNextConceptId)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 border-t sm:border border-stone-200 dark:border-stone-800 rounded-t-3xl sm:rounded-3xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag bar */}
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-5 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <span className="text-cinnamon-600 dark:text-cinnamon-400 font-semibold">
                {concept.category}
              </span>
              <span>·</span>
              <span className="font-mono text-[11px] text-stone-400">
                {concept.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mt-0.5">
              {concept.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Tagline */}
          <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed italic">
            "{concept.tagline}"
          </p>

          {/* Tier Switcher (Beginner / Intermediate / Advanced) */}
          <div className="p-1 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 flex items-center text-xs">
            {(['beginner', 'intermediate', 'advanced'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-medium capitalize transition-all ${
                  activeTier === tier
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Main Definition Card */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80">
            <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              {activeTier} Definition
            </span>
            <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
              {getTierDefinition()}
            </p>
          </div>

          {/* Why It Matters */}
          {concept.whyItMatters && (
            <div className="p-3.5 rounded-2xl bg-cinnamon-50/70 dark:bg-cinnamon-950/20 border border-cinnamon-200/70 dark:border-cinnamon-900/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cinnamon-800 dark:text-cinnamon-300 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-cinnamon-600 dark:text-cinnamon-400" />
                <span>Why it matters to your wealth</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {concept.whyItMatters}
              </p>
            </div>
          )}

          {/* How It Works */}
          {concept.howItWorks && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                How it works in practice
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {concept.howItWorks}
              </p>
            </div>
          )}

          {/* Practical Sterling Example */}
          {concept.practicalExample && (
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                Sterling Example (£)
              </span>
              <p className="text-xs font-mono text-stone-800 dark:text-stone-200 leading-relaxed">
                {concept.practicalExample}
              </p>
            </div>
          )}

          {/* Real World UK Application */}
          {concept.realWorldApplication && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400">
                UK Market Application
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {concept.realWorldApplication}
              </p>
            </div>
          )}

          {/* Common Misconceptions */}
          {concept.commonMisconceptions && concept.commonMisconceptions.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Common misconceptions</span>
              </span>
              <div className="space-y-1.5">
                {concept.commonMisconceptions.map((mis, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 text-xs text-stone-700 dark:text-stone-300 leading-relaxed"
                  >
                    {mis}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formula (if applicable) */}
          {concept.formula && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-1">
              <span className="text-[10px] uppercase font-mono font-semibold text-stone-500">
                Formula
              </span>
              <div className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
                {concept.formula}
              </div>
              {concept.formulaExplanation && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {concept.formulaExplanation}
                </p>
              )}
            </div>
          )}

          {/* Related Concepts */}
          {relatedConcepts.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Related concepts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {relatedConcepts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectConceptById(rel.id)}
                    className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
                  >
                    {rel.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Next in Pathway */}
          {nextConcept && (
            <div
              onClick={() => onSelectConceptById(nextConcept.id)}
              className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-850 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 cursor-pointer transition-colors flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-cinnamon-600 dark:text-cinnamon-400 block">
                  Suggested next step
                </span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {nextConcept.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
