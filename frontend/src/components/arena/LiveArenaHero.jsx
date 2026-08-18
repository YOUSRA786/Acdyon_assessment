import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { useTheme } from '../../context/ThemeContext';
import SubmissionSuccessModal from './SubmissionSuccessModal';
import { 
  Play, CheckCircle2, RotateCcw, Clock, 
  Terminal, Code2, ChevronDown, Sparkles, X, ChevronUp
} from 'lucide-react';

const LANGUAGES = [
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'cpp', label: 'C++' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' }
];

export const LiveArenaHero = () => {
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

  const [showProblemDropdown, setShowProblemDropdown] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  // Format seconds to mm:ss
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
    <div id="hero-arena" className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Floating Hero Artifact Container */}
      <div className="rounded-2xl border shadow-xl overflow-hidden transition-all duration-300
        dark:bg-[#0c0e14] dark:border-white/[0.08] dark:text-slate-100
        bg-white border-slate-200/90 text-slate-900"
      >
        {/* Sleek Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b dark:border-white/[0.06] border-slate-100 gap-3 text-xs">
          {/* Problem Selector & Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowProblemDropdown(!showProblemDropdown)}
                className="flex items-center gap-2 font-semibold text-sm hover:text-cyan-500 transition-colors cursor-pointer"
              >
                <span>{activeProblem.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProblemDropdown && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl border shadow-xl z-50 py-1.5
                  dark:bg-[#12151e] dark:border-white/10 bg-white border-slate-200"
                >
                  {problems.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProblem(p, false);
                        setShowProblemDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer
                        ${p.id === activeProblem.id 
                          ? 'dark:bg-white/10 bg-slate-100 font-semibold text-cyan-500' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.difficulty}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {activeProblem.difficulty} • {activeProblem.category}
            </span>
          </div>

          {/* Languages & Timer */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer
                    ${selectedLanguage === lang.id
                      ? 'dark:bg-white/15 dark:text-white bg-slate-900 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Live Match Countdown */}
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-xs pl-2 border-l dark:border-white/10 border-slate-200">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                {formatTimer(timeRemainingSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Distraction-Free Code Surface */}
        <div className="p-5 font-mono text-xs leading-relaxed dark:bg-[#07090e] bg-slate-950 text-slate-100 min-h-[300px] max-h-[380px] flex overflow-hidden">
          {/* Line numbers */}
          <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800 text-[11px]">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code text */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 pl-4 bg-transparent text-emerald-300 dark:text-cyan-300 outline-none resize-none font-mono text-[11px] leading-relaxed selection:bg-cyan-500/30"
            aria-label="Interactive Code Editor"
          />
        </div>

        {/* Progressive Terminal Panel (Expands when Run is clicked) */}
        {showTerminal && (
          <div className="border-t dark:border-white/[0.08] border-slate-800 dark:bg-[#090b10] bg-slate-900 p-4 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200">Isolated Test Runner Output</span>
              </div>
              <button 
                onClick={() => setShowTerminal(false)}
                className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {isRunningTests ? (
              <div className="py-4 text-center text-slate-400 space-y-1">
                <p className="text-cyan-400 animate-pulse font-semibold">Running test suite in sandbox...</p>
                <p className="text-[10px] text-slate-500">Compiling bytecode & executing test fixtures</p>
              </div>
            ) : testResults ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-emerald-400 font-semibold text-xs">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All 3 Test Cases Passed
                  </span>
                  <span className="text-slate-400 text-[11px]">Runtime: 38ms • Memory: 14.2MB</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  {testResults.cases?.map((tc, idx) => (
                    <div key={tc.id} className="p-2 rounded-lg bg-black/40 border border-slate-800 text-slate-300">
                      <span className="text-slate-500 block text-[10px]">Case {idx + 1}: Passed</span>
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
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-t dark:border-white/[0.06] border-slate-100 gap-4 bg-slate-50/50 dark:bg-white/[0.01]">
          {/* Subtle Competitor Race Status */}
          <div className="flex items-center gap-4 text-xs font-sans">
            <span className="text-slate-400 text-xs hidden sm:inline">Live Match:</span>
            <div className="flex items-center gap-3">
              {competitors.slice(0, 3).map((comp) => (
                <div key={comp.id} className="flex items-center gap-1.5">
                  <span className="text-xs">{comp.avatar}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-xs">
                    {comp.id === 'user-self' ? 'You' : comp.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {comp.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={resetCode}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Reset code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleRun}
              disabled={isRunningTests}
              className="px-4 py-2 rounded-lg border font-medium text-xs transition-all shadow-sm cursor-pointer
                dark:bg-white/[0.06] dark:border-white/[0.1] dark:hover:bg-white/[0.12] dark:text-white
                bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
            >
              {isRunningTests ? 'Running...' : 'Run Tests'}
            </button>

            <button
              onClick={submitSolution}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg font-medium text-xs transition-all shadow-md cursor-pointer
                dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950
                bg-slate-950 hover:bg-slate-800 text-white"
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
            </button>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      <SubmissionSuccessModal />
    </div>
  );
};

export default LiveArenaHero;
