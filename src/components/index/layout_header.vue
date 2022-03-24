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
      <div class="w-p1200 flex">
          <div
              v-for="item in menuList"
              :key="'header-'+item.id"
              class="menu-item w-full flex items-center w-12 md:w-28 lg:w-40 cursor-pointer hover:bg-blue-400">
            <svg-icon
                class="text-2xl"
                :icon-class="item.icon"
            ></svg-icon>
            <span>{{item.text}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout_header",
  data:()=>{
    return {
      logoUrl: process.env.BASE_URL+'image/logo.jpg',
      menuList:[
        {
          id:1,
          text: '首页',
          path: '/',
          icon: 'home'
        },
        {
          id:2,
          text: '购票',
          path: '/',
          icon: 'home'
        },
        {
          id:3,
          text: '用户中心',
          path: '/user',
          icon: 'home'
        },
        {
          id:4,
          text: '攻略',
          path: '/user',
          icon: 'home'
        },
        {
          id:5,
          text: '更多',
          path: '/user',
          icon: 'home'
        },
      ],
    }
  },

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
