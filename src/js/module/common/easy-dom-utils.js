// DOM, Event 관련 유틸리티 함수
const q = (selector) => document.querySelector(selector);
const qq = (selector) => document.querySelectorAll(selector);
const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);
const hasClass = (el, className) => el.classList.contains(className);
const toggleClass = (el, className) => el.classList.toggle(className);
const on = (el, event, handler) => el.addEventListener(event, handler);
const off = (el, event, handler) => el.removeEventListener(event, handler);

// 연속 호출 제한 함수
const debounce = (func, wait = 300) => {
  let timeout;

  return function (...args) {
    const context = this;

    // 이전 타이머 취소
    clearTimeout(timeout);

    // 새로운 타이머 설정
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

// 최소 시간 간격 제한 함수
const throttle = (func, limit = 300) => {
  let inThrottle;

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// jQuery - siblings 함수
const sib = (elem, conditionSelector = "*") => {
  const siblings = [...elem.parentNode.children];
  return siblings.filter(sibling => sibling !== elem && sibling.matches(conditionSelector));
};


export { q, qq, addClass, removeClass, hasClass, toggleClass, on, off, debounce, throttle, sib};