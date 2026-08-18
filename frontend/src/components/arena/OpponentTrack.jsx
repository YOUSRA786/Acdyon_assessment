import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { Users, Eye, Sparkles, Activity } from 'lucide-react';

export const OpponentTrack = () => {
  const { competitors, openPlayerDossier } = useShowcase();

  return (
    <div className="border-b dark:border-white/10 border-slate-200 p-3 sm:p-4 bg-slate-50/50 dark:bg-black/20">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider">Live Competitors (4/4 Connected)</span>
        </div>
        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          DUEL IN PROGRESS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {competitors.map((player) => {
          const isSelf = player.id === 'user-self';

          return (
            <button
              key={player.id}
              onClick={() => openPlayerDossier(player)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden
                ${isSelf 
                  ? 'dark:bg-cyan-950/30 dark:border-cyan-500/40 bg-cyan-50/60 border-cyan-300 ring-1 ring-cyan-500/20' 
                  : 'dark:bg-white/5 dark:border-white/10 bg-white border-slate-200 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              title="Click to view player dossier"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">{player.avatar}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate dark:text-slate-200 text-slate-800">
                        {player.name}
                      </span>
                      {isSelf && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500 text-slate-950 font-black">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">
                      {player.elo} ELO
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  player.rank === 1 
                    ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' 
                    : 'dark:bg-black/30 bg-slate-100 text-slate-400'
                }`}>
                  #{player.rank}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSelf 
                      ? 'bg-cyan-500' 
                      : player.rank === 1 
                        ? 'bg-amber-500' 
                        : 'bg-indigo-500'
                  }`}
                  style={{ width: `${player.progress}%` }}
                />
              </div>

              {/* Live Status String */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-400">
                <span className="truncate pr-1 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 shrink-0 text-cyan-400 animate-pulse" />
                  {player.status}
                </span>
                <span className="shrink-0 font-bold">{player.progress}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OpponentTrack;
