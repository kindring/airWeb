<!--
 * @Author: your name
 * @Date: 2021-08-02 09:37:49
 * @LastEditTime: 2021-11-22 17:08:53
 * @LastEditors: kindring
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\App.vue
-->
<template>
  <div class="w-full">
    <!--    顶部导航栏-->
    <Layout_header></Layout_header>
    <!--    中间内容框-->
    <router-view></router-view>
    <!--    底部信息框-->
    <layout_footer></layout_footer>

  </div>
</template>

<script>
import Layout_header from "../../components/index/layout_header";
import layout_footer from "../../components/index/layout_footer";
// import apis from '@/apis/index'
export default {
  name: 'App',
  components: {
    layout_footer,
    Layout_header
    // HelloWorld,
    // bigScreen
  },
  data(){
    return {
      // 是否为固定
      isFixed: false,
      footerText: 'AIR机票',
      menus: [],
      nowSelectedMenuKeys: [],
    }
  },
  computed:{
  },
  beforeCreate(){},
  beforeMount(){},
  mounted(){},
  methods:{
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
*{
  margin: 0;
  padding: 0;
}
</style>
