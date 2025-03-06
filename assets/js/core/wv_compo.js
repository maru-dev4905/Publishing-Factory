import wvTab from "../module/components/Tab/Tab.js";
import wvAccordion from "../module/components/Accordion/Accordion.js";
import wvModal from "../module/components/Modal/Modal.js";
import wvCopyBtn from "../module/components/Copy/CopyBtn.js"
import wvTargetBtn from "../module/components/TargetBtn/TargetBtn";
import wvScrBtn from "../module/components/ScrBtn/ScrBtn";

document.addEventListener('DOMContentLoaded', () => {
  function wvCompoInit(){
    document.querySelectorAll(".wv_target_btn").length !== 0 && wvTargetBtn();
    document.querySelectorAll(".wv_tab").length !== 0 && wvTab();
    document.querySelectorAll(".wv_accordion").length !== 0 && wvAccordion();
    document.querySelectorAll(".wv_modal").length !== 0 && wvModal();
    document.querySelectorAll(".wv_copy_btn").length !== 0 && wvCopyBtn({ feedback: "modal"});
    document.querySelectorAll(".wv_scr_btn").length !== 0 && wvScrBtn();
  }
  wvCompoInit();
  window.wvCompoInit = wvCompoInit;
});