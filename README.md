# Code Brawl ⚔️

### *Rise Through Code. Compete. Climb. Dominate.*

A next-generation competitive coding platform and algorithmic battle arena where developers turn problem-solving into real-time head-to-head duels, climb global ascension ladders, and showcase verifiable coding speed.

---

## ✨ Overview

**Code Brawl** is a high-fidelity frontend product showcase for a real-time multiplayer competitive coding platform. It demonstrates the complete end-to-end user experience of an algorithmic gaming arena:

- ⚔️ **Live Algorithmic Brawls**: Real-time duel simulations with opponent progress tracking and sub-50ms test harness verification.
- 🎯 **1v1 Matchmaking Lobby**: Pre-match ready checks, rival matching, time limits, and ELO indicators.
- 📜 **Curated Mission Matrix**: Multi-tiered algorithmic problems spanning Easy, Medium, and Hard tiers with XP bounties.
- 🏆 **Ascension Leaderboards**: Dynamic Grandmaster, Diamond, and Gold divisions featuring player dossiers and radar skill graphs.
- 👁️ **Observer & Candidate Replay Mode**: Granular 5-step keystroke timeline scrubber demonstrating developer problem analysis, boundary drafting, offset self-correction, and final submission telemetry.
- ⌨️ **Command Center Engine (`⌘K` / `Ctrl+K`)**: Rapid search and navigation palette with keyboard shortcuts and a hidden diagnostic Easter egg.

> [!NOTE]
> **Showcase & Simulation Notice**: This repository represents a polished **frontend product prototype**. Interactive workflows (test assertions, rival progress simulation, ELO rank progression, and telemetry replay) are driven reactively via client state (`ShowcaseStateContext`) and structured data models to enable immediate, zero-infrastructure review.

---

## 🎮 Core Experience

### 1. Rise Through Code Hero ([`GameHero.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/GameHero.jsx))
- **Expansive 1440px Canvas**: Perfectly aligned 2-column layout matching the top navigation boundaries.
- **Interactive Ascension Path**: Quick-jump navigation buttons for *Challenges*, *Live Brawl*, *Rank Up*, and *Dominate*.
- **Live Preview Console**: Real-time Python snippet view (`live_arena.py`) with active duel metrics and 3 aligned platform statistic badges.

### 2. 1v1 Matchmaking Lobby ([`MatchmakingLobby.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/MatchmakingLobby.jsx))
- Side-by-side contender cards showcasing player avatar, current ELO rating, status checks, and time limits.
- Interactive **Rival Ready Check** button to cycle through simulated opponents (`Byte_Storm`, `Shadow_Core`, `Cyber_Viper`).

### 3. Live Coding Brawl Arena ([`BrawlArena.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/BrawlArena.jsx))
- **Multi-Language Selector**: Seamless switching between **Python 3.12**, **TypeScript 5.4**, **JavaScript ES2024**, **C++ 20**, **Rust 1.77**, and **Go**.
- **Interactive Code Editor**: Line-numbered syntax buffer with live code editing and instant boilerplate resetting.
- **Test Assertion Runner**: Sandbox test execution verifying test fixtures in 38ms.
- **Victory Celebration**: Solution submission triggers rank ascension (`#3` → `#1`), ELO gain (`+28`), and a confetti burst (`canvas-confetti`).

### 4. Mission Roster & Level Selector ([`GameMissions.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/GameMissions.jsx))
- Carousel selector covering algorithmic topics (Two Pointers, Monotonic Stacks, LRU Cache Design, Heaps, Dynamic Programming).
- **Mission Specs Drawer**: Sliding problem drawer with detailed problem descriptions, constraints, examples, and hints.

### 5. Ascension Leaderboard & Podium ([`GameRankings.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/GameRankings.jsx))
- Animated Grandmaster podium trio (Champion crown animation) and collapsible ranking ladder.
- **Player Dossier Drawer**: Interactive slide-out profile featuring radar skill metrics (Speed, Accuracy, Consistency, Concurrency, Complexity) and recent match records.

### 6. Candidate Observer Mode ([`GameSpectator.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/game/GameSpectator.jsx))
- **Interactive Keystroke Scrubber**: 5-step interactive timeline scrubber (`00:00` → `03:42`) demonstrating candidate code evolution, thought process, and test correction.
- **Full Candidate Report Modal**: Comprehensive evaluation breakdown with S-Tier rating metrics.

