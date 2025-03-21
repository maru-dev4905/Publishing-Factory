const toggleClassAnim = (ctrl) => {
  document.querySelectorAll('.anim').forEach(el => {
    new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 0.85,
    })
        .setClassToggle(el, 'show')
        .addTo(ctrl);
  });
};

export default toggleClassAnim;
