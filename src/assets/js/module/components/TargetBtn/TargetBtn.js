export default function wvTargetBtn() {
  const targetBtns = $(".wv_target_btn");

  targetBtns.off("click").on("click", function () {
    const btn = $(this);
    const targetData = btn.data("target");

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

    const targetElem = $(`#${target}`);
    if (!targetElem.length) {
      console.warn(`No element found with ID: ${target}`);
      return;
    }

    // 동작 수행
    switch (type) {
      case "add":
        if (!targetElem.hasClass(className)) {
          btn.addClass(className);
          targetElem.addClass(className);
        }
        break;

      case "remove":
        if (targetElem.hasClass(className)) {
          btn.removeClass(className);
          targetElem.removeClass(className);
        }
        break;

      case "toggle":
      default:
        if(targetElem.hasClass(className)){
          btn.removeClass(className);
          targetElem.removeClass(className);
          return;
        }else{
          btn.addClass(className);
          targetElem.addClass(className);
          return;
        }
    }
  });
}
