import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const parallaxAnim = () => {
  gsap.utils.toArray(".parallax_compo").forEach(function(container) {
    let image = container.querySelector("img");
    gsap.to(image, {
      y: () => image.offsetHeight - container.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
        invalidateOnRefresh: true
      },
    });
  });
}

export default parallaxAnim;