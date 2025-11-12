// HideToday.js - 오늘 하루 보지 않기 (닫기 시 즉시 숨김 + 체크 시 24시간 저장)
export default function hideTodayCompo() {
  const STORAGE_PREFIX = 'hideToday-';

  function getExpiryMs(checkbox) {
    const hours = parseInt(checkbox.getAttribute('data-expire-hours') || '24', 10);
    return Math.max(1, hours) * 60 * 60 * 1000; // 최소 1시간 보장
  }

  function hideTargetById(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
    return true;
  }

  function showTargetById(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.style.display = '';
    el.removeAttribute('aria-hidden');
    return true;
  }

  function applyHiddenFromStorage() {
    document.querySelectorAll('.hide_today_compo').forEach(container => {
      const checkbox = container.querySelector('.hide_today_chk');
      if (!checkbox) return;

      const targetId = checkbox.getAttribute('data-close');
      if (!targetId) return;

      const key = STORAGE_PREFIX + targetId;
      const stored = localStorage.getItem(key);

      if (stored && Date.now() < parseInt(stored, 10)) {
        hideTargetById(targetId);
        checkbox.checked = true;
      } else {
        localStorage.removeItem(key);
        showTargetById(targetId);
      }
    });
  }

  applyHiddenFromStorage();

  document.addEventListener('click', e => {
    const btn = e.target.closest('.hide_today_btn');
    if (!btn) return;

    const container = btn.closest('.hide_today_compo');
    if (!container) return;

    const checkbox = container.querySelector('.hide_today_chk');
    if (!checkbox) return;

    const targetId = checkbox.getAttribute('data-close');
    if (!targetId) {
      console.warn('[hideToday] data-close 속성이 누락되었습니다.');
      return;
    }

    // 즉시 숨기기
    hideTargetById(targetId);

    // 체크되어 있다면 24시간 저장
    if (checkbox.checked) {
      const expireMs = getExpiryMs(checkbox);
      localStorage.setItem(STORAGE_PREFIX + targetId, String(Date.now() + expireMs));
    } else {
      // 체크 안 되어 있다면 저장하지 않음
      localStorage.removeItem(STORAGE_PREFIX + targetId);
    }
  });
}
