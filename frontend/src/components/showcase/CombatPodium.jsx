import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { LEADERBOARD_USERS } from '../../data/showcaseData';
import PlayerDossierDrawer from './PlayerDossierDrawer';
import { ChevronDown, ArrowRight, Flame } from 'lucide-react';

export const CombatPodium = () => {
  const { openPlayerDossier, userStats } = useShowcase();
  const [isExpanded, setIsExpanded] = useState(false);

  const topThree = LEADERBOARD_USERS.slice(0, 3);
  const remaining = LEADERBOARD_USERS.slice(3);

  return (
    <section id="combat-podium" className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-36 hairline-t">
      {/* Editorial Section Coordinate Label */}
      <div className="flex items-center justify-between pb-6 hairline-b text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-12">
        <span>03 // COMBAT HIERARCHY</span>
        <span>GLOBAL STANDINGS</span>
      </div>

      <div className="max-w-xl mb-12 space-y-3">
        <h2 className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-zinc-950 dark:text-white leading-[1.05]">
          The Podium.
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
          Top-ranked contenders across all divisions. Every live duel reshuffles ratings and updates the global hierarchy.
        </p>
      </div>

      {/* Dramatic Top 3 Typographic Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
        {topThree.map((player) => {
          const isChampion = player.rank === 1;

          return (
            <div
              key={player.rank}
              onClick={() => openPlayerDossier(player)}
              className={`p-8 rounded-3xl border transition-all duration-300 cursor-pointer group space-y-6
                ${isChampion
                  ? 'dark:bg-white dark:text-zinc-950 bg-zinc-950 text-white shadow-2xl scale-[1.02]'
                  : 'dark:bg-[#090b10] dark:border-white/[0.08] bg-white border-zinc-200 shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
            >
              {/* Huge Ranking Numeral */}
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-5xl sm:text-6xl tracking-tighter opacity-90">
                  0{player.rank}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                  {player.division}
                </span>
              </div>

              {/* Contender Name & Avatar */}
              <div className="space-y-1">
                <span className="text-3xl block mb-2">{player.avatar}</span>
                <h3 className="text-xl font-bold font-sans tracking-tight">
                  {player.name}
                </h3>
                <p className="text-xs font-mono opacity-60">
                  {player.handle} • {player.country}
                </p>
              </div>

              {/* Combat Specs */}
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="opacity-60 block text-[10px]">RATING</span>
                  <span className="font-bold text-base">{player.elo} ELO</span>
                </div>
                <div className="text-right">
                  <span className="opacity-60 block text-[10px]">WIN RATE</span>
                  <span className="font-bold text-base">{player.winRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progressive Expansion Trigger */}
      <div className="text-center pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer
            dark:border-white/10 dark:hover:bg-white/[0.04]
            border-zinc-300 hover:bg-zinc-100"
        >
          <span>{isExpanded ? 'Collapse Ladder' : 'Expand Full Rankings Ladder'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded Roster */}
      {isExpanded && (
        <div className="mt-8 rounded-2xl border dark:border-white/[0.08] border-zinc-200 overflow-hidden dark:bg-[#07080c] bg-white divide-y dark:divide-white/[0.06] divide-zinc-100 font-mono text-xs animate-in fade-in duration-200">
          {remaining.map((player) => {
            const isUser = player.handle === '@alex_dev';
            const currentElo = isUser ? userStats.elo : player.elo;

            return (
              <div
                key={player.rank}
                onClick={() => openPlayerDossier(player)}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 font-bold w-6">0{player.rank}</span>
                  <span className="text-xl">{player.avatar}</span>
                  <div>
                    <span className="font-bold text-zinc-950 dark:text-white block font-sans text-sm">
                      {player.name} {isUser && <span className="text-cyan-500 text-xs font-mono">(You)</span>}
                    </span>
                    <span className="text-zinc-400 text-xs">{player.handle} • {player.division}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-emerald-500 font-bold hidden sm:inline">{player.winRate}</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{currentElo} ELO</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slide-over Dossier Drawer */}
      <PlayerDossierDrawer />
    </section>
  );
};

export default CombatPodium;
