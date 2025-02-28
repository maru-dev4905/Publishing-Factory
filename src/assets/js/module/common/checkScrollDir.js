const checkScrollDir = () => {
  // 스크롤 방향 감지 함수
  let preScrollTop = 0;

  $(window).on("scroll", ()=> {
    let nextScrollTop = window.scrollY;

    if(preScrollTop < nextScrollTop) {
      $("header").addClass("hide");
      $("body").addClass("scr_down").removeClass("scr_up");
    }
    else {
      // UP
      $("header").removeClass("hide");
      $("body").removeClass("scr_down").addClass("scr_up");
    }
    preScrollTop = nextScrollTop;
  })
}

export default checkScrollDir;