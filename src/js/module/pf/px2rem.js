import { Dom } from './domHelpers.js';

export const px2rem = {
  root: null,
  _pxIpt: null,
  _remIpt: null,
  _baseFsIpt: null,
  _baseFs: null,

  convert(e){
    const bs = this._baseFs;
    console.log(e);
    const val = e.target.value;

    if (e.target === this._pxIpt) {
      this._remIpt.value = val / bs;
    } else if (e.target === this._remIpt) {
      this._pxIpt.value = val * bs;
    }
  },

  changeBase(e){
    this._baseFs = e.target.value;

    const pxVal = parseFloat(this._pxIpt.value);
    const remVal = parseFloat(this._remIpt.value);

    if (Number.isFinite(pxVal)) {
      // px 기준으로 다시 계산
      const rem = pxVal / this._baseFs;
      this._remIpt.value = rem;
    } else if (Number.isFinite(remVal)) {
      // rem 기준으로 다시 계산
      const px = remVal * this._baseFs;
      this._pxIpt.value = px;
    }
  },

  init(container = '[data-pf-tool="pxtorem"]') {
    this.root = document.querySelector(container);
    if (!this.root) return;

    this._pxIpt = Dom.q("#pxIpt");
    this._remIpt = Dom.q("#remIpt");
    this._baseFsIpt = Dom.q("#baseFontIpt");
    this._baseFs = this._baseFsIpt.value;

    this._pxIpt.addEventListener("input", (e) => {
      this.convert(e, this._remIpt);
    });
    this._remIpt.addEventListener("input", (e) => {
      this.convert(e, this._pxIpt);
    });
    this._baseFsIpt.addEventListener("input", (e) => {
      this.changeBase(e);
    });
  },
};
