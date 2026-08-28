/**
 * NITESH KUMAR | FULL STACK DEVELOPER PORTFOLIO
 * Main Interactive Logic & Modern Animation Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // Update current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     1. TYPEWRITER EFFECT IN HERO
     ========================================================================== */
  const typedRoleEl = document.getElementById("typed-role");
  if (typedRoleEl) {
    const roles = [
      "Full Stack Developer",
      "MERN Stack Specialist",
      "React & Node.js Engineer",
      "RESTful API Architect",
      "Passionate Problem Solver"
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
        typingSpeed = 50;
      } else {
        typedRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ==========================================================================
     2. DYNAMIC NUMBER COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll(".stat-num");
  let statsCounted = false;

  function runCounters() {
    statNumbers.forEach((stat) => {
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

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            runCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsCard = document.querySelector(".profile-stats-card");
    if (statsCard) statsObserver.observe(statsCard);
  }

  /* ==========================================================================
     3. INTERACTIVE TERMINAL EMULATOR
     ========================================================================== */
  const termTabs = document.querySelectorAll(".term-tab");
  const termOutput = document.getElementById("terminal-output");
  const clearTermBtn = document.getElementById("clear-term");

  const terminalSnippets = {
    bio: `<pre><code><span class="code-comment">// nitesh.bio - Developer Profile Summary</span>
<span class="code-keyword">const</span> developer = {
  <span class="code-prop">name</span>: <span class="code-str">"Nitesh Kumar"</span>,
  <span class="code-prop">title</span>: <span class="code-str">"Full Stack Web Developer"</span>,
  <span class="code-prop">education</span>: <span class="code-str">"BCA @ Lovely Professional University"</span>,
  <span class="code-prop">location</span>: <span class="code-str">"Punjab / Uttar Pradesh, India"</span>,
  <span class="code-prop">openForWork</span>: <span class="code-keyword">true</span>,
  <span class="code-prop">focus</span>: [<span class="code-str">"MERN Stack"</span>, <span class="code-str">"REST APIs"</span>, <span class="code-str">"Clean Architecture"</span>]
};</code></pre>`,

    skills: `<pre><code><span class="code-comment">// nitesh.skills() - Core Tech Stack Breakdown</span>
<span class="code-keyword">const</span> techStack = {
  <span class="code-prop">frontend</span>: [<span class="code-str">"React.js"</span>, <span class="code-str">"JavaScript ES6+"</span>, <span class="code-str">"Tailwind CSS"</span>, <span class="code-str">"HTML5/CSS3"</span>],
  <span class="code-prop">backend</span>: [<span class="code-str">"Node.js"</span>, <span class="code-str">"Express.js"</span>, <span class="code-str">"RESTful APIs"</span>, <span class="code-str">"JWT Auth"</span>],
  <span class="code-prop">databases</span>: [<span class="code-str">"MongoDB"</span>, <span class="code-str">"Mongoose"</span>, <span class="code-str">"MySQL"</span>],
  <span class="code-prop">languages</span>: [<span class="code-str">"JavaScript"</span>, <span class="code-str">"Python"</span>, <span class="code-str">"Java"</span>],
  <span class="code-prop">tools</span>: [<span class="code-str">"Git & GitHub"</span>, <span class="code-str">"VS Code"</span>, <span class="code-str">"Postman"</span>]
};</code></pre>`,

    experience: `<pre><code><span class="code-comment">// nitesh.internship() - Practical Experience</span>
<span class="code-keyword">const</span> experience = {
  <span class="code-prop">role</span>: <span class="code-str">"Full Stack Developer Intern"</span>,
  <span class="code-prop">responsibilities</span>: [
    <span class="code-str">"Designed responsive React frontend components"</span>,
    <span class="code-str">"Created Node.js REST API endpoints with authentication"</span>,
    <span class="code-str">"Connected MongoDB & MySQL databases with efficient queries"</span>
  ],
  <span class="code-prop">impact</span>: <span class="code-str">"Enhanced application performance and streamlined API workflows"</span>
};</code></pre>`,

    contact: `<pre><code><span class="code-comment">// nitesh.contact() - Available Communication Channels</span>
<span class="code-keyword">const</span> reachOut = {
  <span class="code-prop">email</span>: <span class="code-str">"kumarniitesh84737@gmail.com"</span>,
  <span class="code-prop">phone</span>: <span class="code-str">"+91 9005799356"</span>,
  <span class="code-prop">linkedin</span>: <span class="code-str">"linkedin.com/in/nitesh-kumar2006"</span>,
  <span class="code-prop">github</span>: <span class="code-str">"github.com/nitesh-84737"</span>,
  <span class="code-prop">responseRate</span>: <span class="code-str">"Within 24 Hours"</span>
};</code></pre>`
  };

  if (termTabs.length > 0 && termOutput) {
    termTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        termTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const command = tab.getAttribute("data-command");
        if (terminalSnippets[command]) {
          termOutput.innerHTML = terminalSnippets[command];
        }
      });
    });

    if (clearTermBtn) {
      clearTermBtn.addEventListener("click", () => {
        termOutput.innerHTML = `<pre><code><span class="code-comment">// Terminal reset. Select any command tab above to view details.</span>
<span class="code-keyword">console</span>.<span class="code-prop">log</span>(<span class="code-str">"System ready: Nitesh Kumar Portfolio v2.0"</span>);</code></pre>`;
        termTabs.forEach((t) => t.classList.remove("active"));
      });
    }
  }

  /* ==========================================================================
     4. SKILLS FILTERING TABS
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
     5. PROJECTS FILTERING TABS
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
     6. COPY TO CLIPBOARD & TOAST NOTIFICATION
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
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            showToast(`Copied "${textToCopy}" to clipboard! ✨`);
          },
          () => {
            // Fallback
            const tempInput = document.createElement("input");
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            showToast(`Copied to clipboard! ✨`);
          }
        );
      }
    });
  });

  /* ==========================================================================
     7. CONTACT FORM VALIDATION & HANDLING
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

      // Reset errors
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
      } else if (messageInput.value.trim().length < 10) {
        messageErr.textContent = "Message should be at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById("submit-btn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
          }

          if (formSuccessMsg) {
            formSuccessMsg.className = "form-status-alert success";
            formSuccessMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}! Your message was received. I will respond to your email shortly.`;
          }

          showToast("Message sent successfully! 🚀");
          contactForm.reset();
        }, 1200);
      }
    });
  }

  /* ==========================================================================
     8. RESUME SNAPSHOT MODAL & PRINT
     ========================================================================== */
  const resumeBtn = document.getElementById("resume-btn");
  const resumeModal = document.getElementById("resume-modal");
  const closeResumeModal = document.getElementById("close-resume-modal");
  const printResumeBtn = document.getElementById("print-resume-btn");

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("open");
      resumeModal.setAttribute("aria-hidden", "false");
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
     9. SCROLL PROGRESS, STICKY HEADER & SCROLL SPY
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

    // 1. Scroll Progress Bar
    if (progressBar) {
      progressBar.style.width = scrollPercent + "%";
    }

    // 2. Header Scrolled Class
    if (siteHeader) {
      if (scrollTop > 50) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    // 3. Back to Top Button Visibility & Ring Progress
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }

      if (progressCircle) {
        const circumference = 2 * Math.PI * 21; // r=21 -> ~131.95
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }
    }

    // 4. Scroll Spy for Active Navigation
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
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
     10. MOBILE NAVIGATION DRAWER
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

    // Close when clicking any nav item
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("mobile-open");
      });
    });
  }

  /* ==========================================================================
     11. AMBIENT BACKGROUND PARTICLE CANVAS
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
        this.color = Math.random() > 0.5 ? "rgba(0, 242, 254," : "rgba(99, 102, 241,";
        this.opacity = Math.random() * 0.5 + 0.2;
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

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 - distance / 1000})`;
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
