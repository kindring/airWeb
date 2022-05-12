<!--
 * @Author: your name
 * @Date: 2021-08-02 09:37:49
 * @LastEditTime: 2021-11-22 17:08:53
 * @LastEditors: kindring
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\adminLoginApp.vue
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
import zh_CN from "ant-design-vue/es/locale/zh_CN"
import Layout_header from "../../components/index/layout_header";
import layout_footer from "../../components/index/layout_footer";
import {mapActions} from "vuex";
import types from "@/store/homeTypes";
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
  async mounted(){
    let recodeMeta =await this.loadUser();
    if(!recodeMeta.ok){
      // return this.$message.warn(recodeMeta.msg);
    }
    // 加载用户状态整个
  },
  methods:{
    ...mapActions({
      loadUser: types.user.actions.loadUser,
    }),
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
