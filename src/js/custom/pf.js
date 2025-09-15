// pf.js (pfFunc 안에 pxvw 모듈: 폼/submit 없이 버튼 클릭만 사용)
const pfFunc = {
  _inited: false,

  // ---- 기존 모듈(예: dateTime)은 그대로 두고 아래 pxvw 추가 ----
  dateTime: {
    updateDateTime: () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth()+1).padStart(2,'0');
      const d = String(now.getDate()).padStart(2,'0');
      const hh = String(now.getHours()).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      const ss = String(now.getSeconds()).padStart(2,'0');
      const dateEl = document.querySelector('.date');
      const clockEl = document.querySelector('.clock');
      if (dateEl)  dateEl.textContent = `${y}-${m}-${d}`;
      if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
    },
    init(){
      this.updateDateTime();
      setInterval(()=>this.updateDateTime(), 1000);
    }
  },

  // ===================== PX ↔ VW (버튼 클릭 전용) =====================
  pxvw: {
    root: null,
    els: {},
    removeList: [
      "overflow","display","float","text-align","background-color",
      "background-size","background-repeat","background-position","color",
      "font-weight","z-index","border-collapse","table-layout","vertical-align",
      "position","box-sizing","font-family","content"
    ],
    qs(sel, root=document){ return root.querySelector(sel); },
    num(v, def=0){ const n = parseFloat(String(v ?? '').toString().replace(/,/g,'')); return Number.isFinite(n) ? n : def; },
    toFixed(v, dec){ return Number(v).toFixed(Math.max(0, this.num(dec, 2))); },
    pxToVw(px, base, dec){ return this.toFixed(this.num(px)/(this.num(base)/100), dec); },
    vwToPx(vw, base){ return Math.round(this.num(vw) * (this.num(base)/100)); },

    run(kind){
      // 숫자 변환
      if (kind === 'px2vw') {
        const px   = this.num(this.els.inPx?.value || 300);
        const base = this.num(this.els.inBase1?.value || 1920);
        const dec  = this.num(this.els.inDec1?.value || 2);
        const vw   = this.pxToVw(px, base, dec);
        if (this.els.outVw) this.els.outVw.value = vw;
        return;
      }
      if (kind === 'vw2px') {
        const vw   = this.num(this.els.inVw?.value || 10);
        const base = this.num(this.els.inBase2?.value || 1920);
        const px   = this.vwToPx(vw, base);
        if (this.els.outPx) this.els.outPx.value = px;
        return;
      }

      // CSS 변환
      if (kind === 'css-px2vw') {
        const base = this.num(this.els.inBase3?.value || 1920);
        const dec  = this.num(this.els.inDecCss?.value || 2);
        let src    = this.els.taSrc1?.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*px/gi, (_, n)=>{
          return `${this.pxToVw(this.num(n), base, dec)}vw`;
        });
        if (this.els.chkStrip1?.checked) out = this.stripProps(out);
        if (this.els.taOut1) {
          this.els.taOut1.value = out;
          this.els.taOut1.classList.add('on');
          this.els.taOut1.focus();
          this.els.taOut1.select();
        }
        return;
      }

      if (kind === 'css-vw2px') {
        const base = this.num(this.els.inBase4?.value || 1920);
        let src    = this.els.taSrc2?.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*vw/gi, (_, n)=>{
          return `${this.vwToPx(this.num(n), base)}px`;
        });
        if (this.els.chkStrip2?.checked) out = this.stripProps(out);
        if (this.els.taOut2) {
          this.els.taOut2.value = out;
          this.els.taOut2.classList.add('on');
          this.els.taOut2.focus();
          this.els.taOut2.select();
        }
        return;
      }
    },

    cache(){
      const r = this.root;
      this.els = {
        // 숫자 변환 박스
        boxPx2Vw: this.qs('[data-box="px2vw"]', r),
        boxVw2Px: this.qs('[data-box="vw2px"]', r),

        inPx:     this.qs('[data-input="px"]', r),
        inVw:     this.qs('[data-input="vw"]', r),
        inBase1:  this.qs('[data-input="base1"]', r), // px→vw 기준 뷰포트
        inBase2:  this.qs('[data-input="base2"]', r), // vw→px 기준 뷰포트
        inDec1:   this.qs('[data-input="dec1"]', r),  // 소수 자리수

        outVw:    this.qs('[data-output="vw"]', r),
        outPx:    this.qs('[data-output="px"]', r),

        // CSS 변환 박스
        boxCssPx2Vw: this.qs('[data-box="css-px2vw"]', r),
        boxCssVw2Px: this.qs('[data-box="css-vw2px"]', r),

        taSrc1:   this.qs('[data-ta="src1"]', r),
        taOut1:   this.qs('[data-ta="out1"]', r),
        inBase3:  this.qs('[data-input="base3"]', r), // css px→vw 기준 뷰포트
        inDecCss: this.qs('[data-input="dec-css"]', r),
        chkStrip1:this.qs('[data-chk="strip1"]', r),

        taSrc2:   this.qs('[data-ta="src2"]', r),
        taOut2:   this.qs('[data-ta="out2"]', r),
        inBase4:  this.qs('[data-input="base4"]', r), // css vw→px 기준 뷰포트
        chkStrip2:this.qs('[data-chk="strip2"]', r),
      };
    },

    stripProps(cssText){
      const tail = "\\s*:\\s*[^;]*?(?:\\s*!important)?\\s*;";
      let out = cssText;
      this.removeList.forEach(prop=>{
        const re = new RegExp(prop + tail, 'gi');
        out = out.replace(re, '');
      });
      return out;
    },

    bind(){
      // 클릭(이벤트 위임)
      this.root.addEventListener('click', (e)=>{
        const btn = e.target.closest('[data-btn]');
        if (!btn) return;
        this.run(btn.getAttribute('data-btn'));
      });

      // Enter 실행
      this.root.addEventListener('keydown', (e)=>{
        if (e.key !== 'Enter') return;

        const t = e.target;

        // textarea에서는 Ctrl/⌘+Enter일 때만 실행(엔터 줄바꿈 보존)
        const isTA = t?.tagName?.toLowerCase() === 'textarea';
        const okTA = isTA ? (e.ctrlKey || e.metaKey) : true;
        if (!okTA) return;

        // 어느 박스 안에서 눌렸는지로 라우팅
        if (t.closest('[data-box="px2vw"]')) {
          e.preventDefault();
          this.run('px2vw');
          return;
        }
        if (t.closest('[data-box="vw2px"]')) {
          e.preventDefault();
          this.run('vw2px');
          return;
        }
        if (t.closest('[data-box="css-px2vw"]')) {
          e.preventDefault();
          this.run('css-px2vw');
          return;
        }
        if (t.closest('[data-box="css-vw2px"]')) {
          e.preventDefault();
          this.run('css-vw2px');
          return;
        }
      });
    },

    init(container='[data-pf-tool="pxvw"]'){
      this.root = document.querySelector(container);
      if (!this.root) return;
      this.cache();
      this.bind();

      // 초기 표시(300px @1920)
      const px = this.num(this.els.inPx?.value || 300);
      const base = this.num(this.els.inBase1?.value || 1920);
      const dec = this.num(this.els.inDec1?.value || 2);
      const vw = this.pxToVw(px, base, dec);
    }
  },

  // ===================== 공용 init =====================
  init(){
    if (this._inited) return;
    this._inited = true;
    this.dateTime.init();
    this.pxvw.init(); // 해당 섹션이 있을 때만 동작
  }
};

document.addEventListener('DOMContentLoaded', ()=> pfFunc.init());
