const toggleClassAnim = (ctrl) => {
  $(".anim").each(function (i) {
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.85,
    })
        .setClassToggle(this, 'show')
        .addTo(ctrl);
  });
}

export default toggleClassAnim;