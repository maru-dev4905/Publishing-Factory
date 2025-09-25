// ScrBtn.js
export default function wvScrBtn() {
  const selector = '.wv_scr_btn';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    document.addEventListener('click', e => {
      const btn = e.target.closest(selector);
      if (!btn) return;
      e.preventDefault();

      const targetId     = btn.dataset.scrTarget;
      const useOffset    = btn.dataset.scrOffset === 'true';
      const centered     = btn.dataset.centered === 'true';
      const scrollSpeed  = parseInt(btn.dataset.scrSpeed, 10) || 500;
      const scrollEasing = btn.dataset.scrEasing || 'swing';

      if (!targetId) { console.error('wvScrBtn: data-scr-target is missing.'); return; }
      const targetEl = document.getElementById(targetId);
      if (!targetEl) { console.error(`wvScrBtn: no element with ID “${targetId}”`); return; }

      // 고정 헤더 오프셋
      let offset = 0;
      if (useOffset) {
        const header = document.querySelector('.hd_offset');
        if (header) offset = header.offsetHeight;
      }

      const startY   = window.pageYOffset;
      const rect     = targetEl.getBoundingClientRect();
      const docH     = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const vpH      = window.innerHeight;

      // 중앙 정렬 계산
      let endY;
      if (centered) {
        // 타겟 중앙의 문서 좌표
        const targetCenterDocY = startY + rect.top + (rect.height / 2);
        // 화면 중앙 라인(헤더가 있으면 그 아래 영역의 중앙)
        const centerLine = useOffset ? (offset + (vpH - offset) / 2) : (vpH / 2);
        endY = targetCenterDocY - centerLine;
      } else {
        // 기존: 타겟 상단을 기준(헤더 높이만큼 보정)
        endY = rect.top + startY - offset;
      }

      // 문서 스크롤 한계 보정
      endY = Math.max(0, Math.min(endY, docH - vpH));

      const duration  = scrollSpeed;
      const startTime = performance.now();

      function easeSwing(t) { return 0.5 - Math.cos(t * Math.PI) / 2; }

      function animate(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const factor   = (scrollEasing === 'swing') ? easeSwing(progress) : progress;
        window.scrollTo(0, startY + (endY - startY) * factor);
        if (elapsed < duration) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });

    window.addEventListener('resize', () => {
      const header = document.querySelector('.hd_offset');
      if (header) header.dataset.currentHeight = header.offsetHeight;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
