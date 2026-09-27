/* =====================================================
   PORTFOLIO — EOLIA SHALBILLAH GADIS SUWANDI (JEY)
   Interactions & animations
   ===================================================== */

(function () {
  'use strict';

  /* ===================================================
     1. NAVBAR — fade in saat load
     =================================================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('load', () => {
      navbar.style.opacity = '1';
    });
  }

  /* ===================================================
     2. REVEAL ON SCROLL (IntersectionObserver)
     =================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, Number(delay));
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: langsung tampilkan
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ===================================================
     3. ACTIVE NAV LINK (based on visible section)
     =================================================== */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const isMatch = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('is-active', isMatch);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ===================================================
     4. BACK TO TOP BUTTON
     =================================================== */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     5. SMOOTH SCROLL (fallback untuk browser lama)
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80; // kompensasi navbar floating
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ===================================================
     6. LOG KONSOLE (personal touch, opsional dihapus)
     =================================================== */
  console.log(
    '%c// Jey — Create with Purpose',
    'color:#38bdf8; font-family:monospace; font-size:12px; padding:4px 8px;'
  );
})();