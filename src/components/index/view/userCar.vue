<template>
  <layout_user>
    <div class="w-full flex justify-center py-1 px-2">
      <div class="w-full h-auto rounded bg-gray-200">
        <div class=" h-auto" v-if="cars.length">
          <!--          购物车-->
          <div
              v-for="item in cars"
              :key="item.id"
              class="w-full flex py-2.5 mt-2 rounded items-center border-b border-gray-400 justify-around" >
            <!--            出发城市-->
            <div class="w-1/5">
              <div class="px-1.5 flex items-center">
                <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">{{item.departureCityName}}</div>
                <svg-icon class="mx-1.5 text-xl text-green-600" icon-class="fly"></svg-icon>
                <div class="px-1.5 py-0.5 rounded bg-green-200 flex">{{item.targetCityName}}</div>
              </div>
            </div>

            <!-- 到站时间-->
            <div class="w-2/4 flex justify-center">
              <div class="px-1.5 py-0.5  flex items-center ml-3 bg-yellow-200 rounded">
                <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">{{moment((item.sailingTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
                <span class="mx-1.5">---</span>
                <div class="px-1.5 py-0.5 rounded bg-green-200 flex">{{moment((item.langdinTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
            <!-- 售票状态-->
            <div class="w-1/5 flex justify-center">
              <div v-if="item.flightState === 1" class="px-2.5 flex items-center ml-3 bg-green-200 py-1" >
                正在售票中
              </div>
              <div v-else-if="item.flightState === 2" class="px-2.5 flex items-center ml-3 bg-blue-300 py-1" >
                正在检票中
              </div>
              <div v-else-if="item.flightState === 3" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                飞行中
              </div>
              <div v-else class="px-2.5 flex items-center ml-3 bg-gray-400 py-1" >
                航班已经结束
              </div>
            </div>
            <div class="w-1/6 flex justify-center">
              <div class="px-1.5 flex items-center ml-3 ">

                <a-button v-if="item.flightState === 1" type="primary">
                  <air-link :type="2" :path="`/#/buy?flightId=${item.flightId}`">立即购买</air-link>
                </a-button>
                <a-button v-else type="danger" @click="removeCar(item.id)">
                  移出购物车
                </a-button>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full h-96 flex justify-center items-center flex-col" v-else>
          <h1 class="text-3xl text-red-400">购物车中暂时没有航班</h1>
          <br/>
          <br/>
          <air-link class="text-2xl text-blue-400" :type="2" path="/#/search">搜寻航班</air-link>
        </div>
      </div>
    </div>
  </layout_user>
</template>

<script>
import layout_user from "@components/index/components/layout_user";
import moment from "moment";
import {mapActions, mapGetters, mapState} from "vuex";
import types from "@/store/homeTypes";
import handle from "@/utils/handle";
import api_user from "@/apis/api_user";
import business from "@/utils/business";
import AirLink from "@components/public/airLink";
export default {
  name: "userCar",
  components: {AirLink, layout_user},
  data(){
    return {}
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      cars:state=>state.user[types.user.state.cars],
      // 用户选择的
    }),
  },
  async mounted() {
    // this.loadCar();
  },
  methods: {
    moment,
    ...mapActions({
      loadCar: types.user.actions.loadCar,
    }),
    async removeCar(id){
      let [err,response] = await handle(api_user.removeCar(id));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      console.log('移除成功')
    },
    // 移除指定购物车
    removeCarHandle(id){
      let _this = this;
      this.$confirm({
        title: '确定将购物车从航班中移除吗?',
        content: h => <div style="color:red;">确定将购物车从航班中移除吗?</div>,
        onOk() {
          console.log('OK');
          // 确定移除
          _this.removeCar(id)
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    }
  }
}
</script>

<style scoped>

</style>
