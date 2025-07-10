const getFontCdn = (key) => {
  const font = window.projectConfig.fonts;
  const keyArr = Object.keys(font);
  const keyStr = keyArr.find(item => item == key);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.as = 'style';

  if (typeof keyStr != 'undefined') {
    link.href = font[keyStr];
    document.head.appendChild(link);
    console.log(`Font "${keyStr}" loaded.`);
  } else {
    throw `Font "${key}" not found.`
  }
}

export default getFontCdn;