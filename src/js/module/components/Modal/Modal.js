// Modal.js - event delegation & dynamic init
export default function wvModal(closeOnOverlayClick = true) {
  const selector = '.wv_modal';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    // Delegate click events for open/close buttons
    document.addEventListener('click', e => {
      const btn = e.target.closest('.wv_modal_btn');
      if (!btn) return;
      e.preventDefault();
      // Close button
      if (btn.classList.contains('close_modal')) {
        closeModal();
        return;
      }

      // Open modal
      const modalId = btn.getAttribute('data-modal');
      const modalYoutube = btn.getAttribute('data-youtube');
      const target = document.getElementById(modalId);
      if (!modalId || !target) {
        console.warn(`Modal target not found: ${modalId}`);
        return;
      }

      // If chaining, close others first
      if (target.dataset.chain !== undefined) {
        document.querySelectorAll(`${selector}.active`).forEach(m => m.classList.remove('active'));
      }

      target.classList.add('active');
      document.body.classList.add('scrollLock');
      document.querySelector('.dim')?.classList.add('active');
      target.focus();

      if(modalYoutube){
        target.querySelector("iframe").setAttribute('src',`https://www.youtube.com/embed/${modalYoutube}`)
        target.classList.add("is_youtube");
      }
    });

    // Overlay click to close
    if (closeOnOverlayClick) {
      document.addEventListener('click', e => {
        if (e.target.classList.contains('dim')) {
          e.preventDefault();
          closeModal();
        }
      });
    }

    // ESC key to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    document.querySelectorAll(`${selector}.active`).forEach(m => {
      m.classList.remove('active');
      if(m.classList.contains("is_youtube")){
        m.querySelector("iframe").setAttribute('src', '');
      }
    });
    document.body.classList.remove('scrollLock');
    document.querySelector('.dim')?.classList.remove('active');
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
