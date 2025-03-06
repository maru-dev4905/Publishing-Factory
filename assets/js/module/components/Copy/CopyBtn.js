export default function wvCopyBtn() {
  const copyBtns = $(".wv_copy_btn");
  const { copyFeedback, socialShareConfig } = window.projectConfig;

  copyBtns.off("click").on("click", function () {
    const btn = $(this);
    const textToCopy = btn.data("text");
    const targetId = btn.data("target");
    const copyType = btn.data("type"); // "window" 또는 "social"
    let text = "";

    if (copyType === "window") {
      text = window.location.href; // 현재 페이지 URL 복사
    } else if (copyType === "social") {
      const platform = btn.data("platform"); // kakao, facebook, twitter
      shareSocial(platform, socialShareConfig);
      return; // 소셜 공유는 복사 기능과 별도로 처리
    } else if (textToCopy) {
      text = textToCopy; // data-text 값을 복사
    } else if (targetId) {
      const target = $(`#${targetId}`);
      text = target.text(); // 대상 요소의 텍스트를 복사
    } else {
      console.warn("No text or target specified for copy.");
      return;
    }

    // 클립보드에 텍스트 복사
    navigator.clipboard
        .writeText(text)
        .then(() => handleFeedback(copyFeedback))
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
  });
}

// 피드백 처리
function handleFeedback(feedbackType) {
  if (feedbackType === "alert") {
    alert("Copied to clipboard.");
  } else if (feedbackType === "modal") {
    const successModal = $("#copySuccessModal");
    if (successModal.length) {
      successModal.addClass("active");
      setTimeout(() => {
        successModal.removeClass("active");
      }, 2000); // 2초 후 모달 닫기
    }
  }
}

// 소셜 공유 처리
function shareSocial(platform, config) {
  const { kakaoKey, baseUrl } = config;
  const shareUrl = `${baseUrl}${window.location.pathname}`;
  const title = document.title; // 기본 제목 설정

  switch (platform) {
    case "kakao":
      if (!window.Kakao) {
        console.error("Kakao SDK is not loaded.");
        return;
      }
      if (!Kakao.isInitialized()) Kakao.init(kakaoKey);
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title,
          description: "Check this out!",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      });
      break;
    case "facebook":
      window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank"
      );
      break;
    case "twitter":
      window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
      );
      break;
    case "blog":
      window.open(
          `https://share.naver.com/web/shareView?url=${encodeURIComponent(shareUrl)}`,
          "_blank"
      );
      break;
    default:
      console.warn("Unsupported platform:", platform);
  }
}