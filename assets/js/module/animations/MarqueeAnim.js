import gsap from "gsap";
import {Linear} from "gsap/gsap-core";

const marqueeAnim = () => {
  let marquee = document.querySelectorAll(".marquee_txt");

  marquee.forEach(el=>{
    let speed = 150;
    let distance = el.clientWidth;
    let style = window.getComputedStyle(el);
    let marginRight = parseInt(style.marginRight) || 0;
    let totalDistance = distance + marginRight;
    let time = totalDistance / speed;
    let container = el.parentElement;
    let direction = el.parentElement.dataset.direction;
    direction === "left" ? totalDistance = '-'+totalDistance : totalDistance;

    gsap.to(container, time, {
      repeat: -1,
      x: totalDistance,
      ease: Linear.easeNone,
    })
  });
}

export default marqueeAnim;