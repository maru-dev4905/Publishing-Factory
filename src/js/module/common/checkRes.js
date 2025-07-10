const checkRes = () => {
  let isRes;

  if (window.w >= 768) {
    window.res = "pc";
  } else {
    window.res = "mo";
  }

  console.log(`window width size : ${w} \nwindow height size : ${h} \nwindow responsive : ${res} \nwindow location : ${loc}`);

  return isRes;
};

export default checkRes;
