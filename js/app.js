/**
 * SYNAPSE ENTERPRISE AI - MAIN APPLICATION SCRIPT
 * Navigation, scroll-triggered reveals, video autoplay assurance, and use-case tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // 2. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      const isOpen = navMenu.classList.contains('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
      });
    });
  }

  // 3. Cinematic scroll-reveal animation
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Actual AI Core MP4 Video autoplay assurance
  const aiCoreVideo = document.getElementById('ai-core-video');
  if (aiCoreVideo) {
    aiCoreVideo.defaultMuted = true;
    aiCoreVideo.muted = true;
    aiCoreVideo.volume = 0;
    aiCoreVideo.playsInline = true;
    aiCoreVideo.loop = true;

    const playVideo = () => {
      aiCoreVideo.muted = true;
      const playPromise = aiCoreVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay unlock on first user interaction
          const unlockAutoplay = () => {
            aiCoreVideo.muted = true;
            aiCoreVideo.play().catch(() => {});
            ['click', 'touchstart', 'scroll', 'pointerdown'].forEach(evt => {
              window.removeEventListener(evt, unlockAutoplay);
            });
          };
          ['click', 'touchstart', 'scroll', 'pointerdown'].forEach(evt => {
            window.addEventListener(evt, unlockAutoplay, { passive: true, once: true });
          });
        });
      }
    };

    playVideo();
    aiCoreVideo.addEventListener('loadedmetadata', playVideo, { once: true });
    aiCoreVideo.addEventListener('canplay', playVideo, { once: true });
  }

  // 5. Use Case tab switcher
  const useCaseTabs = document.querySelectorAll('.use-case-tab');
  const useCasePanels = document.querySelectorAll('.use-case-panel');

  useCaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.dataset.category;

      useCaseTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      useCasePanels.forEach(panel => {
        if (targetCategory === 'all' || panel.dataset.category === targetCategory) {
          panel.style.display = 'flex';
          setTimeout(() => panel.classList.add('is-visible'), 50);
        } else {
          panel.style.display = 'none';
          panel.classList.remove('is-visible');
        }
      });
    });
  });
});
