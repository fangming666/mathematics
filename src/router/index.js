import Vue from 'vue'
import Router from 'vue-router'
import * as action from "./../vuex/action";
import * as hideMenu from "./../utils/hideMenu";

const wx = require('weixin-js-sdk');

const exam_list = () => import( '@/components/exam_list');
const test = () => import( '@/components/test');
const pay = () => import( '@/components/pay');
const question = () => import( '@/components/question/question');
const report = () => import( '@/components/report/report');
const detail = () => import( '@/components/report/respondence/detail');


Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/exam"
    },
    {
      path: '/exam',
      name: 'exam_list',
      component: exam_list,
      prop: true,

    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
      prop: true,

    },
    {
      path: '/test',
      name: 'test',
      component: test,
      prop: true,

    },
    {
      path: '/question',
      name: 'question',
      component: question,
      prop: true,

    },
    {
      path: '/report',
      name: 'report',
      component: report,
      prop: true,

    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      prop: true,

    }
  ]
});
router.beforeEach((to, from, next) => {
  let url = window.location.host;
  let page = {
    url: `${process.env.API_HOST}/wechat/js`,
    methods: "post",
    data: {url: url + to.fullPath}
  };
  action.wechat(page).then(res => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appid, // 必填，公众号的唯一标识
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.noncestr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名，见附录1
      jsApiList: ["chooseWXPay", "hideMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    hideMenu.hide_menu();
    next();
  }).catch(err => {
    console.log("router err is :", err);
    hideMenu.hide_menu();
    next();
  });
});
export default router;
