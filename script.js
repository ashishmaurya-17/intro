document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE NAV TOGGLE
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("mobile-nav");
  const navLinks = document.querySelectorAll(".nav-item");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navMenu.classList.add("open");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. SCROLL ANIMATION
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });

  // 3. BATTERY-FRIENDLY DUST PARTICLES
  // We reduce particle count significantly on mobile
  const canvas = document.getElementById("dust-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 80; // Very few particles on mobile to save battery

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3; // Slower speed
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(100, 80, 70, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
  }
});
