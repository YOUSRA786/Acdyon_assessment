import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Search, Terminal, Play, CheckCircle2, RotateCcw, 
  Trophy, BookOpen, UserCheck, Sun, Moon, ArrowRight, 
  Sparkles, Keyboard, ShieldAlert, X
} from 'lucide-react';

export const CommandPalette = () => {
  const { 
    activeDrawer, 
    closeAllDrawers, 
    runTestCases, 
    submitSolution, 
    resetCode, 
    setLanguage, 
    selectedLanguage,
    setActiveProblem,
    problems,
    openRecruiterMode,
    openEasterEgg,
    isBunnyUnlocked
  } = useShowcase();

  const { theme, toggleTheme, isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const isOpen = activeDrawer === 'commandPalette';

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const allCommands = useMemo(() => {
    const list = [
      // Navigation
      {
        id: 'nav-arena',
        category: 'Navigation',
        title: 'Enter Live Arena',
        description: 'Scroll to interactive multiplayer coding arena',
        icon: Terminal,
        action: () => {
          closeAllDrawers();
          document.getElementById('arena-stage')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      {
        id: 'nav-challenges',
        category: 'Navigation',
        title: 'Explore Challenge Matrix',
        description: 'Browse curated algorithm problems and test harnesses',
        icon: BookOpen,
        action: () => {
          closeAllDrawers();
          document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      {
        id: 'nav-leaderboard',
        category: 'Navigation',
        title: 'Global Competitive Leaderboard',
        description: 'View Grandmaster, Diamond and Gold ELO ladder',
        icon: Trophy,
        action: () => {
          closeAllDrawers();
          document.getElementById('rankings-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      {
        id: 'nav-recruiter',
        category: 'Navigation',
        title: 'Recruiter Mode & Telemetry',
        description: 'Open candidate evaluation dashboard & keystroke replay',
        icon: UserCheck,
        action: () => {
          openRecruiterMode();
        }
      },

      // Arena Actions
      {
        id: 'act-run',
        category: 'Arena Controls',
        title: 'Run Test Cases',
        description: 'Simulate isolated test harness execution (38ms)',
        icon: Play,
        action: () => {
          closeAllDrawers();
          document.getElementById('arena-stage')?.scrollIntoView({ behavior: 'smooth' });
          runTestCases();
        }
      },
      {
        id: 'act-submit',
        category: 'Arena Controls',
        title: 'Submit Solution (+120 XP)',
        description: 'Verify solution, climb rank #3 → #1, and burst confetti',
        icon: CheckCircle2,
        action: () => {
          closeAllDrawers();
          document.getElementById('arena-stage')?.scrollIntoView({ behavior: 'smooth' });
          submitSolution();
        }
      },
      {
        id: 'act-reset',
        category: 'Arena Controls',
        title: 'Reset Code Sandbox',
        description: 'Restore clean starter boilerplate',
        icon: RotateCcw,
        action: () => {
          resetCode();
          closeAllDrawers();
        }
      },

      // Language Switchers
      {
        id: 'lang-python',
        category: 'Switch Language',
        title: 'Python 3.12 (Selected: ' + (selectedLanguage === 'python' ? 'Yes' : 'No') + ')',
        description: 'Load idiomatic Python starter code',
        icon: Terminal,
        action: () => {
          setLanguage('python');
          closeAllDrawers();
        }
      },
      {
        id: 'lang-js',
        category: 'Switch Language',
        title: 'JavaScript ES2024',
        description: 'Load modern JavaScript template',
        icon: Terminal,
        action: () => {
          setLanguage('javascript');
          closeAllDrawers();
        }
      },
      {
        id: 'lang-ts',
        category: 'Switch Language',
        title: 'TypeScript 5.4',
        description: 'Load typed interface solution',
        icon: Terminal,
        action: () => {
          setLanguage('typescript');
          closeAllDrawers();
        }
      },
      {
        id: 'lang-cpp',
        category: 'Switch Language',
        title: 'C++ 20 (GCC 13)',
        description: 'Load high-performance STL implementation',
        icon: Terminal,
        action: () => {
          setLanguage('cpp');
          closeAllDrawers();
        }
      },
      {
        id: 'lang-rust',
        category: 'Switch Language',
        title: 'Rust 1.77',
        description: 'Load memory-safe zero-overhead solution',
        icon: Terminal,
        action: () => {
          setLanguage('rust');
          closeAllDrawers();
        }
      },

      // Theme
      {
        id: 'theme-toggle',
        category: 'Preferences',
        title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        description: 'Toggle intentional contrast theme (Shortcut: T)',
        icon: isDark ? Sun : Moon,
        action: () => {
          toggleTheme();
          closeAllDrawers();
        }
      }
    ];

    // Secret Easter Egg Detection Query (Placed in between rather than at top)
    const normalizedQuery = query.toLowerCase().trim();
    const isBunnyQuery = [
      'bunny', 'rabbit', 'white rabbit', 'matrix', 'easter', 'secret', 
      'classified', 'diagnostics', 'diag', '200 ok', 'loop', 'recruit'
    ].some(term => normalizedQuery.includes(term));

    if (isBunnyQuery || isBunnyUnlocked) {
      list.splice(4, 0, {
        id: 'secret-bunny-mode',
        category: 'Secret Protocol',
        title: '[CLASSIFIED] // UNLOCK RECRUITER BUNNY CONSOLE',
        description: 'Access the hidden matrix terminal & developer telemetry',
        icon: Sparkles,
        isSecret: true,
        action: () => {
          openEasterEgg();
        }
      });
    }

    return list;
  }, [
    query, 
    selectedLanguage, 
    isDark, 
    isBunnyUnlocked, 
    closeAllDrawers, 
    openRecruiterMode, 
    openEasterEgg, 
    runTestCases, 
    submitSolution, 
    resetCode, 
    setLanguage, 
    toggleTheme
  ]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const lower = query.toLowerCase().trim();
    return allCommands.filter(c => 
      c.title.toLowerCase().includes(lower) || 
      c.description.toLowerCase().includes(lower) ||
      c.category.toLowerCase().includes(lower)
    );
  }, [allCommands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const command = filteredCommands[selectedIndex];
      if (command) command.action();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAllDrawers}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200
          dark:bg-[#0f121a] dark:border-white/10 dark:text-slate-100
          bg-white border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b dark:border-white/10 border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, duels, problems, or recruiter tools..."
            className="flex-1 bg-transparent text-sm sm:text-base outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans"
            aria-label="Command search"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={closeAllDrawers}
            title="Close dialog (ESC)"
            className="hidden sm:inline-flex items-center justify-center text-[11px] font-mono px-2 py-0.5 rounded border dark:bg-black/40 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10 bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y dark:divide-white/5 divide-slate-100">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>No commands matched &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 opacity-75">Tip: Try searching &ldquo;arena&rdquo;, &ldquo;run&rdquo;, &ldquo;python&rdquo;, or &ldquo;bunny&rdquo;</p>
            </div>
          ) : (
            filteredCommands.map((command, idx) => {
              const Icon = command.icon;
              const isSelected = idx === selectedIndex;
              const isSecret = command.isSecret;

              return (
                <button
                  key={command.id}
                  onClick={() => command.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 group
                    ${isSelected 
                      ? isSecret 
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400' 
                        : 'dark:bg-white/10 bg-slate-100 dark:text-white text-slate-900 border dark:border-white/10 border-slate-200' 
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSecret 
                        ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' 
                        : isSelected 
                          ? 'dark:bg-cyan-500/20 bg-indigo-50 dark:text-cyan-400 text-indigo-600' 
                          : 'dark:bg-white/5 bg-slate-100 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isSecret ? 'font-mono text-emerald-400' : ''}`}>
                          {command.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border dark:bg-black/30 dark:border-white/10 dark:text-slate-400 bg-white border-slate-200 text-slate-500">
                          {command.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                        {command.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 opacity-100 text-cyan-400' : 'opacity-0'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t dark:border-white/10 border-slate-200 text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-50/50 dark:bg-black/20">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded border dark:border-white/10 border-slate-300">↑</kbd> <kbd className="px-1 py-0.5 rounded border dark:border-white/10 border-slate-300">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded border dark:border-white/10 border-slate-300">↵</kbd> select</span>
          </div>
          <span className="hidden sm:inline-block">CodeArena Command Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
