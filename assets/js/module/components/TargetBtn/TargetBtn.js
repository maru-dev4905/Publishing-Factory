export default function wvTargetBtn() {
  // .wv_target_btn 클래스를 가진 모든 요소 선택
  const targetBtns = document.querySelectorAll(".wv_target_btn");

  console.log(targetBtns);

  targetBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      // data-target 속성 값을 문자열로 가져옴
      const targetDataRaw = btn.getAttribute("data-target");
      if (!targetDataRaw) {
        console.warn("data-target attribute not found.");
        return;
      }

      // 문자열을 JSON 형식으로 파싱 (단, 단일 따옴표를 이중 따옴표로 변환)
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

      // 기본값 설정
      const target = targetData[0]; // 필수값
      const className = targetData[1] || "on"; // 기본값 "on"
      const type = targetData[2] || "toggle"; // 기본값 "toggle"

      if (!target) {
        console.warn("data-target must include a valid target ID.");
        return;
      }

      const targetElem = document.getElementById(target);
      if (!targetElem) {
        console.warn(`No element found with ID: ${target}`);
        return;
      }

      // 동작 수행
      switch (type) {
        case "add":
          if (!targetElem.classList.contains(className)) {
            btn.classList.add(className);
            targetElem.classList.add(className);
          }
          break;

        case "remove":
          if (targetElem.classList.contains(className)) {
            btn.classList.remove(className);
            targetElem.classList.remove(className);
          }
          break;

        case "toggle":
        default:
          if (targetElem.classList.contains(className)) {
            btn.classList.remove(className);
            targetElem.classList.remove(className);
          } else {
            btn.classList.add(className);
            targetElem.classList.add(className);
          }
          break;
      }
    });
  });
}
