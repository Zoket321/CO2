/* ========================================
   Mas de lo mismo, nada de esto es mio XD, todo lo hizo CLAUDE como buen VibeCODER que soy XD
   ======================================== */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animar el ícono hamburguesa
    const spans = navToggle.querySelectorAll('span');
    navToggle.classList.toggle('active');
  });
}

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---- SCROLL SUAVE PARA SECCIONES ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- INTERSECTION OBSERVER — Animaciones al hacer scroll ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Aplicar delay escalonado para tarjetas en grupo
      const siblings = entry.target.parentElement.querySelectorAll('.info-card, .impacto-card, .consejo-card');
      const index = Array.from(siblings).indexOf(entry.target);
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 120);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todas las tarjetas animables
document.querySelectorAll('.info-card, .impacto-card, .consejo-card').forEach(card => {
  observer.observe(card);
});

// ---- CONTADOR ANIMADO para números de impacto ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent);
  const isFloat = el.dataset.target && el.dataset.target.includes('.');
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  
  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    
    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    
    if (progress < 1) requestAnimationFrame(update);
  }
  
  requestAnimationFrame(update);
}

// Observar los contadores de impacto
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.impacto-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ---- PARALLAX SUAVE en hero orbs ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  
  if (orb1) orb1.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (orb2) orb2.style.transform = `translateY(${-scrollY * 0.1}px)`;
});
