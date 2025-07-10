// ScrBtn.js
export default function wvScrBtn() {
  const selector = '.wv_scr_btn';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    // Delegate all click events on .wv_scr_btn
    document.addEventListener('click', e => {
      const btn = e.target.closest(selector);
      if (!btn) return;
      e.preventDefault();

      const targetId   = btn.dataset.scrTarget;
      const useOffset  = btn.dataset.scrOffset === 'true';
      const scrollSpeed= parseInt(btn.dataset.scrSpeed, 10) || 500;
      const scrollEasing = btn.dataset.scrEasing || 'swing';

      if (!targetId) {
        console.error('wvScrBtn: data-scr-target is missing.');
        return;
      }
      const targetEl = document.getElementById(targetId);
      if (!targetEl) {
        console.error(`wvScrBtn: no element with ID “${targetId}”`);
        return;
      }

      // Compute offset for fixed header
      let offset = 0;
      if (useOffset) {
        const header = document.querySelector('.hd_offset');
        if (header) offset = header.offsetHeight;
      }

      // Smooth scroll implementation
      const startY = window.pageYOffset;
      const endY   = targetEl.getBoundingClientRect().top + startY - offset;
      const duration = scrollSpeed;
      const startTime = performance.now();

      function easeSwing(t) {
        // approximate jQuery swing: 0.5 - cos(pi*t)/2
        return 0.5 - Math.cos(t * Math.PI) / 2;
      }

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const factor = (scrollEasing === 'swing') ? easeSwing(progress) : progress;
        window.scrollTo(0, startY + (endY - startY) * factor);
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    });

    // Keep header height up-to-date in dataset
    window.addEventListener('resize', () => {
      const header = document.querySelector('.hd_offset');
      if (header) {
        header.dataset.currentHeight = header.offsetHeight;
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
