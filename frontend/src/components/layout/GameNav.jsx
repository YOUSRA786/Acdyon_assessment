import React, { useState, useEffect } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import ThemeToggle from '../common/ThemeToggle';
import { Swords, Search, Flame, ArrowRight, Menu, Eye } from 'lucide-react';

const NAV_LINKS = [
  { id: 'arena', label: 'Arena', target: 'game-hero' },
  { id: 'matchmaking', label: 'Matchmaking', target: 'match-section' },
  { id: 'missions', label: 'Missions', target: 'challenges-section' },
  { id: 'leaderboard', label: 'Leaderboard', target: 'rankings-section' },
  { id: 'observer', label: 'Observer Mode', target: 'spectator-section', isLive: true },
];

export const GameNav = () => {
  const { setActiveDrawer } = useShowcase();
  const [activeTab, setActiveTab] = useState('arena');

  // Track active section on scroll with accurate IntersectionObserver
  useEffect(() => {
    const sectionIds = ['game-hero', 'match-section', 'challenges-section', 'rankings-section', 'spectator-section'];
    const idToNavId = {
      'game-hero': 'arena',
      'match-section': 'matchmaking',
      'challenges-section': 'missions',
      'rankings-section': 'leaderboard',
      'spectator-section': 'observer'
    };

    const handleIntersect = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const activeNav = idToNavId[visible[0].target.id];
        if (activeNav) setActiveTab(activeNav);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.1, 0.3, 0.5]
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id, target) => {
    setActiveTab(id);
    if (target === 'game-hero' || !target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(target);
    if (!targetEl) return;

    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    const extraOffset = 16; // comfortable breathing room below navbar
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + extraOffset);

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300
      dark:bg-[#07060f]/90 dark:border-white/[0.08] dark:text-white
      bg-[#f5f3ff]/90 border-purple-200/60 text-slate-900 shadow-xs"
    >
      {/* Exact 1440px container matching the Hero width and padding */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo with Gaming Emblem */}
        <button 
          onClick={() => handleNavClick('arena', 'game-hero')}
          className="flex items-center gap-3.5 text-left cursor-pointer group shrink-0"
        >
          {/* Game Emblem Box */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:-translate-y-0.5 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-active:translate-y-0 transition-all duration-200">
            <Swords className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>

          {/* Typography Lockup */}
          <div>
            <div className="flex items-center gap-1.5 font-black text-xl sm:text-2xl font-sans tracking-tight uppercase italic leading-none">
              <span className="text-slate-950 dark:text-white">CODE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                BRAWL
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>BRAWL NODE: ACTIVE</span>
            </div>
          </div>
        </button>

        {/* Center Game Links with Active Underline Indicators */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono font-bold uppercase tracking-wider">
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.target)}
                className={`relative py-2 transition-all duration-200 cursor-pointer flex items-center gap-1.5 group
                  ${isActive 
                    ? 'text-cyan-600 dark:text-cyan-400 font-black' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:-translate-y-0.5'
                  }`}
              >
                <span>{link.label}</span>
                
                {/* Special Live Spectator Badge */}
                {link.isLive && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                )}

                {/* Subtle animated active underline indicator */}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-violet-500 transition-all duration-250 ${isActive ? 'opacity-100 scale-x-100 shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75'}`} />
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search Box, Theme Toggle, Start Brawling CTA */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Game Command Center Search Trigger */}
          <button
            onClick={() => setActiveDrawer('commandPalette')}
            className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl border dark:bg-white/5 dark:border-white/10 dark:text-slate-300 bg-purple-100/60 border-purple-200/80 text-slate-700 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer group"
            title="Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Search arena...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border dark:bg-black/40 dark:border-white/10 dark:text-slate-400 bg-white border-slate-300 text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setActiveDrawer('commandPalette')}
            className="md:hidden p-2 rounded-xl border dark:bg-white/5 dark:border-white/10 bg-purple-100/60 border-purple-200 text-slate-600 hover:text-cyan-500 transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Integrated Theme Toggle */}
          <ThemeToggle showKeyHint={false} />

          {/* Start Brawling Action Button */}
          <button
            onClick={() => handleNavClick('matchmaking', 'match-section')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] active:translate-y-0 cursor-pointer group"
          >
            <Flame className="w-3.5 h-3.5 fill-current text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Start Brawling</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setActiveDrawer('mobileMenu')}
            className="lg:hidden p-2 rounded-xl border dark:bg-white/5 dark:border-white/10 bg-purple-100/60 border-purple-200 text-slate-700 dark:text-slate-300 hover:text-cyan-500 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default GameNav;
