/**
 * swayam404 — Interactive Logic Engine
 * Powers typed hero, 404 multiverse simulator, CLI terminal,
 * arcade mini-game, SVG radar interactions, Command Palette (⌘K),
 * and Konami easter egg.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMultiverseSimulator();
  initTerminal();
  initPacketRescueGame();
  initRadarInteractivity();
  initCommandPalette();
  initKonamiCode();
  initQuoteWidget();
  initContactForm();
  initMobileMenu();
  checkInitialRoute();
});

/* ==========================================================================
   1. Theme Management (Dark / Cyberpunk / Light)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('swayam404_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      let next = 'dark';
      if (current === 'dark') next = 'cyberpunk';
      else if (current === 'cyberpunk') next = 'light';
      else next = 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('swayam404_theme', next);
      showToast(`Theme switched to: ${next.toUpperCase()}`);
    });
  }
}

/* ==========================================================================
   2. Typed Hero Subtitle
   ========================================================================== */
function initTypingEffect() {
  const roles = [
    "Forward Deployed Engineer",
    "Full-Stack Architect (React & Python)",
    "AI/ML Specialist (UT Austin & Woolf MS)",
    "Edge & Systems Builder (Cloudflare & Docker)"
  ];
  const target = document.getElementById('typedRole');
  if (!target) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeTick() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeTick, delay);
  }

  typeTick();
}

/* ==========================================================================
   3. 404 Multiverse Hub & Route Simulator
   ========================================================================== */
function initMultiverseSimulator() {
  const routePills = document.querySelectorAll('.route-pill');
  const errorRouteHint = document.getElementById('simulatedRouteHint');
  const errorMsg = document.getElementById('simulatedErrorMsg');
  const coreDumpData = document.getElementById('simulatedCoreDump');

  const ROUTE_DATA = {
    '/quantum-tea': {
      msg: 'HTTP 418 / 404: I am a teapot trapped in a quantum superposition.',
      dump: 'Status: 404 · Quantum State: Collapsed · Origin: BrewException · Latency: 42ms'
    },
    '/lost-in-code': {
      msg: 'Route wandered off into the infinite recursion of edge workers.',
      dump: 'Status: 404 · Subsystem: Cloudflare DO · Stack: [while(alive) code()] · Frame: #0'
    },
    '/dangling-pointer': {
      msg: 'Memory address dereferenced to null space in the multiverse.',
      dump: 'Status: 404 · Segment: 0xDEADBEEF · Signal: SIGSEGV · Rescue: Handled safely'
    },
    '/c2pa-verifier': {
      msg: 'Cryptographic signature verified, but content coordinates moved.',
      dump: 'Status: 404 · Signature: Ed25519-OK · Hash: e3b0c44298fc1c149afb · Anchored: Polygon'
    }
  };

  routePills.forEach(pill => {
    pill.addEventListener('click', () => {
      routePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const route = pill.getAttribute('data-route') || '/lost';
      if (errorRouteHint) errorRouteHint.textContent = `GET https://swayam.dev${route}`;

      const meta = ROUTE_DATA[route] || {
        msg: `Route ${route} is not registered in the edge routing table.`,
        dump: 'Status: 404 · Origin: Gateway · Resolution: Fallback to swayam404 hub'
      };

      if (errorMsg) errorMsg.textContent = meta.msg;
      if (coreDumpData) coreDumpData.textContent = meta.dump;
    });
  });

  const rescueBtn = document.getElementById('teleportHomeBtn');
  if (rescueBtn) {
    rescueBtn.addEventListener('click', () => {
      window.location.hash = '#home';
      showToast('🚀 Teleported safely back to Home Base!');
    });
  }
}

