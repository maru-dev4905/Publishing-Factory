export default function hideTodayCompo() {
  // 1. 페이지 로드 시 localStorage에서 저장된 만료 시간이 남아있는 요소들을 숨긴다.
  function applyHiddenFromStorage() {
    // 모든 hide-today-compo 컨테이너 순회
    document.querySelectorAll(".hide-today-compo").forEach(container => {
      const checkbox = container.querySelector(".hide-today-chk");
      if (!checkbox) return;
      const targetId = checkbox.getAttribute("data-close");
      if (!targetId) return;
      const storedExpiry = localStorage.getItem("hideToday-" + targetId);
      if (storedExpiry && Date.now() < parseInt(storedExpiry, 10)) {
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.style.display = "none";
        }
      } else {
        localStorage.removeItem("hideToday-" + targetId);
      }
    });
  }
  applyHiddenFromStorage();

  // 2. 버튼 클릭 이벤트 처리 (동적 생성 요소에도 대응)
  document.addEventListener("click", function(event) {
    // 클릭된 요소나 그 조상 중에 .hide-today-btn이 있으면 처리
    const btn = event.target.closest(".hide-today-btn");
    if (!btn) return;

    // 해당 버튼이 속한 컨테이너 찾기
    const container = btn.closest(".hide-today-compo");
    if (!container) return;

    // 컨테이너 내의 체크박스 선택
    const checkbox = container.querySelector(".hide-today-chk");
    if (!checkbox) return;

    // 체크박스가 체크되어 있어야 작동
    if (!checkbox.checked) return;

    // data-close 속성에서 타겟 id 가져오기
    const targetId = checkbox.getAttribute("data-close");
    if (!targetId) {
      console.warn("data-close 속성이 체크박스에 설정되어 있지 않습니다.");
      return;
    }

    // 해당 id를 가진 요소 찾기
    const targetElem = document.getElementById(targetId);
    if (!targetElem) {
      console.warn(`ID "${targetId}"를 가진 요소를 찾을 수 없습니다.`);
      return;
    }

    // 요소 숨기기
    targetElem.style.display = "none";
    // 현재 시각으로부터 24시간 후의 타임스탬프 저장 (밀리초 단위)
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("hideToday-" + targetId, expiryTime);
  });
}
