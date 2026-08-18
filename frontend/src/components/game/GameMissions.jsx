import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { Swords, ArrowRight, Trophy, Clock, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

export const GameMissions = () => {
  const { problems, setActiveProblem, openProblemDrawer } = useShowcase();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeMission = problems[currentIndex] || problems[0];

  const handleEngage = () => {
    setActiveProblem(activeMission, true);
    const targetEl = document.getElementById('arena-stage');
    if (targetEl) {
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
      window.scrollTo({
        top: Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight),
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % problems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + problems.length) % problems.length);
  };

  return (
    <section id="challenges-section" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20">
      {/* State Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-violet-500 mb-6">
        <span>MISSION_ROSTER // SELECT LEVEL</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev} 
            className="p-1.5 rounded-lg border dark:border-white/10 dark:hover:bg-white/10 dark:text-white border-slate-300 hover:bg-slate-200 text-slate-800 cursor-pointer"
            aria-label="Previous Mission"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>LEVEL {currentIndex + 1} / {problems.length}</span>
          <button 
            onClick={handleNext} 
            className="p-1.5 rounded-lg border dark:border-white/10 dark:hover:bg-white/10 dark:text-white border-slate-300 hover:bg-slate-200 text-slate-800 cursor-pointer"
            aria-label="Next Mission"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dominant Mission Card */}
      <div className="rounded-3xl border dark:border-violet-500/30 border-slate-300 dark:bg-[#0e1222] bg-white text-slate-900 dark:text-white shadow-2xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
        {/* Mission Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-violet-500/20 text-violet-500 border border-violet-500/30">
              LEVEL 0{currentIndex + 1}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/15 text-amber-500 border border-amber-500/30">
              {activeMission.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-pink-500 font-bold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              +{activeMission.xpReward} XP BOUNTY
            </span>
          </div>
        </div>

        {/* Mission Headline & Description */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight uppercase italic text-slate-950 dark:text-white leading-[1.08]">
            {activeMission.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans font-medium">
            {activeMission.description.split('\n')[0]}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t dark:border-white/10 border-slate-200">
          <button
            onClick={handleEngage}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>Engage Brawl →</span>
          </button>

          <button
            onClick={() => openProblemDrawer(activeMission)}
            className="px-6 py-4 rounded-2xl border font-mono font-bold text-xs uppercase tracking-wider dark:bg-white/5 dark:border-white/15 dark:text-white dark:hover:bg-white/15 dark:hover:text-white bg-slate-100 border-slate-300 hover:bg-slate-200 hover:text-slate-950 text-slate-800 transition-all cursor-pointer"
          >
            View Mission Specs
          </button>
        </div>

        {/* Horizontal Mini Level Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4">
          {problems.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1
                ${idx === currentIndex
                  ? 'dark:bg-cyan-500/20 dark:border-cyan-500/50 bg-cyan-50 border-cyan-300 ring-1 ring-cyan-500/30'
                  : 'dark:bg-black/30 dark:border-white/5 bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
            >
              <span className="text-[10px] font-mono text-slate-400 block font-bold">LVL 0{idx + 1}</span>
              <p className="font-bold text-xs truncate font-sans text-slate-900 dark:text-white">
                {p.title.split(' ')[0]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameMissions;
