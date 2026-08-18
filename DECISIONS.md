# Code Brawl — Engineering Decisions

## Key Technical Questions

### 1. Why this approach over the obvious alternative?

Instead of building out a full backend with a database, authentication, matchmaking, and code execution environment, I chose to build Code Brawl as an interactive frontend-focused product showcase on React using sample data.

My primary reason for doing this was the limited time allocated for this project and my desire to showcase the end product experience. Rather than spend the majority of the time developing backend features and infrastructure such as APIs, databases, matchmaking and validation, code execution, user authentication and profile management, I concentrated on creating fully interactive versions of the most critical end-user flows. The use of sample data enables to clearly demonstrate and interactive highlight of features like challenges, matchmaking, live coding, ranking boards, match results, recruitment/observer views, etc without having a functional production backend.

---

### 2. One trade-off made under the time limit

The primary trade-off made due to the limited time was to go with an interactive and polished product demonstration (frontend) at the expense of providing all core backend functionality (including real multiplayer matchmaking, persistence, actual code execution and real time server updates). The interfaces demonstrate features of Code Brawl such as the landing page, match results display, challenge view, and the code arena. As with using sample data for an interactive demo application, each of these interactive components simulates core functionality which wouldn’t be ready without a production backend. In a real week, I would implement all the backend logic, connect all the current user interfaces to an actual backend API, complete user authentication, and potentially even host live tests with some beta users to prove out the functionality.

---

### 3. Where did you use AI tools and what did you personally verify/change afterward?

AI was utilized predominantly during the design and frontend development phases. A few general purpose resources like Lapa & Dribbble were useful to draw inspiration for things like layout, typography, color palettes, cards, transitions etc.. For UI elements like Cards, UI Interactions & layout structures of different components, I used AI to experiment with various UI concepts and generate suggestions on the implementation details. 

These suggestions were scrutinized on an individual basis and modifications were made with regards to layout structure, spacing, positioning, color contrasts, typography, transitions, animations, responsive layout, interaction patterns and responsiveness in general, when the generated suggestions did not adhere to the vision for Code Brawl or felt like ‘non human designs’. 

Most of the critical user flows were hand coded and inspected, to maintain visual and functional cohesion with the product.

---

## Detailed Architectural Decisions

## 1. Project Vision

**Code Brawl** is a next-generation multiplayer competitive coding arena designed to transform algorithmic problem solving into high-energy, real-time head-to-head duels. 

The current codebase is implemented as a **high-fidelity frontend product showcase**. Its primary purpose is to establish and validate:
- The complete user experience for competitive coding duels, matchmaking, problem exploration, and candidate spectator replay.
- An original, gaming-oriented visual design system that breaks away from generic corporate SaaS dashboards while maintaining crisp readability.
- Client-side reactive workflows that demonstrate the full end-to-end user journey without requiring an active backend or complex infrastructure during review.

---

## 2. Frontend-First Architecture

### Decision: Client-Driven Interactive Product Prototype

#### Context
A competitive coding platform involves complex moving parts: distributed WebSocket servers, isolated container execution sandboxes (e.g., Docker/Piston/Judge0), database persistence, and rating engines. Building and orchestrating these infrastructure layers upfront slows down rapid design iteration, product validation, and visual storytelling.

#### Decision
Prioritize a frontend-first architecture using **React 19**, **Vite 8**, and **Tailwind CSS v4**. All interactive modules (multi-language code editor, test assertions runner, 1v1 lobby, ladder podium, spectator playback, and command palette) operate via centralized React context state (`ShowcaseStateContext`) and rich local data models.

#### Rationale
- Allows immediate, zero-dependency deployment and local demonstration via a lightweight Vite dev server (`npm run dev`).
- Enables thorough usability testing of UI workflows, micro-animations, keyboard navigation, and theme switches.
- Establishes clean state contracts that can be mapped 1:1 to future WebSocket events and REST/GraphQL APIs.

#### Trade-offs
- Execution telemetry, test verification, and opponent actions are client-side simulations rather than real remote Docker runs.
- Game state resets on browser hard-refresh (except theme preference and easter egg unlocks stored in `localStorage`).

#### Current Status
`Implemented` (Frontend Prototype)

---

## 3. Demo / Sample Data Strategy

### Decision: Curated Mock Problem Suites & Competitor Telemetry

