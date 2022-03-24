<!--
 * @Author: your name
 * @Date: 2021-08-02 09:37:49
 * @LastEditTime: 2021-08-31 15:03:41
 * @LastEditors: kindring
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\App.vue
-->
<template>
  <a-layout id="components-layout-demo-responsive" class="h-full">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      :theme="globel_theme"
    >
      <div class="logo w-full" >
        {{nowSelectedMenuKeys}}
        <routers-link to="/"><img alt="logo" src="@/assets/logo.png"></routers-link>
      </div>
      <a-menu  
      mode="inline"
      :theme="globel_theme"
      :selectedKeys="nowSelectedMenuKeys"
      >
        <sidebarMenuItem  
        v-for="(item,i) in menus" :menu="item" 
        :mykey="item.meta?(item.meta.menuKey?item.meta.menuKey:item.path):item.path" 
        :key="'menu_'+i" />
      </a-menu>

    </a-layout-sider>
    <a-layout class="h-full flex">
      <a-layout-content class="w-11/12 mx-auto overflow-hidden flex flex-col">
        <routers-nav class="mt-2"></routers-nav>
        <div class="w-full h-full relative flex items-center overflow-y-auto flex-col mt-3">
          <!-- 页面布局 -->
          <content-view>
            <routers-view/>
          </content-view>
        </div>
        <footer class="py-1">
          合方圆科技@2021.08.30
        </footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import contentView from '@components/content/content.vue'
import sidebarMenuItem from '@components/sidebars/sidebarMenuItem.vue'

import routerNav from '@components/nav/routerNav.vue'
import Router from './routers/routers';
import {mapState,mapMutations,mapActions} from 'vuex';
import types from './store/types.js'
import {onBeforeMount} from "vue";
// import apis from '@/apis/index'
export default {
  name: 'App',
  setup(props,context){
    console.log(props,context)
    onBeforeMount(()=>{
      console.log('onBeforeMount')
    })
  },
  components: {
    // HelloWorld,
    contentView,
    routerNav,
    sidebarMenuItem,
  },
  data(){
    return {
      // 是否为固定
      isFixed: false,
      footerText: '摄像头管理@ 合方圆科技',
      menus: [],
      nowSelectedMenuKeys: [],
    }
  },
  computed:{
    ...mapState({
      globel_theme:state =>  state.globel[types.globel.state.theme]
    })
  },
  beforeMount(){
    this.menus = Router.getSidebar();
    console.log(this.menus);
  },
  mounted(){
    // let s = `:selectedKeys ="'menu_'+$route.path"`
    // console.log(this.$route.path)
    // console.log(this.$route)
    this.$axios.get('/mock/news').then(res=>{
      console.log('response')
      console.log(res)
    }).catch(err=>{
      console.log('error      ---')
      console.error(err)
    })
    this.$routers.afterEach(()=>{
      // console.log(this.$route.path)
      // console.log(this.$route)
      this.setSidebarMenu()
    })

    this.loadRoom()
    // this.loadList()
  },
  methods:{
    ...mapMutations([types.globel.mutations.THEME]),
    ...mapActions({loadRoom:types.camera.actions.loadRoom}),
    changeTheme(){
      this.MUTATION_THEME()
    },
    setSidebarMenu(){
      this.nowSelectedMenuKeys = this.nowSelectedMenuKeys.filter(()=>false);
      // 计算侧边栏
      let sideBarMenukey = this.$route.meta?(this.$route.meta.menuKey?this.$route.meta.menuKey:this.$route.path):this.$route.path ;
      this.nowSelectedMenuKeys.push(`menu_${sideBarMenukey}`)
    }
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.logo{
  width: 100%;
  height: auto;
}
.logo > img{
  display: block;
  width: 100%;
}
</style>
