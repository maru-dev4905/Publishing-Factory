import dataTime from "../module/pf/dateTime";
import pxToVw from "../module/pf/pxToVw";

const pf = {
  _inited: false,
  _q(sel, ctx = document) {
    return ctx.querySelector(sel);
  },
  _qq(sel, ctx = document) {
    return Array.from(ctx.querySelectorAll(sel));
  },

  imgToWebp: {
    _fileIpt: null,
    _downloadAllBtn: null,
    _dropZone: null,
    _output: null,
    _range: null,
    _rangeVal: null,
    _convertedFiles: [],

    _formatFileSize: function(bytes, decimals = 2){
      if(!Number.isFinite(bytes) || bytes <= 0) return '0 B';
      const k = 1024;
      const sizes = ['B','KB','MB','GB','TB','PB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const idx = Math.min(i, sizes.length - 1);
      const value = bytes / Math.pow(k,idx);

      return `${value.toFixed(decimals)} ${sizes[idx]}`;
    },

    processFiles: function (files) {
      if (!files.length) {
        alert('파일이 없습니다.');
        return;
      }

      this._output.innerHTML = '';
      this._convertedFiles.length = 0;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        let qualityVal = this._rangeVal / 100;

        reader.onload = function (event) {
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // quality 값은 0~1 사이에서 조절 (예: 0.9)
            const quality = qualityVal;
            canvas.toBlob(async (blob) => {
              if(!blob) {
                console.error('toBlob returned null');
                return;
              }

              const convertedSizeBytes = blob.size;
              const convertedSizeFormat = pf.imgToWebp._formatFileSize(convertedSizeBytes);
              const originalSizeFormat = pf.imgToWebp._formatFileSize(file.size);

              const blobUrl = URL.createObjectURL(blob);

              const div = document.createElement('div');
              div.className = 'image-result';
              div.innerHTML = `
                <div class="dp_f al_end gap10">
                <h2>${file.name}</h2>
                <div class="dp_f al_center gap20">
                  <p>${originalSizeFormat} </p>
                  <span>→</span>
                  <p>${convertedSizeFormat}</p>
                </div>
                </div>
                <a href="${blobUrl}" download="${file.name.split('.')[0]}.webp">다운로드</a>
              `;
              pf.imgToWebp. _output.appendChild(div);

              pf.imgToWebp._convertedFiles.push({
                filename: file.name.split('.')[0] + '.webp',
                blob: blob,
                size: blob.size,
                sizeText: pf.imgToWebp._formatFileSize(blob.size),
                dataUrl: blobUrl
              });
              // 모든 파일이 처리되면 전체 다운로드 버튼 보이기
              if(pf.imgToWebp._convertedFiles.length === files.length){
                pf.imgToWebp._downloadAllBtn.classList.add('show');
              }
            }, 'image/webp', quality);
          };
          img.onerror = (err) => {
            console.error('Image load error', err);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },

    download: function () {
      if (! pf.imgToWebp._convertedFiles ||  pf.imgToWebp._convertedFiles.length === 0) return;
      console.log('convertedFiles raw:', this._convertedFiles);
      pf.imgToWebp._convertedFiles.forEach((f,i) => {
        console.log(i);
        console.log(f);
        // console.log(i, f.filename, 'blob?', !!f.blob, 'blob instanceof Blob?', f.blob instanceof Blob, 'size:', f.blob ? f.blob.size : f.size, 'url?', f.dataUrl);
      });

      // 디버그: blob 상태 체크
      console.log('Preparing ZIP, items:',  pf.imgToWebp._convertedFiles.map(f => ({ name: f.filename, size: f.size })));

      const zip = new JSZip();

      pf.imgToWebp._convertedFiles.forEach(file => {
        if (file.blob && file.blob.size > 0) {
          zip.file(file.filename, file.blob);
        } else {
          console.warn('Skipping empty/invalid file in zip:', file.filename);
        }
      });

      zip.generateAsync({ type: 'blob' }).then(content => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'converted_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 메모리 해제: 각 blob url revoke (선택사항, 만약 만들었다면)
        this._convertedFiles.forEach(f => {
          if (f.url) {
            URL.revokeObjectURL(f.url);
            delete f.url;
          }
        });
      });
    },

    range:{
      _label: null,
      change: function() {
        const value = pf.imgToWebp._range.value;
        pf.imgToWebp._rangeVal = value;
        const label = pf._q('.range_wrap > span');
        label.innerHTML = `${value}%`;
      },
      init: function(){
        this._label = pf._q('.range_wrap > span')
        this._label.innerHTML = `${pf.imgToWebp._rangeVal}%`;

        pf.imgToWebp._range.addEventListener('input', this.change);
      }
    },

    init(container = '[data-pf-tool="imgtowebp"]') {
      this.root = document.querySelector(container);
      if (!this.root) return;
      this._fileIpt = pf._q('#fileInput');
      this._fileInput = pf._q('#fileInput');
      this._downloadAllBtn = pf._q('#downloadAllBtn');
      this._dropZone = pf._q('#dropZone');
      this._output = pf._q('#output');
      this._range = pf._q('#qualityRange');
      this._rangeVal = this._range.value;

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

      this.range.init();
    }
  },

  pxToRem: {
    root: null,
    _pxIpt: null,
    _remIpt: null,
    _baseFsIpt: null,
    _baseFs: null,

    convert: (e) => {
      const bs = pf.pxToRem._baseFs;
      const val = e.target.value;

      if(e.target === pf.pxToRem._pxIpt){
        pf.pxToRem._remIpt.value = val / bs;
      }else if(e.target === pf.pxToRem._remIpt){
        pf.pxToRem._pxIpt.value = val * bs;
      }
    },

    changeBase: (e)=>{
      pf.pxToRem._baseFs = e.target.value;

      const pxVal = parseFloat(pf.pxToRem._pxIpt.value);
      const remVal = parseFloat(pf.pxToRem._remIpt.value);

      if (Number.isFinite(pxVal)) {
        // px 기준으로 다시 계산
        const rem = pxVal / pf.pxToRem._baseFs;
        pf.pxToRem._remIpt.value = rem;
      } else if (Number.isFinite(remVal)) {
        // rem 기준으로 다시 계산
        const px = remVal * this._baseFs;
        this._pxIpt.value = px;
      }
    },

    init(container = '[data-pf-tool="pxtorem"]'){
      this.root = document.querySelector(container);
      if (!this.root) return;

      this._pxIpt = pf._q('#pxIpt');
      this._remIpt = pf._q('#remIpt');
      this._baseFsIpt = pf._q('#baseFontIpt');
      this._baseFs = this._baseFsIpt.value;

      this._pxIpt.addEventListener('input', (e)=>{this.convert(e, this._remIpt)});
      this._remIpt.addEventListener('input', (e)=>{this.convert(e, this._pxIpt)});
      this._baseFsIpt.addEventListener('input', (e)=>{this.changeBase(e)});
    }
  },

  hlJS: {
    init:()=>{
      if(!pf._q('.hljs')) return;
      hljs.highlightAll();
    }
  },

  init() {
    if (this._inited) return;
    this._inited = true;
    dataTime();
    pxToVw();
    this.imgToWebp.init();
    this.pxToRem.init();
    this.hlJS.init();
  }
};

document.addEventListener('DOMContentLoaded', () => pf.init());
