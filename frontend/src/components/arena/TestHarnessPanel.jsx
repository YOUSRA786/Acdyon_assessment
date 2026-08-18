import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { Terminal, CheckCircle2, Clock, Cpu, Play, Loader2, Sparkles } from 'lucide-react';

export const TestHarnessPanel = () => {
  const { isRunningTests, testResults, runTestCases, activeProblem } = useShowcase();
  const [selectedTab, setSelectedTab] = useState('cases');

  return (
    <div className="flex flex-col h-full border-t lg:border-t-0 lg:border-l dark:border-white/10 border-slate-200 dark:bg-[#0b0e14] bg-slate-900 text-slate-100 font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b dark:border-white/10 border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-[11px] uppercase tracking-wider text-slate-300">
            Isolated Test Harness v2.4
          </span>
        </div>

        {testResults?.status === 'passed' && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            3/3 PASSED
          </span>
        )}
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono">
        {isRunningTests ? (
          <div className="h-full flex flex-col items-center justify-center py-8 text-center text-slate-400 space-y-3">
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            <div>
              <p className="font-bold text-slate-200">Executing sandbox verification...</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Compiling bytecode & mounting test fixtures</p>
            </div>
          </div>
        ) : testResults ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Top Telemetry Header */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  All Test Cases Passed
                </span>
                <span className="text-slate-500 text-[10px]">{testResults.timestamp}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Runtime: <strong className="text-slate-200">{testResults.runtime}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Memory: <strong className="text-slate-200">{testResults.memory}</strong></span>
                </div>
              </div>
            </div>

            {/* Individual Test Assertions */}
            <div className="space-y-2">
              {testResults.cases?.map((tc, idx) => (
                <div 
                  key={tc.id}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-300">
                    <span>Test Case #{idx + 1}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">{tc.executionTime}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Input: </span>
                    <span className="text-cyan-300">{tc.input}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Expected: </span>
                    <span className="text-slate-300">{tc.expected}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Output: </span>
                    <span className="text-emerald-400 font-semibold">{tc.expected}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 italic text-center pt-2">
              Zero allocation penalties detected in current scope.
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-8 text-center text-slate-500 space-y-3">
            <Terminal className="w-8 h-8 opacity-40" />
            <div className="max-w-xs">
              <p className="font-bold text-slate-400 text-xs">Ready to Run Tests</p>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Click &ldquo;Run Test Cases&rdquo; below or press the action button to verify your solution in the isolated execution sandbox.
              </p>
            </div>
            <button
              onClick={runTestCases}
              className="mt-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current text-cyan-400" />
              Execute Tests (3 Cases)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestHarnessPanel;
