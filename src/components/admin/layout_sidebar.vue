<template>
  <div class="h-full w-full ">
    <div class="flex justify-center py-8 text-3xl border-b text-blue-300" >
      <router-link to="/">航班管理系统</router-link>
    </div>
<!--    侧边栏链接项目-->
      <a-menu mode="inline" >
        <a-sub-menu
            v-for="menu in sidebar"
            :key="menu.path"
            class="bg-blue-200"
        >
          <template #title>{{menu.text}}</template>

          <a-menu-item v-for="subMenu in menu.child"
          :key="subMenu.path"
          >
            <router-link :to="subMenu.router">{{subMenu.text}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "layout_sidebar",
  data(){
    return {
      sidebar: [
        {
          text:'页面管理',
          router: '/',
          child:[
            {
              text: '轮播管理',
              router: '/catur'
            }
          ]
        },
        {
          text:'航班管理',
          router: '/',
          child:[
            {
              text: '新增城市',
              router: '/addCity'
            },
            {
              text: '城市列表',
              router: '/citys'
            },
            {
              text: '查看航班',
              router: '/flights'
            },
            {
              text: '新增航班',
              router: '/addFlight'
            }
          ]
        },
        {
          text:'活动中心',
          router: '/recommends',
          child:[
              {
                text:'新增推荐',
                router: '/addRecommend',
              },
          ]},
        {
          text:'用户中心',
          router: '/user',
          child:[
            {
              text: '新增管理员',
              router: '/addUser'
            },
            {
              text: '退出登录',
              router: '/logout'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>