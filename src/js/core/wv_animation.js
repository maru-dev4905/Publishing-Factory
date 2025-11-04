import toggleClassAnim from '../module/animations/ToggleClassAnim.js';
import CountUp from '../module/animations/CountUpAnim';

gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
  const components = {
    anim: document.querySelectorAll('.anim'),
    countUp: document.querySelectorAll('.wv_count'),
  };

  const init = () => {
    components.anim.length !== 0 && toggleClassAnim();
    components.countUp.length !== 0 && CountUp();
  };
  init();
};