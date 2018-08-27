function chooseLocale(language){
  let res = {};
  switch(language || navigator.language){
  case 'zh-CN':
    res = require('./zh-CN');
    break;
  default:
    res = require('./zh-CN');
    break;
  }
  return res.default || res;
}

export default chooseLocale;