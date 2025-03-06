// Helper functions (imported from wv_common.js)
const {q, qq, on, off, addClass, removeClass, hasClass} = wvCore;

// 유효성 검사 규칙 모듈화
const rules = {
  required: (value) => value.trim() !== "",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  minLength: (value, length) => value.trim().length >= length,
  maxLength: (value, length) => value.trim().length <= length,
  match: (value, compareTo) => value === compareTo,
  checkbox: (field) => field.checked,
};

// 유효성 검사 함수
const validateField = (field) => {
  const value = field.type === "checkbox" ? field.checked : field.value;
  const validations = field.dataset.validate?.split(",") || [];
  let isValid = true;

  for (const validation of validations) {
    const [rule, param] = validation.split(":");

    // 지원되지 않는 규칙은 무시
    if (!rules[rule]) continue;

    const valid = param ? rules[rule](value, param) : rules[rule](field);

    if (!valid) {
      isValid = false;
      break;
    }
  }

  const errorElement = q(`.invalid_feedback[data-for="${field.name}"]`);
  if (isValid) {
    if (errorElement) {
      removeClass(errorElement, "show");
    }
  } else {
    if (errorElement) {
      addClass(errorElement, "show");
    }
  }

  return isValid;
};

// 폼 전체 유효성 검사 함수
const validateForm = (form) => {
  const fields = qq("[data-validate]", form);
  let allValid = true;

  fields.forEach((field) => {
    const isValid = validateField(field);
    if (!isValid) {
      allValid = false;
    }
  });

  return allValid;
};

// 필드 포커스 아웃 시 유효성 검사
const setupFieldValidation = (form) => {
  const fields = qq("[data-validate]", form);

  fields.forEach((field) => {
    on(field, "blur", () => {
      validateField(field);
    });
  });
};

// Select Box Customization
const setupCustomSelect = () => {
  const selects = qq(".wv_select");

  // 초기 z-index 설정 (100부터 시작, 각 셀렉트 박스마다 +1)
  selects.forEach((select, index) => {
    const zIndex = 100 + index;
    select.style.zIndex = zIndex;
  });

  const validateSelectBox = (select) => {
    const options = qq("input[type='checkbox']", select);
    const errorElement = q(`.invalid_feedback[data-for="wv_select"]`);
    const button = q(".select_btn", select);

    let isChecked = Array.from(options).some(option => option.checked);

    if (!isChecked) {
      errorElement && addClass(errorElement, "show");
      button && addClass(button, "invalid");
    } else {
      errorElement && removeClass(errorElement, "show");
      button && removeClass(button, "invalid");
    }
  };

  selects.forEach((select) => {
    const button = q(".select_btn", select);
    const options = q(".option_list", select);

    if (!button || !options) return;

    // 버튼 클릭 시 토글
    on(button, "click", (e) => {
      e.preventDefault();
      const isOpen = hasClass(options, "show");

      // 모든 드롭다운 닫기
      qq(".option_list.show").forEach((openOptions) => {
        removeClass(openOptions, "show");
        removeClass(q(".select_btn", openOptions.closest(".wv_select")), "active");
      });

      // 현재 버튼과 연결된 드롭다운 토글
      if (!isOpen) {
        addClass(options, "show");
        addClass(button, "active");
      }
    });

    // 옵션 클릭 시 드롭다운 닫기
    qq("input[type='checkbox']", options).forEach((checkbox) => {
      on(checkbox, "change", () => {
        removeClass(options, "show");
        removeClass(button, "active");
        validateSelectBox(select);
      });
    });

    // 버튼 포커스 아웃 시 유효성 검사
    on(button, "blur", () => {
      validateSelectBox(select);
    });
  });

  // 문서 어디를 클릭하든 열려있는 드롭다운 닫기
  on(document, "click", (e) => {
    if (!e.target.closest(".wv_select")) {
      qq(".option_list.show").forEach((options) => {
        removeClass(options, "show");
        removeClass(q(".select_btn", options.closest(".wv_select")), "active");
      });

      selects.forEach(select => validateSelectBox(select));
    }
  });
};

// Event listeners (setupValidation 분리)
export const setupValidation = (formSelector) => {
  const form = q(formSelector);

  if (!form) {
    console.warn(`Form with selector "${formSelector}" not found.`);
    return;
  }

  setupFieldValidation(form);

  on(form, "submit", (e) => {
    if (!validateForm(form)) {
      e.preventDefault();
    }
  });

  // Setup custom select behavior
  setupCustomSelect();
};
