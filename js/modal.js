/**
 * SYNAPSE ENTERPRISE AI - DEMO REQUEST MODAL
 * Accessible glassmorphism lead-capture modal with state feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('demo-modal');
  const openButtons = document.querySelectorAll('.js-open-demo-modal');
  const closeButton = document.getElementById('modal-close-btn');
  const demoForm = document.getElementById('enterprise-demo-form');
  const formContent = document.getElementById('modal-form-content');
  const successContent = document.getElementById('modal-success-content');

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = demoForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Securing Enterprise Slot...';
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (formContent) formContent.style.display = 'none';
        if (successContent) successContent.style.display = 'block';
      }, 900);
    });
  }
});
