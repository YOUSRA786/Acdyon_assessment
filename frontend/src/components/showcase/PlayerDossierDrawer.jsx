import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { useToast } from '../../context/ToastContext';
import { X, Trophy, Flame, Swords, Shield, Zap, CheckCircle2, ChevronRight, Activity, Globe } from 'lucide-react';

export const PlayerDossierDrawer = () => {
  const { activeDrawer, closeAllDrawers, drawerData, setActiveProblem, problems } = useShowcase();
  const { showToast } = useToast();

  if (activeDrawer !== 'player' || !drawerData) return null;

  const player = drawerData;

  const handleChallengePlayer = () => {
    // Load a problem and launch arena duel
    setActiveProblem(problems[0], true);
    closeAllDrawers();
    showToast({
      title: 'Duel Matchmaking Initiated',
      description: `Simulating high-stakes match vs ${player.name} (${player.elo} ELO).`,
      type: 'action'
    });
  };

  const getDivisionBadge = (div) => {
    if (div === 'Grandmaster') return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    if (div === 'Diamond') return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
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
        <div className="p-6 border-b dark:border-white/10 border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border shadow-inner dark:bg-white/5 dark:border-white/10 bg-slate-100 border-slate-200">
              {player.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-sans tracking-tight">{player.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded border dark:bg-black/30 dark:border-white/10 bg-slate-100 border-slate-300 text-slate-500">
                  {player.country}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 dark:text-slate-400">{player.handle}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getDivisionBadge(player.division)}`}>
                  {player.division}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {player.elo} ELO
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={closeAllDrawers}
            className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-3 gap-3 px-6 py-3 border-b dark:border-white/5 border-slate-100 bg-slate-50/50 dark:bg-black/20 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px]">WIN RATE</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{player.winRate}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">MATCHES</span>
            <span className="font-bold">{player.matchesPlayed} Duels</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">WIN STREAK</span>
            <span className="font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              {player.streak} Matches
            </span>
          </div>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed font-sans">
          {/* Bio */}
          {player.bio && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Combat Profile</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed p-3.5 rounded-xl border dark:bg-white/5 dark:border-white/10 bg-slate-50 border-slate-200">
                &ldquo;{player.bio}&rdquo;
              </p>
            </div>
          )}

          {/* Skill Performance Radar Stats */}
          {player.radarStats && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Technical Telemetry</span>
                <span className="text-[10px] text-cyan-500">Benchmark: Grandmaster Standard</span>
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {Object.entries(player.radarStats).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-slate-500 dark:text-slate-400">{key}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{val}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" 
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferred Languages */}
          {player.favLangs && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Signature Languages</h3>
              <div className="flex flex-wrap gap-2">
                {player.favLangs.map((lang, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg border dark:bg-black/30 dark:border-white/10 bg-slate-100 border-slate-200 font-semibold">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Matches */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Duel History</h3>
            {player.recentMatches && player.recentMatches.length > 0 ? (
              <div className="space-y-2">
                {player.recentMatches.map((m) => (
                  <div 
                    key={m.id} 
                    className="p-3 rounded-xl border flex items-center justify-between font-mono text-xs dark:bg-white/5 dark:border-white/10 bg-slate-50 border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{m.problem}</span>
                      <span className="text-[11px] text-slate-400">vs {m.opponent} • {m.time}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                      m.result.includes('Victory') 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {m.result}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No recent logged matches.</p>
            )}
          </div>
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
            onClick={handleChallengePlayer}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg
              dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950
              bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Swords className="w-4 h-4" />
            Launch 1v1 Duel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDossierDrawer;
