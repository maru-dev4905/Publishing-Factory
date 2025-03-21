export default function wvTab() {
  // 모든 탭 컨테이너를 선택
  const tabs = document.querySelectorAll('.wv_tab');

  tabs.forEach(tab => {
    // 탭 버튼과 패널 선택 (탭 패널은 .wv_tab_content 안에 있다고 가정)
    const tabBtns = tab.querySelectorAll('.wv_tab_btn');
    const panels = tab.querySelectorAll(':scope > .wv_tab_content > .wv_tab_panel');

    // 각 탭 버튼에 클릭 이벤트 할당
    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function() {
        // 모든 버튼에서 'active' 클래스 제거 후, 클릭한 버튼에 추가
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // 모든 탭 패널에서 'active' 클래스 제거 후, 해당 인덱스의 패널에 추가
        panels.forEach(panel => panel.classList.remove('active'));
        if (panels[idx]) {
          panels[idx].classList.add('active');
        }
      });
    });

    // 초기화: 이미 'active' 클래스를 가진 버튼이 있다면 그 인덱스를, 없다면 첫 번째 버튼을 선택
    let activeIdx = Array.from(tabBtns).findIndex(btn => btn.classList.contains('active'));
    if (activeIdx === -1) activeIdx = 0;

    // 초기화 시 탭 패널 활성화
    panels.forEach(panel => panel.classList.remove('active'));
    if (panels[activeIdx]) {
      panels[activeIdx].classList.add('active');
    }
  });
}
