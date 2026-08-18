import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { RECRUITER_CANDIDATE_DATA } from '../../data/showcaseData';
import { ArrowRight, UserCheck, ShieldCheck, Play } from 'lucide-react';
import RecruiterModal from './RecruiterModal';

export const RecruiterShowcase = () => {
  const { openRecruiterMode } = useShowcase();
  const { candidate } = RECRUITER_CANDIDATE_DATA;

  return (
    <section id="recruiter-showcase" className="w-full max-w-6xl mx-auto px-6 py-24 sm:py-32 border-t dark:border-white/[0.06] border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
              Technical Evaluation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-950 dark:text-white leading-tight">
              See how a developer actually solves problems.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Go beyond static LeetCode scores. Review step-by-step problem-solving replays, debugging efficiency under competition pressure, and constant-space refactorings.
            </p>
          </div>

          <button
            onClick={openRecruiterMode}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs transition-all shadow-md cursor-pointer
              dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950
              bg-slate-950 hover:bg-slate-800 text-white"
          >
            Explore Recruiter Suite
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Candidate Teaser Card */}
        <div 
          onClick={openRecruiterMode}
          className="lg:col-span-6 rounded-2xl border p-8 transition-all duration-300 cursor-pointer group
            dark:bg-[#0c0e14] dark:border-white/[0.08] dark:hover:border-white/20
            bg-white border-slate-200 shadow-lg space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border dark:bg-white/5 dark:border-white/10 bg-slate-100 border-slate-200">
                {candidate.avatar}
              </div>
              <div>
                <h3 className="text-base font-bold font-sans text-slate-950 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-xs text-slate-400 font-sans">{candidate.role}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border bg-emerald-500/15 text-emerald-500 border-emerald-500/30">
              {candidate.ratingGrade}
            </span>
          </div>

          {/* Key Metric Previews */}
          <div className="space-y-3 font-mono text-xs">
            {candidate.metrics.slice(0, 3).map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{m.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{m.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: m.barWidth }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-emerald-500 font-medium">
            <span>Click to scrub full keystroke replay →</span>
            <span className="font-mono text-slate-400">03:42 Duration</span>
          </div>
        </div>
      </div>

      {/* Recruiter Full Modal */}
      <RecruiterModal />
    </section>
  );
};

export default RecruiterShowcase;
