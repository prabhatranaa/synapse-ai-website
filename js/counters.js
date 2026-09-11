/**
 * SYNAPSE ENTERPRISE AI - ANIMATED METRIC COUNTERS
 * Triggers smooth number increments when scrolled into viewport
 */

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  let hasRun = false;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentVal = easedProgress * target;

      el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        counters.forEach(counter => animateCounter(counter));
        hasRun = true;
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.section-metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
});
