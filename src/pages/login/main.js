import Vue from 'vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './index.css';
import App from './App.vue'

import '@/icons/index'
import router from "@/routers"
import  store from '@/store'
import '@/svg';
import SvgIcon from '@/components/SvgIcon.vue';
Vue.component('SvgIcon', SvgIcon);


//tailwindcss  导入使用
Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  store:store,
  router:router,
  render: h => h(App)
}).$mount('#app')
