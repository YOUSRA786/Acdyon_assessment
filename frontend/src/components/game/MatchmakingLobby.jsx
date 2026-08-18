import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { Swords, Play, RefreshCw, Zap, Clock, ShieldCheck, Flame } from 'lucide-react';

const RIVALS = [
  { name: 'BYTE_STORM', elo: 1820, avatar: '🤖', status: 'READY CHECK', time: '05:00' },
  { name: 'SHADOW_CORE', elo: 1940, avatar: '🥷', status: 'SYNCHRONIZED', time: '04:30' },
  { name: 'CYBER_VIPER', elo: 1790, avatar: '⚡', status: 'SEARCHING', time: '05:00' }
];

export const MatchmakingLobby = () => {
  const { activeProblem, userStats } = useShowcase();
  const [rivalIndex, setRivalIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const currentRival = RIVALS[rivalIndex];

  const handleFindRival = () => {
    setIsSearching(true);
    setTimeout(() => {
      setRivalIndex((prev) => (prev + 1) % RIVALS.length);
      setIsSearching(false);
    }, 800);
  };

  const handleStartMatch = () => {
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

  return (
    <section id="match-section" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20">
      {/* State Label */}
      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 mb-6">
        <span>STATE: DEMO_MATCH_FOUND // 1v1 SIMULATED DUEL LOBBY</span>
        <span className="text-pink-500 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 fill-current" />
          SIMULATED MATCH
        </span>
      </div>

      {/* Main 1v1 VS Card */}
      <div className="rounded-3xl border dark:border-cyan-500/30 border-slate-300 dark:bg-[#0d1220] bg-white text-slate-900 dark:text-white shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Match Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b dark:border-white/10 border-slate-200 pb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              DEMO MATCH LOBBY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight uppercase italic text-slate-950 dark:text-white">
              {activeProblem.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-4 py-2 rounded-xl dark:bg-white/5 dark:border-white/10 bg-slate-100 border-slate-200 border text-right">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">TIME LIMIT</span>
              <span className="text-base font-black text-cyan-600 dark:text-cyan-400 tabular-nums">05:00</span>
            </div>
          </div>
        </div>

        {/* 1v1 Contenders VS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
          {/* Left Player: YOU */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl border dark:bg-[#121828] dark:border-cyan-500/40 bg-cyan-50/50 border-cyan-300 text-center space-y-4 shadow-lg ring-1 ring-cyan-500/20">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-5xl shadow-[0_0_25px_rgba(6,182,212,0.5)] mx-auto">
                👨‍💻
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                ✓
              </span>
            </div>

            <div>
              <h3 className="font-black text-lg font-mono tracking-tight uppercase">
                YOU (PLAYER 01)
              </h3>
              <p className="text-xs font-mono font-bold text-emerald-500 mt-0.5">
                STATUS: READY (DEMO ELO: {userStats.elo})
              </p>
            </div>

            <button
              onClick={handleStartMatch}
              className="w-full py-3.5 px-6 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Match
            </button>
          </div>

          {/* Center VS Emblem */}
          <div className="md:col-span-1 flex items-center justify-center py-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center font-black text-sm text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] font-mono animate-pulse-glow">
              VS
            </div>
          </div>

          {/* Right Player: RIVAL */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl border dark:bg-[#121828] dark:border-pink-500/30 bg-pink-50/40 border-pink-200 text-center space-y-4 shadow-lg">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-5xl shadow-[0_0_25px_rgba(236,72,153,0.4)] mx-auto">
                {currentRival.avatar}
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg font-mono tracking-tight uppercase">
                {currentRival.name} (OPPONENT)
              </h3>
              <p className="text-xs font-mono font-bold text-pink-500 mt-0.5">
                STATUS: {isSearching ? 'SEARCHING...' : currentRival.status} ({currentRival.elo} DEMO ELO)
              </p>
            </div>

            <button
              onClick={handleFindRival}
              disabled={isSearching}
              className="w-full py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider dark:bg-white/10 dark:hover:bg-white/20 dark:text-white bg-slate-200 hover:bg-slate-300 hover:text-slate-950 text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
              <span>{isSearching ? 'Matching Rival...' : 'Rival Ready Check'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Live Duel Ticker */}
        <div className="p-3.5 rounded-2xl dark:bg-black/40 bg-slate-100 border dark:border-white/5 border-slate-200 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
            DEMO MATCH // YOU VS {currentRival.name}
          </span>
          <span className="font-black text-pink-500 tabular-nums">TIME: 03:24</span>
        </div>
      </div>
    </section>
  );
};

export default MatchmakingLobby;
