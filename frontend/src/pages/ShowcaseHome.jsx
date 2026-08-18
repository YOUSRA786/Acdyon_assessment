import React from 'react';
import { useShowcase } from '../context/ShowcaseStateContext';
import GameNav from '../components/layout/GameNav';
import GameHero from '../components/game/GameHero';
import MatchmakingLobby from '../components/game/MatchmakingLobby';
import BrawlArena from '../components/game/BrawlArena';
import GameMissions from '../components/game/GameMissions';
import GameRankings from '../components/game/GameRankings';
import GameSpectator from '../components/game/GameSpectator';
import GameFooter from '../components/layout/GameFooter';
import CommandPalette from '../components/common/CommandPalette';
import ProblemDrawer from '../components/common/ProblemDrawer';
import MobileMenu from '../components/layout/MobileMenu';
import SecretBunnyModal from '../components/easteregg/SecretBunnyModal';
import ToastContainer from '../components/common/ToastContainer';

export const ShowcaseHome = () => {
  return (
    <div 
      className="relative w-full min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500/30 overflow-x-clip"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      {/* ========================================================================= */}
      {/* LAYER 1: VISIBLE CONTINUOUS ARENA GRID (Fixed 48px x 48px geometric grid) */}
      {/* ========================================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 arena-grid opacity-100" 
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* LAYER 2: THREE LARGE ATMOSPHERIC RADIAL GLOW BLOBS                         */}
      {/* ========================================================================= */}
      {/* 1. Purple Glow (Top-Left) */}
      <div 
        className="fixed -top-24 -left-24 w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0.06) 45%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        aria-hidden="true"
      />

      {/* 2. Pink Glow (Center / Behind Hero) */}
      <div 
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.16) 0%, rgba(236, 72, 153, 0.04) 45%, transparent 65%)',
          filter: 'blur(45px)',
        }}
        aria-hidden="true"
      />

      {/* 3. Cyan Glow (Bottom-Right) */}
      <div 
        className="fixed bottom-0 -right-20 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* LAYER 3: ALL CONTENT & MODULES (Positioned cleanly above background)       */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col w-full">
        {/* 1. Game Navigation (Sticky Header) */}
        <GameNav />

        {/* 2. Rise Through Code Game Hero with Progression Roadmap */}
        <GameHero />

        {/* 3. 1v1 Matchmaking & Lobby (YOU vs RIVAL) */}
        <MatchmakingLobby />

        {/* 4. Live Coding Brawl Arena (Focused Gameplay) */}
        <BrawlArena />

        {/* 5. Mission Roster & Level Selector */}
        <GameMissions />

        {/* 6. Ascension Leaderboard & Podium */}
        <GameRankings />

        {/* 7. Observer & Candidate Playback Mode */}
        <GameSpectator />

        {/* 8. Game Footer */}
        <GameFooter />
      </div>

      {/* Overlays & Drawers */}
      <CommandPalette />
      <ProblemDrawer />
      <MobileMenu />
      <SecretBunnyModal />
      <ToastContainer />
    </div>
  );
};

export default ShowcaseHome;
