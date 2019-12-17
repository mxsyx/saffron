import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from '@/router'
import App  from  '@/App.vue'

import { MessagePlugin } from '@/plugin'
import { LoadingPlugin } from '@/plugin'

import '@/assets/css/saffron.css'
import '@/assets/css/font-awesome.min.css'

Vue.use(MessagePlugin);
Vue.use(LoadingPlugin);

// 定义页面路由
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
