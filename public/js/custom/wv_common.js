// 초기값 설정
window.provide = {
  w: window.innerWidth,
  h: window.innerHeight,
  res: undefined,
  loc: window.location.href,
};

window.w = window.provide.w;
window.h = window.provide.h;
window.loc = window.provide.loc;

console.log(); // 원래 코드와 동일하게 빈 로그 출력

window.provide.res = "pc";
if (window.w >= 768) {
  // pc 해상도일 때 처리
} else {
  window.provide.res = "mo";
}
console.log('test');

document.addEventListener("DOMContentLoaded", function () {
  console.log(1, 'document.ready');
});

// 윈도우 리사이즈 이벤트에 wvCore.debounce 사용
window.addEventListener('resize', wvCore.debounce(() => {
  ScrollTrigger.update();
}, 500));

// 윈도우 스크롤 이벤트에 wvCore.throttle 사용
window.addEventListener('scroll', wvCore.throttle(() => {
  // 빈 스크롤 핸들러
}, 0)); // throttle의 지연시간이 내부에서 지정되어 있다면 0으로 설정하거나 생략할 수 있음

// 필요시 window.provide를 다른 코드에서 사용
window.wvCore.checkRes(provide);
window.wvCore.checkScrollDir();