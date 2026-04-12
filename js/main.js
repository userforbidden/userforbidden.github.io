/**
 * Main JavaScript for Personal Research Website
 * Lightweight functionality for smooth scrolling, navigation, and interactivity
 */

// ==========================================================================
// Navigation Active State on Scroll
// ==========================================================================

/**
 * Updates navigation link active state based on current scroll position
 */
function updateNavOnScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';

    // Find which section is currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    // Update active state on nav links
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==========================================================================
// Smooth Scroll Enhancement (complements CSS smooth-scroll)
// ==========================================================================

/**
 * Adds smooth scroll behavior with offset for sticky header
 */
function enhanceSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link, .btn');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only handle hash links that point to sections
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
          // Account for sticky header height
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });
}

// ==========================================================================
// Dynamic year in footer
// ==========================================================================

/**
 * Updates the year in footer if needed (for copyright, etc.)
 * Uncomment if you add a <span id="year"></span> in footer
 */
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ==========================================================================
// Lazy Load Images (for future use with assets)
// ==========================================================================

/**
 * Lazy loads images with data-src attribute
 * Usage: <img data-src="image.jpg" src="placeholder.jpg" alt="Description">
 */
function lazyLoadImages() {
  // Only run if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback: load all images immediately
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// ==========================================================================
// Animation on Scroll Visibility
// ==========================================================================

/**
 * Adds subtle fade-in animation when elements become visible
 * Add class "animate-on-scroll" to elements you want animated
 */
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    elements.forEach((el) => observer.observe(el));
  }
}

// ==========================================================================
// Keyboard Navigation
// ==========================================================================

/**
 * Supports keyboard navigation with arrow keys and Enter
 */
function initKeyboardNav() {
  const navLinks = document.querySelectorAll('.nav-link');

  document.addEventListener('keydown', (e) => {
    // Don't interfere with form inputs
    if (
      e.target.tagName === 'INPUT'
      || e.target.tagName === 'TEXTAREA'
      || e.target.tagName === 'SELECT'
    ) {
      return;
    }

    // Skip keyboard nav if alt, ctrl, or meta keys are pressed
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    // Find currently focused nav item
    const currentIndex = Array.from(navLinks).findIndex((link) => link === document.activeElement);

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      navLinks[currentIndex - 1].focus();
    } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
      navLinks[currentIndex + 1].focus();
    } else if (e.key === 'Enter' && document.activeElement.matches('a[href^="#"]')) {
      document.activeElement.click();
    }
  });
}

// ==========================================================================
// Initialize on DOM Ready
// ==========================================================================

/**
 * Run all initializations when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  updateNavOnScroll();
  enhanceSmoothScroll();
  updateYear();
  lazyLoadImages();
  initScrollAnimations();
  initKeyboardNav();

  // Log that site is ready (optional, for debugging)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🌐 Personal research website initialized');
  }
});

// ==========================================================================
// Utilities
// ==========================================================================

/**
 * Utility: Debounce function for performance
 * Usage: const debouncedFunc = debounce(myFunction, 300);
 */
function debounce(func, wait) {
  let timeout;
  return function debouncedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Utility: Get query parameter from URL
 * Usage: const param = getQueryParam('section');
 */
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Export for use in other scripts if needed (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateNavOnScroll,
    enhanceSmoothScroll,
    updateYear,
    lazyLoadImages,
    initScrollAnimations,
    initKeyboardNav,
    debounce,
    getQueryParam,
  };
}
