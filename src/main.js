import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入elementUI组件库
import './plugins/element.js'
// 导入CSS 初始化文件
import '@/assets/css/reset.css'
// 导入接口请求文件
import api from '@/API'
// 导入 i18n 国际化
import '@/lang/index'
import i18n from '@/lang/index'
// 导入本地存储用户信息
import '@/utils/localStorage'
// 引入echarts
import * as echarts from 'echarts'

Vue.prototype.$api = api
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
