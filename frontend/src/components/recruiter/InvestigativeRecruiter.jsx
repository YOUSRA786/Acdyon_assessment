import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { RECRUITER_CANDIDATE_DATA } from '../../data/showcaseData';
import RecruiterModal from './RecruiterModal';
import { ArrowRight, UserCheck, ShieldCheck, Play } from 'lucide-react';

export const InvestigativeRecruiter = () => {
  const { openRecruiterMode } = useShowcase();
  const { candidate } = RECRUITER_CANDIDATE_DATA;

  return (
    <section id="recruiter-suite" className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-36 hairline-t">
      {/* Section Coordinate Label */}
      <div className="flex items-center justify-between pb-6 hairline-b text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-12">
        <span>04 // INVESTIGATIVE RECRUITER SUITE</span>
        <span>EVALUATION PROTOCOL</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-zinc-950 dark:text-white leading-[1.05]">
              See how a developer thinks.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-lg leading-relaxed font-sans">
              Evaluate real-time problem solving, debugging efficiency under duel pressure, and constant-space refactorings through step-by-step keystroke replay.
            </p>
          </div>

          <button
            onClick={openRecruiterMode}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer
              dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950
              bg-zinc-950 hover:bg-zinc-800 text-white"
          >
            <span>Launch Candidate Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Interactive Candidate Dossier Artifact */}
        <div 
          onClick={openRecruiterMode}
          className="lg:col-span-6 rounded-3xl border p-8 sm:p-10 transition-all duration-300 cursor-pointer group space-y-6
            dark:bg-[#090b10] dark:border-white/[0.08] dark:hover:border-white/20
            bg-white border-zinc-200 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border dark:bg-white/5 dark:border-white/10 bg-zinc-100 border-zinc-200">
                {candidate.avatar}
              </div>
              <div>
                <h3 className="text-lg font-bold font-sans text-zinc-950 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">{candidate.role}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border bg-emerald-500/15 text-emerald-500 border-emerald-500/30">
              {candidate.ratingGrade}
            </span>
          </div>

          {/* Investigative Scores */}
          <div className="space-y-3 font-mono text-xs">
            {candidate.metrics.slice(0, 3).map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>{m.label}</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{m.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: m.barWidth }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t dark:border-white/[0.06] border-zinc-100 flex items-center justify-between text-xs font-mono text-emerald-500">
            <span>SCRUB CANDIDATE REPLAY →</span>
            <span className="text-zinc-400">03:42 DURATION</span>
          </div>
        </div>
      </div>

      {/* Recruiter Full Investigation Drawer */}
      <RecruiterModal />
    </section>
  );
};

export default InvestigativeRecruiter;
