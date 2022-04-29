<template>
  <layout_user>
    <div class="w-full flex justify-center py-1 px-2 flex-col items-center">
<!--      选择订单类型 -->
      <div class="w-full">
        <a-radio-group v-model="orderType"   @change="onChangeOrderType">

          <a-radio-button v-for="order in orderTypes" :Key="order.value" :value="order.value">
            {{ order.text }}
          </a-radio-button>
        </a-radio-group>
      </div>

      <div class="w-full h-auto rounded bg-gray-200">
        <div class=" h-auto px-1" v-if="orders.length">
          <!--          购物车-->
          <div
              v-for="item in pageOrders"
              :key="item.id"
              class="w-full flex py-2.5 mt-2 rounded items-center border-b border-gray-400 justify-around" >
            <!--            出发城市-->
            <div class="w-3/12">
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
            <!-- 飞机状态 -->
            <div class="w-1/6 flex justify-center">
              <div v-if="item.flightState === '1'" class="px-2.5 flex items-center ml-3 bg-green-200 py-1" >
                正在售票中
              </div>
              <div v-else-if="item.flightState === '2'" class="px-2.5 flex items-center ml-3 bg-blue-300 py-1" >
                正在检票中
              </div>
              <div v-else-if="item.flightState === '3'" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                飞行中
              </div>
              <div v-else class="px-2.5 flex items-center ml-3 bg-gray-400 py-1" >
                航班已经结束
              </div>
            </div>
<!--            乘机人 -->
            <div class="w-1/6  flex ">
              乘机人数量:{{item.ticketNum}}
            </div>
            <!-- 订单状态 -->
            <div class="w-1/5 flex justify-center">
              <pay-states :pay-state="item.payState"></pay-states>
            </div>
            <div class="w-1/5 flex justify-center">
              <div class="px-1.5 flex items-center ml-3 ">
                <a-button type="dashed mr-1.5">
                  <air-link :type="2" :path="`/#/order?orderId=${item.id}`">订单详情</air-link>
                </a-button>

                <a-button v-if="item.payState === '1'" type="primary" @click="payOrder(item.id)">
                  立即支付
                </a-button>
                <a-button v-else-if="item.payState === '8' || item.payState === '6'|| item.payState === '5' "
                          type="primary">
                  <air-link :type="2" :path="`/#/buy?flightId=${item.flightId}`">重新购买航班</air-link>
                </a-button>
                <a-button v-else
                          type="primary">
                  <air-link :type="2" :path="`/#/search`">搜索航班</air-link>
                </a-button>
              </div>
            </div>
          </div>
          <div class="flex py-2">
            <a-pagination show-quick-jumper v-model="page" :total="orders.length" @change="onChangePage" />
          </div>
        </div>

        <div class="w-full h-96 flex justify-center items-center flex-col" v-else>
          <h1 class="text-3xl text-red-400">暂时没有对应订单</h1>
          <br/>
          <br/>
        </div>
      </div>
    </div>
    <pop  :show="editPopShow" :loading="editLoading">
      <pay-order :order-id="orderId" @ok="okHandle" @cancel="cancelHandle"></pay-order>
    </pop>
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
import PayStates from "@components/index/components/payStates";
import Pop from "@components/public/pop";
import PayOrder from "@components/index/components/payOrder";
export default {
  name: "orders",
  components: {PayOrder, Pop, PayStates, AirLink, layout_user},
  data(){
    return {
      orders:[],
      orderTypes:[
        {value:'all',text:'全部订单'},
        {value:'waitPay',text:'等待支付'},
        {value:'pay',text:'已支付'},
        {value:'end',text:'已完成'},
        {value:'cancel',text:'已取消'},
      ],
      orderType:'all',
      pageLimited: 10,
      page: 0,
      pageSize: 10,
      orderId: null,
      editPopShow:false,
      editLoading: false,
    }
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      // 用户选择的
    }),
    pageOrders(){
      let orders = [];
      console.log(this.page);
      let start = (this.page-1) * this.pageLimited;
      let end = Math.min((start + this.pageLimited),this.orders.length);
      for (let i = start; i < end; i++) {
        orders.push(this.orders[i])
      }
      return orders;
    }
  },
  async mounted() {
    // this.loadCar();
    await this.loadOrders();
  },
  methods: {
    moment,
    async loadOrders(){
      let [err,response] = await handle(api_user.orders(this.orderType));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        return this.$message.error(msg);
      }
      this.orders = res.data;
      this.page = 1;
    },
    async removeCar(id){
      let [err,response] = await handle(api_user.removeCar(id));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      console.log('移除成功')
    },
    // 切换订单类型
    async onChangeOrderType(){
      await this.loadOrders();
    },
    onChangePage(){
      console.log(this.page)
    },
    // 输入密码
    payOrder(orderId){
      this.orderId = orderId;
      this.showPop()
    },
    showPop(){
      this.editPopShow=true;
      this.editLoading = false;
    },
    cancelHandle(){
      this.editLoading = false;
      this.editPopShow= false;
      this.orderId = null;
    },
    // 订单支付成功
    async okHandle(){
      this.editLoading = true;
      await this.loadOrders();
      this.cancelHandle();
    },

  }
}
</script>

<style scoped>

</style>
