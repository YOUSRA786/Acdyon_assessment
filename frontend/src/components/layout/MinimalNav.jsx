import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import ThemeToggle from '../common/ThemeToggle';
import { Search, ArrowDown } from 'lucide-react';

export const MinimalNav = () => {
  const { setActiveDrawer } = useShowcase();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 hairline-b
      dark:bg-[#06070a]/90 dark:text-white bg-[#fdfdfd]/90 text-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <span className="font-bold text-sm tracking-tight uppercase font-sans">
            CodeArena
          </span>
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
            [ MULTIPLAYER ENGINE ]
          </span>
        </button>

        {/* Editorial Coordinates Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-400">
          <button
            onClick={() => scrollTo('arena-stage')}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            01 // ARENA
          </button>
          <button
            onClick={() => scrollTo('mission-explorer')}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            02 // MISSIONS
          </button>
          <button
            onClick={() => scrollTo('combat-podium')}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            03 // PODIUM
          </button>
          <button
            onClick={() => scrollTo('recruiter-suite')}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            04 // RECRUITER
          </button>
        </nav>

        {/* Action cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveDrawer('commandPalette')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer
              dark:bg-zinc-900/60 dark:border-zinc-800 dark:hover:border-zinc-700
              bg-zinc-100/80 border-zinc-200 hover:border-zinc-300"
            aria-label="Open Command Environment"
          >
            <Search className="w-3 h-3" />
            <span className="text-[11px] font-sans">⌘K</span>
          </button>

          <ThemeToggle showKeyHint={false} />

          <button
            onClick={() => scrollTo('arena-stage')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer
              dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950
              bg-zinc-950 hover:bg-zinc-800 text-white"
          >
            ENTER
            <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MinimalNav;
