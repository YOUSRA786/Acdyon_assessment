import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { X, Play, Clock, Trophy, Sparkles, CheckCircle2, ChevronRight, HelpCircle, ArrowUpRight } from 'lucide-react';

export const ProblemDrawer = () => {
  const { activeDrawer, closeAllDrawers, drawerData, setActiveProblem } = useShowcase();
  const [showHint, setShowHint] = useState(false);

  if (activeDrawer !== 'problem' || !drawerData) return null;

  const problem = drawerData;

  const handleLaunchDuel = () => {
    setActiveProblem(problem, true);
    closeAllDrawers();
  };

  const getDifficultyBadge = (diff) => {
    if (diff === 'Easy') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    if (diff === 'Medium') return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeAllDrawers}
    >
      <div 
        className="w-full max-w-xl h-full flex flex-col border-l shadow-2xl transition-all duration-300
          dark:bg-[#0d1017] dark:border-white/10 dark:text-slate-100
          bg-white border-slate-200 text-slate-900 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b dark:border-white/10 border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-400">
                {problem.category}
              </span>
            </div>
            <h2 className="text-xl font-bold font-sans tracking-tight">{problem.title}</h2>
          </div>
          <button 
            onClick={closeAllDrawers}
            className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-3 gap-3 px-6 py-3 border-b dark:border-white/5 border-slate-100 bg-slate-50/50 dark:bg-black/20 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">XP REWARD</span>
              <span className="font-bold text-amber-500 dark:text-amber-400">+{problem.xpReward} XP</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">AVG TIME</span>
              <span className="font-bold">{problem.avgTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">ACCEPTANCE</span>
              <span className="font-bold">{problem.acceptanceRate}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Problem Statement */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed font-sans">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
            <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 space-y-2">
              {problem.description}
            </div>
          </div>

          {/* Examples */}
          {problem.examples && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">Example Test Cases</h3>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="p-3.5 rounded-xl border font-mono text-xs dark:bg-black/30 dark:border-white/10 bg-slate-50 border-slate-200">
                    <p className="text-slate-500 mb-1 font-bold">Example {i + 1}:</p>
                    <p className="text-slate-700 dark:text-slate-300"><span className="text-cyan-600 dark:text-cyan-400 font-semibold">Input:</span> {ex.input}</p>
                    <p className="text-slate-700 dark:text-slate-300 mt-1"><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Output:</span> {ex.output}</p>
                    {ex.explanation && (
                      <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] italic font-sans">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Algorithmic Hint */}
          {problem.hint && (
            <div className="border dark:border-white/10 border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full flex items-center justify-between p-3 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  {showHint ? 'Hide Algorithmic Hint' : 'Reveal Algorithmic Hint'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showHint ? 'rotate-90' : ''}`} />
              </button>
              {showHint && (
                <div className="p-3.5 text-xs text-slate-600 dark:text-slate-300 bg-cyan-500/5 border-t dark:border-white/10 border-slate-200">
                  {problem.hint}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t dark:border-white/10 border-slate-200 flex gap-3 bg-slate-50 dark:bg-[#090b10]">
          <button
            onClick={closeAllDrawers}
            className="px-4 py-2.5 rounded-xl border dark:border-white/10 border-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleLaunchDuel}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg
              dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950
              bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch in Live Arena
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDrawer;
