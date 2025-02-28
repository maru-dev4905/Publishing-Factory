export default function wvAccordion() {
  const accs = $(".wv_accordion");

  accs.each(function () {
    const acc = $(this); // 현재 아코디언 컨테이너
    const accBtn = acc.find(".wv_accordion_btn");

    accBtn.off("click").on("click", function(){
      const th = $(this);

      if(acc.data('type') === 'single'){
        accBtn.not(th).closest("li").removeClass("active");
        th.closest("li").toggleClass("active");
      }else if(acc.data('type') === 'multi'){
        th.closest("li").toggleClass("active");
      }
    });
  })
}