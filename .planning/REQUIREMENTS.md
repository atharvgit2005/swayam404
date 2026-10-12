# Requirements Specification: swayam404

## Functional Requirements
- **FR-1 [Neo-Brutalist Branding & Stitch Theme]:** Sticky header with `404` brutal box badge, dark/light theme switch, GitHub link, mobile hamburger drawer, and high-contrast typography (`Space Grotesk` + `Inter`).
- **FR-2 [Hero Section & Value Proposition]:** Highlighting 100% Free Web AI Bridge (ChatGPT, Claude, Gemini Web), Zero API Keys Required, 357 Passing Tests Badge, and instant CTA buttons.
- **FR-3 [Safety Protocols & The Canteen Rule]:** Humorous yet vital rules for college students (WhatsApp rule, Attendance law, Strict Zero Auto-Submit, Canteen pendrive rule).
- **FR-4 [Interactive In-Page Extension Simulator]:**
  - Left panel: Real SWAYAM portal assignment simulation (Course tag, question title, radio inputs, Next Quiz switcher).
  - Right panel: Extension popup emulator with provider tabs (ChatGPT, Claude, Gemini Web), terminal activity logs, "Scan Quiz DOM", "Copy Prompt", and "Fill Reviewed Answers".
- **FR-5 [Superpowers Feature Grid]:**
  - 100% Free Web AI Bridge
  - Precision DOM Marking via React input descriptors
  - Strict Submission Immunity
  - GitHub Knowledge Bank Sync (`atharvgit2005/swayam404-knowledge`)
  - Graded Feedback Capture
  - 12-Week Syllabus Expander
- **FR-6 [Routine & 30-Second Setup]:** Step-by-step 3-step routine walkthrough and Developer Mode "Load Unpacked" guide.
- **FR-7 [FAQ Accordion]:** Expandable answers for common student inquiries.
- **FR-8 [Mobile Phone Web Compatibility]:** Fully responsive mobile experience (< 768px and < 480px), collapsible slide-down navigation drawer with outside-tap dismiss, touch-optimized button targets, and responsive padding.
- **FR-9 [Lucide Icon Pack Integration]:** Complete replacement of raw Unicode emojis with official Lucide vector icons (`data-lucide`) across all sections, buttons, badges, and controls.

## Non-Functional Requirements
- **NFR-1 [Speed & Reliability]:** Static compilation to `dist/` with Vercel Edge caching and instant sub-100ms load times.
- **NFR-2 [Responsive Presentation]:** Responsive layout supporting mobile screens down to 320px width without horizontal scrollbars.
- **NFR-3 [Automated Verification]:** In-process verification test suite (`test.js`) asserting content integrity, mobile logic, CSS rules, and zero-emoji compliance.
