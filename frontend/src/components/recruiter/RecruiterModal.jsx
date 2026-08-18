import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { RECRUITER_CANDIDATE_DATA } from '../../data/showcaseData';
import CodeReplayScrubber from './CodeReplayScrubber';
import { X, ShieldCheck, Play, ArrowRight, UserCheck } from 'lucide-react';

export const RecruiterModal = () => {
  const { activeDrawer, closeAllDrawers, setActiveProblem, problems } = useShowcase();
  const { candidate } = RECRUITER_CANDIDATE_DATA;

  if (activeDrawer !== 'recruiter') return null;

  const handleLaunchAssessment = () => {
    setActiveProblem(problems[0], true);
    closeAllDrawers();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeAllDrawers}
    >
      <div 
        className="w-full max-w-3xl h-full flex flex-col border-l shadow-2xl transition-all duration-300
          dark:bg-[#0a0c12] dark:border-white/10 dark:text-slate-100
          bg-white border-slate-200 text-slate-900 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b dark:border-white/10 border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border dark:bg-white/5 dark:border-white/10 bg-slate-100 border-slate-200">
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-sans tracking-tight">{candidate.name} (Demo)</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.2 rounded-full border bg-emerald-500/15 text-emerald-500 border-emerald-500/30">
                  {candidate.ratingGrade}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">{candidate.role} • {candidate.experience}</p>
            </div>
          </div>

          <button 
            onClick={closeAllDrawers}
            className="p-1.5 rounded-lg border dark:border-white/10 border-slate-200 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Recruiter Details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed font-sans">
          {/* Summary Quote */}
          <div className="p-4 rounded-xl border dark:bg-white/[0.02] dark:border-white/[0.06] bg-slate-50 border-slate-200 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            &ldquo;{candidate.summary}&rdquo;
          </div>

          {/* Skill Breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Sample Candidate Evaluation Telemetry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {candidate.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl border dark:bg-white/[0.02] dark:border-white/[0.06] bg-slate-50 border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{m.label}</span>
                    <span className="font-bold text-emerald-500">{m.score}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: m.barWidth }} />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate pt-0.5">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Replay Scrubber */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Demonstration Keystroke Replay
            </h3>
            <CodeReplayScrubber />
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t dark:border-white/10 border-slate-200 flex gap-3 bg-slate-50 dark:bg-[#07090e]">
          <button
            onClick={closeAllDrawers}
            className="px-4 py-2.5 rounded-lg border dark:border-white/10 border-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleLaunchAssessment}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs transition-all shadow-md cursor-pointer
              dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950
              bg-slate-950 hover:bg-slate-800 text-white"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Stage Assessment in Arena
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterModal;
