export default function wvTab() {
  document.addEventListener('click', function (event) {
    // 클릭된 요소 또는 조상 중에서 wv_tab_btn 클래스를 가진 요소를 찾습니다.
    const tabBtn = event.target.closest('.wv_tab_btn');
    if (!tabBtn) return; // 해당 요소가 없으면 아무 작업도 수행하지 않음

    // 버튼의 부모 li 요소를 찾습니다.
    const tabItem = tabBtn.closest('li');
    if (!tabItem) return;

    // li 요소가 속한 wv_tab 컨테이너를 찾습니다.
    const tabContainer = tabItem.closest('.wv_tab');
    if (!tabContainer) return;

    // 해당 탭 컨테이너 내의 모든 li 요소에서 "on" 클래스를 제거합니다.
    tabContainer.querySelectorAll('li').forEach(item => {
      item.classList.remove('on');
    });

    // 클릭된 li 요소에 "on" 클래스를 추가합니다.
    tabItem.classList.add('on');
  });
}
