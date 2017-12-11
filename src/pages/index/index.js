// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/common/js/http.js'
import './../../../static/reset.css'
import '@/common/less/common.less'


Vue.config.productionTip = false

// 使用element
import {
  Message,
  Dialog,
  Button
} from 'element-ui' 

Vue.use(Dialog)
Vue.use(Button)


Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
