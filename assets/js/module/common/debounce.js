const debounce = (func, wait = 300) => {
  let timeout;

  return function (...args) {
    const context = this;

    // 이전 타이머 취소
    clearTimeout(timeout);

    // 새로운 타이머 설정
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

export default debounce;