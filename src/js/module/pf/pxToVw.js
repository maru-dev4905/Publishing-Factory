export default function pxToVw() {
  let inited = false;
  let root = null;
  let els = {};
  let removeList = [
    "overflow", "display", "float", "text-align", "background-color",
    "background-size", "background-repeat", "background-position", "color",
    "font-weight", "z-index", "border-collapse", "table-layout", "vertical-align",
    "position", "box-sizing", "font-family", "content"
  ];

  function num(v, def = 0){
    const n = parseFloat(String(v ?? '').toString().replace(/,/g, ''));
    return Number.isFinite(n) ? n : def;
  }

  function toFixed(v,dec){
    return Number(v).toFixed(Math.max(0, num(dec, 2)));
  }

  function pxToVw(px, base, dec){
    return toFixed(num(px) / (num(base) / 100), dec);
  }

  function vwToPx(vw, base){
    return Math.round(num(vw) * (num(base) / 100));
  }

  function run(kind) {
    // 숫자 변환
    if (kind === 'px2vw') {
      const px = num(els.inPx?.value || 300);
      const base = num(els.inBase1?.value || 1920);
      const dec = num(els.inDec1?.value || 2);
      const vw = pxToVw(px, base, dec);
      if (els.outVw) els.outVw.value = vw;
      return;
    }
    if (kind === 'vw2px') {
      const vw = num(els.inVw?.value || 10);
      const base = num(els.inBase2?.value || 1920);
      const px = vwToPx(vw, base);
      if (els.outPx) els.outPx.value = px;
      return;
    }

    // CSS 변환
    if (kind === 'css-px2vw') {
      const base = num(els.inBase3?.value || 1920);
      const dec = num(els.inDecCss?.value || 2);
      let src = els.taSrc1?.value || '';
      let out = src.replace(/(\d*\.?\d+)\s*px/gi, (_, n) => {
        return `${pxToVw(num(n), base, dec)}vw`;
      });
      if (els.chkStrip1?.checked) out = stripProps(out);
      if (els.taOut1) {
        els.taOut1.value = out;
        els.taOut1.classList.add('on');
        els.taOut1.focus();
        els.taOut1.select();
      }
      return;
    }

    if (kind === 'css-vw2px') {
      const base = num(els.inBase4?.value || 1920);
      let src = els.taSrc2?.value || '';
      let out = src.replace(/(\d*\.?\d+)\s*vw/gi, (_, n) => {
        return `${vwToPx(num(n), base)}px`;
      });
      if (els.chkStrip2?.checked) out = stripProps(out);
      if (els.taOut2) {
        els.taOut2.value = out;
        els.taOut2.classList.add('on');
        els.taOut2.focus();
        els.taOut2.select();
      }
      return;
    }
  };

  function cache() {
    const r = root;
    els = {
      // 숫자 변환 박스
      boxPx2Vw: document.querySelector('[data-box="px2vw"]', r),
      boxVw2Px: document.querySelector('[data-box="vw2px"]', r),

      inPx: document.querySelector('[data-input="px"]', r),
      inVw: document.querySelector('[data-input="vw"]', r),
      inBase1: document.querySelector('[data-input="base1"]', r), // px→vw 기준 뷰포트
      inBase2: document.querySelector('[data-input="base2"]', r), // vw→px 기준 뷰포트
      inDec1: document.querySelector('[data-input="dec1"]', r),  // 소수 자리수

      outVw: document.querySelector('[data-output="vw"]', r),
      outPx: document.querySelector('[data-output="px"]', r),

      // CSS 변환 박스
      boxCssPx2Vw: document.querySelector('[data-box="css-px2vw"]', r),
      boxCssVw2Px: document.querySelector('[data-box="css-vw2px"]', r),

      taSrc1: document.querySelector('[data-ta="src1"]', r),
      taOut1: document.querySelector('[data-ta="out1"]', r),
      inBase3: document.querySelector('[data-input="base3"]', r), // css px→vw 기준 뷰포트
      inDecCss: document.querySelector('[data-input="dec-css"]', r),
      chkStrip1: document.querySelector('[data-chk="strip1"]', r),

      taSrc2: document.querySelector('[data-ta="src2"]', r),
      taOut2: document.querySelector('[data-ta="out2"]', r),
      inBase4: document.querySelector('[data-input="base4"]', r), // css vw→px 기준 뷰포트
      chkStrip2: document.querySelector('[data-chk="strip2"]', r),
    };
  };

  function stripProps(cssText) {
    const tail = "\\s*:\\s*[^;]*?(?:\\s*!important)?\\s*;";
    let out = cssText;
    removeList.forEach(prop => {
      const re = new RegExp(prop + tail, 'gi');
      out = out.replace(re, '');
    });
    return out;
  };

  function bind() {
    // 클릭(이벤트 위임)
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-btn]');
      if (!btn) return;
      run(btn.getAttribute('data-btn'));
    });

    // Enter 실행
    root.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;

      const t = e.target;

      // textarea에서는 Ctrl/⌘+Enter일 때만 실행(엔터 줄바꿈 보존)
      const isTA = t?.tagName?.toLowerCase() === 'textarea';
      const okTA = isTA ? (e.ctrlKey || e.metaKey) : true;
      if (!okTA) return;

      // 어느 박스 안에서 눌렸는지로 라우팅
      if (t.closest('[data-box="px2vw"]')) {
        e.preventDefault();
        run('px2vw');
        return;
      }
      if (t.closest('[data-box="vw2px"]')) {
        e.preventDefault();
        run('vw2px');
        return;
      }
      if (t.closest('[data-box="css-px2vw"]')) {
        e.preventDefault();
        run('css-px2vw');
        return;
      }
      if (t.closest('[data-box="css-vw2px"]')) {
        e.preventDefault();
        run('css-vw2px');
        return;
      }
    });
  };

  function init(container = '[data-pf-tool="pxvw"]') {
    if (inited) return;
    inited = true;
    root = document.querySelector(container);
    cache();
    bind();

    // 초기 표시(300px @1920)
    const px = num(els.inPx?.value || 300);
    const base = num(els.inBase1?.value || 1920);
    const dec = num(els.inDec1?.value || 2);
    const vw = pxToVw(px, base, dec);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}