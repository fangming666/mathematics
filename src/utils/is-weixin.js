/**
 * 判断是否是微信内嵌浏览器**/

let is_weixin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
    return true;
  } else {
    return false;
  }
}

export const isWeixin = is_weixin;
