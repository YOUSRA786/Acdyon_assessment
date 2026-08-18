import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { RECRUITER_CANDIDATE_DATA } from '../../data/showcaseData';
import CodeReplayScrubber from '../recruiter/CodeReplayScrubber';
import RecruiterModal from '../recruiter/RecruiterModal';
import { Eye, ShieldCheck, Play, UserCheck, Flame } from 'lucide-react';

export const GameSpectator = () => {
  const { openRecruiterMode } = useShowcase();
  const { candidate } = RECRUITER_CANDIDATE_DATA;

  return (
    <section id="spectator-section" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20">
      {/* State Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 mb-6">
        <span>STATE: OBSERVER_MODE // LIVE TELEMETRY STREAM</span>
        <span className="text-cyan-400 flex items-center gap-1 font-black">
          <Eye className="w-3.5 h-3.5" />
          SPECTATING CANDIDATE
        </span>
      </div>

      {/* Main Observer Canvas */}
      <div className="rounded-3xl border dark:border-emerald-500/30 border-slate-300 dark:bg-[#0c131a] bg-white text-slate-900 dark:text-white shadow-2xl p-6 sm:p-10 space-y-8">
        {/* Candidate Profile Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b dark:border-white/10 border-slate-200 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                  OBSERVING: {candidate.name}
                </span>
                <span className="text-xs font-mono font-black text-amber-500">
                  {candidate.ratingGrade}
                </span>
              </div>
              <h3 className="text-2xl font-black font-sans uppercase tracking-tight text-slate-950 dark:text-white mt-1">
                Live Solution Playback
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Challenge: Two Sum II • Runtime: 38ms (Beats 98.4%)
              </p>
            </div>
          </div>

          <button
            onClick={openRecruiterMode}
            className="px-6 py-3 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Full Candidate Report</span>
          </button>
        </div>

        {/* Embedded Keystroke Replay Player */}
        <div className="space-y-3">
          <p className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
            // INTERACTIVE CODE TIMELINE REPLAY (00:00 → 03:42)
          </p>
          <CodeReplayScrubber />
        </div>
      </div>

      {/* Recruiter Full Drawer */}
      <RecruiterModal />
    </section>
  );
};

export default GameSpectator;
