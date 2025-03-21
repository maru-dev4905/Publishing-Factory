window.provide = {
  w: window.innerWidth,
  h: window.innerHeight,
  res: undefined,
  loc: window.location.href,
};

window.w = window.provide.w;
window.h = window.provide.h;
window.loc = window.provide.loc;
console.log()
window.provide.res = "pc";
if (window.w >= 768) {
} else {
  window.provide.res = "mo";
}

$(document).ready(function () {
  console.log(1, 'document.ready');
});

$(window).on('resize', wvCore.debounce(() => {
  ScrollTrigger.update();
}, 500));

$(window).on('scroll', wvCore.throttle(() => {
  // 빈 스크롤 핸들러
}));

console.log(provide.w);

// 필요시 window.provide를 다른 코드에서 사용
window.wvCore.checkRes(provide);
window.wvCore.checkScrollDir();