// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import store from "./vuex/store";
import {Loadmore, Spinner} from 'mint-ui';
import heightCharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
import $ from 'jquery'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

HighchartsMore(heightCharts)
Vue.use(heightCharts);

axios.interceptors.request.use(function (config) {
  if(config.url.indexOf("/wechat/js") === -1){
    store.commit("REQUEST_START");
  }
  return config;
}, function (error) {
  console.log("request is err");
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  if (response.data.code !== 0) {
    console.log("err message is:", response.data.message)
    return Promise.reject(response.data.message)
  } else {
    store.commit("RESPONSE_START");
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

Vue.component(Loadmore.name, Loadmore, Spinner.name, Spinner);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  methods: {
    moreChart() {
      var options = this.getMoreOptions(this.type);
      if (this.chart) {
        this.chart.destroy();
      }
      ;
      this.chart = new Highcharts.Chart('highcharts-more', options);
    },

  }
});
