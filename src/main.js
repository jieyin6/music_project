// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // 辅助es6编译时的操作
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/scss/index.scss'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

fastclick.attach(document.body)
// 整个body下的点击没有300毫秒的延时
Vue.use(VueLazyload,{
 loading:require('common/images/default.png'),
 })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
