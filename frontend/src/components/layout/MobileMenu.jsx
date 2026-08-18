import React from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import ThemeToggle from '../common/ThemeToggle';
import { 
  X, Swords, BookOpen, Trophy, UserCheck, 
  Search, Sparkles, Flame 
} from 'lucide-react';

export const MobileMenu = () => {
  const { activeDrawer, closeAllDrawers, setActiveDrawer, openEasterEgg } = useShowcase();

  if (activeDrawer !== 'mobileMenu') return null;

  const handleLinkClick = (id) => {
    closeAllDrawers();
    if (id === 'game-hero' || !id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    const extraOffset = 16;
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + extraOffset);
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeAllDrawers}
    >
      <div 
        className="w-4/5 max-w-sm h-full flex flex-col border-l shadow-2xl p-6 transition-all duration-300
          dark:bg-[#07060f] dark:border-white/10 dark:text-slate-100
          bg-[#f5f3ff] border-purple-200 text-slate-900 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between pb-6 border-b dark:border-white/10 border-purple-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Swords className="w-4 h-4 -rotate-45" />
            </div>
            <span className="font-black text-base font-sans italic tracking-tight">CODE BRAWL</span>
          </div>
          <button 
            onClick={closeAllDrawers}
            className="p-1.5 rounded-xl border dark:border-white/10 border-purple-200 text-slate-400 hover:text-slate-950 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex-1 py-6 space-y-2 font-mono text-xs uppercase font-bold tracking-wider">
          <button
            onClick={() => handleLinkClick('game-hero')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors"
          >
            <Swords className="w-4 h-4 text-cyan-400" />
            Arena
          </button>

          <button
            onClick={() => handleLinkClick('match-section')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors"
          >
            <Flame className="w-4 h-4 text-pink-400" />
            Matchmaking
          </button>

          <button
            onClick={() => handleLinkClick('challenges-section')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors"
          >
            <BookOpen className="w-4 h-4 text-violet-400" />
            Missions
          </button>

          <button
            onClick={() => handleLinkClick('rankings-section')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Leaderboard
          </button>

          <button
            onClick={() => handleLinkClick('spectator-section')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            Observer Mode
          </button>

          <button
            onClick={() => {
              closeAllDrawers();
              setActiveDrawer('commandPalette');
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-purple-200/50 dark:hover:bg-white/5 text-left transition-colors border dark:border-white/10 border-purple-200"
          >
            <span className="flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              Command Palette
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border dark:bg-black/40 dark:border-white/10 bg-white border-slate-300">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => {
              closeAllDrawers();
              openEasterEgg();
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-500/10 text-emerald-400 text-left transition-colors border border-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            🐰 Secret Recruiter Console
          </button>
        </div>

        {/* Footer controls in mobile drawer */}
        <div className="pt-4 border-t dark:border-white/10 border-purple-200/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Theme Preference:</span>
            <ThemeToggle showKeyHint={false} />
          </div>

          <button
            onClick={() => handleLinkClick('match-section')}
            className="w-full py-3 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2
              text-slate-950 bg-cyan-400 hover:bg-cyan-300 cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            Start Brawling
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
