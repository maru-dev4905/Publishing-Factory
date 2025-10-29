// <span class="wv_count" data-count="1234" data-duration="1.2" data-ease="power1.out" data-decimals="0" data-prefix="" data-suffix="" data-trigger="sectionA"></span>

export default function CountUp({ once = true } = {}) {
  const selector = '.wv_count';
  let inited = false;
  const bound = new WeakSet();

  function getGSAP() {
    const g = window.gsap;
    if (!g) {
      console.warn('[wvCountUp] gsap가 로드되지 않았습니다.');
      return null;
    }
    if (!g.core.globals().ScrollTrigger) {
      if (window.ScrollTrigger) {
        g.registerPlugin(window.ScrollTrigger);
      } else {
        console.warn('[wvCountUp] ScrollTrigger가 로드되지 않았습니다.');
        return null;
      }
    }
    return g;
  }

  function toNumber(val) {
    if (val == null) return 0;
    const n = parseFloat(String(val).replace(/[,\s]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function formatNumber(v, decimals = 0) {
    const fixed = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  function build(el, gsap) {
    if (bound.has(el)) return;
    bound.add(el);

    const end = toNumber(el.dataset.count);
    const duration = Math.max(0.2, toNumber(el.dataset.duration) || 1.2);
    const ease = el.dataset.ease || 'power1.out';
    const decimals = parseInt(el.dataset.decimals ?? (String(end).includes('.') ? 1 : 0), 10) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    // 트리거: data-trigger="someId" ⇒ id="someId" 요소가 뷰포트에 들어오면 카운트
    const triggerId = el.dataset.trigger;
    const triggerEl = triggerId ? document.getElementById(triggerId) : el;

    // 초기 표시 0으로
    el.textContent = prefix + formatNumber(0, decimals) + suffix;

    let played = false;

    gsap.core.globals().ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top 80%',        // 필요하면 조절
      once,                    // true면 한 번만
      onEnter: () => {
        if (played) return;
        played = true;

        const state = { v: 0 };
        gsap.fromTo(
            state,
            { v: 0 },
            {
              v: end,
              duration,
              ease,
              onUpdate: () => {
                el.textContent = prefix + formatNumber(state.v, decimals) + suffix;
              },
              onComplete: () => {
                // 최종값 정착(부동소수 보정)
                el.textContent = prefix + formatNumber(end, decimals) + suffix;
                el.dataset.counted = 'true';
              }
            }
        );
      },
      // once=false 일 때 뒤로 스크롤 시 리셋하고 싶다면 주석 해제
      // onLeaveBack: () => {
      //   if (!once) {
      //     played = false;
      //     el.textContent = prefix + formatNumber(0, decimals) + suffix;
      //   }
      // }
    });
  }

  function init() {
    if (inited) return;
    inited = true;

    const gsap = getGSAP();
    if (!gsap) return;

    const items = document.querySelectorAll(selector);
    items.forEach(el => build(el, gsap));

    // const mo = new MutationObserver(muts => {
    //   muts.forEach(m => {
    //     m.addedNodes.forEach(n => {
    //       if (!(n instanceof Element)) return;
    //       if (n.matches?.(selector)) build(n, gsap);
    //       n.querySelectorAll?.(selector).forEach(el => build(el, gsap));
    //     });
    //   });
    // });
    // mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
