import Vue from 'vue'
import App from './App'
import routers from './router/'
import store from './store'
import {routerMode} from './config/env'
import VueRouter from 'vue-router'
import api from './config/api'
import echarts from 'echarts';


import ElementUI from './plugins/element'
import "./plugins/element/theme-chalk/index.css";
import "./style/css/reset_ele.css";
import Print from './plugins/print.js' // 引入附件的js文件


Vue.prototype.$api=api;
Vue.config.productionTip=false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(echarts);


Vue.use(Print) // 注册

let router = new VueRouter({
  routes:routers,
  mode: routerMode,
  strict:false //"use strict"
})
// router.beforeEach(function (to, from, next) {
//   window.scrollTo(0,0)
//   loading=Loading.service({
//      lock: true,
//      text: 'Loading',
//      background: 'rgba(0, 0, 0, 0.7)'})
//     next();
// })
//
// router.afterEach(function (transition) {
//    setTimeout(function () {
//      loading.close();
//    },100)
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
