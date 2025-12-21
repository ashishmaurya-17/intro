document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollContainer = document.querySelector('.scroll-container');
  const progressBar = document.querySelector('.scroll-progress-bar');

  // 1. Mobile Menu Logic
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navOverlay.classList.toggle('active');
    });
  }

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
    });
  });

  // 2. Scroll Progress Logic
  if (scrollContainer && progressBar) {
    scrollContainer.addEventListener('scroll', () => {
      const winScroll = scrollContainer.scrollTop;
      const height = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }

  // 3. Simple Canvas Particles
  const canvas = document.getElementById("dust-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(107, 44, 44, 0.2)";
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
});
