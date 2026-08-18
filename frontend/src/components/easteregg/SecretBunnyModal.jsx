import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseStateContext';
import { useToast } from '../../context/ToastContext';
import { EASTER_EGG_DATA } from '../../data/showcaseData';
import { Terminal, CheckCircle2, Copy, Play, X, Sparkles, Shield, Lock } from 'lucide-react';

export const SecretBunnyModal = () => {
  const { activeDrawer, closeAllDrawers, setActiveProblem, problems } = useShowcase();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (activeDrawer !== 'easteregg') return null;

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(EASTER_EGG_DATA.token);
    setCopied(true);
    showToast({
      title: '🐰 Secret Token Copied',
      description: `Token: ${EASTER_EGG_DATA.token} saved to clipboard.`,
      type: 'success'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnterSecretArena = () => {
    setActiveProblem(problems[2] || problems[0], true); // LRU Cache or Two Sum
    closeAllDrawers();
    showToast({
      title: '🐰 Secret Recruiter Duel Initialized',
      description: 'Loaded S-Tier LRU Cache challenge in high-speed sandbox.',
      type: 'action'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={closeAllDrawers}
    >
      <div 
        className="w-full max-w-2xl rounded-3xl border border-emerald-500/40 bg-[#050906] text-emerald-400 font-mono shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-emerald-500/30 bg-emerald-950/40">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 animate-ping inline-block" />
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              {EASTER_EGG_DATA.codename}
            </span>
          </div>

          <button 
            onClick={closeAllDrawers}
            className="p-1 rounded text-emerald-500 hover:text-emerald-200 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-5 text-xs leading-relaxed">
          {/* ASCII Rabbit Art */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <pre className="text-emerald-400 font-bold text-sm select-none leading-none">
              {EASTER_EGG_DATA.asciiRabbit}
            </pre>
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  STATUS: 200 OK
                </span>
                <span className="text-[10px] text-emerald-500 font-mono">
                  MODE: RECRUITER BUNNY
                </span>
              </div>
              <h3 className="text-base font-black text-emerald-200 uppercase tracking-tight">
                Secret Easter Egg Unlocked
              </h3>
              <p className="text-emerald-400/80 text-[11px]">
                &ldquo;You found the hidden loop in the matrix. Real engineers inspect the console and explore shortcuts.&rdquo;
              </p>
            </div>
          </div>

          {/* System Diagnostic Logs */}
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-black/60 font-mono text-[11px] space-y-1 max-h-40 overflow-y-auto">
            {EASTER_EGG_DATA.systemLogs.map((log, i) => (
              <p key={i} className="text-emerald-400/90 font-medium">
                {log}
              </p>
            ))}
          </div>

          {/* Fast-Track Token Box */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-500/80 block">
                Direct Fast-Track Recruiter Token
              </span>
              <span className="text-sm font-bold text-emerald-300 tracking-wider">
                {EASTER_EGG_DATA.token}
              </span>
            </div>

            <button
              onClick={handleCopyToken}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Token'}
            </button>
          </div>
        </div>

        {/* Terminal Footer Actions */}
        <div className="p-4 border-t border-emerald-500/20 bg-emerald-950/40 flex flex-col sm:flex-row gap-3">
          <button
            onClick={closeAllDrawers}
            className="px-4 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/10 transition-colors"
          >
            Return to Matrix
          </button>
          <button
            onClick={handleEnterSecretArena}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch Secret S-Tier Duel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretBunnyModal;
