/**
 * NITESH KUMAR | FULL STACK DEVELOPER & AI PORTFOLIO v2.0
 * Next-Gen Cyber Engine: AI Robot Assistant, Dual Orbit Physics, Web Audio SFX & Theme Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // Update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (CYBER SOUND FX)
     ========================================================================== */
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
  }

  function playCyberSound(type = "tick") {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx || audioCtx.state === "suspended") {
        audioCtx && audioCtx.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === "tick") {
        // High-tech subtle UI hover tick
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "click") {
        // Cyber button trigger laser chirp
        osc.type = "triangle";
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "bot") {
        // AI Robot bleep / response chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.setValueAtTime(1400, now + 0.06);
        osc.frequency.setValueAtTime(1800, now + 0.12);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "copy") {
        // High confirmation chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.15);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Audio Toggle Button
  const soundBtn = document.getElementById("sound-btn");
  const soundIcon = document.getElementById("sound-icon");
  if (soundBtn && soundIcon) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.className = "fa-solid fa-volume-high";
        playCyberSound("click");
        showToast("Audio SFX: Enabled 🔊");
      } else {
        soundIcon.className = "fa-solid fa-volume-xmark";
        showToast("Audio SFX: Muted 🔇");
      }
    });
  }

  // Attach hover sounds to interactive elements
  const hoverSoundTargets = document.querySelectorAll("button, a, .skill-card, .project-card, .palette-color-btn, .term-tab");
  hoverSoundTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => playCyberSound("tick"));
    el.addEventListener("click", () => playCyberSound("click"));
  });

  /* ==========================================================================
     2. THEME SWITCHER ENGINE
     ========================================================================== */
  const themeBtn = document.getElementById("theme-btn");
  const themeMenu = document.getElementById("theme-menu");
  const paletteBtns = document.querySelectorAll(".palette-color-btn");

  const savedTheme = localStorage.getItem("nitesh_portfolio_theme") || "cyan";
  document.documentElement.setAttribute("data-theme", savedTheme);

  paletteBtns.forEach((btn) => {
    if (btn.getAttribute("data-set-theme") === savedTheme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
        themeMenu.classList.remove("show");
      }
    });
  }

  paletteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      paletteBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const chosenTheme = btn.getAttribute("data-set-theme");
      document.documentElement.setAttribute("data-theme", chosenTheme);
      localStorage.setItem("nitesh_portfolio_theme", chosenTheme);
      playCyberSound("click");
      showToast(`Theme switched to: ${chosenTheme.toUpperCase()} ✨`);
    });
  });

  /* ==========================================================================
     3. MAGNETIC CUSTOM CYBER CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById("cyber-cursor");
  const cursorRing = document.getElementById("cyber-cursor-ring");

  if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveItems = document.querySelectorAll("a, button, input, textarea, .skill-card, .project-card, .term-tab");
    interactiveItems.forEach((item) => {
      item.addEventListener("mouseenter", () => cursorRing.classList.add("active"));
      item.addEventListener("mouseleave", () => cursorRing.classList.remove("active"));
    });
  } else {
    if (cursorDot) cursorDot.style.display = "none";
    if (cursorRing) cursorRing.style.display = "none";
  }

  /* ==========================================================================
     4. ROBOT EYE TRACKING (HERO MASCOT)
     ========================================================================== */
  const heroRobot = document.getElementById("hero-robot");
  const eyeLeft = document.querySelector(".eye-left");
  const eyeRight = document.querySelector(".eye-right");

  if (heroRobot && eyeLeft && eyeRight) {
    window.addEventListener("mousemove", (e) => {
      const rect = heroRobot.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
      const distance = Math.min(3.5, Math.hypot(e.clientX - robotCenterX, e.clientY - robotCenterY) / 60);

      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      eyeLeft.setAttribute("cx", 48 + offsetX);
      eyeLeft.setAttribute("cy", 52 + offsetY);
      eyeRight.setAttribute("cx", 72 + offsetX);
      eyeRight.setAttribute("cy", 52 + offsetY);
    });
  }

  /* ==========================================================================
     5. FLOATING AI ROBOT ASSISTANT CHATBOT (NEXUS-BOT)
     ========================================================================== */
  const aiLauncher = document.getElementById("ai-robot-launcher");
  const aiDrawer = document.getElementById("ai-chat-drawer");
  const closeAiChat = document.getElementById("close-ai-chat");
  const aiChatForm = document.getElementById("ai-chat-form");
  const aiUserInput = document.getElementById("user-input");
  const aiMessages = document.getElementById("ai-messages");
  const quickChips = document.querySelectorAll(".quick-chip");

  if (aiLauncher && aiDrawer) {
    aiLauncher.addEventListener("click", () => {
      const isOpen = aiDrawer.classList.contains("open");
      if (isOpen) {
        aiDrawer.classList.remove("open");
        aiDrawer.setAttribute("aria-hidden", "true");
      } else {
        aiDrawer.classList.add("open");
        aiDrawer.setAttribute("aria-hidden", "false");
        playCyberSound("bot");
      }
    });
  }

  if (closeAiChat && aiDrawer) {
    closeAiChat.addEventListener("click", () => {
      aiDrawer.classList.remove("open");
      aiDrawer.setAttribute("aria-hidden", "true");
    });
  }

  function appendAiMessage(sender, text) {
    if (!aiMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-msg ${sender}`;

    if (sender === "bot") {
      msgDiv.innerHTML = `
        <div class="bot-icon-chip"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-bubble">${text}</div>
      `;
    } else {
      msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
    }

    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    playCyberSound(sender === "bot" ? "bot" : "click");
  }

  const aiKnowledgeBase = {
    skills: `Nitesh is a specialized <strong>Full Stack MERN Developer</strong>! ⚡<br>• <strong>Frontend:</strong> React.js, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3<br>• <strong>Backend:</strong> Node.js, Express.js, RESTful APIs, JWT Auth, Bcrypt<br>• <strong>Databases:</strong> MongoDB, MySQL<br>• <strong>Languages:</strong> JavaScript, Python, Java`,
    projects: `Nitesh has built <strong>6+ production-ready web applications</strong>! 🚀<br>1. <strong>E-Commerce Web Platform:</strong> Full MERN store with cart, auth, and order flow.<br>2. <strong>JWT Login & Auth System:</strong> Enterprise role-based security & token middleware.<br>3. <strong>Task Management SaaS:</strong> Kanban productivity workspace.<br>4. <strong>Cyber AI Portfolio:</strong> Interactive glassmorphic showcase.`,
    education: `🎓 <strong>Nitesh's Educational Journey:</strong><br>1. <strong>Bachelor of Computer Applications (BCA)</strong><br>• Lovely Professional University, Punjab (Aug 2025 – Present)<br>2. <strong>Intermediate (Class XII) - 81.66%</strong><br>• Sewa Shram Inter College, Suriyawan, Bhadohi (Apr 2022 – March 2024)<br>3. <strong>Matriculation (Class X) - 76.66%</strong><br>• Ashram Padhhati Vidhyalaya, Parasiya, Mirzapur (Apr 2021 – March 2022)`,
    hire: `💼 <strong>Why hire Nitesh?</strong><br>• Strong foundations in modern Full Stack MERN development.<br>• Hands-on internship experience building REST APIs and React UIs.<br>• High problem-solving speed, clean code standards, and eagerness to contribute to top tech teams.`,
    resume: `📄 You can view and download Nitesh's Resume snapshot right here! Click the <strong>Resume / CV</strong> button in the hero section or <a href="mailto:kumarniitesh84737@gmail.com" style="color:var(--accent-primary);text-decoration:underline;">email him directly</a> for the PDF copy.`
  };

  function processAiQuery(query) {
    const q = query.toLowerCase().trim();
    let reply = "";

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
      reply = aiKnowledgeBase.skills;
    } else if (q.includes("project") || q.includes("work") || q.includes("app") || q.includes("portfolio")) {
      reply = aiKnowledgeBase.projects;
    } else if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("lpu") || q.includes("bca") || q.includes("degree")) {
      reply = aiKnowledgeBase.education;
    } else if (q.includes("hire") || q.includes("job") || q.includes("internship") || q.includes("role") || q.includes("opportunity")) {
      reply = aiKnowledgeBase.hire;
    } else if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
      reply = aiKnowledgeBase.resume;
    } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("call")) {
      reply = `You can connect directly with Nitesh:<br>📧 <strong>Email:</strong> <a href="mailto:kumarniitesh84737@gmail.com" style="color:var(--accent-primary);">kumarniitesh84737@gmail.com</a><br>📱 <strong>Phone/WhatsApp:</strong> <a href="tel:+919005799356" style="color:var(--accent-primary);">+91 9005799356</a><br>🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nitesh-kumar2006/" target="_blank" style="color:var(--accent-primary);">nitesh-kumar2006</a>`;
    } else if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      reply = `Hello! How can I assist your review of Nitesh Kumar's developer profile today? Ask me about his MERN skills, projects, or education!`;
    } else {
      reply = `I understand you're inquiring about "<em>${query}</em>". Nitesh is a dedicated Full Stack MERN Developer skilled in React, Node, Express, MongoDB, and Python. You can reach out directly at <a href="mailto:kumarniitesh84737@gmail.com" style="color:var(--accent-primary);">kumarniitesh84737@gmail.com</a>!`;
    }

    setTimeout(() => {
      appendAiMessage("bot", reply);
    }, 450);
  }

  quickChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const queryType = chip.getAttribute("data-query");
      appendAiMessage("user", chip.textContent);
      setTimeout(() => {
        if (aiKnowledgeBase[queryType]) {
          appendAiMessage("bot", aiKnowledgeBase[queryType]);
        }
      }, 400);
    });
  });

  if (aiChatForm) {
    aiChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputEl = document.getElementById("ai-user-input");
      if (!inputEl) return;
      const text = inputEl.value.trim();
      if (!text) return;

      appendAiMessage("user", text);
      inputEl.value = "";
      processAiQuery(text);
    });
  }

  /* ==========================================================================
     6. TYPEWRITER EFFECT IN HERO
     ========================================================================== */
  const typedRoleEl = document.getElementById("typed-role");
  if (typedRoleEl) {
    const roles = [
      "Full Stack Developer",
      "MERN Stack Specialist",
      "React & Node.js Engineer",
      "RESTful API Architect",
      "AI & Web Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 105;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ==========================================================================
     7. DYNAMIC NUMBER COUNTER ANIMATION
     ========================================================================== */
  const statDigits = document.querySelectorAll(".stat-digit");
  let statsCounted = false;

  function runCounters() {
    statDigits.forEach((stat) => {
      const target = +stat.getAttribute("data-target");
      let count = 0;
      const step = Math.ceil(target / 20) || 1;
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target + "+";
          clearInterval(interval);
        } else {
          stat.textContent = count + "+";
        }
      }, 60);
    });
  }

  if (statDigits.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            runCounters();
          }
        });
      },
      { threshold: 0.4 }
    );

    const statsStage = document.getElementById("avatar-stage");
    if (statsStage) statsObserver.observe(statsStage);
  }

  /* ==========================================================================
     8. GITHUB HEATMAP COMMIT GENERATOR
     ========================================================================== */
  const commitGrid = document.getElementById("commit-grid");
  if (commitGrid) {
    const totalCells = 52 * 7;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      // Generate realistic commit distribution
      const rand = Math.random();
      let level = 0;
      if (rand > 0.82) level = 4;
      else if (rand > 0.65) level = 3;
      else if (rand > 0.48) level = 2;
      else if (rand > 0.28) level = 1;
      cell.classList.add(`cell-level-${level}`);
      cell.title = `Contributions on day #${i + 1}: ${level * 3 + Math.floor(Math.random() * 3)}`;
      commitGrid.appendChild(cell);
    }
  }

  /* ==========================================================================
     9. DEVELOPER CONSOLE & LIVE JAVASCRIPT SANDBOX
     ========================================================================== */
  const termTabs = document.querySelectorAll(".term-tab");
  const termOutput = document.getElementById("terminal-output");
  const clearTermBtn = document.getElementById("clear-term");
  const runSandboxBtn = document.getElementById("run-sandbox-btn");

  const terminalSnippets = {
    profile: `<pre><code><span class="code-comment">// nitesh.profile - Live System Overview</span>
<span class="code-keyword">const</span> developer = {
  <span class="code-prop">name</span>: <span class="code-str">"Nitesh Kumar"</span>,
  <span class="code-prop">title</span>: <span class="code-str">"Full Stack Web Developer & Software Engineer"</span>,
  <span class="code-prop">university</span>: <span class="code-str">"Lovely Professional University (BCA)"</span>,
  <span class="code-prop">stack</span>: [<span class="code-str">"React.js"</span>, <span class="code-str">"Node.js"</span>, <span class="code-str">"Express.js"</span>, <span class="code-str">"MongoDB"</span>, <span class="code-str">"Python"</span>, <span class="code-str">"Java"</span>],
  <span class="code-prop">status</span>: <span class="code-str">"🟢 Available for Full-Time Roles & Internships"</span>
};</code></pre>`,

    skills: `<pre><code><span class="code-comment">// nitesh.skills() - Core Stack Metrics</span>
<span class="code-keyword">const</span> techMetrics = {
  <span class="code-prop">frontend</span>: { React: <span class="code-num">90</span>, JavaScript: <span class="code-num">92</span>, TailwindCSS: <span class="code-num">88</span> },
  <span class="code-prop">backend</span>: { NodeJS: <span class="code-num">88</span>, ExpressJS: <span class="code-num">89</span>, REST_APIs: <span class="code-num">90</span> },
  <span class="code-prop">databases</span>: { MongoDB: <span class="code-num">86</span>, MySQL: <span class="code-num">84</span> },
  <span class="code-prop">tools</span>: [<span class="code-str">"Git"</span>, <span class="code-str">"GitHub"</span>, <span class="code-str">"VS Code"</span>, <span class="code-str">"Postman"</span>]
};
<span class="code-keyword">console</span>.<span class="code-prop">log</span>(<span class="code-str">"Ready for high-scale MERN deployments!"</span>);</code></pre>`,

    experience: `<pre><code><span class="code-comment">// nitesh.internship() - Practical Experience</span>
<span class="code-keyword">function</span> <span class="code-prop">getInternshipHighlights</span>() {
  <span class="code-keyword">return</span> [
    <span class="code-str">"Engineered dynamic React interfaces with responsive state"</span>,
    <span class="code-str">"Built secure Node/Express REST APIs with JWT auth"</span>,
    <span class="code-str">"Integrated and optimized MongoDB/MySQL data collections"</span>
  ];
}
<span class="code-keyword">console</span>.<span class="code-prop">log</span>(getInternshipHighlights());</code></pre>`,

    hireCalculator: `<pre><code><span class="code-comment">// matchScore() - Calculate Engineering Fit Score</span>
<span class="code-keyword">function</span> <span class="code-prop">calculateFitScore</span>(role) {
  <span class="code-keyword">const</span> factors = { mernStack: <span class="code-num">100</span>, passion: <span class="code-num">100</span>, problemSolving: <span class="code-num">98</span> };
  <span class="code-keyword">return</span> <span class="code-str">\`Match for \${role}: 99.4% 🔥 (Recommended Hire)\`</span>;
}
<span class="code-keyword">console</span>.<span class="code-prop">log</span>(calculateFitScore(<span class="code-str">"Full Stack Web Developer"</span>));</code></pre>`
  };

  let activeSnippet = "profile";

  if (termTabs.length > 0 && termOutput) {
    termTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        termTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeSnippet = tab.getAttribute("data-command");
        if (terminalSnippets[activeSnippet]) {
          termOutput.innerHTML = terminalSnippets[activeSnippet];
        }
      });
    });

    if (clearTermBtn) {
      clearTermBtn.addEventListener("click", () => {
        termOutput.innerHTML = `<pre><code><span class="code-comment">// Terminal buffer cleared. Select any tab above to load snippet.</span>
<span class="code-keyword">console</span>.<span class="code-prop">log</span>(<span class="code-str">"Runtime: Nitesh.dev v2.0 ready."</span>);</code></pre>`;
        termTabs.forEach((t) => t.classList.remove("active"));
      });
    }

    if (runSandboxBtn) {
      runSandboxBtn.addEventListener("click", () => {
        playCyberSound("bot");
        const executionOutput = `
<pre><code><span class="code-comment">// Executing ${activeSnippet}... [Memory: 14.2MB | Latency: 2ms]</span>
<span class="code-str">▶ [STDOUT]: Success! Output compiled:</span>
{
  <span class="code-prop">developer</span>: <span class="code-str">"Nitesh Kumar"</span>,
  <span class="code-prop">status</span>: <span class="code-str">"SUCCESS 200 OK"</span>,
  <span class="code-prop">matchScore</span>: <span class="code-str">"99.4% - Ready for deployment"</span>,
  <span class="code-prop">verifiedAt</span>: <span class="code-str">"${new Date().toLocaleTimeString()}"</span>
}</code></pre>`;
        termOutput.innerHTML = executionOutput;
        showToast("Code snippet executed successfully! ⚡");
      });
    }
  }

  /* ==========================================================================
     10. SKILLS FILTERING TABS
     ========================================================================== */
  const skillFilterTabs = document.querySelectorAll(".filter-tab");
  const skillCards = document.querySelectorAll(".skill-card");

  if (skillFilterTabs.length > 0 && skillCards.length > 0) {
    skillFilterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        skillFilterTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter");

        skillCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  }

  /* ==========================================================================
     11. PROJECTS FILTERING TABS
     ========================================================================== */
  const projectFilterTabs = document.querySelectorAll(".project-filter-tab");
  const projectCards = document.querySelectorAll(".project-card");

  if (projectFilterTabs.length > 0 && projectCards.length > 0) {
    projectFilterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        projectFilterTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  }

  /* ==========================================================================
     12. COPY TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const copyButtons = document.querySelectorAll(".copy-btn");

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (textToCopy) {
        playCyberSound("copy");
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            showToast(`Copied "${textToCopy}" to clipboard! ✨`);
          },
          () => {
            const temp = document.createElement("input");
            temp.value = textToCopy;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);
            showToast(`Copied to clipboard! ✨`);
          }
        );
      }
    });
  });

  /* ==========================================================================
     13. CONTACT FORM VALIDATION & HANDLING
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formSuccessMsg = document.getElementById("form-success-msg");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("user-name");
      const emailInput = document.getElementById("user-email");
      const subjectInput = document.getElementById("user-subject");
      const messageInput = document.getElementById("user-message");

      const nameErr = document.getElementById("name-error");
      const emailErr = document.getElementById("email-error");
      const subjectErr = document.getElementById("subject-error");
      const messageErr = document.getElementById("message-error");

      // Reset
      [nameErr, emailErr, subjectErr, messageErr].forEach((el) => {
        if (el) el.textContent = "";
      });
      if (formSuccessMsg) {
        formSuccessMsg.className = "form-status-alert";
        formSuccessMsg.textContent = "";
      }

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameErr.textContent = "Please enter your name.";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailErr.textContent = "Please enter your email.";
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailErr.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        subjectErr.textContent = "Please enter a subject.";
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageErr.textContent = "Please write your message.";
        isValid = false;
      } else if (messageInput.value.trim().length < 8) {
        messageErr.textContent = "Message should be at least 8 characters.";
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById("submit-btn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Transmitting...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
          }

          if (formSuccessMsg) {
            formSuccessMsg.className = "form-status-alert success";
            formSuccessMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}! Your message has been received. I will respond to your email shortly.`;
          }

          playCyberSound("bot");
          showToast("Message sent successfully! 🚀");
          contactForm.reset();
        }, 1200);
      }
    });
  }

  /* ==========================================================================
     14. RESUME SNAPSHOT MODAL & PRINT
     ========================================================================== */
  const resumeBtn = document.getElementById("resume-btn");
  const resumeModal = document.getElementById("resume-modal");
  const closeResumeModal = document.getElementById("close-resume-modal");
  const printResumeBtn = document.getElementById("print-resume-btn");

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("open");
      resumeModal.setAttribute("aria-hidden", "false");
      playCyberSound("bot");
    });
  }

  if (closeResumeModal && resumeModal) {
    closeResumeModal.addEventListener("click", () => {
      resumeModal.classList.remove("open");
      resumeModal.setAttribute("aria-hidden", "true");
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove("open");
        resumeModal.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }

  /* ==========================================================================
     15. SCROLL PROGRESS, STICKY HEADER & SCROLL SPY
     ========================================================================== */
  const progressBar = document.getElementById("scroll-progress");
  const siteHeader = document.getElementById("site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const backToTopBtn = document.getElementById("back-to-top");
  const progressCircle = document.querySelector(".progress-ring-circle");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = scrollPercent + "%";

    if (siteHeader) {
      if (scrollTop > 50) siteHeader.classList.add("scrolled");
      else siteHeader.classList.remove("scrolled");
    }

    if (backToTopBtn) {
      if (scrollTop > 350) backToTopBtn.classList.add("visible");
      else backToTopBtn.classList.remove("visible");

      if (progressCircle) {
        const circumference = 2 * Math.PI * 21;
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     16. MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-links");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("mobile-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("mobile-open");
      });
    });
  }

  /* ==========================================================================
     17. BACKGROUND PARTICLE CANVAS
     ========================================================================== */
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.5 ? "rgba(0, 242, 254," : "rgba(168, 85, 247,";
        this.opacity = Math.random() * 0.45 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(width / 24), 50);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 - distance / 1000})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
});
