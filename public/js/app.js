/**
 * swayam404 — Neo-Brutalist Official Product Logic & Simulator Engine
 * Powers the interactive in-page extension emulator, quiz auto-marker,
 * provider toggle, theme switch, FAQ accordion, mobile navigation drawer,
 * and Lucide icon rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSimulator();
  initFaqAccordion();
  initMobileMenu();
  refreshLucideIcons();
});

/* ==========================================================================
   1. Lucide Icons Helper
   ========================================================================== */
function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   2. Theme Management (Brutalist Light Cream vs Brutalist Dark)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('swayam404_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('swayam404_theme', next);
      showToast(`Switched to ${next.toUpperCase()} mode!`);
      refreshLucideIcons();
    });
  }
}

/* ==========================================================================
   3. Interactive SWAYAM Extension Simulator
   ========================================================================== */
function initSimulator() {
  const QUIZ_BANK = [
    {
      course: "CS91: Cloud Computing & Distributed Systems",
      week: "Week 4 Assignment",
      question: "Which of the following consistency models guarantees that all replicas execute all operations in the same globally agreed-upon order?",
      options: [
        { id: "opt-a", text: "A) Eventual Consistency", correct: false },
        { id: "opt-b", text: "B) Linearizability (Strict Consistency)", correct: true },
        { id: "opt-c", text: "C) Read-After-Write Consistency", correct: false },
        { id: "opt-d", text: "D) Causal Consistency", correct: false }
      ],
      aiReasoning: "Linearizability requires that all operations appear to take place instantaneously at a point in time between their invocation and response, ensuring global atomic ordering across all distributed replicas."
    },
    {
      course: "CS62: Introduction to Machine Learning (NPTEL)",
      week: "Week 7 Assignment",
      question: "In support vector machines (SVM), which kernel function computes similarity in an infinite-dimensional feature space?",
      options: [
        { id: "opt-a", text: "A) Linear Kernel", correct: false },
        { id: "opt-b", text: "B) Polynomial Kernel (Degree 2)", correct: false },
        { id: "opt-c", text: "C) Radial Basis Function (RBF / Gaussian Kernel)", correct: true },
        { id: "opt-d", text: "D) Sigmoid Kernel", correct: false }
      ],
      aiReasoning: "The RBF/Gaussian kernel corresponds to an inner product in an infinite-dimensional Hilbert space by Taylor series expansion of exp(-gamma * ||x - y||^2)."
    }
  ];

  let currentQuizIdx = 0;
  let activeProvider = 'ChatGPT Web';

  // Elements
  const questionTitleEl = document.getElementById('simQuestionTitle');
  const courseTagEl = document.getElementById('simCourseTag');
  const optionsContainer = document.getElementById('simOptionsContainer');
  const logBox = document.getElementById('simExtLog');
  const providerTabs = document.querySelectorAll('.ext-provider-tab');

  const scanBtn = document.getElementById('simScanBtn');
  const copyPromptBtn = document.getElementById('simCopyPromptBtn');
  const fillBtn = document.getElementById('simFillAnswersBtn');
  const nextQuizBtn = document.getElementById('simNextQuizBtn');

  function renderCurrentQuiz() {
    const q = QUIZ_BANK[currentQuizIdx];
    if (questionTitleEl) questionTitleEl.textContent = q.question;
    if (courseTagEl) courseTagEl.textContent = `${q.course} · ${q.week}`;

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach(opt => {
        const label = document.createElement('label');
        label.className = 'quiz-option-label';
        label.id = `label-${opt.id}`;
        label.innerHTML = `
          <input type="radio" name="simQuizOpt" value="${opt.id}" style="width: 18px; height: 18px; accent-color: #1a1a1a;">
          <span>${opt.text}</span>
        `;
        optionsContainer.appendChild(label);
      });
    }

    logMessage(`[READY] Switched to ${q.week}. Portal DOM loaded.`);
  }

  function logMessage(msg) {
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.style.marginBottom = '4px';
    line.innerHTML = `<span style="color: #a1a1aa;">[${time}]</span> ${msg}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  // Provider tabs
  providerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      providerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeProvider = tab.getAttribute('data-provider');
      logMessage(`[BRIDGE] Active Provider switched to <strong>${activeProvider}</strong> (Zero API key mode).`);
      showToast(`Provider set to ${activeProvider}`);
    });
  });

  // Action: Scan
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      const q = QUIZ_BANK[currentQuizIdx];
      logMessage(`[SCAN] Parsing SWAYAM DOM container... Found 1 Question with ${q.options.length} radio inputs.`);
      logMessage(`[BANK] Querying local SHA-256 cache & GitHub Bank <em>atharvgit2005/swayam404-knowledge</em>...`);
      showToast('Assignment scanned from DOM!');
    });
  }

  // Action: Copy Prompt
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const q = QUIZ_BANK[currentQuizIdx];
      const promptText = `SWAYAM Assignment Question:\n"${q.question}"\nOptions:\n${q.options.map(o => o.text).join('\n')}\n\nTask: Output the exact correct option letter and short proof.`;
      navigator.clipboard?.writeText(promptText);
      logMessage(`[CLIPBOARD] Prompt copied formatted for <strong>${activeProvider}</strong>. Open your browser tab, paste and get answers!`);
      showToast('Prompt copied to clipboard!');
    });
  }

  // Action: Fill Answers (Simulates Extension Marking)
  if (fillBtn) {
    fillBtn.addEventListener('click', () => {
      const q = QUIZ_BANK[currentQuizIdx];
      const correctOpt = q.options.find(o => o.correct);
      if (!correctOpt) return;

      logMessage(`[DISPATCH] Receiving solution payload from ${activeProvider} bridge...`);
      logMessage(`[RESOLVE] Answer: <strong>${correctOpt.text}</strong>`);
      logMessage(`[REASONING] ${q.aiReasoning}`);

      // Emulate DOM selection and synthetic event dispatch
      const radio = document.querySelector(`input[value="${correctOpt.id}"]`);
      if (radio) radio.checked = true;

      // Highlight option
      document.querySelectorAll('.quiz-option-label').forEach(lbl => lbl.classList.remove('marked-correct'));
      const correctLabel = document.getElementById(`label-${correctOpt.id}`);
      if (correctLabel) correctLabel.classList.add('marked-correct');

      logMessage(`<span style="color: #10b981; font-weight: bold;">[SUCCESS] Radio marked via React input descriptor! Submit button untouched (Canteen Safety Rule).</span>`);
      showToast('Answers filled! Review and submit manually.');
    });
  }

  // Next Quiz
  if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
      currentQuizIdx = (currentQuizIdx + 1) % QUIZ_BANK.length;
      renderCurrentQuiz();
    });
  }

  // Initial render
  renderCurrentQuiz();
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');
    if (q && a) {
      q.addEventListener('click', () => {
        const isHidden = a.style.display === 'none' || a.style.display === '';
        
        // Close others
        items.forEach(other => {
          const otherA = other.querySelector('.faq-answer');
          const otherChevron = other.querySelector('.faq-chevron');
          if (otherA) otherA.style.display = 'none';
          if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
        });

        if (isHidden) {
          a.style.display = 'block';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
          a.style.display = 'none';
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
      });
    }
  });
}

/* ==========================================================================
   5. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!menuBtn || !drawer) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      drawer.classList.add('open');
      menuBtn.innerHTML = '<i data-lucide="x" style="width: 18px; height: 18px;"></i>';
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      drawer.classList.remove('open');
      menuBtn.innerHTML = '<i data-lucide="menu" style="width: 18px; height: 18px;"></i>';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    refreshLucideIcons();
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any navigation link
  const links = drawer.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');
  links.forEach(l => {
    l.addEventListener('click', () => toggleMenu(false));
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== menuBtn) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   6. Brutalist Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('brutalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'brutalToast';
    toast.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%) translateY(10px);
      z-index: 9999; background: #ffcc00; color: #1a1a1a; padding: 0.65rem 1.25rem;
      border: 2.5px solid #1a1a1a; font-family: 'Space Grotesk', sans-serif;
      font-weight: 800; font-size: 0.9rem; box-shadow: 4px 4px 0px #1a1a1a;
      pointer-events: none; opacity: 0; width: max-content; max-width: calc(100vw - 32px);
      text-align: center; transition: opacity 0.2s, transform 0.2s;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2800);
}
