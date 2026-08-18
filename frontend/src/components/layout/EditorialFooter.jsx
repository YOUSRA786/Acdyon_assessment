import React from 'react';
import { ArrowUp } from 'lucide-react';

export const EditorialFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full hairline-t py-16 dark:bg-[#040507] bg-zinc-50 text-zinc-500 font-mono text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
        {/* Upper Footprint */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 hairline-b">
          <div className="space-y-2">
            <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-white uppercase font-sans">
              CodeArena
            </span>
            <p className="text-xs text-zinc-400 font-sans max-w-sm">
              Next-generation multiplayer competitive programming platform.
            </p>
          </div>

          {/* Keyboard Shortcuts Annotation */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <span className="flex items-center gap-2 text-zinc-400">
              <kbd className="px-2 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-zinc-300 text-zinc-800 dark:text-zinc-200">⌘K</kbd>
              COMMAND
            </span>
            <span className="flex items-center gap-2 text-zinc-400">
              <kbd className="px-2 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-zinc-300 text-zinc-800 dark:text-zinc-200">T</kbd>
              THEME
            </span>
            <span className="flex items-center gap-2 text-zinc-400">
              <kbd className="px-2 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-zinc-300 text-zinc-800 dark:text-zinc-200">ESC</kbd>
              DISMISS
            </span>
          </div>
        </div>

        {/* Lower Footprint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} CodeArena. All systems nominal.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            RETURN TO TOP
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditorialFooter;
