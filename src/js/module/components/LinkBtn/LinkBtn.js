// LinkBtn.js

export default function wvLinkBtn() {
  const selector = '.wv_link_btn';
  let inited = false;
  const DEFAULT_DELAY = 0;

  function init(){
    if (inited) return;
    inited = true;

    const btns = document.querySelectorAll(".wv_link_btn");
    btns.forEach(btn=>{
      btn.addEventListener('click', onClick);
    });
  }

  function onClick(e){
    const btn = e.currentTarget;
    const href = btn.getAttribute('data-href');
    if(!href) return;

    const delay = parseInt(btn.getAttribute('data-delay')) || DEFAULT_DELAY;
    const blankAttr = btn.getAttribute('data-blank');
    const openBlank =
        blankAttr === '' ||
        blankAttr === 'true' ||
        blankAttr === '1';
    
    setTimeout(()=>{
      if(openBlank) {
        window.open(href, '_blank');
      }else{
        window.location.href = href;
      }
    }, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}