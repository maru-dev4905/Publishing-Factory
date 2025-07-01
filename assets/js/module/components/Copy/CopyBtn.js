// CopyBtn.js - event delegation & dynamic init
export default function wvCopyBtn({ feedback = 'alert' } = {}) {
  const selector = '.wv_copy_btn';
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    document.addEventListener('click', e => {
      const btn = e.target.closest(selector);
      if (!btn) return;
      e.preventDefault();

      const copyType = btn.dataset.type; // "window", "social", or undefined
      const textToCopy = btn.dataset.text;
      const targetId = btn.dataset.target;
      let text = '';

      // Determine copy content or social share
      if (copyType === 'window') {
        text = window.location.href;
      } else if (copyType === 'social') {
        shareSocial(btn.dataset.platform);
        return; // social share doesn't copy
      } else if (textToCopy) {
        text = textToCopy;
      } else if (targetId) {
        const targetEl = document.getElementById(targetId);
        text = targetEl ? targetEl.textContent : '';
      } else {
        console.warn('wvCopyBtn: no text or target specified');
        return;
      }

      // Copy to clipboard
      navigator.clipboard.writeText(text)
          .then(() => handleFeedback(feedback))
          .catch(err => console.error('Copy failed:', err));
    });
  }

  // Feedback: alert or modal
  function handleFeedback(type) {
    if (type === 'alert') {
      alert('Copied to clipboard.');
    } else if (type === 'modal') {
      const modal = document.getElementById('copySuccessModal');
      if (modal) {
        modal.classList.add('active');
        setTimeout(() => modal.classList.remove('active'), 2000);
      }
    }
  }

  // Social share
  function shareSocial(platform) {
    const { kakaoKey, baseUrl } = window.projectConfig.socialShareConfig;
    const url = `${baseUrl}${window.location.pathname}`;
    const title = document.title;

    switch (platform) {
      case 'kakao':
        if (window.Kakao) {
          if (!Kakao.isInitialized()) Kakao.init(kakaoKey);
          Kakao.Link.sendDefault({
            objectType: 'feed',
            content: { title, description: '', link: { mobileWebUrl: url, webUrl: url } }
          });
        } else {
          console.error('Kakao SDK not loaded');
        }
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'blog':
        window.open(`https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}`);
        break;
      default:
        console.warn('Unsupported platform:', platform);
    }
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
