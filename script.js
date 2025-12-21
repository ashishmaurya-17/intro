document.addEventListener("DOMContentLoaded", () => {
  
  // 1. MOBILE MENU TOGGLE
  const menuBtn = document.querySelector('.menu-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if(menuBtn) {
    menuBtn.addEventListener('click', () => {
      // Toggle active class on overlay
      const isActive = navOverlay.classList.contains('active');
      
      if (isActive) {
        navOverlay.classList.remove('active');
        // Icon animation wapis normal
        menuBtn.children[0].style.transform = "rotate(0) translate(0,0)";
        menuBtn.children[1].style.opacity = "1";
      } else {
        navOverlay.classList.add('active');
        // Icon animation to 'X'
        menuBtn.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        menuBtn.children[1].style.opacity = "0"; // Dusri line gayab kar do simple effect ke liye
      }
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      if(menuBtn) {
        menuBtn.children[0].style.transform = "rotate(0)";
        menuBtn.children[1].style.opacity = "1";
      }
    });
  });

  // 2. SCROLL PROGRESS
  const scrollContainer = document.querySelector('.scroll-container');
  const progressBar = document.getElementById('progress-bar');

  if(scrollContainer && progressBar) {
    scrollContainer.addEventListener('scroll', () => {
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const currentScroll = scrollContainer.scrollTop;
      if (maxScroll > 0) {
        const percentage = (currentScroll / maxScroll) * 100;
        progressBar.style.width = percentage + '%';
      }
    });
  }

  // 3. BACKGROUND PARTICLES (Simple)
  const canvas = document.getElementById("dust-canvas");
  if(canvas) {
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = [];
    // Kam particles taaki phone hang na ho
    const particleCount = window.innerWidth < 600 ? 20 : 50;

    for(let i=0; i<particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(100, 70, 50, 0.4)";
      
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        
        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
});
