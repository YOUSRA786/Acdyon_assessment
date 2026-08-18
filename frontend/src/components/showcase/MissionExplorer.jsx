import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { ArrowRight, Clock, Trophy, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const MissionExplorer = () => {
  const { problems, setActiveProblem, openProblemDrawer } = useShowcase();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeMission = problems[currentIndex] || problems[0];

  const handleStageMission = () => {
    setActiveProblem(activeMission, true);
    document.getElementById('arena-stage')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % problems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + problems.length) % problems.length);
  };

  return (
    <section id="mission-explorer" className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-36 hairline-t">
      {/* Editorial Section Coordinate Label */}
      <div className="flex items-center justify-between pb-6 hairline-b text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-12">
        <span>02 // MISSION ROSTER</span>
        <span>INDEX [ {currentIndex + 1} OF {problems.length} ]</span>
      </div>

      {/* Main Single Dominant Mission Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Dominant Problem Statement Canvas */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-zinc-100 border-zinc-200 uppercase font-bold text-zinc-800 dark:text-zinc-200">
              {activeMission.difficulty}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 tracking-wider">
              {activeMission.category}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-zinc-950 dark:text-white leading-[1.05]">
              {activeMission.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-sans">
              {activeMission.description.split('\n')[0]}
            </p>
          </div>

          {/* Mission Spec Telemetry */}
          <div className="grid grid-cols-3 gap-6 pt-4 hairline-t max-w-lg font-mono text-xs">
            <div>
              <span className="text-zinc-400 text-[11px] block">AVERAGE TIME</span>
              <span className="font-bold text-zinc-950 dark:text-white text-sm">{activeMission.avgTime}</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[11px] block">ACCEPTANCE</span>
              <span className="font-bold text-zinc-950 dark:text-white text-sm">{activeMission.acceptanceRate}</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[11px] block">REWARD</span>
              <span className="font-bold text-amber-500 text-sm">+{activeMission.xpReward} XP</span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleStageMission}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950
                bg-zinc-950 hover:bg-zinc-800 text-white"
            >
              Stage in Arena
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => openProblemDrawer(activeMission)}
              className="px-6 py-3.5 rounded-full border font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer
                dark:border-white/10 dark:hover:bg-white/[0.04]
                border-zinc-300 hover:bg-zinc-100"
            >
              Full Problem Specs
            </button>
          </div>
        </div>

        {/* Right Mission Scrubber Index */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span>SELECT MISSION</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev} 
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                aria-label="Previous challenge"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext} 
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                aria-label="Next challenge"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {problems.map((p, idx) => {
            const isSelected = idx === currentIndex;

            return (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer
                  ${isSelected
                    ? 'dark:bg-white dark:border-white dark:text-zinc-950 bg-zinc-950 border-zinc-950 text-white shadow-md'
                    : 'dark:border-white/[0.06] dark:hover:bg-white/[0.02] border-zinc-200 hover:bg-zinc-50 text-zinc-600 dark:text-zinc-400'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs opacity-60">
                    0{idx + 1}
                  </span>
                  <p className="text-xs font-semibold truncate font-sans">
                    {p.title}
                  </p>
                </div>

                <span className="text-[10px] opacity-70 shrink-0 pl-2">
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

export default MissionExplorer;
