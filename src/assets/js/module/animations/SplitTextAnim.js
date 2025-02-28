import { gsap, ScrollTrigger } from 'gsap/all';

const splitTextAnim = () => {
  gsap.utils.toArray(".splitText").forEach(function(text,idx){
    let char = text.querySelectorAll("span");
    let isScrub = text.dataset.isscrub == 'true' ? true : false;

    let childSplit = new SplitText(char, {
      type: "words",
      linesClass: "split_child",
    });
    let parentSplit = new SplitText(char, {
      linesClass: "split_parent"
    });

    gsap.from(childSplit.words, {
      duration: 1.5,
      yPercent: 100,
      ease: "power4.inOut",
      stagger: 0.085,
      scrollTrigger: {
        trigger: text,
        start: 'top 80% ',
        end: "bottom 50%",
        scrub: isScrub,
        markers: true,
      }
    });
  })
}

export default splitTextAnim;