export default function wvModal(closeOnOverlayClick = true) {
  const modalBtns = $(".wv_modal_btn");
  const modals = $(".wv_modal");
  const dim = $(".dim");
  const modalCloseBtns = $(".wv_modal_btn.close_modal");

  // 열기
  modalBtns.off("click").on("click", function () {
    const modalId = $(this).data("modal");
    const targetModal = $(`#${modalId}`);

    const chain = targetModal.data("chain");
    chain ? $(".wv_modal.active").removeClass("active") : null;

    targetModal.addClass("active");
    dim.addClass("active");
    targetModal.focus();

    $("body").addClass("scrollLock"); // 스크롤 잠금
  });

  // 닫기
  function closeModal() {
    modals.removeClass("active");
    dim.removeClass("active");

    $("body").removeClass("scrollLock"); // 스크롤 복원
  }

  // 닫기 버튼 클릭
  modalCloseBtns.on("click", closeModal);

  // dim 클릭 시 닫기
  if (closeOnOverlayClick) {
    dim.on("click", closeModal);
  }

  // ESC 키로 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = $(".wv_modal.active");
      if (activeModal.length) {
        closeModal();
      }
    }
  });
}
