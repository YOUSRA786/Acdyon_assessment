import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import SubmissionSuccessModal from './SubmissionSuccessModal';
import { 
  Play, CheckCircle2, RotateCcw, Clock, 
  Terminal, ChevronDown, ChevronUp, Sparkles, Check
} from 'lucide-react';

const LANGUAGES = [
  { id: 'python', label: 'Python 3.12' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'cpp', label: 'C++ 20' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' }
];

export const CinematicArena = () => {
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
    <section id="arena-stage" className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
      {/* Top Transition Label */}
      <div className="flex items-center justify-between pb-6 hairline-b text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-8">
        <span>01 // LIVE DUEL ENVIRONMENT</span>
        <span>STAGE #8492</span>
      </div>

      {/* Main Cinematic Product Canvas */}
      <div className="rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300
        dark:bg-[#090b10] dark:border-white/[0.08] dark:text-zinc-100
        bg-white border-zinc-200/90 text-zinc-900"
      >
        {/* Arena Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 hairline-b gap-4 text-xs">
          {/* Problem Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 font-bold text-sm sm:text-base hover:text-cyan-500 transition-colors cursor-pointer"
              >
                <span>{activeProblem.title}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border shadow-2xl z-50 py-2
                  dark:bg-[#12151e] dark:border-white/10 bg-white border-zinc-200"
                >
                  {problems.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProblem(p, false);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer
                        ${p.id === activeProblem.id 
                          ? 'dark:bg-white/10 bg-zinc-100 font-bold text-cyan-500' 
                          : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5'
                        }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{p.difficulty}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-xs font-mono text-zinc-400">
              [{activeProblem.difficulty}]
            </span>
          </div>

          {/* Language Switcher & Countdown Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer
                    ${selectedLanguage === lang.id
                      ? 'dark:bg-white dark:text-zinc-950 bg-zinc-950 text-white font-bold'
                      : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs pl-3 border-l dark:border-zinc-800 border-zinc-200">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-bold tabular-nums text-zinc-950 dark:text-white">
                {formatTimer(timeRemainingSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Distraction-Free Code Surface */}
        <div className="p-6 font-mono text-xs leading-relaxed dark:bg-[#050608] bg-zinc-950 text-zinc-100 min-h-[340px] max-h-[420px] flex overflow-hidden">
          {/* Line Numbers */}
          <div className="select-none text-zinc-600 pr-5 text-right border-r border-zinc-800/80 text-[11px]">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Textarea Buffer */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 pl-5 bg-transparent text-emerald-300 dark:text-cyan-300 outline-none resize-none font-mono text-[11px] leading-relaxed selection:bg-cyan-500/30"
            aria-label="Code Canvas"
          />
        </div>

        {/* Progressive Execution Terminal (Unrolls on Run) */}
        {showTerminal && (
          <div className="hairline-t dark:bg-[#07080c] bg-zinc-900 p-5 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-zinc-200">Execution Output (Isolated Sandbox)</span>
              </div>
              <button 
                onClick={() => setShowTerminal(false)}
                className="text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            {isRunningTests ? (
              <div className="py-6 text-center text-zinc-400 space-y-1">
                <p className="text-cyan-400 animate-pulse font-bold">Compiling bytecode & executing test fixtures...</p>
                <p className="text-[10px] text-zinc-500">Sandbox mounting completed (0ms overhead)</p>
              </div>
            ) : testResults ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    All Test Assertions Passed
                  </span>
                  <span className="text-zinc-400 text-xs font-mono">Runtime: 38ms • Memory: 14.2MB</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                  {testResults.cases?.map((tc, idx) => (
                    <div key={tc.id} className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-zinc-300 space-y-1">
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Case #{idx + 1} — PASSED</span>
                      <span className="text-cyan-300 truncate block">{tc.input}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-center py-2">Click &ldquo;Run Code&rdquo; to execute assertions.</p>
            )}
          </div>
        )}

        {/* Bottom Arena Ribbon: Competitor Race Track & Actions */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 hairline-t gap-4 bg-zinc-50/50 dark:bg-white/[0.01]">
          {/* Competitors Inline Race Status */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-zinc-400 text-xs hidden sm:inline">[ OPPONENT STREAM ]:</span>
            <div className="flex items-center gap-4">
              {competitors.slice(0, 3).map((comp) => (
                <div key={comp.id} className="flex items-center gap-1.5">
                  <span>{comp.avatar}</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {comp.id === 'user-self' ? 'You' : comp.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-zinc-400">
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
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Reset code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRun}
              disabled={isRunningTests}
              className="px-5 py-2.5 rounded-full border font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer
                dark:bg-white/[0.06] dark:border-white/[0.1] dark:hover:bg-white/[0.12] dark:text-white
                bg-white border-zinc-300 hover:bg-zinc-100 text-zinc-900"
            >
              {isRunningTests ? 'Running...' : 'Run Code'}
            </button>

            <button
              onClick={submitSolution}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer
                dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950
                bg-zinc-950 hover:bg-zinc-800 text-white"
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Duel'}
            </button>
          </div>
        </div>
      </div>

      {/* Submission Success Modal */}
      <SubmissionSuccessModal />
    </section>
  );
};

export default CinematicArena;
