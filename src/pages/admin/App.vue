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
    <!--    侧边导航蓝-->
    <layout>
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import layout from "@/components/admin/layout";
// import apis from '@/apis/index'
export default {
  name: 'App',
  components: {
    layout
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
body,html{
  width: 100%;
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