### 7. Game Command Palette ([`CommandPalette.jsx`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/components/common/CommandPalette.jsx))
- Global modal triggerable via `⌘K` / `Ctrl+K` or the navbar search box.
- Keyboard-navigable command list with search filtering, language selection, theme switching, and secret Easter egg unlock.

---

## 🎨 Design System

- **Two-Layer Atmospheric Background**:
  - **Layer 1**: Crisp 48px × 48px geometric arena grid lines (`rgba(124, 58, 237, 0.12)`).
  - **Layer 2**: Three large atmospheric radial glowing gradient blobs (Purple top-left at 75vw, Pink center at 60vw, Cyan bottom-right at 70vw).
- **Intentional Palette**:
  - Primary Action / Energy: **Cyan** (`#06b6d4`)
  - Duel Timer / Competitor: **Hot Pink** (`#ec4899`)
  - Brand Ascension: **Violet / Purple** (`#8b5cf6`)
  - Verification / Success: **Emerald** (`#10b981`)
  - Leaderboard ELO: **Amber** (`#f59e0b`)
- **Typography**: `Plus Jakarta Sans` for clean, punchy headings and `JetBrains Mono` for code buffers, status indicators, and telemetry readouts.
- **Subtle Animations**: Pure vertical floating keyframes with zero tilt, smooth button hover lifts, and glowing underline section indicators.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) (`^19.2.5`) + [React DOM](https://react.dev/) (`^19.2.5`)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (`^8.0.10`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`^4.2.4`) + PostCSS
- **Icons**: [Lucide React](https://lucide.dev/) (`^1.11.0`)
- **Animations & Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) (`^1.9.4`)
- **Routing & Architecture**: [React Router DOM](https://reactrouter.com/) (`^7.14.2`)

---

## 📁 Project Structure

```text
Acdyon_assessment/
├── DECISIONS.md                      # Engineering decision log & architecture records
├── README.md                         # Product documentation & setup guide
├── frontend/                         # Vite + React 19 Frontend Application
│   ├── index.html                    # HTML entry point with CodeBrawl favicon & typography
│   ├── package.json                  # Dependencies, scripts, and project metadata
│   ├── vite.config.js                # Vite build and server configuration
│   ├── public/
│   │   ├── favicon.svg               # Custom CodeBrawl squircle battle swords emblem
│   │   └── icons.svg                 # SVG sprite utilities
│   └── src/
│       ├── App.jsx                   # Application root with context providers
│       ├── main.jsx                  # React DOM mount entry
│       ├── index.css                 # Tailwind v4 directives, CSS variables, and arena-grid
│       ├── components/
│       │   ├── arena/                # Arena test harness & submission victory modals
│       │   ├── common/               # CommandPalette, ThemeToggle, ToastContainer, ProblemDrawer
│       │   ├── easteregg/            # Secret Recruiter Bunny matrix modal
│       │   ├── game/                 # GameHero, MatchmakingLobby, BrawlArena, GameMissions, GameRankings, GameSpectator
│       │   ├── layout/               # GameNav (sticky header), GameFooter, MobileMenu
│       │   ├── recruiter/            # CodeReplayScrubber, RecruiterModal, Candidate report
│       │   └── showcase/             # PlayerDossierDrawer, ChallengeMatrix, CombatPodium
│       ├── context/
│       │   ├── ShowcaseStateContext.jsx # Centralized reactive state for arena, submissions, ELO, drawers
│       │   ├── ThemeContext.jsx      # Light/Dark mode state with localStorage & 'T' keybinding
│       │   └── ToastContext.jsx      # Reactive toast notification queue
│       ├── data/
│       │   └── showcaseData.js       # Curated problems, starter boilerplate, competitors, leaderboard, replay frames
│       └── pages/
│           └── ShowcaseHome.jsx      # Main landing experience with layered background system
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUSRA786/Acdyon_assessment.git
cd Acdyon_assessment/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173`** to interact with the live arena.

### 4. Build for Production
```bash
npm run build
```
Generates a production build in `frontend/dist/` in ~1 second (~95kB gzipped JS).

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🖥️ Available Demo Experiences

| Feature | Implementation Status | Type | Description |
|---|---|---|---|
| **Landing & Hero Grid** | ✅ Implemented | Live Frontend | 1440px aligned layout, typography, 4 action paths, code preview |
| **Light & Dark Theme** | ✅ Implemented | Live Frontend | Colorful lavender light default, dark void mode, `T` shortcut, localStorage |
| **Navigation & Scroll** | ✅ Implemented | Live Frontend | Sticky header with height-aware offsets and `IntersectionObserver` active state |
| **Code Editor** | ✅ Implemented | Live Frontend | 6-language switcher, boilerplate loader, line numbering, reset buffer |
| **Test Runner** | ⚡ Simulated Demo | Client State | Simulates 38ms isolated sandbox assertion pass across 3 test cases |
| **Solution Submission** | ⚡ Simulated Demo | Client State | Triggers ELO climb (+28), rank shift (#3 → #1), confetti burst, and victory modal |
| **1v1 Matchmaking** | ⚡ Simulated Demo | Client State | Cycling rival cards, avatar checks, status transitions, countdown timer |
| **Mission Explorer** | ✅ Implemented | Live Frontend | Level carousel (Levels 1–6), difficulty badges, problem specs sliding drawer |
| **Leaderboard Ladder** | ✅ Implemented | Live Frontend | Top 3 podium, collapsible ladder rows, interactive Player Dossier drawer |
| **Candidate Replay** | ✅ Implemented | Live Frontend | 5-step interactive timeline scrubber with code evolution and terminal logs |
| **Command Palette** | ✅ Implemented | Live Frontend | `⌘K` / `Ctrl+K` modal with keyboard arrow navigation and quick actions |
| **Secret Easter Egg** | ✅ Implemented | Live Frontend | Search `"bunny"` in Command Palette to open Matrix recruiter console |
| **Toast System** | ✅ Implemented | Live Frontend | Reactive toast notifications on every state action |
| **Real Backend API** | ⏳ Planned | Future Roadmap | Remote WebSocket server, real-time database, auth, and Docker sandbox |

---

## 🎨 Themes

- **Light Mode (Default)**: Soft pastel lavender background (`#f5f3ff`), crisp purple grid lines (`rgba(124, 58, 237, 0.12)`), and glowing ambient accents.
- **Dark Mode**: Deep gaming void (`#07060f`) with high-contrast glowing neon highlights.
- **Switching**: Click the sun/moon button in the top navigation bar or press the **`T`** key anywhere on the page.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
|---|---|---|
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Toggle Command Palette | Global |
| <kbd>T</kbd> | Toggle Light / Dark Theme | Global (when not typing in text inputs) |
| <kbd>Esc</kbd> | Close active modal, drawer, or victory screen | Global |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Command Palette items | Command Palette |
| <kbd>↵ Enter</kbd> | Execute selected command | Command Palette |

---

## 📱 Responsive Layout

- **Desktop (1440px+)**: Expansive 2-column balanced grid with full code consoles and side-by-side contenders.
- **Tablet (768px – 1024px)**: Adaptive column stacking with compact navigation gaps and full touch support.
- **Mobile (375px – 640px)**: Collapses top links into a sliding mobile drawer (`MobileMenu.jsx`), full-width cards, and vertical action button stacks with zero horizontal overflow.

---

## 🔮 Future Roadmap

The following modules represent the architectural blueprint for scaling Code Brawl into a multi-tenant production system:

1. **Authentication & Identity**: OAuth 2.0 (GitHub / Google) and JWT-based session validation.
2. **Real-Time Multiplayer Engine**: Distributed WebSocket clusters (Node.js / Go) with Redis pub/sub room synchronizers.
3. **Sandboxed Code Execution Workers**: Isolated microservice workers (Docker / WebAssembly / Judge0) executing untrusted code securely in sub-50ms environments.
4. **Persistent Game State**: PostgreSQL database storing user match histories, rating distributions, and telemetry logs.
5. **Rating & Matchmaking Engine**: Server-side Glicko-2 / TrueSkill matchmaking queue with geographic latency clustering.
6. **Anti-Cheat Verification**: Real-time typing cadence analysis, paste-detection heuristics, and window-blur auditing.

---

## 📄 Engineering Decisions

For an in-depth review of the architectural trade-offs, UI/UX philosophy, and design system decisions, see:
👉 **[DECISIONS.md](./DECISIONS.md)**

---

## 📜 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
