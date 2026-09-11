/**
 * SYNAPSE ENTERPRISE AI - DYNAMIC SPOTLIGHT TRACKER
 * Creates the high-end luminous border spotlight effect on hover
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.glass-card, .pipeline-node, .metric-card, .testimonial-card, .use-case-card, .step-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
