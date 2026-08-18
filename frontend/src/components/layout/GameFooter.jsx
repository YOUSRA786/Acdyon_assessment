import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { ArrowUp, Swords } from 'lucide-react';

export const GameFooter = () => {
  const { openEasterEgg } = useShowcase();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t dark:border-white/10 border-slate-200 py-16 dark:bg-[#070a12] bg-slate-50 text-slate-500 font-mono text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b dark:border-white/5 border-slate-200">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                <Swords className="w-3.5 h-3.5 -rotate-45" />
              </div>
              <span className="font-black text-base font-sans tracking-tight text-slate-950 dark:text-white">
                CODE<span className="text-pink-500">BRAWL</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans max-w-sm">
              The premier multiplayer competitive coding game. Turn algorithm practice into live brawls.
            </p>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-2 py-0.5 rounded-lg border dark:bg-white/5 dark:border-white/10 bg-white border-slate-300 text-slate-800 dark:text-slate-200">⌘K</kbd>
              COMMAND
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-2 py-0.5 rounded-lg border dark:bg-white/5 dark:border-white/10 bg-white border-slate-300 text-slate-800 dark:text-slate-200">T</kbd>
              THEME
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <kbd className="px-2 py-0.5 rounded-lg border dark:bg-white/5 dark:border-white/10 bg-white border-slate-300 text-slate-800 dark:text-slate-200">ESC</kbd>
              CLOSE
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} CodeBrawl Multiplayer Arena.</span>
            <button
              onClick={openEasterEgg}
              className="inline-flex items-center gap-1 opacity-50 hover:opacity-100 hover:scale-110 transition-all cursor-pointer font-bold text-emerald-400"
              title="🐰 Classified: Unlock Recruiter Bunny Console"
            >
              <span>🐰</span>
              <span className="text-[10px] underline underline-offset-2">Secret Bunny</span>
            </button>
            <span>• All systems active.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-pointer font-bold"
          >
            ASCEND TO TOP
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;
