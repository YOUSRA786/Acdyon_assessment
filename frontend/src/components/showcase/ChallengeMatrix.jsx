import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { ArrowRight, Clock, Trophy, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export const ChallengeMatrix = () => {
  const { problems, setActiveProblem, openProblemDrawer } = useShowcase();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const featured = problems[selectedIndex] || problems[0];

  const handleLaunch = () => {
    setActiveProblem(featured, true);
  };

  return (
    <section id="challenges-showcase" className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32">
      {/* Editorial Section Intro */}
      <div className="max-w-xl mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
          Curated Challenges
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-950 dark:text-white">
          Choose your duel.
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          From binary partition trees to constant-space dynamic programming duels. Select any challenge to immediately stage the problem in the arena.
        </p>
      </div>

      {/* Asymmetric Challenge Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Dominant Challenge Card */}
        <div className="lg:col-span-7 rounded-2xl border p-8 sm:p-10 transition-all duration-300
          dark:bg-[#0c0e14] dark:border-white/[0.08] dark:text-white
          bg-white border-slate-200/90 text-slate-950 shadow-lg space-y-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              {featured.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md border dark:bg-white/[0.06] dark:border-white/10 bg-slate-100 border-slate-200">
              {featured.difficulty}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
              {featured.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-sans">
              {featured.description.split('\n')[0]}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t dark:border-white/[0.06] border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Avg Time</span>
              <span className="font-semibold text-slate-900 dark:text-white">{featured.avgTime}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Acceptance</span>
              <span className="font-semibold text-slate-900 dark:text-white">{featured.acceptanceRate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Reward</span>
              <span className="font-semibold text-amber-500">+{featured.xpReward} XP</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleLaunch}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-xs transition-all shadow-md cursor-pointer
                dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950
                bg-slate-950 hover:bg-slate-800 text-white"
            >
              Stage in Arena
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => openProblemDrawer(featured)}
              className="px-4 py-2.5 rounded-lg border text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer
                dark:border-white/10 dark:hover:bg-white/[0.04]
                border-slate-200 hover:bg-slate-50"
            >
              Read Specification
            </button>
          </div>
        </div>

        {/* Right Interactive Selection Index (01 .. 06) */}
        <div className="lg:col-span-5 space-y-2">
          {problems.map((p, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer
                  ${isSelected
                    ? 'dark:bg-white/[0.08] dark:border-white/20 bg-slate-100 border-slate-300 shadow-sm'
                    : 'dark:border-white/[0.04] dark:hover:bg-white/[0.02] border-slate-100 hover:bg-slate-50/80 text-slate-600 dark:text-slate-400'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-slate-400">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? 'text-slate-950 dark:text-white' : ''}`}>
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {p.category}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-mono shrink-0 pl-2">
                  {p.difficulty}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChallengeMatrix;
