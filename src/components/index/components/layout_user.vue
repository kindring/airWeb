<template>
  <div class="w-full flex">
    <div class="w-48 h-screen fixed flex flex-col left-0 top-0">
      <div class="h-36"/>
      <div class="h-full bg-gray-400 mt-5">
        <div class="flex w-full px-2 mt-2 py-3 bg-gray-300 ">欢迎回来{{nickName}}</div>
        <air-link class="flex w-full px-2 py-3 bg-gray-300 hover:bg-gray-100 hover:text-red-700" path="/user">用户中心</air-link>
        <air-link class="flex w-full px-2 py-3 bg-gray-300 hover:bg-gray-100 hover:text-red-700" path="/cars">我的购物车</air-link>
        <air-link class="flex w-full px-2 py-3 bg-gray-300 hover:bg-gray-100 hover:text-red-700" path="/orders">我的订单</air-link>
      </div>
    </div>
    <div class="w-48 flex-shrink-0"/>
    <div class="w-full h-auto ">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AirLink from "@components/public/airLink";
import {mapGetters, mapState} from "vuex";
import types from "@/store/homeTypes";
import business from "@/utils/business";
export default {
  name: "layout_user",
  components: {AirLink},
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      // 用户选择的
    }),
  },
  mounted(){
    setTimeout(()=>{
      if(!this.isLogin){
        this.$message.warn('未登录请先登录.')
        return setTimeout(()=>{
          business.toLogin('/login');
        },500)
      }
    },1300)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
