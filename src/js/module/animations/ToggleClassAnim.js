gsap.registerPlugin(ScrollTrigger);

const toggleClassAnim = () => {
  document.querySelectorAll('.anim').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      toggleClass: { targets: el, className: 'show' },
      once: projectConfig.animationConfig.toggleClassOnce
    });
  });
};

export default toggleClassAnim;