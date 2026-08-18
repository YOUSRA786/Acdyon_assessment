import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t dark:border-white/[0.06] border-slate-200/80 py-12 dark:bg-[#06070a] bg-slate-50 text-slate-500 font-sans text-xs transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b dark:border-white/[0.04] border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] dark:bg-white dark:text-slate-950 bg-slate-950 text-white">
                &gt;
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-950 dark:text-white">
                CodeArena
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Next-generation multiplayer competitive programming platform.
            </p>
          </div>

          {/* Keyboard Shortcuts Reference */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-1.5 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-slate-300 text-slate-700 dark:text-slate-300">⌘K</kbd>
              Command
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-1.5 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-slate-300 text-slate-700 dark:text-slate-300">T</kbd>
              Theme
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-1.5 py-0.5 rounded border dark:bg-white/[0.04] dark:border-white/10 bg-white border-slate-300 text-slate-700 dark:text-slate-300">ESC</kbd>
              Close
            </span>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} CodeArena. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
