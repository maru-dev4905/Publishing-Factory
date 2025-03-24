const checkScrollDir = () => {
  // 스크롤 방향 감지 함수
  let preScrollTop = 0;

  window.addEventListener("scroll", () => {
    const nextScrollTop = window.scrollY;

    if (preScrollTop < nextScrollTop) {
      document.querySelector("header").classList.add("hide");
      document.body.classList.add("scr_down");
      document.body.classList.remove("scr_up");
    } else {
      document.querySelector("header").classList.remove("hide");
      document.body.classList.remove("scr_down");
      document.body.classList.add("scr_up");
    }
    preScrollTop = nextScrollTop;
  });
};

export default checkScrollDir;
