import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import fastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

//解决移动端延迟300毫秒的问题
fastClick.attach(document.body)

//vue图片懒加载
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue();

Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
