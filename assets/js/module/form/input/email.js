const EmailIpt = (th, REG) => {
  let value = th.val();
  REG = new RegExp(REG);

  if(value.match(REG) == null){
    th.val('');
    th.focus();
    return false;
  }
}

export default EmailIpt;