// TargetBtn.js - event delegation & dynamic init
export default function wvTargetBtn() {
  const selector = '.wv_target_btn';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    document.addEventListener('click', e => {
      const btn = e.target.closest(selector);
      if (!btn) return;
      e.preventDefault();

      // Parse data-target (expects array-like string)
      const raw = btn.getAttribute('data-target');
      if (!raw) {
        console.warn('wvTargetBtn: data-target not found');
        return;
      }
      let targetData;
      try {
        targetData = JSON.parse(raw.replace(/'/g, '"'));
      } catch (err) {
        console.error('wvTargetBtn: parsing data-target failed', err);
        return;
      }

      if (!Array.isArray(targetData) || targetData.length < 1) {
        console.warn('wvTargetBtn: data-target must be an array');
        return;
      }

      const targetId = targetData[0];
      const className = targetData[1] || 'on';
      const action = targetData[2] || 'toggle';

      const targetEl = document.getElementById(targetId);
      if (!targetEl) {
        console.warn(`wvTargetBtn: target element #${targetId} not found`);
        return;
      }

      // Perform action
      const has = targetEl.classList.contains(className);
      if (action === 'add') {
        if (!has) targetEl.classList.add(className);
        btn.classList.add(className);
      } else if (action === 'remove') {
        if (has) targetEl.classList.remove(className);
        btn.classList.remove(className);
      } else {
        // toggle
        targetEl.classList.toggle(className);
        btn.classList.toggle(className);
      }
    });
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
