// Accordion.js - event delegation & dynamic init
export default function wvAccordion() {
  const selector = '.wv_accordion';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    // Delegate click on accordion buttons
    document.addEventListener('click', e => {
      const btn = e.target.closest(`${selector} .wv_accordion_btn`);
      if (!btn) return;
      const acc = btn.closest(selector);
      if (!acc) return;

      const items = Array.from(acc.querySelectorAll('.wv_accordion_btn'));
      const type = acc.dataset.type;
      const li = btn.closest('li');

      if (type === 'single') {
        // Close siblings
        items.forEach(b => {
          if (b !== btn) {
            b.closest('li').classList.remove('active');
          }
        });
        // Toggle clicked
        li.classList.toggle('active');
      } else {
        // Multi mode: toggle only clicked
        li.classList.toggle('active');
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}