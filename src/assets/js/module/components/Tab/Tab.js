export default function wvTab() {
  const tabs = $(".wv_tab");

  tabs.each(function () {
    const tab = $(this); // 현재 탭 컨테이너
    const tabBtn = tab.find(".wv_tab_btn");
    const tabPanel = tab.find(".wv_tab_panel");

    // 탭 클릭
    tabBtn.off("click").on("click", function () {
      const idx = $(this).index(); // 현재 컨텍스트 내에서의 인덱스 계산
      const th = $(this);

      // 탭 버튼 활성화 상태 변경
      th.siblings(".wv_tab_btn").removeClass("active");
      th.addClass("active");

      // 탭 패널 활성화 상태 변경
      th.closest(".wv_tab").find(" > .wv_tab_content > .wv_tab_panel").removeClass("active");
      th.closest(".wv_tab").find(" > .wv_tab_content > .wv_tab_panel").eq(idx).addClass("active");
    });

    // 초기화: 활성화된 탭 찾기
    const activeTabBtn = tabBtn.filter(".active");
    const activeIdx = tabBtn.index(activeTabBtn);
    tabPanel.removeClass("active");
    tabPanel.eq(activeIdx).addClass("active");
  });
}