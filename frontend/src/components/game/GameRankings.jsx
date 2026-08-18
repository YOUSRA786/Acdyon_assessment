import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { LEADERBOARD_USERS } from '../../data/showcaseData';
import PlayerDossierDrawer from '../showcase/PlayerDossierDrawer';
import { Trophy, Flame, ChevronDown, Swords, Star, Crown } from 'lucide-react';

export const GameRankings = () => {
  const { openPlayerDossier, userStats } = useShowcase();
  const [showFullLadder, setShowFullLadder] = useState(false);

  const topThree = LEADERBOARD_USERS.slice(0, 3);
  const remaining = LEADERBOARD_USERS.slice(3);

  return (
    <section id="rankings-section" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20">
      {/* State Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-6">
        <span>STATE: GLOBAL_RANKINGS // ASCENSION LADDER</span>
        <span className="text-cyan-400 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5" />
          SEASON 04 ACTIVE
        </span>
      </div>

      {/* Main Ranking Canvas */}
      <div className="rounded-3xl border dark:border-amber-500/30 border-slate-300 dark:bg-[#0e1220] bg-white text-slate-900 dark:text-white shadow-2xl p-6 sm:p-10 space-y-8">
        {/* Intro */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b dark:border-white/10 border-slate-200 pb-6 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight uppercase italic text-slate-950 dark:text-white">
              Arena Leaderboard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              Top gladiators competing in real-time algorithmic brawls.
            </p>
          </div>

          {/* Your Player Capsule in the Leaderboard */}
          <div className="p-3.5 rounded-2xl border dark:bg-cyan-950/30 dark:border-cyan-500/40 bg-cyan-50 border-cyan-200 flex items-center gap-3 font-mono text-xs shadow-sm">
            <span className="text-2xl">👨‍💻</span>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block">YOU (DEV_ROOT)</span>
              <span className="font-black text-cyan-600 dark:text-cyan-400">#{userStats.rank} • {userStats.elo} ELO</span>
            </div>
            <span className="text-xs font-bold text-amber-500 flex items-center gap-1 pl-2 border-l dark:border-white/10 border-slate-300">
              <Flame className="w-3.5 h-3.5 fill-current" />
              {userStats.streak}W
            </span>
          </div>
        </div>

        {/* Podium Trio Cards (1st in center or top, 2nd, 3rd) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* #2 Contender */}
          <div 
            onClick={() => openPlayerDossier(topThree[1])}
            className="p-6 rounded-3xl border dark:bg-[#121828] dark:border-white/10 bg-slate-50 border-slate-200 text-center space-y-3 cursor-pointer hover:-translate-y-1 transition-all shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-white/10 font-black text-sm flex items-center justify-center mx-auto text-slate-700 dark:text-slate-200">
              #2
            </div>
            <span className="text-4xl block">{topThree[1].avatar}</span>
            <div>
              <h3 className="font-black text-base uppercase">{topThree[1].name}</h3>
              <p className="text-xs font-mono text-slate-400">{topThree[1].handle}</p>
            </div>
            <p className="font-black text-sm font-mono text-cyan-600 dark:text-cyan-400">{topThree[1].elo} ELO</p>
          </div>

          {/* #1 Champion (Grandmaster with Crown) */}
          <div 
            onClick={() => openPlayerDossier(topThree[0])}
            className="p-8 rounded-3xl border-2 border-amber-400 dark:bg-[#161e32] bg-amber-50/50 text-center space-y-4 cursor-pointer hover:-translate-y-2 transition-all shadow-2xl relative md:-translate-y-3 ring-2 ring-amber-400/30"
          >
            <Crown className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
            <span className="text-5xl block">{topThree[0].avatar}</span>
            <div>
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 inline-block mb-1">
                ARENA CHAMPION
              </span>
              <h3 className="font-black text-xl uppercase tracking-tight">{topThree[0].name}</h3>
              <p className="text-xs font-mono text-slate-400">{topThree[0].handle}</p>
            </div>
            <p className="font-black text-lg font-mono text-amber-500">{topThree[0].elo} ELO</p>
          </div>

          {/* #3 Contender */}
          <div 
            onClick={() => openPlayerDossier(topThree[2])}
            className="p-6 rounded-3xl border dark:bg-[#121828] dark:border-white/10 bg-slate-50 border-slate-200 text-center space-y-3 cursor-pointer hover:-translate-y-1 transition-all shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-600 font-black text-sm flex items-center justify-center mx-auto">
              #3
            </div>
            <span className="text-4xl block">{topThree[2].avatar}</span>
            <div>
              <h3 className="font-black text-base uppercase">{topThree[2].name}</h3>
              <p className="text-xs font-mono text-slate-400">{topThree[2].handle}</p>
            </div>
            <p className="font-black text-sm font-mono text-cyan-600 dark:text-cyan-400">{topThree[2].elo} ELO</p>
          </div>
        </div>

        {/* View Full Ladder Toggle with Clean Contrast Hover Styles */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowFullLadder(!showFullLadder)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border font-mono font-bold text-xs uppercase tracking-wider dark:bg-white/5 dark:border-white/15 dark:text-white dark:hover:bg-white/15 dark:hover:text-white bg-slate-100 border-slate-300 hover:bg-slate-200 hover:text-slate-950 text-slate-800 transition-all cursor-pointer"
          >
            <span>{showFullLadder ? 'Collapse Ladder' : 'View Full Rankings Ladder'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFullLadder ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Ladder Rows */}
        {showFullLadder && (
          <div className="rounded-2xl border dark:border-white/10 border-slate-200 overflow-hidden dark:bg-black/40 bg-slate-50 divide-y dark:divide-white/5 divide-slate-200 font-mono text-xs animate-in fade-in duration-200">
            {remaining.map((player) => (
              <div
                key={player.rank}
                onClick={() => openPlayerDossier(player)}
                className="p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-400 w-6">#{player.rank}</span>
                  <span className="text-2xl">{player.avatar}</span>
                  <div>
                    <span className="font-black text-sm block font-sans">{player.name}</span>
                    <span className="text-slate-400 text-xs">{player.handle} • {player.division}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-emerald-500 font-bold hidden sm:inline">{player.winRate}</span>
                  <span className="font-black text-sm text-cyan-600 dark:text-cyan-400">{player.elo} ELO</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Player Dossier Drawer */}
      <PlayerDossierDrawer />
    </section>
  );
};

export default GameRankings;
