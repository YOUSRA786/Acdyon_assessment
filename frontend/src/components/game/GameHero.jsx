import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { 
  Swords, Trophy, Star, BookOpen, Flame, Zap 
} from 'lucide-react';

export const GameHero = () => {
  const { userStats } = useShowcase();

  const scrollToSection = (id) => {
    if (id === 'game-hero' || !id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    const extraOffset = 16;
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + extraOffset);
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  };

  const scrollToMatch = () => {
    scrollToSection('match-section');
  };

  return (
    <section 
      id="game-hero" 
      className="relative flex flex-col justify-center scroll-mt-28 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-14 sm:pt-10 sm:pb-18"
    >
      {/* 2-Column Wide Coherent Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center w-full relative z-10">
        
        {/* Left Column (Cohesive vertical flex block occupying full 50% width) */}
        <div className="w-full flex flex-col items-start gap-6 text-left">
          
          {/* Headline Block (Expansive, tight line-height 0.88, connected punch) */}
          <div className="w-full select-none animate-float-slow">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black font-sans tracking-tight leading-[0.88] uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-violet-500 drop-shadow-sm space-y-0">
              <span className="block">RISE</span>
              <span className="block">THROUGH</span>
              <span className="block">CODE.</span>
            </h1>
          </div>

          {/* Description (Readable max-width) */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-sans font-medium">
            Turn challenges into victories. Solve problems, compete in live brawls, and ascend the leaderboard in the ultimate multiplayer coding arena.
          </p>

          {/* Action CTAs (Same height, shared horizontal baseline) */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={scrollToMatch}
              className="h-13 flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Start Brawling →</span>
            </button>

            <button
              onClick={() => scrollToSection('challenges-section')}
              className="h-13 flex items-center px-7 py-3.5 rounded-2xl border font-mono font-bold text-xs uppercase tracking-wider dark:bg-white/5 dark:border-white/15 dark:text-white dark:hover:bg-white/15 dark:hover:text-white bg-white border-slate-300 hover:bg-slate-100 hover:text-slate-950 text-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all cursor-pointer"
            >
              Explore Missions
            </button>
          </div>

          {/* Arena Ascension Path (4 Interactive Action Buttons spanning full left column width) */}
          <div className="w-full pt-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5">
              // ARENA ASCENSION PATH
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {/* Step 1: Challenges */}
              <button
                onClick={() => scrollToSection('challenges-section')}
                className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 dark:hover:border-pink-500/50 bg-white/90 border-slate-200 shadow-[0_8px_20px_rgba(236,72,153,0.12)] space-y-1.5 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                title="Jump to Missions & Challenges"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-500 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <p className="font-mono font-black text-xs uppercase text-slate-900 dark:text-white group-hover:text-pink-500 transition-colors">
                  Challenges
                </p>
              </button>

              {/* Step 2: Live Brawl */}
              <button
                onClick={() => scrollToSection('arena-stage')}
                className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 dark:hover:border-cyan-500/50 bg-white/90 border-slate-200 shadow-[0_8px_20px_rgba(6,182,212,0.12)] space-y-1.5 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                title="Jump to Live Duel Arena"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                  <Swords className="w-3.5 h-3.5" />
                </div>
                <p className="font-mono font-black text-xs uppercase text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  Live Brawl
                </p>
              </button>

              {/* Step 3: Rank Up */}
              <button
                onClick={() => scrollToSection('match-section')}
                className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 dark:hover:border-violet-500/50 bg-white/90 border-slate-200 shadow-[0_8px_20px_rgba(139,92,246,0.12)] space-y-1.5 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                title="Jump to 1v1 Matchmaking"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                  <Star className="w-3.5 h-3.5" />
                </div>
                <p className="font-mono font-black text-xs uppercase text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                  Rank Up
                </p>
              </button>

              {/* Step 4: Dominate */}
              <button
                onClick={() => scrollToSection('rankings-section')}
                className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 dark:hover:border-amber-500/50 bg-white/90 border-slate-200 shadow-[0_8px_20px_rgba(245,158,11,0.12)] space-y-1.5 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                title="Jump to Ascension Leaderboard"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <p className="font-mono font-black text-xs uppercase text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  Dominate
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Full 50% width unified product console and matching stats */}
        <div className="w-full flex flex-col gap-4 relative">
          
          {/* Main Code Preview Console (Full Right Column Width) */}
          <div className="w-full rounded-3xl border dark:border-cyan-500/30 border-slate-300 dark:bg-[#0c101c] bg-slate-900 text-white shadow-[0_20px_50px_rgba(139,92,246,0.18)] dark:shadow-[0_20px_50px_rgba(6,182,212,0.15)] p-6 space-y-4 ring-1 ring-cyan-500/20">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-bold text-cyan-400 pl-1 text-xs">live_arena.py</span>
              </div>
              <span className="text-pink-400 font-bold flex items-center gap-1 text-xs">
                <Flame className="w-3.5 h-3.5 fill-current" />
                DUEL ACTIVE
              </span>
            </div>

            {/* Code Snippet */}
            <pre className="font-mono text-xs sm:text-[13px] text-emerald-300 bg-black/60 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800">
              <code>{`def two_sum_duel(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target:
            return [left + 1, right + 1]
        elif curr < target: left += 1
        else: right -= 1`}</code>
            </pre>

            {/* Opponent Progress & Timer */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-left">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">OPPONENT TIME</span>
                <span className="text-base font-black text-pink-400 tabular-nums">00:01:25</span>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-left">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">YOUR PROGRESS</span>
                <span className="text-base font-black text-cyan-400">82% (Case 3/3)</span>
              </div>
            </div>
          </div>

          {/* 3 Statistic Badges Matching Exact Console Width */}
          <div className="w-full grid grid-cols-3 gap-3.5 font-mono text-xs">
            <div className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 bg-white/90 border-slate-200 shadow-[0_6px_20px_rgba(6,182,212,0.12)] text-center space-y-1">
              <Zap className="w-4 h-4 text-cyan-500 mx-auto" />
              <span className="font-black text-base text-slate-900 dark:text-white block">15 Active</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Live Brawls</span>
            </div>

            <div className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 bg-white/90 border-slate-200 shadow-[0_6px_20px_rgba(245,158,11,0.12)] text-center space-y-1">
              <Trophy className="w-4 h-4 text-amber-500 mx-auto" />
              <span className="font-black text-base text-slate-900 dark:text-white block">{userStats.elo}</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Peak ELO</span>
            </div>

            <div className="p-3.5 rounded-2xl border dark:bg-[#121826]/90 dark:border-white/10 bg-white/90 border-slate-200 shadow-[0_6px_20px_rgba(236,72,153,0.12)] text-center space-y-1">
              <Flame className="w-4 h-4 text-pink-500 mx-auto" />
              <span className="font-black text-base text-slate-900 dark:text-white block">120+</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Missions</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GameHero;
