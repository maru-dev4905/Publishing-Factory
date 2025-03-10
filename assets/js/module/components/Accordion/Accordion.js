export default function wvAccordion(){
  const accs = document.querySelectorAll(".wv_accordion");

  accs.forEach(acc => {
    const accBtn = acc.querySelectorAll(".wv_accordion_btn");

    accBtn.forEach(btn => {
      btn.addEventListener("click", function () {
        const th = this;

        if (acc.dataset.type === 'single') {
          accBtn.forEach(b => {
            if (b !== th) {
              b.closest("li").classList.remove("active");
            }
          });
          th.closest("li").classList.toggle("active");
        } else if (acc.dataset.type === 'multi') {
          th.closest("li").classList.toggle("active");
        }
      });
    });
  })
}