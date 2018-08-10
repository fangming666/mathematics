/**
 * 微信隐藏分享
 * **/
let wx = require('weixin-js-sdk');
let hideMenu = () => {
  wx.ready(function () {
    wx.hideAllNonBaseMenuItem()
  })
}
export const hide_menu = hideMenu;
