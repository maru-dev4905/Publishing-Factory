const pfFunc = {
  _inited: false,
  _q(sel, ctx = document) {
    return ctx.querySelector(sel);
  },
  _qq(sel, ctx = document) {
    return Array.from(ctx.querySelectorAll(sel));
  },

  dateTime: {
    updateDateTime: () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const dateEl = pfFunc._q('.date');
      const clockEl = pfFunc._q('.clock');
      if (dateEl) dateEl.textContent = `${y}-${m}-${d}`;
      if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
    },
    init() {
      this.updateDateTime();
      setInterval(() => this.updateDateTime(), 1000);
    }
  },

  pxToVw: {
    root: null,
    els: {},
    removeList: [
      "overflow", "display", "float", "text-align", "background-color",
      "background-size", "background-repeat", "background-position", "color",
      "font-weight", "z-index", "border-collapse", "table-layout", "vertical-align",
      "position", "box-sizing", "font-family", "content"
    ],
    num(v, def = 0) {
      const n = parseFloat(String(v ?? '').toString().replace(/,/g, ''));
      return Number.isFinite(n) ? n : def;
    },
    toFixed(v, dec) {
      return Number(v).toFixed(Math.max(0, this.num(dec, 2)));
    },
    pxToVw(px, base, dec) {
      return this.toFixed(this.num(px) / (this.num(base) / 100), dec);
    },
    vwToPx(vw, base) {
      return Math.round(this.num(vw) * (this.num(base) / 100));
    },

    run(kind) {
      // 숫자 변환
      if (kind === 'px2vw') {
        const px = this.num(this.els.inPx?.value || 300);
        const base = this.num(this.els.inBase1?.value || 1920);
        const dec = this.num(this.els.inDec1?.value || 2);
        const vw = this.pxToVw(px, base, dec);
        if (this.els.outVw) this.els.outVw.value = vw;
        return;
      }
      if (kind === 'vw2px') {
        const vw = this.num(this.els.inVw?.value || 10);
        const base = this.num(this.els.inBase2?.value || 1920);
        const px = this.vwToPx(vw, base);
        if (this.els.outPx) this.els.outPx.value = px;
        return;
      }

      // CSS 변환
      if (kind === 'css-px2vw') {
        const base = this.num(this.els.inBase3?.value || 1920);
        const dec = this.num(this.els.inDecCss?.value || 2);
        let src = this.els.taSrc1?.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*px/gi, (_, n) => {
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
        let src = this.els.taSrc2?.value || '';
        let out = src.replace(/(\d*\.?\d+)\s*vw/gi, (_, n) => {
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

    cache() {
      const r = this.root;
      this.els = {
        // 숫자 변환 박스
        boxPx2Vw: pfFunc._q('[data-box="px2vw"]', r),
        boxVw2Px: pfFunc._q('[data-box="vw2px"]', r),

        inPx: pfFunc._q('[data-input="px"]', r),
        inVw: pfFunc._q('[data-input="vw"]', r),
        inBase1: pfFunc._q('[data-input="base1"]', r), // px→vw 기준 뷰포트
        inBase2: pfFunc._q('[data-input="base2"]', r), // vw→px 기준 뷰포트
        inDec1: pfFunc._q('[data-input="dec1"]', r),  // 소수 자리수

        outVw: pfFunc._q('[data-output="vw"]', r),
        outPx: pfFunc._q('[data-output="px"]', r),

        // CSS 변환 박스
        boxCssPx2Vw: pfFunc._q('[data-box="css-px2vw"]', r),
        boxCssVw2Px: pfFunc._q('[data-box="css-vw2px"]', r),

        taSrc1: pfFunc._q('[data-ta="src1"]', r),
        taOut1: pfFunc._q('[data-ta="out1"]', r),
        inBase3: pfFunc._q('[data-input="base3"]', r), // css px→vw 기준 뷰포트
        inDecCss: pfFunc._q('[data-input="dec-css"]', r),
        chkStrip1: pfFunc._q('[data-chk="strip1"]', r),

        taSrc2: pfFunc._q('[data-ta="src2"]', r),
        taOut2: pfFunc._q('[data-ta="out2"]', r),
        inBase4: pfFunc._q('[data-input="base4"]', r), // css vw→px 기준 뷰포트
        chkStrip2: pfFunc._q('[data-chk="strip2"]', r),
      };
    },

    stripProps(cssText) {
      const tail = "\\s*:\\s*[^;]*?(?:\\s*!important)?\\s*;";
      let out = cssText;
      this.removeList.forEach(prop => {
        const re = new RegExp(prop + tail, 'gi');
        out = out.replace(re, '');
      });
      return out;
    },

    bind() {
      // 클릭(이벤트 위임)
      this.root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-btn]');
        if (!btn) return;
        this.run(btn.getAttribute('data-btn'));
      });

      // Enter 실행
      this.root.addEventListener('keydown', (e) => {
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

    init(container = '[data-pf-tool="pxvw"]') {
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

  pngToWebp: {
    _fileIpt: null,
    _convertBtn: null,
    _downloadAllBtn: null,
    _dropZone: null,
    _output: null,
    _convertedFiles: [],

    processFiles: function (files) {
      if (!files.length) {
        alert('파일이 없습니다.');
        return;
      }

      this._output.innerHTML = '';
      this._convertedFiles.length = 0;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // quality 값은 0~1 사이에서 조절 (예: 0.9)
            const webpDataUrl = canvas.toDataURL('image/webp', 0.9);

            // 결과 출력
            const div = document.createElement('div');
            div.className = 'image-result';
            div.innerHTML = `
              <h2>${file.name}</h2>
              <a href="${webpDataUrl}" download="${file.name.split('.')[0]}.webp">다운로드</a>
            `;
            pfFunc.pngToWebp. _output.appendChild(div);

            // 변환된 파일 정보를 배열에 저장
            pfFunc.pngToWebp._convertedFiles.push({
              filename: file.name.split('.')[0] + '.webp',
              dataUrl: webpDataUrl
            });

            // 모든 파일이 처리되면 전체 다운로드 버튼 보이기
            if (pfFunc.pngToWebp._convertedFiles.length === files.length) {
              pfFunc.pngToWebp._downloadAllBtn.style.display = 'inline-block';
            }
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },

    download: function () {
      if (this._convertedFiles.length === 0) return;

      const zip = new JSZip();

      // 각 변환된 파일을 zip에 추가 (dataUrl에서 base64 데이터 추출)
      this._convertedFiles.forEach(file => {
        const base64Data = file.dataUrl.split(',')[1];
        zip.file(file.filename, base64Data, {base64: true});
      });

      // ZIP 파일 생성 후 다운로드 링크 생성
      zip.generateAsync({type: 'blob'}).then(function (content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'converted_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },

    init: function () {
      this._fileIpt = pfFunc._q('#fileInput');
      this._fileInput = pfFunc._q('#fileInput');
      this._convertBtn = pfFunc._q('#convertBtn');
      this._downloadAllBtn = pfFunc._q('#downloadAllBtn');
      this._dropZone = pfFunc._q('#dropZone');
      this._output = pfFunc._q('#output');

      this._convertBtn.addEventListener('click', () => this.processFiles(this._fileInput.files))
      this._dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        this._dropZone.classList.add('hover');
      });
      this._dropZone.addEventListener('dragleave', e => {
        e.preventDefault();
        this._dropZone.classList.remove('hover');
      });
      this._dropZone.addEventListener('drop', e => {
        e.preventDefault();
        this._dropZone.classList.remove('hover');
        const files = e.dataTransfer.files;
        this._fileInput.files = files;
        this.processFiles(files);
      });
      this._fileInput.addEventListener('change', e => {
        e.preventDefault();
        this.processFiles(this._fileInput.files)
      });
      this._downloadAllBtn.addEventListener('click', () => {
        this.download();
      });
    }
  },

  init() {
    if (this._inited) return;
    this._inited = true;
    this.dateTime.init();
    this.pxToVw.init();
    this.pngToWebp.init();
  }
};

document.addEventListener('DOMContentLoaded', () => pfFunc.init());
