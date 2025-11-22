document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // ========== NAV TOGGLE ==========
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close nav on link click (mobile)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      }
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const rect = target.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 70; // space under sticky header
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    });
  });

  // ========== FADE-IN-UP ON SCROLL ==========
  const observed = document.querySelectorAll(".fade-in-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  observed.forEach((el) => observer.observe(el));

  // ========== MIXED DUST + INK PARTICLES ==========
  const canvas = document.getElementById("dust-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let animationId;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  resizeCanvas();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  function createParticle(type) {
    const base = {
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: Math.random() * 0.35 + 0.08,
    };

    if (type === "dust") {
      return {
        ...base,
        type,
        radius: Math.random() * 1.2 + 0.6,
        speedY: Math.random() * 0.09 + 0.03,
        speedX: (Math.random() - 0.5) * 0.05,
      };
    } else {
      // ink speck
      return {
        ...base,
        type,
        radius: Math.random() * 0.7 + 0.25,
        speedY: Math.random() * 0.12 + 0.05,
        speedX: (Math.random() - 0.5) * 0.08,
      };
    }
  }

  function initParticles() {
    const baseCount = width < 600 ? 70 : 110; // dense but light
    particles = [];
    for (let i = 0; i < baseCount; i++) {
      const type = Math.random() < 0.55 ? "dust" : "ink";
      particles.push(createParticle(type));
    }
  }

  function updateParticles() {
    for (let p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height + 10) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x < -12) p.x = width + 12;
      if (p.x > width + 12) p.x = -12;
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (p.type === "dust") {
        ctx.fillStyle = `rgba(90, 70, 60, ${p.opacity * 0.8})`;
      } else {
        // ink speck
        ctx.fillStyle = `rgba(40, 24, 18, ${p.opacity})`;
      }

      ctx.fill();
    }
  }

  function loop() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(loop);
  }

  initParticles();
  loop();

  // Pause animation in background tab to save battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(loop);
    }
  });
});
