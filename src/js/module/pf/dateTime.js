export default function dataTime() {
  let inited = false;

  function updateDateTime() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const dateEl = document.querySelector('.date');
    const clockEl = document.querySelector('.clock');
    if (dateEl) dateEl.textContent = `${y}-${m}-${d}`;
    if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
  }

  function init() {
    if (inited) return;
    inited = true;

    updateDateTime();
    setInterval(() => updateDateTime(), 1000);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}