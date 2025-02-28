const TelIpt = (th, ...arg) => {
  let value = th.val();
  let REG=[];
  REG[0] = new RegExp(arg[0]);
  REG[1] = new RegExp(arg[1]);

  console.log(REG[0]);
  th.val(
      value.replace(REG[1], '')
          .replace(REG[0], "$1-$2-$3").replace(REG[1], "")
  )
}

export default TelIpt;
