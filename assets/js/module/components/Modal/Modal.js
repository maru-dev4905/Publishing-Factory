export default function wvModal(closeOnOverlayClick = true) {
  // 모달 열기 및 닫기를 위한 이벤트 위임
  document.addEventListener('click', function(event) {
    // 모달 버튼 (열기 또는 닫기) 확인
    const btn = event.target.closest('.wv_modal_btn');
    if (!btn) return;

    event.preventDefault();

    // 닫기 버튼인 경우
    if (btn.classList.contains('close_modal')) {
      closeModal();
      return;
    }

    // 모달 열기
    const modalId = btn.getAttribute('data-modal');
    if (!modalId) {
      console.warn("data-modal 속성이 설정되어 있지 않습니다.");
      return;
    }
    const targetModal = document.getElementById(modalId);
    if (!targetModal) {
      console.warn(`ID가 ${modalId}인 모달 요소를 찾을 수 없습니다.`);
      return;
    }

    // data-chain 속성이 있으면, 활성화된 다른 모달 제거
    const chain = targetModal.getAttribute('data-chain');
    if (chain) {
      document.querySelectorAll('.wv_modal.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }

    targetModal.classList.add('active');
    const dim = document.querySelector('.dim');
    if (dim) {
      dim.classList.add('active');
    }
    targetModal.focus();
    document.body.classList.add('scrollLock');
  });

  function closeModal() {
    document.querySelectorAll('.wv_modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    const dim = document.querySelector('.dim');
    if (dim) {
      dim.classList.remove('active');
    }
    document.body.classList.remove('scrollLock');
  }

  // 오버레이 클릭 시 닫기
  if (closeOnOverlayClick) {
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('dim')) {
        event.preventDefault();
        closeModal();
      }
    });
  }

  // ESC 키로 닫기
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.wv_modal.active');
      if (activeModal) {
        closeModal();
      }
    }
  });
}