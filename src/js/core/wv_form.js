// --------------------------------------------------
// 정규식 상수
// --------------------------------------------------
const REG = {
  PHONE:     /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
  TEL:       /^(\d{0,2})(\d{0,4})(\d{0,4})$/g,
  BIRTH:     /^(\d{0,4})(\d{0,2})(\d{0,2})$/g,
  EMAIL:     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
  ONLY_NUM:  /[^0-9]/g,
  AUTO_HYPHEN:/(\-{1,2})$/g
};

// --------------------------------------------------
// prjForm 객체 정의
// --------------------------------------------------
const prjForm = {
  // 검사 대상 form 클래스
  formSelector: '.wv_validate_form',

  // 중복 제출 방지 플래그
  isSubmitting: false,

  init() {
    this.setSelectZindex();

    // 이벤트 위임 설정
    document.addEventListener('keyup',    this.onKeyUp.bind(this),    true);
    document.addEventListener('input',    this.onInput.bind(this),    true);
    document.addEventListener('change',   this.onChange.bind(this),   true);
    document.addEventListener('click',    this.onClick.bind(this),    true);
    document.addEventListener('focusout', this.onFocusOut.bind(this), true);
  },

  // ----------------------------------------
  // custom select에 z_idxN 클래스 붙이기
  // ----------------------------------------
  setSelectZindex() {
    const selects = document.querySelectorAll('.wv_select');
    const total  = selects.length;
    selects.forEach((sel, idx) => {
      // idx=0 → z_idx(total), idx=1 → z_idx(total-1), …, 마지막 → z_idx1
      const zOrder = total - idx;
      sel.classList.add(`z_idx${zOrder}`);
    });
  },

  // --------------------------------------------------
  // 1) keyup → 전화번호 자동 하이푼
  // --------------------------------------------------
  onKeyUp(e) {
    const ipt = e.target;
    if (!this._inValidForm(ipt)) return;

    if (ipt.matches('.wv_phone_ipt')) {
      let v = ipt.value
          .replace(REG.ONLY_NUM, '')
          .replace(REG.PHONE, '$1-$2-$3')
          .replace(REG.AUTO_HYPHEN, '');
      ipt.value = v;
    }
    else if (ipt.matches('.wv_tel_ipt')) {
      let v = ipt.value
          .replace(REG.ONLY_NUM, '')
          .replace(REG.TEL, '$1-$2-$3')
          .replace(REG.AUTO_HYPHEN, '');
      ipt.value = v;
    }
  },

  // --------------------------------------------------
  // 2) input → 생년월일 자동 하이푼
  // --------------------------------------------------
  onInput(e) {
    const ipt = e.target;
    if (!this._inValidForm(ipt)) return;

    if (ipt.matches('.wv_birth_ipt')) {
      let v = ipt.value
          .replace(REG.ONLY_NUM, '')
          .replace(REG.BIRTH, '$1-$2-$3')
          .replace(REG.AUTO_HYPHEN, '');
      ipt.value = v;
    }
  },

  // --------------------------------------------------
  // 3) change → 이메일 유효성
  // --------------------------------------------------
  onChange(e) {
    const ipt = e.target;
    if (!this._inValidForm(ipt)) return;

    if (ipt.matches('.wv_email_ipt')) {
      if (!ipt.value.match(REG.EMAIL)) {
        ipt.value = '';
        ipt.focus();
      }
    }
  },

  // --------------------------------------------------
  // 4) click → 비밀번호 토글 / custom select / submit
  // --------------------------------------------------
  onClick(e) {
    const tgt = e.target;

    // 4-1) 비밀번호 보기 토글
    if (tgt.closest('.wv_pw_view_btn')) {
      e.preventDefault();
      const btn = tgt.closest('.wv_pw_view_btn');
      const ipt = btn.closest('.wv_pw_ipt_wrap')?.querySelector('input');
      if (btn.classList.toggle('view')) {
        ipt.type = 'text';
      } else {
        ipt.type = 'password';
      }
    }

    // 4-2) custom select 열기/닫기
    if (tgt.closest('.wv_select_btn')) {
      e.preventDefault();
      const sel = tgt.closest('.wv_select');
      sel.classList.toggle('show');
    }
    // 옵션 선택
    if (tgt.closest('.wv_option_btn')) {
      e.preventDefault();
      const opt = tgt.closest('.wv_option_btn');
      const sel = opt.closest('.wv_select');
      sel.querySelector('.wv_selected_value').textContent = opt.textContent;
      sel.classList.add('selected');
      sel.classList.remove('show');
    }

    // 4-3) submit 버튼
    if (tgt.closest('.wv_submit_btn')) {
      e.preventDefault();
      this._onSubmit(tgt.closest(this.formSelector));
    }
  },

  // --------------------------------------------------
  // 5) focusout → required 필드 hint 토글
  // --------------------------------------------------
  onFocusOut(e) {
    const ipt = e.target;
    if (!this._inValidForm(ipt)) return;

    if (ipt.matches('.required')) {
      const isFilled = ipt.value.trim() !== '';
      // hint 요소는 .invalid_feedback 클래스
      const hint = ipt.closest('.ipt_col')?.querySelector('.invalid_feedback')
          || ipt.parentNode.querySelector('.invalid_feedback');
      if (!hint) return;

      if (isFilled && !ipt.matches('.wv_phone_ipt')) {
        hint.classList.remove('show');
      } else if (ipt.matches('.wv_phone_ipt') && ipt.value.length === 13) {
        hint.classList.remove('show');
      } else {
        hint.classList.add('show');
      }
    }
  },

  // --------------------------------------------------
  // 실제 submit 처리
  // --------------------------------------------------
  _onSubmit(formEl) {
    if (!formEl || !formEl.matches(this.formSelector)) return;
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const submitBtn = formEl.querySelector('.wv_submit_btn');
    submitBtn.disabled = true;

    let valid = true;

    // 체크박스 required 검사
    formEl.querySelectorAll('input[type=checkbox].required').forEach(cb => {
      if (!cb.checked) {
        this._showHint(cb);
        valid = false;
      }
    });

    // 텍스트/textarea required 검사
    formEl.querySelectorAll('input.required, textarea.required').forEach(ipt => {
      if (ipt.value.trim() === '') {
        this._showHint(ipt);
        valid = false;
      }
    });

    // select required 검사
    formEl.querySelectorAll('.wv_select.required').forEach(sel => {
      if (!sel.classList.contains('selected')) {
        sel.querySelector('.invalid_feedback')?.classList.add('show');
        valid = false;
      }
    });

    if (!valid) {
      this.isSubmitting = false;
      submitBtn.disabled = false;
      return;
    }

    // 전화번호 하이픈 제거
    const phoneIpt = formEl.querySelector('input[name=mobile]');
    if (phoneIpt) {
      phoneIpt.value = phoneIpt.value.replace(/-/g, '');
    }

    formEl.submit();
  },

  // hint 보이기
  _showHint(ipt) {
    const hint = ipt.closest('.ipt_col')?.querySelector('.invalid_feedback')
        || ipt.parentNode.querySelector('.invalid_feedback');
    hint?.classList.add('show');
  },

  // 이 요소가 검사 대상 form 안에 있는지 확인
  _inValidForm(el) {
    return !!el.closest(this.formSelector);
  }
};

// --------------------------------------------------
// 초기화
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  prjForm.init();
});
