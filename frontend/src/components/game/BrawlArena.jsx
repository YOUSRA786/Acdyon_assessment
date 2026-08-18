import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { 
  Play, CheckCircle2, RotateCcw, Clock, 
  Terminal, Code2, ChevronDown, Sparkles, Flame, Trophy, Swords 
} from 'lucide-react';
import SubmissionSuccessModal from '../arena/SubmissionSuccessModal';

const LANGUAGES = [
  { id: 'python', label: 'Python 3.12' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'cpp', label: 'C++ 20' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' }
];

export const BrawlArena = () => {
  const { 
    activeProblem, 
    problems, 
    setActiveProblem, 
    selectedLanguage, 
    setLanguage, 
    code, 
    setCode, 
    runTestCases, 
    isRunningTests, 
    testResults,
    submitSolution, 
    isSubmitting, 
    resetCode, 
    timeRemainingSeconds,
    competitors
  } = useShowcase();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setShowTerminal(true);
    runTestCases();
  };

  return (
    <section id="arena-stage" className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20">
      {/* State Badge */}
      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 mb-6">
        <span>STATE: DEMO_ARENA // SIMULATED CODING MATCH</span>
        <span className="text-pink-500 flex items-center gap-1 font-black">
          <Flame className="w-3.5 h-3.5 fill-current" />
          DEMO ROUND 01
        </span>
      </div>

      {/* Main Game Coding Console */}
      <div className="rounded-3xl border dark:border-cyan-500/30 border-slate-300 dark:bg-[#0c101c] bg-white text-slate-900 dark:text-white shadow-2xl overflow-hidden relative">
        {/* Top Game Console Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b dark:border-white/10 border-slate-200 gap-4 bg-slate-50/80 dark:bg-black/40 text-xs font-mono">
          {/* Problem Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 font-black text-sm uppercase hover:text-cyan-500 transition-colors cursor-pointer"
              >
                <span>{activeProblem.title}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border shadow-2xl z-50 py-2 dark:bg-[#12151e] dark:border-white/10 bg-white border-slate-200">
                  {problems.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProblem(p, false);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer
                        ${p.id === activeProblem.id 
                          ? 'dark:bg-cyan-500/20 bg-cyan-50 font-bold text-cyan-600 dark:text-cyan-400' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">[{p.difficulty}]</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="px-2.5 py-0.5 rounded-full border bg-amber-500/15 text-amber-500 border-amber-500/30 text-[10px] font-bold">
              {activeProblem.difficulty}
            </span>
          </div>

          {/* Language Selector & Match Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer
                    ${selectedLanguage === lang.id
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs pl-3 border-l dark:border-white/10 border-slate-200">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span className="font-black text-sm text-pink-500 tabular-nums">
                {formatTimer(timeRemainingSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Code Editor Surface */}
        <div className="p-6 font-mono text-xs leading-relaxed dark:bg-[#050811] bg-slate-950 text-slate-100 min-h-[320px] max-h-[380px] flex overflow-hidden">
          {/* Line Numbers */}
          <div className="select-none text-slate-600 pr-5 text-right border-r border-slate-800 text-[11px]">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Buffer */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 pl-5 bg-transparent text-emerald-300 dark:text-cyan-300 outline-none resize-none font-mono text-[11px] leading-relaxed selection:bg-cyan-500/30"
            aria-label="Match Code Editor"
          />
        </div>

        {/* Live Test Runner Panel (Progressive expansion) */}
        {showTerminal && (
          <div className="border-t dark:border-white/10 border-slate-800 dark:bg-[#080c16] bg-slate-900 p-5 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-200">SANDBOX TEST ASSERTIONS</span>
              </div>
              <button 
                onClick={() => setShowTerminal(false)}
                className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isRunningTests ? (
              <div className="py-6 text-center text-slate-400 space-y-1">
                <p className="text-cyan-400 animate-pulse font-bold">Compiling bytecode & executing test fixtures...</p>
                <p className="text-[10px] text-slate-500">Simulated local test harness</p>
              </div>
            ) : testResults ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    ALL 3 TEST SUITES PASSED
                  </span>
                  <span className="text-slate-400 text-xs font-mono">Sample Runtime: 38ms • Memory: 14.2MB</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                  {testResults.cases?.map((tc, idx) => (
                    <div key={tc.id} className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-slate-300 space-y-1">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">TEST {idx + 1}: PASSED</span>
                      <span className="text-cyan-300 truncate block">{tc.input}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-2">Click &ldquo;Run Tests&rdquo; to execute assertions.</p>
            )}
          </div>
        )}

        {/* Bottom Arena Footer: Competitor Race Track & Actions */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t dark:border-white/10 border-slate-200 gap-4 bg-slate-50/80 dark:bg-black/30">
          {/* Opponent Progress */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 font-bold hidden sm:inline">DEMO OPPONENT PROGRESS:</span>
            <div className="flex items-center gap-4">
              {competitors.slice(0, 3).map((comp) => (
                <div key={comp.id} className="flex items-center gap-1.5">
                  <span className="text-base">{comp.avatar}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {comp.id === 'user-self' ? 'You' : comp.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-black">
                    {comp.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={resetCode}
              className="p-2.5 rounded-xl border dark:border-white/10 border-slate-300 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              title="Reset code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRun}
              disabled={isRunningTests}
              className="px-5 py-2.5 rounded-xl border font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer
                dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/20 dark:hover:text-white
                bg-white border-slate-300 hover:bg-slate-100 hover:text-slate-950 text-slate-800"
            >
              {isRunningTests ? 'Running...' : 'Run Tests'}
            </button>

            <button
              onClick={submitSolution}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Solution (+120 XP)'}
            </button>
          </div>
        </div>
      </div>

      {/* Submission Success / Victory Modal */}
      <SubmissionSuccessModal />
    </section>
  );
};

export default BrawlArena;
