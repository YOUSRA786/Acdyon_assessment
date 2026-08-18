import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import ThemeToggle from '../common/ThemeToggle';
import { Search, Menu, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { setActiveDrawer } = useShowcase();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200
      dark:bg-[#08090e]/85 dark:border-white/[0.08] dark:text-slate-100
      bg-white/85 border-slate-200/80 text-slate-900"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs border transition-transform group-hover:scale-105
            dark:bg-white dark:border-white dark:text-slate-950
            bg-slate-950 border-slate-900 text-white"
          >
            &gt;
          </div>
          <span className="font-bold text-base tracking-tight font-sans text-slate-950 dark:text-white">
            CodeArena
          </span>
        </button>

        {/* Primary Clean Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => scrollTo('hero-arena')}
            className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Arena
          </button>
          <button
            onClick={() => scrollTo('challenges-showcase')}
            className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Challenges
          </button>
          <button
            onClick={() => scrollTo('leaderboard-showcase')}
            className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Leaderboard
          </button>
          <button
            onClick={() => scrollTo('recruiter-showcase')}
            className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Recruiter Suite
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setActiveDrawer('commandPalette')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer
              dark:bg-white/[0.04] dark:border-white/[0.08] dark:hover:border-white/[0.15]
              bg-slate-100/80 border-slate-200 hover:border-slate-300"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Search</span>
            <kbd className="hidden lg:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border dark:bg-black/40 dark:border-white/10 bg-white border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle showKeyHint={false} />

          {/* Enter Arena CTA */}
          <button
            onClick={() => scrollTo('hero-arena')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer
              dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950
              bg-slate-950 hover:bg-slate-800 text-white"
          >
            Enter Arena
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setActiveDrawer('mobileMenu')}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
