import REG from "./REG";

import EmailIpt from "./input/email";
import TelIpt from './input/tel';

window.onload = function() {
  const components= {
    text: $("input[data-ipt='text']"),
    email: $("input[data-ipt='email']"),
    tel: $("input[data-ipt='tel']"),
      phone: $("input[data-ipt='phone']"),
      pw: $("input[data-ipt='pw']"),
      pwChk: $("input[data-ipt='pwChk']"),
      textarea: $("textarea[data-ipt='textarea']"),
      select: $(".wv_select"),
      radio: $("input[data-ipt='radio']"),
      checkbox: $("input[data-ipt='checkbox']"),
    file: $("input[data-ipt='file']"),
  }
  const init = () => {
    components.email.length !== 0 && components.email.on("change", function(){EmailIpt($(this), REG.EMAIL)});
    components.tel.length !== 0 && components.tel.on("keydown", function(){TelIpt($(this), REG.TEL, REG.AUTO_HYPHEN)});
    components.phone.length !== 0 && components.phone.on("keydown", function(){TelIpt($(this), REG.TEL, REG.AUTO_HYPHEN)});
  }
  init();
}