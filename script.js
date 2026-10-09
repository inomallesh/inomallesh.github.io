/**
 * MARIPALLI MALLESH — PORTFOLIO CLIENT JAVASCRIPT
 * Features:
 * - Dynamic Typewriter Role Rotator
 * - Project Category Filter System
 * - Interactive Terminal Sandbox with CLI Commands
 * - Dark / Light Mode Switcher with LocalStorage persistence
 * - Interactive Resume Modal & Printable PDF view
 * - Scroll-Spy Active Navigation Highlight
 * - Mobile Menu Hamburger Controller
 * - Contact Form Handler with Instant Feedback
 * - Toast Notification System
 * - Email Clipboard Copy Action
 * - Mouse Glow Follower
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initProjectFilters();
  initTerminal();
  initResumeModal();
  initScrollSpy();
  initMobileMenu();
  initContactForm();
  initCopyEmail();
  initScrollToTop();
  initCursorGlow();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('mallesh_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('mallesh_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-moon';
      themeIcon.parentElement.title = 'Switch to Light Mode';
    } else {
      themeIcon.className = 'fas fa-sun';
      themeIcon.parentElement.title = 'Switch to Dark Mode';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typewriter Role Rotator
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const taglineEl = document.getElementById('dynamicTagline');
  if (!taglineEl) return;

  const roles = [
    'Autonomous AI Systems',
    'Real-Time Computer Vision',
    'Interactive Flight Simulators',
    '21-Landmark Hand Gestures',
    'Autonomous Kinematics Engines',
    'Full-Stack Web Engineering'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseBetween = 2000;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      taglineEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      taglineEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeStep, pauseBetween);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeStep, 400);
      return;
    }

    const nextSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(typeStep, nextSpeed);
  }

  typeStep();
}

/* --------------------------------------------------------------------------
   3. Project Category Filter System
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Developer Terminal Sandbox (CLI)
   -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalClearBtn = document.getElementById('terminalClearBtn');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');
  const terminalScreen = document.getElementById('terminalScreen');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => [
      'Available Commands:',
      '  whoami       - Display author identity & bio',
      '  projects     - List featured open-source repositories',
      '  skills       - View full technical skill taxonomy',
      '  simulations  - Detail physics and robotics simulators',
      '  vision       - Detail Computer Vision & gesture projects',
      '  github       - Link to official GitHub profile (@inomallesh)',
      '  contact      - Show direct communication channels',
      '  clear        - Clear the terminal screen',
      '  date         - Print current system timestamp'
    ],
    whoami: () => [
      'Maripalli Mallesh',
      '----------------------------------------',
      'Role       : 2nd-Year B.Tech Student (Computer Science)',
      'Focus      : AI, Computer Vision, Kinematic Simulators & Web',
      'Location   : Telangana, India',
      'Profiles   : github.com/inomallesh | linkedin.com/in/inomallesh',
      'Mission    : Engineering software that computes with precision.'
    ],
    projects: () => [
      'Featured Repositories (github.com/inomallesh):',
      '  1. AgenticAI                  - Autonomous LLM agent reasoning loops',
      '  2. nokia-snake-gesture-control- Touchless vision-based retro Snake',
      '  3. drone-simulator            - Interactive 6-DOF flight dynamics',
      '  4. car-simulator              - 2D vehicle kinematics & raycast sensors',
      '  5. HandTrackingProject        - 21-landmark MediaPipe spatial tracking',
      '  6. Breed-Detection            - Deep learning animal classifier',
      '  7. spidercam                  - Suspended cable robot tension kinematics',
      '  8. Edusphere                  - Gamified learning platform',
      '  9. AlgoVerse                  - Algorithm visualization laboratory',
      '  10. OnlineBankingSystem       - Secure banking transaction engine',
      '  11. HomeAutomation            - IoT microcontroller dashboard',
      '  12. Data-Structures           - Core algorithmic reference in C & Java'
    ],
    skills: () => [
      'Technical Matrix:',
      '  * Languages   : Python, JavaScript (ES6+), C, Java, SQL, HTML5/CSS3',
      '  * AI & Vision : MediaPipe (3D Landmarks), OpenCV, PyTorch/TF, Agents',
      '  * Sim & Math  : Canvas 2D, Kinematic Vectors, Thrust Telemetry, IoT',
      '  * Workflow    : Git, GitHub Actions, n8n Automation, Linux, VS Code'
    ],
    simulations: () => [
      'Kinematic & Physics Simulators:',
      '  * Drone Simulator    : Pitch, yaw, roll vectors + real-time telemetry HUD.',
      '  * Car Simulator      : Ackermann steering, tire friction & raycast collision.',
      '  * Spidercam Robotics : 4-point cable tension & spatial 3D trajectories.'
    ],
    vision: () => [
      'Computer Vision Projects:',
      '  * Nokia Snake Gesture Control : Real-time touchless webcam input.',
      '  * Hand Tracking Landmark Engine: 21 3D keypoint high-speed pipeline.',
      '  * Breed Detection             : Deep convolutional neural network classifier.'
    ],
    github: () => {
      window.open('https://github.com/inomallesh', '_blank');
      return ['Redirecting to https://github.com/inomallesh in new tab...'];
    },
    contact: () => [
      'Contact Coordinates:',
      '  * Email    : inomallesh@gmail.com',
      '  * GitHub   : https://github.com/inomallesh',
      '  * LinkedIn : https://linkedin.com/in/inomallesh'
    ],
    clear: () => {
      terminalOutput.innerHTML = '';
      return [];
    },
    date: () => [new Date().toString()]
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Append input line to screen
    const userLine = document.createElement('p');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="prompt-user">mallesh@portfolio</span><span class="prompt-symbol">:~$</span> ${escapeHtml(trimmed)}`;
    terminalOutput.appendChild(userLine);

    const parts = trimmed.split(' ');
    const cmdKey = parts[0].toLowerCase();

    if (commands[cmdKey]) {
      const outputLines = commands[cmdKey](parts.slice(1));
      outputLines.forEach(line => {
        const outLine = document.createElement('p');
        outLine.className = 'term-line text-dim';
        outLine.textContent = line;
        terminalOutput.appendChild(outLine);
      });
    } else {
      const errorLine = document.createElement('p');
      errorLine.className = 'term-line text-error';
      errorLine.textContent = `zsh: command not found: ${cmdKey}. Type 'help' for available commands.`;
      terminalOutput.appendChild(errorLine);
    }

    // Scroll to bottom
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
    terminalInput.value = '';
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  if (terminalClearBtn) {
    terminalClearBtn.addEventListener('click', () => {
      commands.clear();
      const initialLine = document.createElement('p');
      initialLine.className = 'term-line text-dim';
      initialLine.innerHTML = 'Terminal cleared. Type <span class="term-command-hint">help</span> for commands.';
      terminalOutput.appendChild(initialLine);
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.focus();
    });
  });
}

/* --------------------------------------------------------------------------
   5. Resume Modal & Printing
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalBtn = document.getElementById('resumeModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  function openModal() {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resumeModalBtn) resumeModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeModalFooterBtn) closeModalFooterBtn.addEventListener('click', closeModal);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   6. Scroll-Spy Navigation Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Mobile Menu Hamburger Controller
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('active');
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', !isOpen);
  });

  // Close menu when a navigation item is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Open mail client as direct fallback
    const mailtoUrl = `mailto:inomallesh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    )}`;

    showToast('Preparing email dispatch...', 'success');
    setTimeout(() => {
      window.location.href = mailtoUrl;
      showToast('Thank you! Message client opened.', 'info');
      contactForm.reset();
    }, 600);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* --------------------------------------------------------------------------
   9. Email Clipboard Copy Action
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (!copyEmailBtn) return;

  copyEmailBtn.addEventListener('click', () => {
    const email = 'inomallesh@gmail.com';
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast('Email address copied to clipboard!', 'success');
      })
      .catch(() => {
        showToast('Failed to copy email automatically.', 'error');
      });
  });
}

/* --------------------------------------------------------------------------
   10. Scroll-To-Top Button
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   11. Mouse Cursor Glow Follower
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;

  // Only enable on fine pointer devices (desktops)
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  } else {
    cursorGlow.style.display = 'none';
  }
}

/* --------------------------------------------------------------------------
   12. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';

  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 20);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

/* --- Utility Helper --- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