#### Context
To demonstrate the platform's features (such as live opponent tracking, multi-language boilerplate swapping, test harness assertions, leaderboard podiums, and recruiter keystroke replay), realistic and consistent algorithmic data was needed.

#### Decision
Created a structured dataset ([`src/data/showcaseData.js`](file:///d:/playgroun2/Acdyon_assessment/frontend/src/data/showcaseData.js)) containing:
1. **Curated Problem Matrix**: Multi-difficulty challenges (`Two Sum II`, `Valid Parentheses`, `LRU Cache Design`, `Merge k Sorted Lists`, `Trapping Rain Water`, `Coin Change`) with full problem descriptions, constraints, examples, hints, test assertions, and starter boilerplate for **6 languages** (Python 3.12, TypeScript 5.4, JavaScript ES2024, C++ 20, Rust 1.77, Go).
2. **Simulated Competitor Roster**: Competitor profiles with realistic rating distributions, avatars, live typing statuses, and dynamic progress timers.
3. **Ascension Leaderboard**: Grandmaster, Diamond, and Gold tiers with ELO ratings, win rates, radar skill metrics, and match histories.
4. **Recruiter Keystroke Replay Frames**: 5 discrete timeline milestones (`00:00` to `03:42`) demonstrating candidate problem breakdown, loop drafting, test harness self-correction, and final submission.

#### Rationale
Ensures reviewers and users experience an authentic live arena environment with rich data visualization and immediate responsiveness.

#### Trade-offs
No permanent cloud persistence; all scores and state adjustments reflect the current session.

#### Current Status
`Implemented` (Rich Simulation)

---

## 4. Navigation Architecture

### Decision: Sticky Header with Dynamic Height-Aware Scroll Offsets

#### Context
A sticky navigation header (`position: sticky; top: 0; z-index: 50`) presents a common scroll-destination bug: jumping to page anchors (`#match-section`, `#challenges-section`, etc.) causes the top of the destination heading to land directly underneath the navbar, obscuring the section title and status badge. Furthermore, hardcoded pixel offsets break when viewport width or navbar padding changes.

#### Decision
1. **Dynamic Scroll Calculation**: Measured the rendered navbar height dynamically via `navbar.getBoundingClientRect().height` and applied calculated scroll destinations:
   $$\text{Target Position} = \text{Element Top} + \text{Page Offset} - (\text{Navbar Height} + \text{Breathing Room})$$
2. **CSS `scroll-margin-top`**: Added explicit `scroll-margin-top: calc(80px + 16px)` to all destination section elements in `src/index.css`.
3. **Active Section Tracking**: Integrated `IntersectionObserver` with `rootMargin: '-80px 0px -40% 0px'` to highlight active navigation items based on the section currently visible in the viewport.
4. **Scroll Container Fix**: Removed `overflow-x: hidden` from ancestor wrappers that previously broke CSS sticky positioning.

#### Rationale
Provides pixel-perfect scroll landings across all desktop and mobile viewport sizes without arbitrary magic numbers.

#### Trade-offs
Requires DOM element ID coordination between navigation links and section containers.

#### Current Status
`Implemented`

---

## 5. Theme Architecture

### Decision: Light Mode as Colorful Default + Intentional Dark Void Mode

#### Context
Many developer tools default to monochrome dark themes or plain, sterile white pages. For Code Brawl, the goal was an energetic, gaming-inspired aesthetic that feels vibrant in both light and dark settings.

#### Decision
1. **Light Mode (Default)**: Built around a soft pastel lavender base (`--background: #f5f3ff`) layered with subtle purple grid lines (`rgba(124, 58, 237, 0.12)`) and soft radial color auras (cyan, pink, purple).
2. **Dark Mode**: Configured a deep void theme (`--background: #07060f`) with high-contrast neon accents (`--grid-color: rgba(139, 92, 246, 0.10)`).
3. **State Persistence & Keybinding**: Synchronized theme selection to `localStorage` (`codearena_theme`), dynamically toggling `.dark` / `.light` on `document.documentElement` with global `T` hotkey support (disabled when typing inside inputs/editors).

#### Rationale
Light mode is bright, approachable, and playful without being blinding or corporate. Dark mode provides low-light gaming contrast while sharing unified CSS color tokens.

#### Trade-offs
Dual-theme styling requires testing contrast across all buttons, badges, and card surfaces in both modes.

#### Current Status
`Implemented`

---

## 6. Visual Design System

### Decision: 1440px Expansive Grid with 2-Layer Background Atmosphere

#### Context
Generic SaaS layouts often feel narrow, boxed in, or cluttered with robotic dashboard panels. The landing page needed to deliver an expansive, cinematic arena atmosphere matching the headline **"RISE THROUGH CODE."**

#### Decision
1. **1440px Aligned Canvas**: Structured both the Navbar and the Hero inside a unified `max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12` container, ensuring the left edge of the logo aligns with the hero headline and the right edge of the CTA aligns with the hero console.
2. **Two-Layer Background System**:
   - **Layer 1**: Continuous full-page 48px × 48px geometric arena grid (`fixed inset-0 pointer-events-none z-0 arena-grid`).
   - **Layer 2**: Three large atmospheric radial glowing gradient blobs (Purple top-left at 75vw, Pink center at 60vw, Cyan bottom-right at 70vw).
   - **Layer 3**: Interactive content layer (`relative z-10`).
3. **Color Palette**: Cyan `#06b6d4` (Action / Primary), Hot Pink `#ec4899` (Duel / Timer), Deep Purple/Violet `#8b5cf6` (Ascension / Brand), Emerald `#10b981` (Verification / Passing), and Amber `#f59e0b` (ELO / Podium).
4. **Custom Platform Squircle Favicon**: Created a custom SVG emblem featuring a radiant cyan-to-violet squircle with crossed battle swords, replacing the default Vite icon.

#### Rationale
Creates an atmospheric, gaming-native aesthetic that remains clean, modern, and readable.

#### Trade-offs
Careful z-index layering was required to prevent glowing background blobs from obscuring text or intercepting click events.

#### Current Status
`Implemented`

---

## 7. Animation Philosophy

### Decision: Subdued, Performance-First CSS Micro-Interactions

#### Context
Excessive neon glows, bouncing elements, or complex WebGL animations can distract users, degrade performance, and feel gimmicky.

#### Decision
Implemented intentional, subtle animations using pure CSS keyframes:
- **Uniform Vertical Floating**: Headline and badge elements use pure vertical translation (`translateY(0px)` → `translateY(-6px)` → `translateY(0px)`) with zero tilt/rotation to preserve typographic alignment.
- **Button Micro-Interactions**: CTA buttons translate 1–2px upward with smooth arrow translation (`group-hover:translate-x-1`) and soft glow expansion.
- **Victory Particle Burst**: Integrated `canvas-confetti` upon successful challenge submission.
- **Pulse Indicators**: Live duel and spectator nodes feature subtle `animate-pulse` and `animate-ping` indicators.

#### Rationale
Adds life and physical polish to the competitive arena interface while running at a smooth 60fps with zero layout thrashing.

#### Trade-offs
Avoided 3D libraries (Three.js/WebGL) to keep initial bundle size under 100kB gzipped.

#### Current Status
`Implemented`

---

## 8. Interaction Strategy

### Decision: Interactive Demonstrations Over Alert Placeholders

#### Context
Clicking secondary actions or buttons on many prototype sites yields empty handlers, broken dead-ends, or jarring `window.alert()` popups.

#### Decision
Every button, card, and trigger opens a complete, contextually relevant frontend experience:
- **Command Palette (`⌘K` / `Ctrl+K`)**: Searchable command modal supporting fuzzy filtering, keyboard arrow navigation (`↑`/`↓`/`↵`), language selection, theme switching, and quick jump actions.
- **Secret Recruiter Console (Easter Egg)**: Unlocked by searching `"bunny"` or `"matrix"` in the Command Palette, opening a terminal interface with diagnostics and token generation.
- **Mission Specs Drawer**: Clicking "View Mission Specs" opens a detailed sliding problem drawer with constraints, examples, and hints.
- **Player Dossier Drawer**: Clicking any leaderboard gladiator opens an interactive player profile with radar skill telemetry and recent duel records.
- **Recruiter Report Modal**: Clicking "Full Candidate Report" opens an evaluation breakdown with score cards and keystroke timeline replay.
- **Interactive Sandbox & Submission**: Clicking "Run Tests" executes test assertions in 38ms; clicking "Submit Solution" verifies the code, climbs user rank (#3 → #1), updates ELO (+28), and triggers celebration confetti.

#### Rationale
Creates an engaging, portfolio-grade product experience where every interactive element functions as intended.

#### Trade-offs
Simulated backend response times (38ms–1200ms `setTimeout`) to replicate real network conditions.

#### Current Status
`Implemented`

---

## 9. Responsive Design

### Decision: Mobile-First Adaptive Grid Layouts

#### Context
Competitive coding interfaces feature wide code consoles, multi-column problem splits, and dense tables that frequently break or cause horizontal scrollbars on smaller viewports.

#### Decision
- **Hero & Navbar**: Seamlessly transitions from a 2-column 50/50 desktop grid (`grid lg:grid-cols-2`) to a stacked single-column layout on tablet and mobile.
- **Navigation**: Collapses desktop links into a sliding mobile drawer (`MobileMenu.jsx`) on screens smaller than `1024px` (`lg`).
- **Code Console & Tables**: Code editor and telemetry cards utilize overflow containment (`overflow-x-auto`) and flexible flex wrapping to ensure zero horizontal viewport blowout.

#### Rationale
Guarantees a clean, unclipped experience from 375px mobile screens up to 4K ultra-wide monitors.

#### Trade-offs
Mobile users interact with a simplified single-pane code view rather than a side-by-side split editor.

#### Current Status
`Implemented`

---

## 10. Accessibility & UX Considerations

### Decision: Semantic Structure, Focus States & Keyboard Controls

#### Context
Accessible gaming platforms must support keyboard power users and provide clear feedback during rapid state changes.

#### Decision
- **Keyboard Shortcuts**: `Cmd+K` / `Ctrl+K` for Command Palette, `T` for theme toggle, `ESC` to close any modal/drawer, and arrow keys for command list navigation.
- **ARIA & Labels**: Explicit `aria-label` attributes on search inputs, close buttons, theme toggles, and code textareas.
- **Focus & Contrast**: Intentional high-contrast color ratios in both light and dark modes, with visible focus rings on interactive elements.
- **Toast Feedback**: Centralized toast provider (`ToastContext`) giving visual feedback for every user action (language switch, test run, rank change, code reset).

#### Rationale
Enables fluid navigation for developers who rely heavily on keyboard shortcuts.

#### Trade-offs
Monaco full accessibility tree is replaced with lightweight, accessible semantic textareas in the demo arena.

#### Current Status
`Implemented`

---

## 11. Performance Decisions

### Decision: Lightweight Zero-Asset Architecture

#### Context
Heavy video assets, large raster backgrounds, or excessive third-party dependencies inflate bundle sizes and slow initial page loads.

#### Decision
- **Pure CSS Backgrounds**: Arena grid and glowing atmospheric blobs are generated via CSS linear/radial gradients, eliminating external image requests.
- **Optimized Bundle**: Total production build outputs to ~95kB gzip JS and ~14kB gzip CSS with zero bloated asset pipelines.
- **Sub-Second Build**: Vite 8 builds all 1,750 modules in ~1.0s.

#### Rationale
Delivers near-instant initial page loads, optimal Core Web Vitals, and smooth 60fps animations.

#### Trade-offs
Relies on modern CSS gradient and backdrop-filter support in evergreen browsers.

#### Current Status
`Implemented`

---

## 12. Future Architecture (Roadmap)

The following capabilities are **not currently implemented** and represent the planned roadmap for a full production transition:

| Component | Future Architecture Plan | Status |
|---|---|---|
| **User Authentication** | JWT + OAuth 2.0 (GitHub / Google) session management | `Planned (Future)` |
| **Real Multiplayer Engine** | Node.js / Go WebSocket servers with Redis pub/sub match state sync | `Planned (Future)` |
| **Code Execution Sandbox** | Isolated Docker / WebAssembly worker execution service (Judge0 / Piston) | `Planned (Future)` |
| **Persistent Database** | PostgreSQL for relational game data, match logs, and user ELO history | `Planned (Future)` |
| **Matchmaking Algorithm** | Real-time Glicko-2 / TrueSkill matchmaking queue with latency clustering | `Planned (Future)` |
| **Anti-Cheat Telemetry** | Real-time keystroke variance, paste-detection, and tab-focus auditing | `Planned (Future)` |
