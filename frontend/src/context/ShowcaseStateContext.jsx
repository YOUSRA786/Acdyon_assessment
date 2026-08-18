import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROBLEMS, LIVE_ARENA_COMPETITORS, LEADERBOARD_USERS, RECRUITER_CANDIDATE_DATA } from '../data/showcaseData';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

const ShowcaseStateContext = createContext();

export const useShowcase = () => useContext(ShowcaseStateContext);

export const ShowcaseProvider = ({ children }) => {
  const { showToast } = useToast();

  // Active Arena Problem & Code
  const [activeProblem, setActiveProblem] = useState(PROBLEMS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(PROBLEMS[0].boilerplate.python);

  // Execution & Submission State
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  // User Stats (Simulated Reactive State)
  const [userStats, setUserStats] = useState({
    elo: 1840,
    xp: 4820,
    rank: 3,
    prevRank: 3,
    wins: 28,
    matchesPlayed: 36,
    streak: 6
  });

  // Competitors Simulation
  const [competitors, setCompetitors] = useState(LIVE_ARENA_COMPETITORS);
  const [isOpponentSplitView, setIsOpponentSplitView] = useState(false);

  // Countdown Timer in seconds (08:42 -> 522s)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(522);

  // Active Modals and Drawers
  const [activeDrawer, setActiveDrawer] = useState(null); // 'problem' | 'player' | 'recruiter' | 'easteregg' | 'commandPalette' | 'mobileMenu'
  const [drawerData, setDrawerData] = useState(null);

  // Easter Egg Unlock State
  const [isBunnyUnlocked, setIsBunnyUnlocked] = useState(() => {
    return localStorage.getItem('codearena_bunny_unlocked') === 'true';
  });

  // Keep code in sync when language or problem changes
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    const boilerplate = activeProblem.boilerplate[lang] || `// Solution for ${activeProblem.title} in ${lang}`;
    setCode(boilerplate);
    setTestResults(null);
    showToast({
      title: `Language: ${lang.toUpperCase()}`,
      description: 'Loaded default solution boilerplate.',
      type: 'action'
    });
  };

  const handleSelectProblem = (problem, shouldScroll = true) => {
    setActiveProblem(problem);
    const boilerplate = problem.boilerplate[selectedLanguage] || problem.boilerplate.python;
    setCode(boilerplate);
    setTestResults(null);
    setTimeRemainingSeconds(522);

    if (shouldScroll) {
      const arenaElem = document.getElementById('live-arena-section');
      if (arenaElem) {
        arenaElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    showToast({
      title: 'Arena Challenge Loaded',
      description: `${problem.title} (${problem.difficulty})`,
      type: 'info'
    });
  };

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic competitor status updates (creates an authentic live arena feeling)
  useEffect(() => {
    const interval = setInterval(() => {
      setCompetitors(prev => {
        return prev.map(comp => {
          if (comp.id === 'user-self') return comp;
          const randomChance = Math.random();
          if (randomChance > 0.6) {
            const statuses = [
              'Analyzing loop invariants...',
              'Running test case 1 & 2...',
              'Optimizing branch prediction...',
              'Refactoring variable scopes...',
              'Compiling test harness...',
              'Typing next partition block...'
            ];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const newProgress = Math.min(100, Math.max(30, comp.progress + Math.floor(Math.random() * 5) - 2));
            return { ...comp, status: newStatus, progress: newProgress };
          }
          return comp;
        });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Run Test Cases Action
  const runTestCases = useCallback(() => {
    setIsRunningTests(true);
    setTestResults({ status: 'running', logs: ['Executing isolated test harness...'] });

    setTimeout(() => {
      const cases = activeProblem.testCases.map((tc, idx) => ({
        ...tc,
        passed: true,
        executionTime: `${12 + idx * 4}ms`,
        memoryUsed: '14.2MB'
      }));

      setTestResults({
        status: 'passed',
        totalPassed: cases.length,
        totalCases: cases.length,
        runtime: '38ms',
        runtimePercentile: '98.4%',
        memory: '14.2MB',
        memoryPercentile: '96.1%',
        cases,
        timestamp: new Date().toLocaleTimeString()
      });

      setIsRunningTests(false);

      showToast({
        title: 'All Test Cases Passed',
        description: `3/3 assertions validated in 38ms.`,
        type: 'success'
      });
    }, 900);
  }, [activeProblem, showToast]);

  // Submit Solution Action
  const submitSolution = useCallback(() => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const earnedXP = activeProblem.xpReward || 120;
      const oldRank = userStats.rank;
      const newRank = 1;
      const oldElo = userStats.elo;
      const newElo = oldElo + 28;

      setUserStats(prev => ({
        ...prev,
        prevRank: oldRank,
        rank: newRank,
        elo: newElo,
        xp: prev.xp + earnedXP,
        wins: prev.wins + 1,
        matchesPlayed: prev.matchesPlayed + 1,
        streak: prev.streak + 1
      }));

      // Trigger Confetti
      try {
        confetti({
          particleCount: 160,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#38bdf8']
        });
      } catch (err) {
        console.log('Confetti burst');
      }

      setLastSubmission({
        problemTitle: activeProblem.title,
        difficulty: activeProblem.difficulty,
        xpGained: earnedXP,
        eloGained: 28,
        oldRank,
        newRank,
        timeSolved: '03:18',
        runtime: '38ms',
        memory: '14.2MB'
      });

      setShowVictoryModal(true);

      showToast({
        title: 'SUBMISSION ACCEPTED! +120 XP',
        description: `Rank climbed #${oldRank} → #${newRank}! Rating +28 ELO.`,
        type: 'rank'
      });
    }, 1200);
  }, [activeProblem, userStats.elo, userStats.rank, showToast]);

  // Reset Starter Code
  const resetCode = useCallback(() => {
    const boilerplate = activeProblem.boilerplate[selectedLanguage] || '';
    setCode(boilerplate);
    setTestResults(null);
    showToast({
      title: 'Editor Reset',
      description: 'Restored original starter template.',
      type: 'action'
    });
  }, [activeProblem, selectedLanguage, showToast]);

  // Open Drawer Handlers
  const openProblemDrawer = (problem) => {
    setDrawerData(problem);
    setActiveDrawer('problem');
  };

  const openPlayerDossier = (player) => {
    setDrawerData(player);
    setActiveDrawer('player');
  };

  const openRecruiterMode = () => {
    setActiveDrawer('recruiter');
  };

  const openEasterEgg = () => {
    setIsBunnyUnlocked(true);
    localStorage.setItem('codearena_bunny_unlocked', 'true');
    setActiveDrawer('easteregg');
  };

  const closeAllDrawers = () => {
    setActiveDrawer(null);
    setDrawerData(null);
  };

  // Keyboard shortcut listener for Cmd/Ctrl+K and Escape
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveDrawer(prev => (prev === 'commandPalette' ? null : 'commandPalette'));
      } else if (e.key === 'Escape') {
        if (showVictoryModal) setShowVictoryModal(false);
        else closeAllDrawers();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [showVictoryModal]);

  // Tasteful Easter Egg console hint on boot
  useEffect(() => {
    console.log(
      '%c🐰 CodeArena [SYS_DIAGNOSTICS] %cFollow the white rabbit... Try Ctrl+K / Cmd+K and search "bunny" or unlock recruiter telemetry.',
      'color: #10b981; font-weight: bold; background: #090a0f; padding: 4px 8px; border-radius: 4px; border: 1px solid #10b981;',
      'color: #38bdf8; font-weight: 500;'
    );
  }, []);

  return (
    <ShowcaseStateContext.Provider
      value={{
        problems: PROBLEMS,
        activeProblem,
        setActiveProblem: handleSelectProblem,
        selectedLanguage,
        setLanguage: handleLanguageChange,
        code,
        setCode,
        runTestCases,
        isRunningTests,
        testResults,
        submitSolution,
        isSubmitting,
        showVictoryModal,
        setShowVictoryModal,
        lastSubmission,
        resetCode,
        userStats,
        competitors,
        timeRemainingSeconds,
        isOpponentSplitView,
        setIsOpponentSplitView,
        activeDrawer,
        setActiveDrawer,
        drawerData,
        openProblemDrawer,
        openPlayerDossier,
        openRecruiterMode,
        openEasterEgg,
        closeAllDrawers,
        isBunnyUnlocked
      }}
    >
      {children}
    </ShowcaseStateContext.Provider>
  );
};
