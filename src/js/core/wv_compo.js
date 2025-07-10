import wvTab from "../module/components/Tab/Tab.js";
import wvAccordion from "../module/components/Accordion/Accordion.js";
import wvModal from "../module/components/Modal/Modal.js";
import wvCopyBtn from "../module/components/Copy/CopyBtn.js";
import wvTargetBtn from "../module/components/TargetBtn/TargetBtn.js";
import wvScrBtn from "../module/components/ScrBtn/ScrBtn.js";

const wvCompo = {
  _inited: false,
  init() {
    if (this._inited) return;
    this._inited = true;

    // Initialize each component module (each should use event delegation internally)
    wvTargetBtn();                                        // target-btn delegation
    wvTab();                                              // tab component delegation
    wvAccordion();                                        // accordion component delegation
    wvModal();                                            // modal component delegation
    wvCopyBtn({ feedback: "modal" });                   // copy button with modal feedback
    wvScrBtn();                                           // scroll button delegation
  }
};

// On initial DOM ready
document.addEventListener('DOMContentLoaded', () => {
  wvCompo.init();
});

// Expose for re-init if needed (e.g., dynamic injection)
window.wvCompoInit = () => wvCompo.init();

export default wvCompo;
