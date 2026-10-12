# Requirements Specification: swayam404

## Functional Requirements
- **FR-1 [Hero & Bio]:** Hero section with typed role animator ("Forward Deployed Engineer · Full-Stack Engineer · Amsterdam"), floating code cards, CTA buttons ("Let's Connect", "Inspect 404 Hub", "Download CV"), and live social links.
- **FR-2 [Interactive 404 Multiverse Hub]:**
  - Route switcher allowing visitors to simulate broken URLs (`/lost`, `/quantum-void`, `/coffee-overflow`) and witness custom interactive recovery mechanisms.
  - Interactive Developer Terminal emulator with tab completion, history, and system commands (`help`, `about`, `skills`, `projects`, `clear`, `matrix`, `game`).
  - "Packet Rescue" 2D canvas mini-game where users catch falling data packets while dodging 404 bugs.
- **FR-3 [Skills & Tech Radar]:**
  - Categorized skill grid (Frontend, Backend, AI/ML, Testing, Cloud, Build & DevOps, Architecture, Tools).
  - Interactive SVG Tech Radar chart with 6 axes (Frontend, Backend, DevOps, Database, Testing, Architecture) and proficiency bars.
- **FR-4 [Featured Projects Catalog]:**
  - 6 featured projects with tech badges, live demo links, repository status (public vs under NDA), and architectural notes:
    1. Agent Lab (FastAPI, React 19, ReAct loop, Claude/OpenRouter, Docker)
    2. TruthLens (Flutter, Riverpod, Ed25519, Polygon, C2PA 2.0)
    3. Edge Command (Cloudflare Workers, Durable Objects, D1, KV, R2)
    4. SnapCal (React Native, Expo, Supabase, Gemini 2.5 Flash)
    5. DevPulse Blog (Next.js, Prisma, Neon Postgres, MDX)
    6. Notebook Converter (Next.js, FastAPI, nbconvert, xhtml2pdf)
- **FR-5 [Work Experience & Education Timeline]:**
  - Chronological interactive timeline from 2012 to Present with expandable details, company badges, verification links, and spotlights.
- **FR-6 [Latest Articles / DevPulse Insights]:**
  - Reading cards for featured articles ("The API That Ate the Company", "The Demo That Almost Failed", "The Mutiny That Saved Linux", "The Query That Changed Everything").
- **FR-7 [Interactive Utilities & Easter Eggs]:**
  - Command Palette (`⌘K` / `Ctrl+K`) for lightning-fast site navigation.
  - Daily Inspiration Quote generator widget with refresh.
  - Konami Code trigger (`↑ ↑ ↓ ↓ ← → ← → B A`) unlocking cyberpunk overdrive neon mode.
  - Working contact form with real-time field validation and email modal.
- **FR-8 [Anytime Portability]:**
  - Zero required internet connection or npm build steps to view; bundled lightweight Node server with zero external npm dependencies.

## Non-Functional Requirements
- **NFR-1 [Performance]:** 60fps animations, instant first contentful paint, zero lag.
- **NFR-2 [Responsive Design]:** Flawless presentation across mobile (375px+), tablet, and desktop (1920px+).
- **NFR-3 [Accessibility]:** Semantic HTML5, keyboard navigational focus, proper ARIA attributes.
