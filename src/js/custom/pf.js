// pf.js  (기존 pfFunc 에 "pxvw" 모듈 추가)
const pfFunc = {
  _inited: false,

  // ========== ① 날짜/시각(기존) ==========
  dateTime: {
    updateDateTime: () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth()+1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const dateEl = document.querySelector('.date');
      const clockEl = document.querySelector('.clock');
      if (dateEl)  dateEl.textContent = `${y}-${m}-${d}`;
      if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
    },
    init() {
      this.updateDateTime();
      setInterval(() => this.updateDateTime(), 1000);
    }
  },

  // ========== ② PX ↔ VW 유틸 ==========
  pxvw: {
    root: null,
    els: {},
    // 제거할 CSS 속성들
    removeList: [
      "overflow","display","float","text-align","background-color",
      "background-size","background-repeat","background-position","color",
      "font-weight","z-index","border-collapse","table-layout","vertical-align",
      "position","box-sizing","font-family","content"
    ],
    // --- helpers ---
    qs(sel, root = document) { return root.querySelector(sel); },
    num(v, def=0) { const n = parseFloat(String(v).replace(/,/g,'')); return Number.isFinite(n) ? n : def; },
    getViewport(form) {
      const v = form?.querySelector('[data-input="vw-base"]')?.value;
      return this.num(v, window.innerWidth || 1920);
    },
    toFixed(v, dec){ return Number(v).toFixed(Math.max(0, this.num(dec, 2))); },
    pxToVw(px, base, dec){ return this.toFixed(px / (base/100), dec); },
    vwToPx(vw, base)      { return Math.round(vw * (base/100)); },

    // --- 이벤트 바인딩 ---
    bind() {
      // 숫자: px → vw
      this.els.formPx2Vw?.addEventListener('submit', (e)=>{
        e.preventDefault();
        const base = this.getViewport(this.els.formPx2Vw);
        const px   = this.num(this.els.inPx.value, 300);
        const dec  = this.num(this.els.inDec1.value, 2);
        const vw   = this.pxToVw(px, base, dec);
        this.els.outVw.value = vw;
        this.paint(px, vw);
      });

      // 숫자: vw → px
      this.els.formVw2Px?.addEventListener('submit', (e)=>{
        e.preventDefault();
        const base = this.getViewport(this.els.formVw2Px);
        const vw   = this.num(this.els.inVw2.value, 10);
        const px   = this.vwToPx(vw, base);
        this.els.outPx2.value = px;
        this.paint(px, vw);
      });

      // CSS: px → vw
      this.els.formCssPx2Vw?.addEventListener('submit', (e)=>{
        e.preventDefault();
        const base = this.getViewport(this.els.formCssPx2Vw);
        const dec  = this.num(this.els.inDecCss1.value, 2);
        const src  = this.els.taSrc1.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*px/gi, (_, n)=>{
          return `${this.pxToVw(this.num(n), base, dec)}vw`;
        });
        if (this.els.chkStrip1?.checked) out = this.stripProps(out);
        this.els.taOut1.value = out;
        this.els.taOut1.classList.add('on');
        this.els.taOut1.focus(); this.els.taOut1.select();
      });

      // CSS: vw → px
      this.els.formCssVw2Px?.addEventListener('submit', (e)=>{
        e.preventDefault();
        const base = this.getViewport(this.els.formCssVw2Px);
        const src  = this.els.taSrc2.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*vw/gi, (_, n)=>{
          return `${this.vwToPx(this.num(n), base)}px`;
        });
        if (this.els.chkStrip2?.checked) out = this.stripProps(out);
        this.els.taOut2.value = out;
        this.els.taOut2.classList.add('on');
        this.els.taOut2.focus(); this.els.taOut2.select();
      });

      // 복사 버튼들
      this.els.copy1?.addEventListener('click', ()=> this.copy(this.els.taOut1.value));
      this.els.copy2?.addEventListener('click', ()=> this.copy(this.els.taOut2.value));
    },

    // 결과 표시(바/라벨)
    paint(px, vw){
      if (this.els.bar)  this.els.bar.style.width = `${this.num(px)}px`;
      if (this.els.labPx) this.els.labPx.textContent = `${this.num(px)} PX`;
      if (this.els.labVw) this.els.labVw.textContent = `${vw} VW`;
    },

    // CSS 특정 속성 제거
    stripProps(cssText){
      // prop: value [!important] ;
      const tail = "\\s*:\\s*[^;]*?(?:\\s*!important)?\\s*;";
      let out = cssText;
      this.removeList.forEach(p=>{
        const re = new RegExp(p + tail, 'gi');
        out = out.replace(re, '');
      });
      return out;
    },

    // 복사
    copy(text){
      if (!text) return;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); ta.remove();
      }
    },

    // 캐시 & 초기 상태
    cache(){
      const r = this.root;
      this.els = {
        // 숫자 폼
        formPx2Vw:   this.qs('[data-form="px2vw"]', r),
        inPx:        this.qs('[data-input="px"]', r),
        inDec1:      this.qs('[data-input="dec1"]', r),
        outVw:       this.qs('[data-output="vw"]', r),

        formVw2Px:   this.qs('[data-form="vw2px"]', r),
        inVw2:       this.qs('[data-input="vw2"]', r),
        outPx2:      this.qs('[data-output="px2"]', r),

        // CSS 폼
        formCssPx2Vw: this.qs('[data-form="css-px2vw"]', r),
        inDecCss1:    this.qs('[data-input="dec-css1"]', r),
        taSrc1:       this.qs('[data-ta="src1"]', r),
        taOut1:       this.qs('[data-ta="out1"]', r),
        chkStrip1:    this.qs('[data-chk="strip1"]', r),
        copy1:        this.qs('[data-btn="copy1"]', r),

        formCssVw2Px: this.qs('[data-form="css-vw2px"]', r),
        taSrc2:       this.qs('[data-ta="src2"]', r),
        taOut2:       this.qs('[data-ta="out2"]', r),
        chkStrip2:    this.qs('[data-chk="strip2"]', r),
        copy2:        this.qs('[data-btn="copy2"]', r),

        // 결과 시각화
        bar:          this.qs('[data-role="bar"]', r),
        labPx:        this.qs('[data-role="pxText"]', r),
        labVw:        this.qs('[data-role="vwText"]', r),
      };
    },

    init(container = '[data-pf-tool="pxvw"]'){
      this.root = document.querySelector(container);
      if (!this.root) return;       // 페이지에 마크업 없으면 스킵
      this.cache();
      this.bind();
      // 기본값 페인트
      const base = this.getViewport(this.els.formPx2Vw);
      const px = this.num(this.els.inPx?.value || 300);
      const dec = this.num(this.els.inDec1?.value || 2);
      const vw = this.pxToVw(px, base, dec);
      this.paint(px, vw);
    }
  },

  // ========= 공용 init =========
  init() {
    if (this._inited) return;
    this._inited = true;
    this.dateTime.init();
    this.pxvw.init();  // 페이지에 해당 마크업이 있으면 자동 활성화
  }
};

document.addEventListener('DOMContentLoaded', () => pfFunc.init());
