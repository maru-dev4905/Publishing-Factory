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

      console.log(btn);

      const targetId     = btn.dataset.scrTarget;
      const scrElId      = btn.dataset.scrEl;
      const useOffset    = btn.dataset.scrOffset === 'true';
      const centered     = btn.dataset.centered === 'true';
      const scrollSpeed  = parseInt(btn.dataset.scrSpeed, 10) || 500;
      const scrollEasing = btn.dataset.scrEasing || 'swing';

      console.log(scrElId);
      if (!targetId) {
        console.error('wvScrBtn: data-scr-target is missing.');
        return;
      }

      // 내부 스크롤 컨테이너 OR window
      const scrollContainer = scrElId
          ? document.getElementById(scrElId)    // 내부 요소 스크롤
          : window;                             // 문서 전체 스크롤

      const isInnerScroll = !!scrElId;

      if (isInnerScroll && !scrollContainer) {
        console.error(`wvScrBtn: no scroll container with ID "${scrElId}"`);
        return;
      }

      const targetEl = document.getElementById(targetId);
      if (!targetEl) {
        console.error(`wvScrBtn: no element with ID "${targetId}"`);
        return;
      }

      // offset 계산 (window 스크롤일 때만 의미 있음)
      let offset = 0;
      if (!isInnerScroll && useOffset) {
        const header = document.querySelector('.hd_offset');
        if (header) offset = header.offsetHeight;
      }

      // 스크롤 시작점 계산
      const startY = isInnerScroll
          ? scrollContainer.scrollTop
          : window.pageYOffset;

      // 타깃의 위치 정보
      const rect = targetEl.getBoundingClientRect();

      const vpH = isInnerScroll
          ? scrollContainer.clientHeight
          : window.innerHeight;

      const docH = isInnerScroll
          ? scrollContainer.scrollHeight
          : Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

      let endY;

      if (centered) {
        // 중앙 이동
        const currentScrollTop = isInnerScroll
            ? scrollContainer.scrollTop
            : window.pageYOffset;

        const targetCenterDocY = currentScrollTop + rect.top + (rect.height / 2);

        const centerLine = useOffset && !isInnerScroll
            ? offset + (vpH - offset) / 2
            : vpH / 2;

        endY = targetCenterDocY - centerLine;

      } else {
        // 상단 기준 이동
        const currentScrollTop = isInnerScroll
            ? scrollContainer.scrollTop
            : window.pageYOffset;

        endY = rect.top + currentScrollTop - offset;
      }

      // 스크롤 한계 보정
      endY = Math.max(0, Math.min(endY, docH - vpH));

      const duration = scrollSpeed;
      const startTime = performance.now();

      function easeSwing(t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      }

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const factor = (scrollEasing === 'swing') ? easeSwing(progress) : progress;

        const newY = startY + (endY - startY) * factor;

        if (isInnerScroll) {
          scrollContainer.scrollTop = newY;
        } else {
          window.scrollTo(0, newY);
        }

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
