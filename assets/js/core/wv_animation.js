import toggleClassAnim from '../module/animations/ToggleClassAnim';


window.onload = function() {
  const ctrl = new ScrollMagic.Controller();
  const components = {
    anim: $(".anim"),
  }

  const init = () => {
    components.anim.length !== 0 && toggleClassAnim(ctrl);
  }
  init();
}