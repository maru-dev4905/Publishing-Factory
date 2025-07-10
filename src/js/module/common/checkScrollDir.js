const checkScrollDir = () => {
  // 스크롤 방향 감지 함수
  let preScrollTop = 0;

  window.addEventListener("scroll", () => {
    let nextScrollTop = window.scrollY;
    if (nextScrollTop < 0) nextScrollTop = 0;  // iOS 바운스 시 음수 방지

    if (nextScrollTop === 0) {
      // 최상단일 때 항상 보이기
      document.querySelector("header").classList.remove("hide");
      document.body.classList.remove("scr_down");
      document.body.classList.add("scr_up");
    }
    else if (preScrollTop < nextScrollTop) {
      // 스크롤 다운
      document.querySelector("header").classList.add("hide");
      document.body.classList.add("scr_down");
      document.body.classList.remove("scr_up");
    } else {
      // 스크롤 업
      document.querySelector("header").classList.remove("hide");
      document.body.classList.remove("scr_down");
      document.body.classList.add("scr_up");
    }

    preScrollTop = nextScrollTop;
  });
};

export default checkScrollDir;
