document.addEventListener("DOMContentLoaded", () => {
  
  // 1. MOBILE MENU TOGGLE
  const menuBtn = document.querySelector('.menu-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
    });
  });

  // 2. SCROLL PROGRESS BAR
  const scrollContainer = document.querySelector('.scroll-container');
  const progressBar = document.getElementById('progress-bar');

  scrollContainer.addEventListener('scroll', () => {
    // Total scrollable height - viewport height
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const currentScroll = scrollContainer.scrollTop;
    
    if (maxScroll > 0) {
      const percentage = (currentScroll / maxScroll) * 100;
      progressBar.style.width = percentage + '%';
    }
  });

  // 3. BATTERY-EFFICIENT PARTICLES
  const canvas = document.getElementById("dust-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Create fewer particles on mobile
  const particleCount = window.innerWidth < 600 ? 30 : 80;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = `rgba(100, 70, 50, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for(let i=0; i<particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
});
