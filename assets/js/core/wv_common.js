import getFontCdn from '../module/common/font.js';
import checkRes from '../module/common/checkRes.js';
import checkScrollDir from '../module/common/checkScrollDir.js';
import { q, qq, on, off, addClass, removeClass, hasClass, toggleClass, debounce, throttle, sib} from "../module/common/easy-dom-utils.js";

// window.wvCore 객체 생성 및 함수 등록
window.wvCore = {
  getFontCdn,
  checkRes,
  checkScrollDir,
  q,
  qq,
  on,
  off,
  addClass,
  removeClass,
  hasClass,
  toggleClass,
  debounce,
  throttle,
  sib,
};