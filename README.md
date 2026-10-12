# swayam404 — Interactive Developer Portfolio & 404 Multiverse Hub

A production-grade, zero-dependency developer portfolio and interactive 404 multiverse experience built for **Swayam Mohanty** (`swayam404`), styled after the visual aesthetic of [swayam.dev](https://www.swayam.dev).

Built using the **GSD (Get Shit Done)** framework with self-contained, offline-ready architecture that can be launched anytime on any environment.

---

## ⚡ Quick Start (Anytime, Zero Dependencies)

No `npm install` needed! Launch instantly using native Node.js:

```bash
cd /Users/atharvpaharia100/.gemini/antigravity/scratch/swayam404
npm start
# Or directly:
node server.js
```

Open your browser at **`http://localhost:3000`**.

To run automated verification tests:
```bash
npm test
```

---

## 🌌 Signature Highlights & Feature Breakdown

### 1. The 404 Multiverse Hub & Rescue Center
* **Route Simulator:** Clickable route badges to simulate missing URLs (`/quantum-tea`, `/lost-in-code`, `/dangling-pointer`, `/c2pa-verifier`) with live simulated core dumps and recovery teleportation.
* **Embedded CLI Terminal:** Fully operational hacker terminal with command parser:
  * `help`, `bio`, `skills`, `projects`, `radar`, `ping`, `quote`, `game`, `theme`, `rescue`, `clear`, `sudo`
* **Packet Rescue 2D Arcade Game:** Canvas-based arcade game where you catch `[200]` data packets and dodge `[404]` bugs using arrow keys, mouse, or touch controls.

### 2. Visual Identity & Design System
* **Obsidian & Neon Aesthetic:** Deep dark background (`#090d16`), 110px blur radial glows in Indigo (`#6366f1`), Violet (`#8b5cf6`), and Rose (`#ec4899`).
* **Micro-interactions:** Glassmorphic cards with glowing border hover states, floating tech badges (`React ⚛️`, `TypeScript 💙`, `Node.js 🟢`), and cosmic rotating monogram avatar.
* **Theme Modes:** Easily switch between **Dark**, **Cyberpunk Neon Overdrive**, and **Light** modes with persistent memory.

### 3. Comprehensive Professional Portfolio
* **Featured Projects:**
  1. **Agent Lab:** Educational ReAct loop framework built from scratch with FastAPI & React 19.
  2. **TruthLens:** Deepfake mitigation app using Ed25519 device signatures, Polygon blockchain, and C2PA 2.0.
  3. **Edge Command:** Real-time API gateway with sliding-window rate limiting via Cloudflare Workers & Durable Objects.
  4. **SnapCal:** Meal nutrition analyzer with Gemini 2.5 Flash vision and Deno Supabase Edge Functions.
  5. **DevPulse Blog:** Behind-the-scenes stories of tech giants built with Next.js and Neon Postgres.
  6. **Notebook Converter:** Polyglot service converting Jupyter notebooks to HTML/PDF.
* **Interactive SVG Tech Radar:** 6-axis polygon chart covering Frontend (95%), Architecture (88%), Backend (80%), Testing (80%), DevOps (75%), and Databases (75%).
* **10-Year Career Timeline:** Real milestones across Eltemate / Hogan Lovells (Amsterdam), UT Austin PGP AI/ML, Travix / Trip.com, Woolf University MS CS, SIXT R&D, Motorola Mobility, Publicis Sapient, and NIT Durgapur.
* **DevPulse Article Previews:** Highlights of stories including Jeff Bezos' SOA mandate and the first iPhone demo.

### 4. Interactive Utilities & Easter Eggs
* **Command Palette (`⌘K` / `Ctrl+K`):** Global keyboard shortcut modal to jump anywhere instantly.
* **Daily Philosophy Widget:** Refreshable developer quote widget with API fallback.
* **Konami Code Easter Egg:** Press `↑ ↑ ↓ ↓ ← → ← → B A` to trigger Cyberpunk Overdrive mode!
* **Contact Center:** Direct communication form with real-time validation and email integration.

---

## 📁 Project Structure & GSD Planning

```
swayam404/
├── .planning/               # GSD Project Framework
│   ├── PROJECT.md          # Project intent & vision
│   ├── REQUIREMENTS.md     # Scoped functional & non-functional requirements
│   ├── ROADMAP.md          # 5-phase delivery breakdown
│   └── STATE.md            # Execution state & history
├── public/                  # Frontend assets
│   ├── index.html          # Semantic HTML5 single-page application
│   ├── styles.css          # Design system, glassmorphism & themes
│   └── app.js              # Typing effect, 404 simulator, terminal, arcade & radar
├── server.js               # Zero-dependency Node.js HTTP server & API endpoints
├── test.js                 # Automated in-process test suite
├── package.json            # Configuration and run scripts
└── README.md               # Documentation & usage guide
```
