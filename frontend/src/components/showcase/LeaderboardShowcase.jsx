import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { LEADERBOARD_USERS } from '../../data/showcaseData';
import { Trophy, ArrowRight, Flame, ChevronRight } from 'lucide-react';
import PlayerDossierDrawer from './PlayerDossierDrawer';

export const LeaderboardShowcase = () => {
  const { openPlayerDossier, userStats } = useShowcase();
  const [showFullLadder, setShowFullLadder] = useState(false);

  // Top 3 Featured Podium Contenders
  const topThree = LEADERBOARD_USERS.slice(0, 3);
  const remainingContenders = LEADERBOARD_USERS.slice(3);

  return (
    <section id="leaderboard-showcase" className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32 border-t dark:border-white/[0.06] border-slate-100">
      {/* Editorial Section Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
            Competitive Ladder
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-950 dark:text-white">
            Global rankings.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Real-time ELO distribution across competitive divisions. Every match shifts ratings and adjusts global standings.
          </p>
        </div>

        <button
          onClick={() => setShowFullLadder(!showFullLadder)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors self-start md:self-auto cursor-pointer
            dark:border-white/10 dark:hover:bg-white/[0.04]
            border-slate-200 hover:bg-slate-50"
        >
          {showFullLadder ? 'Collapse Standings' : 'View Full Rankings Ladder'}
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showFullLadder ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Dramatic Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {topThree.map((player) => {
          const isFirst = player.rank === 1;

          return (
            <div
              key={player.rank}
              onClick={() => openPlayerDossier(player)}
              className={`rounded-2xl border p-7 transition-all duration-300 cursor-pointer group relative overflow-hidden
                ${isFirst 
                  ? 'md:-translate-y-4 dark:bg-[#0f121a] dark:border-white/20 bg-white border-slate-300 shadow-xl ring-1 dark:ring-white/10 ring-slate-200' 
                  : 'dark:bg-[#0c0e14] dark:border-white/[0.08] bg-white border-slate-200/80 shadow-md'
                }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                  player.rank === 1 ? 'bg-amber-500/15 text-amber-500' :
                  player.rank === 2 ? 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400' :
                  'bg-amber-700/15 text-amber-700 dark:text-amber-500'
                }`}>
                  #{player.rank}
                </span>

                <span className="text-xs font-mono font-semibold text-slate-400">
                  {player.division}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-3xl">{player.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-slate-950 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{player.handle}</p>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-white/[0.06] border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Rating</span>
                  <span className="font-bold text-slate-950 dark:text-white text-sm">{player.elo} ELO</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Win Rate</span>
                  <span className="font-semibold text-emerald-500">{player.winRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Full Ladder (Progressive Disclosure) */}
      {showFullLadder && (
        <div className="mt-8 rounded-2xl border dark:border-white/[0.08] border-slate-200 overflow-hidden dark:bg-[#0c0e14] bg-white animate-in fade-in duration-200">
          <div className="divide-y dark:divide-white/[0.06] divide-slate-100">
            {remainingContenders.map((player) => {
              const isUser = player.handle === '@alex_dev';
              const currentElo = isUser ? userStats.elo : player.elo;

              return (
                <div
                  key={player.rank}
                  onClick={() => openPlayerDossier(player)}
                  className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-400 font-semibold w-6">#{player.rank}</span>
                    <span className="text-xl">{player.avatar}</span>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block text-sm">
                        {player.name} {isUser && <span className="text-cyan-500 text-xs font-mono">(You)</span>}
                      </span>
                      <span className="text-slate-400 text-xs">{player.handle} • {player.division}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs">
                    <span className="hidden sm:inline text-emerald-500 font-semibold">{player.winRate} Win</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentElo} ELO</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slide-over Dossier Drawer */}
      <PlayerDossierDrawer />
    </section>
  );
};

export default LeaderboardShowcase;
