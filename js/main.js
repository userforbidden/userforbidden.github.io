/**
 * Main JS — Saranyan Senthivel
 * Lightweight interactivity for the futuristic UI:
 * - theme toggle (persisted to localStorage)
 * - scroll-reveal animations
 * - cursor-following ambient glow (desktop only)
 * - smooth scroll for in-page anchors
 * - dynamic year, lazy images, keyboard nav
 */

// ==========================================================================
// Theme Toggle (Dark / Light)
// ==========================================================================

function initThemeToggle() {
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  if (!buttons.length) return;

  const storageKey = 'site-theme';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    buttons.forEach((btn) => {
      btn.textContent = isLight ? 'Dark' : 'Light';
      btn.setAttribute('aria-pressed', String(isLight));
    });
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(storageKey); } catch (_) { /* ignore */ }

  const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  applyTheme(initialTheme);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(storageKey, next); } catch (_) { /* ignore */ }
    });
  });
}

// ==========================================================================
// Cursor-following ambient glow (desktop only)
// ==========================================================================

function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  // Skip on touch devices / reduced motion
  const isCoarse = window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isCoarse || reduceMotion) {
    glow.style.display = 'none';
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  const tick = () => {
    // Smooth easing
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(tick);
  };

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });

  // kick it off
  tick();
}

// ==========================================================================
// Scroll-reveal animations
// ==========================================================================

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elements.forEach((el) => observer.observe(el));
}

// ==========================================================================
// Smooth scroll for in-page anchors
// ==========================================================================

function enhanceSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const header = document.querySelector('.site-header');
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ==========================================================================
// Dynamic year in footer
// ==========================================================================

function updateYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ==========================================================================
// Lazy load images (data-src)
// ==========================================================================

function lazyLoadImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    imgs.forEach((img) => obs.observe(img));
  } else {
    imgs.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// ==========================================================================
// Keyboard navigation between header nav links
// ==========================================================================

function initKeyboardNav() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (!navLinks.length) return;

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const currentIndex = Array.from(navLinks).findIndex((l) => l === document.activeElement);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      navLinks[currentIndex - 1].focus();
    } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
      e.preventDefault();
      navLinks[currentIndex + 1].focus();
    }
  });
}

// ==========================================================================
// Subtle parallax for hero ambient glow
// ==========================================================================

function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    hero.style.setProperty('--hero-tx', `${x}px`);
    hero.style.setProperty('--hero-ty', `${y}px`);
  });
}

// ==========================================================================
// Init
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollReveal();
  initCursorGlow();
  enhanceSmoothScroll();
  updateYear();
  lazyLoadImages();
  initKeyboardNav();
  initHeroParallax();
});

// Utility exports (kept for compatibility)
function debounce(func, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => func.apply(this, args), wait);
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { debounce };
}
