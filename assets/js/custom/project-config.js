const projectConfig = {
  fonts: {
    "Pretendard"         : `https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css`,
    "Noto Sans KR"    : `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap`,
  }, // 프로젝트 폰트 설정
  copyFeedback: 'alert', // alert 또는 modal
  socialShareConfig: {
    kakaoKey: "YOUR_KAKAO_API_KEY", // 카카오 API 키
    baseUrl: window.location, // 기본 URL 설정
  },
};

window.projectConfig = projectConfig;