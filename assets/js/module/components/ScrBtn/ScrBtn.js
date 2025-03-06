export default function wvScrBtn() {
  const scrBtns = $(".wv_scr_btn");

  scrBtns.off("click").on("click", function () {
    const btn = $(this);
    const targetId = btn.data("scr-target");
    const useOffset = btn.data("scr-offset") || false;
    const scrollSpeed = btn.data("scr-speed") || 500;
    const scrollEasing = btn.data("scr-easing") || "swing";

    // 스크롤 대상 ID 확인
    if (!targetId) {
      console.error("스크롤 대상이 지정되지 않았습니다.");
      return;
    }

    const targetElem = $(`#${targetId}`);
    if (!targetElem.length) {
      console.error(`ID가 ${targetId}인 요소를 찾을 수 없습니다.`);
      return;
    }

    // 헤더 오프셋 계산
    let offset = 0;
    if (useOffset) {
      const headerElem = $(".hd_offset");
      if (headerElem.length) {
        offset = headerElem.outerHeight();
      }
    }

    // 스크롤 애니메이션
    $("html, body").animate(
        {
          scrollTop: targetElem.offset().top - offset,
        },
        scrollSpeed,
        scrollEasing
    );
  });

  // 헤더 높이 갱신 (헤더가 변동될 경우 대비)
  $(window).on("resize", function () {
    const headerElem = $(".hd_offset");
    if (headerElem.length) {
      headerElem.data("currentHeight", headerElem.outerHeight());
    }
  });
}