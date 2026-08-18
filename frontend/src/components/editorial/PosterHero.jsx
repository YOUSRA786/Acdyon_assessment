import React from 'react';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';

export const PosterHero = ({ onEnterArena }) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-24 sm:pt-24 sm:pb-32 flex flex-col justify-between min-h-[82vh]">
      {/* Top Metadata Annotation Ribbon */}
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wider uppercase pb-8 hairline-b">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            ENGINE ONLINE
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">AST DIFF ENGINE v2.4</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline">SUB-50MS TEST RUNNERS</span>
          <span>[ 01 // STAGE ]</span>
        </div>
      </div>

      {/* Massive Editorial Display Typography */}
      <div className="py-12 sm:py-20 select-none space-y-2 sm:space-y-4">
        {/* Line 1: CODE ALONE */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-zinc-950 dark:text-white uppercase">
            Code
          </h1>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-light italic tracking-tight text-zinc-400 dark:text-zinc-600 sm:text-right">
            alone.
          </span>
        </div>

        {/* Line 2: COMPETE TOGETHER */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2 sm:pt-6">
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-light italic tracking-tight text-zinc-400 dark:text-zinc-600">
            Compete
          </span>
          <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-zinc-950 dark:text-white uppercase sm:text-right">
            together.
          </span>
        </div>
      </div>

      {/* Bottom Editorial Narrative & Transition Triggers */}
      <div className="pt-8 hairline-t flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-md space-y-2 font-sans">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            Turn routine algorithm problem solving into high-stakes live duels. Race competitors in real time with live keystroke tracking and instant sandbox assertions.
          </p>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 block">
            No installation • Runs in-browser • Multi-language runtime
          </span>
        </div>

        {/* Interactive Transition CTAs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onEnterArena}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer
              dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950
              bg-zinc-950 hover:bg-zinc-800 text-white"
          >
            <span>Enter Live Arena</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PosterHero;