function checkInitialRoute() {
  const initialRoute = document.body.getAttribute('data-initial-route');
  if (initialRoute && initialRoute !== '/') {
    const errorRouteHint = document.getElementById('simulatedRouteHint');
    const errorMsg = document.getElementById('simulatedErrorMsg');
    if (errorRouteHint) errorRouteHint.textContent = `GET https://swayam.dev${initialRoute}`;
    if (errorMsg) errorMsg.textContent = `404 Detected: You arrived via nonexistent route "${initialRoute}". Welcome to the Multiverse Hub!`;

    // Scroll smoothly to multiverse section
    setTimeout(() => {
      const el = document.getElementById('multiverse');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }
}

/* ==========================================================================
   4. CLI Developer Terminal
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('termInput');
  const terminalOutput = document.getElementById('termOutput');
  if (!terminalInput || !terminalOutput) return;

  const COMMANDS = {
    help: () => [
      '<span class="term-accent">Available Commands:</span>',
      '  <span class="term-cmd">bio</span>         - Display Swayam Mohanty professional summary',
      '  <span class="term-cmd">skills</span>      - List core engineering specializations',
      '  <span class="term-cmd">projects</span>    - List featured production architectures',
      '  <span class="term-cmd">radar</span>       - ASCII visualization of the 6-axis Tech Radar',
      '  <span class="term-cmd">ping</span>        - Check simulated edge gateway latency',
      '  <span class="term-cmd">quote</span>       - Fetch a developer philosophy quote',
      '  <span class="term-cmd">game</span>        - Launch Packet Rescue arcade mini-game',
      '  <span class="term-cmd">theme</span>       - Cycle dark / cyberpunk / light themes',
      '  <span class="term-cmd">rescue</span>      - Reset simulated 404 states to zero error',
      '  <span class="term-cmd">clear</span>       - Clear the terminal console',
      '  <span class="term-cmd">sudo</span>        - Request root developer clearance'
    ],
    bio: () => [
      '<span class="term-success">Swayam Mohanty</span> — Forward Deployed & Full-Stack Engineer',
      '• Location: Amsterdam, Netherlands',
      '• Experience: 10+ years across travel, mobility, legal tech, enterprise',
      '• Education: MS Computer Science (Woolf), PGP AI/ML (UT Austin), B.Tech CS (NIT Durgapur)',
      '• Focus: Bridging customer business needs with deep AI/ML & scalable web systems.'
    ],
    skills: () => [
      '<span class="term-cmd">[Frontend]</span> React, Next.js, TypeScript, React Native, TailwindCSS',
      '<span class="term-cmd">[Backend]</span>  Python, FastAPI, Node.js, Express, GraphQL, Prisma',
      '<span class="term-cmd">[AI / ML]</span>  Generative AI, LangChain, RAG, ReAct Loops, Claude API',
      '<span class="term-cmd">[Cloud]</span>    Cloudflare Workers & DO, AWS, Supabase, Docker, Vercel'
    ],
    projects: () => [
      '1. <span class="term-accent">Agent Lab</span>       - ReAct loop AI framework built from scratch (FastAPI/React 19)',
      '2. <span class="term-accent">TruthLens</span>       - Tamper-proof media verification with C2PA 2.0 & Ed25519',
      '3. <span class="term-accent">Edge Command</span>    - Rate-limiting gateway & DO analytics on Cloudflare edge',
      '4. <span class="term-accent">SnapCal</span>         - Vision macro estimator (React Native + Gemini 2.5 Flash)',
      '5. <span class="term-accent">DevPulse Blog</span>   - Untold stories behind tech titans (Next.js + Neon DB)',
      '6. <span class="term-accent">Notebook Conv</span>   - Polyglot service converting Jupyter notebooks to PDF/HTML'
    ],
    radar: () => [
      '<span class="term-cmd">=== TECH RADAR PROFICIENCY ===</span>',
      'Frontend     [███████████████████ ] 95%',
      'Architecture [█████████████████   ] 88%',
      'Backend      [████████████████    ] 80%',
      'Testing      [████████████████    ] 80%',
      'DevOps       [███████████████     ] 75%',
      'Database     [███████████████     ] 75%'
    ],
    ping: () => [
      'Pinging swayam.dev edge network [300+ PoPs]...',
      '64 bytes from ams01.edge: icmp_seq=1 ttl=58 time=3.42 ms',
      '64 bytes from ams01.edge: icmp_seq=2 ttl=58 time=3.18 ms',
      '--- swayam.dev ping statistics: 0% packet loss, min/avg/max = 3.18/3.30/3.42 ms ---'
    ],
    quote: () => [
      '<span class="term-accent">"In software, the most expensive blunders are the ones you build right, but for the wrong problem."</span>',
      '— Swayam Mohanty'
    ],
    game: () => {
      const gameEl = document.getElementById('gameCanvas');
      if (gameEl) gameEl.scrollIntoView({ behavior: 'smooth' });
      return ['Launching Packet Rescue mini-game... Catch the green packets, dodge 404 bugs!'];
    },
    theme: () => {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) btn.click();
      return ['Theme toggled!'];
    },
    rescue: () => {
      return ['<span class="term-success">✨ Multiverse rescue complete: All 404 error logs reconciled!</span>'];
    },
    sudo: () => [
      '<span class="term-error">Permission Denied:</span> Nice try! Root clearance granted only with coffee ☕'
    ]
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = terminalInput.value.trim();
      terminalInput.value = '';
      if (!raw) return;

      appendTermLine(`<span class="terminal-prompt">swayam404@edge:~$</span> ${escapeHtml(raw)}`);

      const cmd = raw.toLowerCase().split(' ')[0];
      if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      if (COMMANDS[cmd]) {
        const lines = COMMANDS[cmd]();
        lines.forEach(line => appendTermLine(line));
      } else {
        appendTermLine(`<span class="term-error">Command not found: "${escapeHtml(raw)}". Type <span class="term-cmd">help</span> for commands.</span>`);
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  function appendTermLine(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
  }
}

/* ==========================================================================
   5. 2D Packet Rescue Arcade Mini-Game
   ========================================================================== */
function initPacketRescueGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth || 360;
    canvas.height = 240;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let score = 0;
  let highScore = parseInt(localStorage.getItem('swayam404_high_score') || '0', 10);
  let isRunning = false;
  let playerX = canvas.width / 2;
  const playerWidth = 56;
  const playerHeight = 12;
  let items = [];
  let spawnTimer = 0;
  let animationId = null;

  const scoreEl = document.getElementById('gameScore');
  const highScoreEl = document.getElementById('gameHighScore');
  const startBtn = document.getElementById('gameStartBtn');

  if (highScoreEl) highScoreEl.textContent = highScore;

  function spawnItem() {
    const isGlitch = Math.random() < 0.35;
    items.push({
      x: Math.random() * (canvas.width - 20) + 10,
      y: 0,
      radius: isGlitch ? 8 : 7,
      speed: Math.random() * 2 + 2,
      isGlitch: isGlitch,
      label: isGlitch ? '404' : '200'
    });
  }

  function gameLoop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw Player Paddle
    ctx.fillStyle = '#6366f1';
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(playerX - playerWidth / 2, canvas.height - playerHeight - 6, playerWidth, playerHeight, 6);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Update & draw falling items
    spawnTimer++;
    if (spawnTimer % 35 === 0) {
      spawnItem();
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      // Draw item
      ctx.beginPath();
      ctx.arc(it.x, it.y, it.radius, 0, Math.PI * 2);
      ctx.fillStyle = it.isGlitch ? '#ef4444' : '#10b981';
      ctx.shadowColor = it.isGlitch ? '#ef4444' : '#10b981';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(it.label, it.x, it.y - 10);

      // Check collision with player
      const paddleY = canvas.height - playerHeight - 6;
      if (
        it.y + it.radius >= paddleY &&
        it.y - it.radius <= paddleY + playerHeight &&
        it.x >= playerX - playerWidth / 2 &&
        it.x <= playerX + playerWidth / 2
      ) {
        if (it.isGlitch) {
          score = Math.max(0, score - 15);
        } else {
          score += 10;
        }
        if (scoreEl) scoreEl.textContent = score;

        if (score > highScore) {
          highScore = score;
          localStorage.setItem('swayam404_high_score', highScore);
          if (highScoreEl) highScoreEl.textContent = highScore;
        }

        items.splice(i, 1);
        continue;
      }

      // Remove offscreen
      if (it.y > canvas.height + 20) {
        items.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function startGame() {
    score = 0;
    items = [];
    isRunning = true;
    if (scoreEl) scoreEl.textContent = '0';
    if (startBtn) startBtn.textContent = 'Restart Game';
    cancelAnimationFrame(animationId);
    gameLoop();
  }

  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!isRunning) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      playerX = Math.max(playerWidth / 2, playerX - 24);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      playerX = Math.min(canvas.width - playerWidth / 2, playerX + 24);
    }
  });

  // Mouse / Touch movement
  canvas.addEventListener('mousemove', (e) => {
    if (!isRunning) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    playerX = Math.max(playerWidth / 2, Math.min(canvas.width - playerWidth / 2, mouseX));
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isRunning) return;
    const rect = canvas.getBoundingClientRect();
    if (e.touches.length > 0) {
      const touchX = e.touches[0].clientX - rect.left;
      playerX = Math.max(playerWidth / 2, Math.min(canvas.width - playerWidth / 2, touchX));
    }
  });
}

