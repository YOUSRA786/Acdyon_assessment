import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, Trophy, X, Zap } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        let borderClass = 'border-sky-500/30';
        let bgGlow = 'bg-sky-500/10';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderClass = 'border-emerald-500/30';
          bgGlow = 'bg-emerald-500/10';
        } else if (toast.type === 'xp' || toast.type === 'rank') {
          icon = <Trophy className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/40';
          bgGlow = 'bg-amber-500/15';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderClass = 'border-rose-500/30';
          bgGlow = 'bg-rose-500/10';
        } else if (toast.type === 'action') {
          icon = <Zap className="w-5 h-5 text-cyan-400 shrink-0" />;
          borderClass = 'border-cyan-500/30';
          bgGlow = 'bg-cyan-500/10';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-xl dark:bg-[#12151f]/95 dark:text-slate-100 bg-white/95 text-slate-900 ${borderClass} animate-in fade-in slide-in-from-bottom-3`}
          >
            <div className={`p-1.5 rounded-lg ${bgGlow}`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs font-bold uppercase tracking-wider font-mono opacity-90">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
