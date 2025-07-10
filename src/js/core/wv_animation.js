import toggleClassAnim from '../module/animations/ToggleClassAnim.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
  const components = {
    anim: document.querySelectorAll('.anim'),
  };

  const init = () => {
    if (components.anim.length > 0) {
      toggleClassAnim();
    }
  };
  init();
};