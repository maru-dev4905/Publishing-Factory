export default function wvTargetBtn() {
  // 모든 .wv_target_btn 요소 선택
  const targetBtns = document.querySelectorAll(".wv_target_btn");

  targetBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      // data-target 속성 값 가져오기
      const targetDataRaw = btn.getAttribute("data-target");
      if (!targetDataRaw) {
        console.warn("data-target attribute not found.");
        return;
      }

      // 단일 따옴표를 이중 따옴표로 변환한 후 JSON으로 파싱
      let targetData;
      try {
        targetData = JSON.parse(targetDataRaw.replace(/'/g, '"'));
      } catch (e) {
        console.error("Error parsing data-target attribute:", e);
        return;
      }

      if (!Array.isArray(targetData) || targetData.length < 1) {
        console.warn("data-target must be an array with at least [target].");
        return;
      }

      // 기본값 설정: target, 클래스, 동작 타입 (toggle, add, remove)
      const target = targetData[0];
      const className = targetData[1] || "on";
      const type = targetData[2] || "toggle";

      if (!target) {
        console.warn("data-target must include a valid target ID.");
        return;
      }

      // 지정된 ID를 가진 요소 찾기
      const targetElem = document.getElementById(target);
      if (!targetElem) {
        console.warn(`No element found with ID: ${target}`);
        return;
      }

      // 동작 수행: add, remove, toggle
      if (type === "add") {
        if (!targetElem.classList.contains(className)) {
          btn.classList.add(className);
          targetElem.classList.add(className);
        }
      } else if (type === "remove") {
        if (targetElem.classList.contains(className)) {
          btn.classList.remove(className);
          targetElem.classList.remove(className);
        }
      } else { // toggle
        if (targetElem.classList.contains(className)) {
          btn.classList.remove(className);
          targetElem.classList.remove(className);
        } else {
          btn.classList.add(className);
          targetElem.classList.add(className);
        }
      }
    });
  });
}
