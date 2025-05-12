const projectConfig = {
  copyFeedback: 'alert', // alert 또는 modal
  socialShareConfig: {
    kakaoKey: "YOUR_KAKAO_API_KEY", // 카카오 API 키
    baseUrl: window.location, // 기본 URL 설정
  },
  animationConfig: {
    toggleClassOnce: false, // true : 스크롤 시 애니메이션 한번만 실행, false : 매번 실행
  }
};

window.projectConfig = projectConfig;