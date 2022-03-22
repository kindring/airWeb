import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import * as echarts from 'echarts'
import 'ant-design-vue/dist/antd.css'
import './index.css';
import '@/icons/index'
// import router from "@/routers"
// import  store from '@/store'
import spin from '@/components/public/spin/spin'
import '@/svg';
import SvgIcon from '@/components/public/IconSvg/iconSvg';
Vue.component('SvgIcon', SvgIcon);


//tailwindcss  导入使用
// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(spin)

new Vue({
  // store:store,
  // router:router,
  render: h => h(App)
}).$mount('#app')