/* ==========================================================================
   6. SVG Tech Radar Interactivity
   ========================================================================== */
function initRadarInteractivity() {
  const points = document.querySelectorAll('.radar-point');
  const detailLabel = document.getElementById('radarActiveLabel');
  const detailScore = document.getElementById('radarActiveScore');

  points.forEach(pt => {
    pt.addEventListener('mouseenter', () => {
      const skill = pt.getAttribute('data-skill');
      const pct = pt.getAttribute('data-score');
      if (detailLabel) detailLabel.textContent = skill;
      if (detailScore) detailScore.textContent = `${pct}% Proficiency`;
    });
  });
}

/* ==========================================================================
   7. Command Palette (⌘K / Ctrl+K)
   ========================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  const input = document.getElementById('cmdSearchInput');
  const triggers = document.querySelectorAll('.cmd-k-trigger');
  const items = document.querySelectorAll('.cmd-item');

  function openPalette() {
    if (modal) {
      modal.classList.add('open');
      if (input) {
        input.value = '';
        input.focus();
      }
      filterCommands('');
    }
  }

  function closePalette() {
    if (modal) modal.classList.remove('open');
  }

  triggers.forEach(t => t.addEventListener('click', openPalette));

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal && modal.classList.contains('open')) closePalette();
      else openPalette();
    }
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closePalette();
    }
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      filterCommands(e.target.value.toLowerCase().trim());
    });
  }

  function filterCommands(query) {
    items.forEach(it => {
      const text = it.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        it.style.display = 'flex';
      } else {
        it.style.display = 'none';
      }
    });
  }

  items.forEach(it => {
    it.addEventListener('click', () => {
      const action = it.getAttribute('data-action');
      closePalette();
      handlePaletteAction(action);
    });
  });

  function handlePaletteAction(action) {
    if (action.startsWith('#')) {
      const target = document.querySelector(action);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'toggle-theme') {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) btn.click();
    } else if (action === 'start-game') {
      const btn = document.getElementById('gameStartBtn');
      if (btn) btn.click();
      const canvas = document.getElementById('gameCanvas');
      if (canvas) canvas.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'rescue-404') {
      showToast('✨ 404 Route Reconciled!');
    }
  }
}

/* ==========================================================================
   8. Konami Code Easter Egg
   ========================================================================== */
