import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { Trophy, CheckCircle2, Zap, ArrowRight, X, Sparkles, Flame, Play, BarChart2 } from 'lucide-react';

export const SubmissionSuccessModal = () => {
  const { 
    showVictoryModal, 
    setShowVictoryModal, 
    lastSubmission, 
    userStats, 
    problems, 
    setActiveProblem 
  } = useShowcase();

  if (!showVictoryModal || !lastSubmission) return null;

  const handleNextChallenge = () => {
    setShowVictoryModal(false);
    // pick next problem in list
    const currentIndex = problems.findIndex(p => p.title === lastSubmission.problemTitle);
    const nextProblem = problems[(currentIndex + 1) % problems.length];
    setActiveProblem(nextProblem, true);
  };

  const handleViewLeaderboard = () => {
    setShowVictoryModal(false);
    document.getElementById('leaderboard-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setShowVictoryModal(false)}
    >
      <div 
        className="w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300
          dark:bg-[#0c0f17] dark:border-cyan-500/30 dark:text-slate-100
          bg-white border-slate-200 text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header with Victory Glow */}
        <div className="relative p-6 pt-8 text-center border-b dark:border-white/10 border-slate-100 dark:bg-gradient-to-b dark:from-cyan-950/40 dark:to-transparent bg-slate-50">
          <button 
            onClick={() => setShowVictoryModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 border shadow-xl dark:bg-cyan-500/20 dark:border-cyan-500/40 dark:text-cyan-400 bg-emerald-100 border-emerald-300 text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-emerald-500 mb-1">
            Status: 200 OK // Verified (Demo)
          </p>
          <h2 className="text-2xl font-black font-sans uppercase tracking-tight">
            Submission Verified
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 font-mono">
            {lastSubmission.problemTitle} • {lastSubmission.difficulty}
          </p>
        </div>

        {/* Victory Telemetry Grid */}
        <div className="p-6 space-y-4">
          {/* XP & Rank Climb Highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl border text-center dark:bg-white/5 dark:border-white/10 bg-amber-50/50 border-amber-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Demo Experience</span>
              <div className="text-2xl font-black text-amber-500 dark:text-amber-400 flex items-center justify-center gap-1.5 font-mono">
                <Sparkles className="w-5 h-5 fill-current" />
                +{lastSubmission.xpGained} XP
              </div>
            </div>

            <div className="p-4 rounded-2xl border text-center dark:bg-white/5 dark:border-white/10 bg-cyan-50/50 border-cyan-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Demo Rank Shift</span>
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-2 font-mono">
                <span className="text-slate-400 line-through text-lg">#{lastSubmission.oldRank}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-500">#{lastSubmission.newRank}</span>
              </div>
            </div>
          </div>

          {/* Detailed Execution Breakdown */}
          <div className="p-4 rounded-2xl border font-mono text-xs space-y-2 dark:bg-black/30 dark:border-white/10 bg-slate-50 border-slate-200">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Sample Runtime:</span>
              <span className="font-bold text-emerald-500">{lastSubmission.runtime}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Sample Memory:</span>
              <span className="font-bold text-emerald-500">{lastSubmission.memory}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Demo ELO Update:</span>
              <span className="font-bold text-cyan-500">+{lastSubmission.eloGained} ELO ({userStats.elo} Total)</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Demo Win Streak:</span>
              <span className="font-bold text-amber-500 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {userStats.streak} Duels
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleViewLeaderboard}
            className="flex-1 py-3 px-4 rounded-xl border dark:border-white/10 border-slate-200 text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            View Ladder
          </button>
          <button
            onClick={handleNextChallenge}
            className="flex-1 py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2
              dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950
              bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Play className="w-4 h-4 fill-current" />
            Next Arena Duel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccessModal;
