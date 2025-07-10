// Tab.js - event delegation & dynamic init
export default function wvTab() {
  const selector = '.wv_tab';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    // Event delegation for tab buttons
    document.addEventListener('click', e => {
      const btn = e.target.closest(`${selector} .wv_tab_btn`);
      if (!btn) return;
      const tab = btn.closest(selector);
      if (!tab) return;

      const btns = Array.from(tab.querySelectorAll('.wv_tab_btn'));
      const panels = Array.from(tab.querySelectorAll(':scope > .wv_tab_content > .wv_tab_panel'));

      // Determine clicked index
      const idx = btns.indexOf(btn);
      if (idx < 0) return;

      // Toggle active on buttons and panels
      btns.forEach((b, i) => b.classList.toggle('active', i === idx));
      panels.forEach((panel, i) => panel.classList.toggle('active', i === idx));
    });

    // Initial setup for existing tabs
    document.querySelectorAll(selector).forEach(tab => {
      const btns = Array.from(tab.querySelectorAll('.wv_tab_btn'));
      const panels = Array.from(tab.querySelectorAll(':scope > .wv_tab_content > .wv_tab_panel'));
      let activeIdx = btns.findIndex(b => b.classList.contains('active'));
      if (activeIdx < 0) activeIdx = 0;

      btns.forEach((b, i) => b.classList.toggle('active', i === activeIdx));
      panels.forEach((panel, i) => panel.classList.toggle('active', i === activeIdx));
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
