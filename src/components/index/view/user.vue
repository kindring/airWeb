<template>
  <layout_user>
  <div class="w-full flex justify-center py-1 px-2">
    <div class="w-full h-auto rounded bg-gray-200">
      <div class="flex py-1">
        <div class="py-3 px-4 flex ">
          {{nickName}}的个人中心
        </div>
      </div>
      <div class="flex py-2.5 bg-blue-300 my-2 mt-1">
        <air-link class="py-3 px-4 flex border-r justify-between items-center hover:bg-blue-400 hover:text-white" path="/cars">
          我的购物车
          <span class="mx-2 text-xl text-red-700 my-2">{{cars.length}}</span>
        </air-link>
        <air-link class="py-3 px-4 flex justify-between items-center hover:bg-blue-400 hover:text-white" path="/orders">
          我的机票
          <span class="mx-2 text-xl text-red-700 my-2">{{orders.length}}</span>
        </air-link>
      </div>
      <div class="py-1.5">
        <div class="flex">
          <span class="mx-2">我的手机号:</span>
          <span>{{phone}}</span>
          <a-button type="" @click="showPop">修改绑定手机号</a-button>
        </div>
      </div>
    </div>
  </div>
    <pop :show="editPopShow" :loading="editLoading">
      <change-phone @ok="okHandle" @cancel="cancelHandle"></change-phone>
    </pop>
  </layout_user>
</template>

<script>
import layout_user from "@components/index/components/layout_user";
import pop from "@components/public/pop";
import {mapActions, mapMutations, mapState} from "vuex";
import types from "@/store/homeTypes";
import AirLink from "@components/public/airLink";
import ChangePhone from "@components/index/components/changePhone";
export default {
  name: "user",
  components: {ChangePhone, AirLink, layout_user,pop},
  data(){
    return {
      editPopShow: false,
      editLoading: true,
    }
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      phone:state=>state.user[types.user.state.phone],
      cars: state=>state.user[types.user.state.cars],
      orders: state=>state.user[types.user.state.orders]
      // 用户选择的
    }),
  },
  methods:{
    ...mapActions({
      loadUser: types.user.actions.loadUser,
    }),
    showPop(){
      this.editPopShow=true;
      this.editLoading = false;
    },
    cancelHandle(){
      this.editLoading = false;
      this.editPopShow= false;
    },
    async okHandle(){
      this.editLoading = true;
      await this.loadUser();
      this.cancelHandle();
    }
  }
}
</script>

<style scoped>

</style>
