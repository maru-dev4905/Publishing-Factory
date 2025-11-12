import wvTab from "../module/components/Tab/Tab.js";
import wvAccordion from "../module/components/Accordion/Accordion.js";
import wvModal from "../module/components/Modal/Modal.js";
import wvCopyBtn from "../module/components/Copy/CopyBtn.js";
import wvTargetBtn from "../module/components/TargetBtn/TargetBtn.js";
import wvScrBtn from "../module/components/ScrBtn/ScrBtn.js";
import wvLinkBtn from "../module/components/LinkBtn/LinkBtn.js";
import hideTodayCompo from "../module/components/HideToday/HideToday.js";

const wvCompo = {
  _inited: false,
  init() {
    if (this._inited) return;
    this._inited = true;

    // Initialize each component module (each should use event delegation internally)
    wvTargetBtn();
    wvTab();
    wvAccordion();
    wvModal();
    wvCopyBtn({ feedback: "alert" });
    wvScrBtn();
    wvLinkBtn();
    hideTodayCompo();
  }
};

// On initial DOM ready
document.addEventListener('DOMContentLoaded', () => {
  wvCompo.init();
});

// Expose for re-init if needed (e.g., dynamic injection)
window.wvCompoInit = () => wvCompo.init();

export default wvCompo;
