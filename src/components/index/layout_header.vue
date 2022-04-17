<template>
  <div class="w-full">
<!--    logo部分布局 -->
    <div class="w-full flex justify-center h-24">
      <div class="w-p1200 flex items-center">
        <div class="logo">
          <a href="/">
            <img :src="logoUrl" alt="机票预定">
          </a>
        </div>
        <h1 class="text-3xl mt-2">极速,互联,稳定,便捷</h1>
      </div>
    </div>

<!--    页面导航-->
    <div class="w-full  h-12 flex justify-center bg-blue-300">
      <div class="w-p1200 flex justify-between">
        <div class="flex">
          <air-link
              v-for="item in menuList"
              :key="'header-'+item.id"
              :type="item.type"
              :path="item.path"
              class="menu-item pl-2 w-full flex items-center w-12 md:w-28 lg:w-40 cursor-pointer hover:bg-blue-400"
          >
            <svg-icon
                class="text-2xl pr-1"
                :icon-class="item.icon"
            ></svg-icon>
            <span>{{item.text}}</span>
          </air-link>
        </div>

        <div class="flex">
          <div class="flex items-center px-6 cursor-pointer hover:bg-blue-400">
            <svg-icon
                class="text-2xl  pr-1"
                icon-class="car"
            ></svg-icon>
            <span>购物车</span>
          </div>
          <air-link
              :type="2"
              :path="isLogin?'/user':'login'"
              class="menu-item pl-3 w-full flex items-center w-12 md:w-28 lg:w-40 cursor-pointer hover:bg-blue-400"
          >
            <svg-icon
                class="text-2xl  pr-1"
                icon-class="user"
            ></svg-icon>
            {{isLogin?`个人中心`:'登录/注册'}}
          </air-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AirLink from "@components/public/airLink";
import {mapState} from "vuex";
import types from "@/store/homeTypes";
export default {
  name: "layout_header",
  components: {AirLink},
  data:()=>{
    return {
      logoUrl: process.env.BASE_URL+'image/logo.jpg',
      menuList:[
        {
          id:1,
          text: '首页',
          path: '/',
          icon: 'home',
          type: 2
        },
        {
          id:2,
          text: '购票',
          path: '/#/buy',
          icon: 'buy',
          type: 2
        },
        {
          id:3,
          text: '推荐机票',
          path: '/#/recommend',
          icon: 'recommend',
          type: 2
        },
        {
          id:4,
          text: '攻略',
          path: '/#/gl',
          icon: 'gl',
          type: 2,
        },
        {
          id:5,
          text: '更多',
          path: '/#/more',
          icon: 'more',
          type: 2
        },
      ],
    }
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      // 用户选择的
    }),
  }


}
</script>

<style scoped lang="scss">
.logo{
  height: 100%;
  img{
    height: 100%;
    width: auto;
  }
}
</style>
