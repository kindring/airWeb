import Vue from 'vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './index.css';
import App from './adminLoginApp.vue'



//tailwindcss  导入使用
Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(App)
}).$mount('#app')
