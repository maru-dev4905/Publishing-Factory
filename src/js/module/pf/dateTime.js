import { Dom } from './domHelpers.js';

export const dataTime = {
  updateDateTime: () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const dateEl = Dom.q('.date');
      const clockEl = Dom.q('.clock');
      if (dateEl) dateEl.textContent = `${y}-${m}-${d}`;
      if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
    },
    
    init() {
      this.updateDateTime();
      setInterval(() => this.updateDateTime(), 1000);
    }
}