/* ============================================
   VICKY PORTFOLIO — Advanced Interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // LOADER
  // ============================================
  (function initLoader() {
    const loader = document.getElementById("loader");
    const barFill = document.getElementById("loaderBarFill");
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      barFill.style.width = progress + "%";
    }, 200);
    window.addEventListener("load", () => {
      clearInterval(interval);
      barFill.style.width = "100%";
      setTimeout(() => loader.classList.add("hidden"), 500);
    });
    setTimeout(() => { if (!loader.classList.contains("hidden")) { clearInterval(interval); barFill.style.width = "100%"; setTimeout(() => loader.classList.add("hidden"), 500); } }, 4000);
  })();

  // ============================================
  // CUSTOM CURSOR (Enhanced)
  // ============================================
  (function initCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const blur = document.getElementById("cursorBlur");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let blurX = 0, blurY = 0;

    // Movement Tracking
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update dot immediately
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      
      // Show cursor if it was hidden
      document.body.classList.remove("cursor-hidden");
    });

    // Smoothing for the ring and blur
    function animate() {
      // Ring follows with slight lag
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      // Blur follows with more lag
      if (blur) {
        blurX += (mouseX - blurX) * 0.05;
        blurY += (mouseY - blurY) * 0.05;
        blur.style.left = blurX + "px";
        blur.style.top = blurY + "px";
      }

      requestAnimationFrame(animate);
    }
    animate();

    // Click Effects
    document.addEventListener("mousedown", () => {
      ring.classList.add("click");
      setTimeout(() => ring.classList.remove("click"), 400);
    });

    // Hover Interactivity
    const interactiveEls = document.querySelectorAll(
      "a, button, .btn, .project-card, .skill-card, .nav-item, .hero-social a"
    );

    interactiveEls.forEach(el => {
      el.addEventListener("mouseenter", () => {
        dot.classList.add("hover");
        ring.classList.add("hover");
        if (blur) blur.classList.add("hover");
        
        // Magnetic effect for buttons
        if (el.classList.contains("btn") || el.tagName === "BUTTON") {
          ring.classList.add("magnetic");
        }
      });

      el.addEventListener("mouseleave", () => {
        dot.classList.remove("hover");
        ring.classList.remove("hover");
        if (blur) blur.classList.remove("hover");
        ring.classList.remove("magnetic");
      });
    });

    // Hide when mouse leaves window
    document.addEventListener("mouseleave", () => {
      document.body.classList.add("cursor-hidden");
    });
  })();

  // ============================================
  // SCROLL PROGRESS
  // ============================================
  (function initScrollProgress() {
    const fill = document.querySelector(".scroll-progress-fill");
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      fill.style.width = (scrollTop / docHeight) * 100 + "%";
    });
  })();

  // ============================================
  // THEME TOGGLE
  // ============================================
  (function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const saved = localStorage.getItem("vicky-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "" : "light";
      document.documentElement.setAttribute("data-theme", next || "");
      localStorage.setItem("vicky-theme", next || "");
    });
  })();

  // ============================================
  // NAVBAR
  // ============================================
  (function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 50));
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
    });
    document.querySelectorAll(".nav-item").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  })();

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  (function initNavObserver() {
    const sections = document.querySelectorAll(".section[id]");
    const navItems = document.querySelectorAll(".nav-item");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => link.classList.remove("active"));
          const active = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" });
    sections.forEach(s => obs.observe(s));
  })();

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  (function initScrollReveal() {
    const revealEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach(el => obs.observe(el));
  })();

  // ============================================
  // HERO STAT COUNTERS
  // ============================================
  (function initHeroCounters() {
    const stats = document.querySelectorAll(".stat-num");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          let current = 0;
          const step = Math.ceil(target / 40);
          const update = () => {
            current += step;
            if (current >= target) { el.textContent = target + "+"; return; }
            el.textContent = current + "+";
            requestAnimationFrame(update);
          };
          update();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(s => obs.observe(s));
  })();

  // ============================================
  // TYPING EFFECT
  // ============================================
  (function initTyping() {
    const texts = [
      "Web Applications",
      "AI & ML Solutions",
      "Mobile Experiences",
      "API Architectures",
      "Creative Interfaces"
    ];
    let index = 0, charIndex = 0, isDeleting = false;
    const el = document.getElementById("typingText");
    function type() {
      const current = texts[index];
      el.textContent = current.substring(0, charIndex);
      if (!isDeleting && charIndex < current.length) { charIndex++; setTimeout(type, 80); }
      else if (isDeleting && charIndex > 0) { charIndex--; setTimeout(type, 40); }
      else {
        isDeleting = !isDeleting;
        if (!isDeleting) index = (index + 1) % texts.length;
        setTimeout(type, 1500);
      }
    }
    type();
  })();

  // ============================================
  // ABOUT TABS
  // ============================================
  (function initAboutTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
        document.getElementById(btn.dataset.tab)?.classList.add("active");
      });
    });
  })();

  // ============================================
  // SKILL BARS & FILTER
  // ============================================
  (function initSkills() {
    // Animate bars on scroll
    const fillObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll(".skill-fill");
          fills.forEach(f => {
            const card = f.closest(".skill-card");
            f.style.width = card.dataset.percent + "%";
          });
          fillObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll(".skill-card").forEach(c => fillObs.observe(c));

    // Filter buttons
    const filterBtns = document.querySelectorAll(".skill-filter-btn");
    const cards = document.querySelectorAll(".skill-card");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const group = btn.dataset.skillGroup;
        let visibleIndex = 0;
        cards.forEach(card => {
          if (group === "all" || card.dataset.group === group) {
            card.classList.remove("hidden");
            card.style.animation = `none`;
            card.offsetHeight; // trigger reflow
            card.style.animation = `fadeIn 0.5s ease ${visibleIndex * 0.05}s both`;
            visibleIndex++;
          } else {
            card.classList.add("hidden");
          }
        });

      });
    });
  })();

  // ============================================
  // PROJECT FILTER & TILT
  // ============================================
  (function initProjects() {
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    const cards = document.querySelectorAll(".project-card");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        let visibleIndex = 0;
        cards.forEach((card) => {
          if (filter === "all" || card.dataset.category === filter) {
            card.classList.remove("hidden");
            card.style.animation = `none`;
            card.offsetHeight; // trigger reflow
            card.style.animation = `fadeIn 0.5s ease ${visibleIndex * 0.1}s both`;
            visibleIndex++;
          } else {
            card.classList.add("hidden");
          }
        });

      });
    });

    // 3D Tilt effect on project cards
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const cx = rect.width / 2, cy = rect.height / 2;
        const dx = (x - cx) / cx, dy = (y - cy) / cy;
        card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-8px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)";
      });
    });
  })();

  // ============================================
  // TIMELINE ANIMATION
  // ============================================
  (function initTimeline() {
    const items = document.querySelectorAll(".timeline-item");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("active"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(item => {
      item.querySelector(".timeline-content").style.opacity = "0";
      item.querySelector(".timeline-content").style.transform = "translateY(30px)";
      item.querySelector(".timeline-content").style.transition = "opacity 0.6s ease, transform 0.6s ease";
      obs.observe(item);
    });
    // Extra observer to apply active
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const content = entry.target.querySelector(".timeline-content");
          if (content) { content.style.opacity = "1"; content.style.transform = "translateY(0)"; }
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(item => obs2.observe(item));
  })();



  // ============================================
  // CONTACT FORM (Handled by EmailJS at bottom)
  // ============================================

  // Shake keyframe
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-10px); } 40% { transform: translateX(10px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
  `;
  document.head.appendChild(style);

  // ============================================
  // BACK TO TOP
  // ============================================
  (function initBackToTop() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => btn.classList.toggle("hidden", window.scrollY < 300));
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  })();

  // ============================================
  // PROJECT MODAL
  // ============================================
  const projectData = [
    { title: "E-Commerce Platform", image: "Images/E-Commerce.png", desc: "A full-featured online store built with React and Node.js. Features include real-time inventory management, Stripe payment integration, admin dashboard with analytics, user authentication, and a responsive design optimized for all devices.", tags: ["React", "Node.js", "Stripe", "MongoDB"], features: ["Real-time inventory tracking", "Stripe payment processing", "Admin analytics dashboard", "JWT authentication", "Responsive design"] },
    { title: "AI Content Generator", image: "Images/AI Content Generator.png", desc: "Machine learning powered content generation tool that creates marketing copy, blog posts, and social media content using state-of-the-art NLP models. Fine-tuned on industry-specific datasets for high-quality output.", tags: ["Python", "TensorFlow", "Flask", "NLP"], features: ["GPT-based text generation", "Multi-language support", "Content tone customization", "Batch processing", "API integration ready"] },
    { title: "Analytics Dashboard", image: "Images/Analytics Dashboard.png", desc: "Real-time business intelligence dashboard featuring interactive D3.js visualizations, drill-down capabilities, and customizable widgets. Handles millions of data points with smooth performance.", tags: ["Vue.js", "D3.js", "Firebase", "Chart.js"], features: ["Real-time data streaming", "Interactive D3 charts", "Custom widget builder", "Export to PDF/CSV", "Role-based access"] },
    { title: "Fitness Tracker App", image: "Images/Fitness Tracker App.png", desc: "Cross-platform mobile application for tracking workouts, nutrition, and progress. Features include GPS route tracking, social challenges, personalized workout plans powered by AI recommendations.", tags: ["React Native", "Firebase", "Redux"], features: ["GPS workout tracking", "AI workout recommendations", "Social challenges", "Progress visualization", "Offline support"] },
    { title: "Smart Voice Assistant", image: "Images/Smart Voice Assistant.png", desc: "Voice-controlled personal assistant with advanced NLP capabilities. Can manage tasks, control smart home devices, answer queries, and integrate with third-party services via custom API connectors.", tags: ["Python", "NLP", "FastAPI", "WebSocket"], features: ["Natural language understanding", "Smart home integration", "Task automation", "Custom skill SDK", "Real-time speech processing"] },
    { title: "Social Media Platform", image: "Images/Social Media Platform.png", desc: "A modern social networking application with real-time messaging, story sharing, content feeds, and an AI-powered recommendation system. Built for scalability with Next.js and PostgreSQL.", tags: ["Next.js", "Prisma", "PostgreSQL", "Redis"], features: ["Real-time messaging", "Story sharing (24h)", "AI content feed", "Push notifications", "End-to-end encryption"] }
  ];

  window.openProjectModal = (index) => {
    const data = projectData[index];
    if (!data) return;
    const modal = document.getElementById("projectModal");
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDesc").textContent = data.desc;
    const tagsContainer = document.getElementById("modalTags");
    tagsContainer.innerHTML = "";
    data.tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
    const featuresList = document.getElementById("modalFeatures");
    featuresList.innerHTML = "";
    data.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresList.appendChild(li);
    });

    const modalImg = document.getElementById("modalImg");
    const modalPlaceholder = document.getElementById("modalImgPlaceholder");
    if (data.image) {
      modalImg.src = data.image;
      modalImg.style.display = "block";
      modalPlaceholder.style.display = "none";
    } else {
      modalImg.style.display = "none";
      modalPlaceholder.style.display = "flex";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeProjectModal = () => {
    document.getElementById("projectModal").classList.remove("active");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ============================================
  // PARALLAX ON HERO SHAPES (mouse move)
  // ============================================
  (function initParallax() {
    const shapes = document.querySelectorAll(".hero-shape");
    document.querySelector(".hero")?.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 0.3;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  })();

  // ============================================
  // INTERSECTION: stagger fade children
  // ============================================
  (function initStaggerFade() {
    const grids = document.querySelectorAll(".projects-grid, .skills-grid");
    grids.forEach(grid => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
              if (!child.classList.contains("hidden")) {
                child.style.opacity = "0";
                child.style.transform = "translateY(30px)";
                setTimeout(() => {
                  child.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                  child.style.opacity = "1";
                  child.style.transform = "translateY(0)";
                }, i * 80);
              }
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      obs.observe(grid);
    });

    // Set initial state
    document.querySelectorAll(".project-card, .skill-card").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
    });
  })();

  console.log("%c Vicky Portfolio %c v1.0 ", "background:#6c5ce7;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:700", "background:#00cec9;color:#000;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:600");
  console.log("%c🚀 Built with passion", "color:#6c5ce7;font-style:italic");

});

/* =========================
EMAILJS CONTACT FORM
========================= */

// Initialize EmailJS
emailjs.init("7xiD4VNt5NLzeyWs5");

// Contact Form Submit
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Button Loading Effect
    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Sending...</span> <i class='fas fa-spinner fa-spin'></i>";
    submitBtn.disabled = true;

    // Get Form Values
    const params = {
      from_name: document.getElementById("formName").value,
      from_email: document.getElementById("formEmail").value,
      subject: document.getElementById("formSubject").value,
      message: document.getElementById("formMessage").value,
    };

    // Send Email
    emailjs
      .send("service_1y5e0ks", "template_sapitmi", params)
      .then(function (response) {
        alert("Message Sent Successfully!");

        // Reset Form
        contactForm.reset();

        // Reset Button
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <i class="fas fa-paper-plane"></i>
        `;
        submitBtn.disabled = false;

        console.log("SUCCESS!", response.status, response.text);
      })
      .catch(function (error) {
        alert("Failed to Send Message!");

        submitBtn.innerHTML = `
          <span>Send Message</span>
          <i class="fas fa-paper-plane"></i>
        `;
        submitBtn.disabled = false;

        console.log("FAILED...", error);
      });
  });
}