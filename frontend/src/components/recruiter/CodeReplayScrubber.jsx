import React, { useState, useEffect } from 'react';
import { RECRUITER_CANDIDATE_DATA } from '../../data/showcaseData';
import { Play, Pause, RotateCcw, Clock, Terminal, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export const CodeReplayScrubber = () => {
  const frames = RECRUITER_CANDIDATE_DATA.replayFrames;
  const [currentFrameIndex, setCurrentFrameIndex] = useState(frames.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeFrame = frames[currentFrameIndex];

  // Auto-play interval
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentFrameIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, frames.length]);

  const handlePlayToggle = () => {
    if (currentFrameIndex === frames.length - 1) {
      setCurrentFrameIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-[#0a0c12] bg-slate-950 text-slate-100 overflow-hidden shadow-2xl font-mono text-xs">
      {/* Replay Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-3.5 border-b border-slate-800 bg-slate-900/60 gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play Replay'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentFrameIndex(0);
            }}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset to 00:00"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-slate-200">{activeFrame.timestamp}</span>
            <span>•</span>
            <span className="text-emerald-400 uppercase font-bold">{activeFrame.phase}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Keystrokes: <strong className="text-slate-200">{activeFrame.keystrokes}</strong>
        </div>
      </div>

      {/* Interactive Timeline Track */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950">
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
          <span>00:00 (Start)</span>
          <span className="text-cyan-400 font-bold">{activeFrame.label}</span>
          <span>03:42 (Submission)</span>
        </div>

        {/* Timeline Range Input */}
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          value={currentFrameIndex}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentFrameIndex(Number(e.target.value));
          }}
          className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />

        {/* Timeline Keyframe Marks */}
        <div className="flex justify-between mt-1 text-[9px] text-slate-500">
          {frames.map((f, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentFrameIndex(idx);
              }}
              className={`hover:text-cyan-400 transition-colors ${idx === currentFrameIndex ? 'text-cyan-400 font-bold' : ''}`}
            >
              {f.timestamp}
            </button>
          ))}
        </div>
      </div>

      {/* Code Snapshot Display */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[220px]">
        {/* Editor buffer */}
        <div className="lg:col-span-7 flex flex-col font-mono text-[11px] leading-relaxed">
          <div className="text-[10px] text-slate-500 mb-1 flex items-center justify-between">
            <span>Candidate Code Buffer (Python 3.12)</span>
            <span className="text-cyan-400">{activeFrame.label}</span>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex-1 overflow-x-auto text-emerald-300">
            <code>{activeFrame.codeSnippet}</code>
          </pre>
        </div>

        {/* Terminal Telemetry output */}
        <div className="lg:col-span-5 flex flex-col font-mono text-[11px] leading-relaxed">
          <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Execution Feedback at {activeFrame.timestamp}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex-1 whitespace-pre-line text-slate-300">
            {activeFrame.terminalOutput}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReplayScrubber;
