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
      <div class="py-1.5 mx-1 w-2/4 px-0.5 my-2 rounded border border-white shadow">
        <div class="py-1 text-xl border-b border-red-300 ">我的乘车人</div>
        <div class="py-1">
          <div
              v-for="item in travels"
              :key="item.id"
              class="flex border-b py-2 items-center">
            <div class="w-24 px-2">
              {{item.name}}
            </div>
            <div class="w-36 px-2">
              {{item.card}}
            </div>
            <div class="w-24 px-2">
              {{item.phone}}
            </div>
            <div class="w-24 px-2">
              <a-button @click="editTravel(item)">修改乘车人</a-button>
            </div>
          </div>
        </div>
        <div class="py-1 flex justify-center">
          <a-button class="w-9/12" @click="addTravel">新增乘车人</a-button>
        </div>
      </div>
    </div>
  </div>
    <pop :show="editPopShow" :loading="editLoading">
      <change-phone @ok="okHandle" @cancel="cancelHandle"></change-phone>
    </pop>
    <pop :show="editTravelShow" :loading="editTravelLoading">
      <add-travel
      :travel-id="travelId"
      :name="travelName"
      :card="travelCard"
      :phone="travelPhone"
      @ok="okTravelHandle" @cancel="cancelTravelHandle"
      >

      </add-travel>
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
import handle from "@/utils/handle";
import api_user from "@/apis/api_user";
import business from "@/utils/business";
import AddTravel from "@components/index/components/addTravel";
export default {
  name: "user",
  components: {AddTravel, ChangePhone, AirLink, layout_user,pop},
  data(){
    return {
      editPopShow: false,
      editLoading: true,
      editTravelShow: false,
      editTravelLoading: true,
      travelId: '',
      travelName: '',
      travelCard: '',
      travelPhone: '',
      travels:[],
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
  mounted(){
    this.loadTravel();
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
    },
    // 加载乘客
    async loadTravel(){
      let [err,response] = await handle(api_user.travels());
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        return this.$message.error(msg);
      }
      this.travels = res.data;
    },
    showTravelPop(){
      this.editTravelShow=true;
      this.editTravelLoading = false;
    },
    addTravel(){
      this.travelId = '';
      this.travelName = ''
      this.travelCard = ''
      this.travelPhone = ''
      this.showTravelPop()
    },
    editTravel(travel){
      this.travelId = travel.id;
      this.travelName = travel.name;
      this.travelCard = travel.card;
      this.travelPhone = travel.phone;
      this.showTravelPop()
    },
    cancelTravelHandle(){
      this.editTravelLoading = false;
      this.editTravelShow= false;
    },
    async okTravelHandle(){
      this.editTravelLoading = true;
      await this.loadTravel();
      this.cancelTravelHandle();
    }
  }
}
</script>

<style scoped>

</style>
