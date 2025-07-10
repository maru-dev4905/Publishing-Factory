// 페이지 로드 시 body에 "wv_adm" 클래스 추가 (100ms 후)
window.onload = function() {
  setTimeout(() => {
    document.body.classList.add("wv_adm");
  }, 100);
};

document.addEventListener("DOMContentLoaded", function() {
  // adm_menu_btn 클릭 시: .adm_menu의 "hide" 토글 및 .lang_btn, .side_lang_list의 "on" 제거
  document.querySelectorAll(".adm_menu_btn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".adm_menu").forEach(menu => {
        menu.classList.toggle("hide");
      });
      // 만약 어떤 lang_btn이라도 "on" 클래스를 가지고 있다면 모두 제거
      if (document.querySelector(".lang_btn.on")) {
        document.querySelectorAll(".lang_btn").forEach(btn => btn.classList.remove("on"));
        document.querySelectorAll(".side_lang_list").forEach(el => el.classList.remove("on"));
      }
    });
  });

  // .adm_menu.hide 내부의 lang_btn 클릭 이벤트 (이벤트 위임)
  document.querySelectorAll(".adm_menu.hide").forEach(menu => {
    menu.addEventListener("click", function(event) {
      const langBtn = event.target.closest(".lang_btn");
      if (langBtn && this.contains(langBtn)) {
        // 모든 .adm_menu에서 "hide" 제거
        document.querySelectorAll(".adm_menu").forEach(menu => menu.classList.remove("hide"));
        // 모든 .lang_btn과 .side_lang_list의 "on" 토글
        document.querySelectorAll(".lang_btn").forEach(btn => btn.classList.toggle("on"));
        document.querySelectorAll(".side_lang_list").forEach(el => el.classList.toggle("on"));
      }
    });
  });

  // .lang_btn 클릭 시: 만약 .adm_menu 중 하나라도 "hide" 클래스가 있으면 모두 제거
  document.querySelectorAll(".lang_btn").forEach(btn => {
    btn.addEventListener("click", function() {
      if (document.querySelector(".adm_menu.hide")) {
        document.querySelectorAll(".adm_menu").forEach(menu => menu.classList.remove("hide"));
      }
    });
  });
});
