import { setDomHelpers } from "../module/pf/domHelpers";
import { dataTime } from "../module/pf/dateTime";
import { px2vw } from "../module/pf/px2vw";
import { px2rem } from "../module/pf/px2rem";
import { img2webp } from "../module/pf/img2webp";

const pf = {
  _inited: false,
  _q: (sel, ctx = document) => ctx.querySelector(sel),
  _qq: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),

  hlJS: {
    init:()=>{
      if(!pf._q('.hljs')) return;
      hljs.highlightAll();
    }
  },

  init() {
    if (this._inited) return;
    this._inited = true;

    setDomHelpers({ q: pf._q.bind(pf), qq: pf._qq.bind(pf)});
    dataTime.init();
    px2vw.init();
    px2rem.init();
    img2webp.init();
    this.hlJS.init();
  }
};

document.addEventListener('DOMContentLoaded', () => pf.init());
