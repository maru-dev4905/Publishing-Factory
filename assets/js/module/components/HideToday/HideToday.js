export default function hideTodayCompo() {
  function applyHiddenFromStorage() {
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

  document.addEventListener("click", function(event) {
    const btn = event.target.closest(".hide-today-btn");
    if (!btn) return;

    const container = btn.closest(".hide-today-compo");
    if (!container) return;

    const checkbox = container.querySelector(".hide-today-chk");
    if (!checkbox) return;

    if (!checkbox.checked) return;

    const targetId = checkbox.getAttribute("data-close");
    if (!targetId) {
      console.warn("data-close 속성이 체크박스에 설정되어 있지 않습니다.");
      return;
    }

    const targetElem = document.getElementById(targetId);
    if (!targetElem) {
      console.warn(`ID "${targetId}"를 가진 요소를 찾을 수 없습니다.`);
      return;
    }

    targetElem.style.display = "none";
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("hideToday-" + targetId, expiryTime);
  });
}
