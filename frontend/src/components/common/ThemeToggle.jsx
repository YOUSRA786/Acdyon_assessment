import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ showKeyHint = true, className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border transition-all duration-200 group cursor-pointer
        dark:bg-white/5 dark:border-white/10 dark:hover:border-cyan-400/50 dark:text-slate-300 dark:hover:text-cyan-400
        bg-purple-100/60 border-purple-200/80 hover:border-cyan-500/50 text-slate-700 hover:text-cyan-600 shadow-xs ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode (Shortcut: T)`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-300 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
        />
        <Moon
          className={`w-4 h-4 absolute transition-all duration-300 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100 text-cyan-400' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {showKeyHint && (
        <span className="hidden lg:inline-block ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded border dark:bg-black/40 dark:border-white/10 dark:text-slate-400 bg-white border-slate-200 text-slate-500 group-hover:border-current transition-colors">
          T
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