function initKonamiCode() {
  const sequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let cursor = 0;

  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === sequence[cursor].toLowerCase()) {
      cursor++;
      if (cursor === sequence.length) {
        triggerKonamiUnlocked();
        cursor = 0;
      }
    } else {
      cursor = 0;
    }
  });

  function triggerKonamiUnlocked() {
    document.documentElement.setAttribute('data-theme', 'cyberpunk');
    localStorage.setItem('swayam404_theme', 'cyberpunk');
    showToast('🎮 KONAMI CODE ACCEPTED: CYBERPUNK OVERDRIVE ACTIVE!');

    // Confetti or particle flash effect
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      z-index: 9999; background: #ff0077; color: #fff; padding: 12px 24px;
      border-radius: 9999px; font-weight: bold; box-shadow: 0 0 30px #ff0077;
      font-family: monospace; font-size: 14px;
    `;
    banner.textContent = '👾 CHEAT ACTIVATED: +30 LIVES & CYBERPUNK MODE!';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 4000);
  }
}

/* ==========================================================================
   9. Daily Developer Quote Widget
   ========================================================================== */
function initQuoteWidget() {
  const textEl = document.getElementById('dailyQuoteText');
  const authorEl = document.getElementById('dailyQuoteAuthor');
  const refreshBtn = document.getElementById('refreshQuoteBtn');
  const closeBtn = document.getElementById('closeQuoteBtn');
  const widget = document.getElementById('quoteWidget');

  const FALLBACK_QUOTES = [
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "In software, the most expensive blunders are the ones you build right, but for the wrong problem.", author: "Swayam Mohanty" },
    { text: "There are two ways to write error-free programs; only the third one works.", author: "Alan J. Perlis" }
  ];

  function fetchQuote() {
    fetch('/api/quote')
      .then(res => res.json())
      .then(data => {
        if (textEl) textEl.textContent = `"${data.text}"`;
        if (authorEl) authorEl.textContent = `— ${data.author}`;
      })
      .catch(() => {
        const q = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        if (textEl) textEl.textContent = `"${q.text}"`;
        if (authorEl) authorEl.textContent = `— ${q.author}`;
      });
  }

  if (refreshBtn) refreshBtn.addEventListener('click', fetchQuote);
  if (closeBtn && widget) {
    closeBtn.addEventListener('click', () => {
      widget.style.display = 'none';
    });
  }
}

/* ==========================================================================
   10. Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    showToast('✉️ Message dispatched! Opening mail client fallback...');
    const mailtoUrl = `mailto:m.swayams@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);
    form.reset();
  });
}

/* ==========================================================================
   11. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) drawer.classList.remove('open');
    else drawer.classList.add('open');
  });

  const links = drawer.querySelectorAll('a');
  links.forEach(l => l.addEventListener('click', () => drawer.classList.remove('open')));
}

/* ==========================================================================
   12. Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      z-index: 1000; background: rgba(18, 24, 40, 0.95); color: #f1f5f9;
      padding: 0.6rem 1.4rem; border-radius: 9999px; border: 1px solid rgba(99, 102, 241, 0.4);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-size: 0.88rem; font-weight: 500;
      backdrop-filter: blur(12px); pointer-events: none; opacity: 0;
      transition: opacity 0.25s, transform 0.25s;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 3200);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}
