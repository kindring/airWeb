<template>
  <layout_user>
    <loading
        :loading-state="loadingState"
        tip="加载订单数据中">
      <div class="w-full flex justify-center py-1 px-2 cursor-default">
        <div class="w-full h-auto rounded bg-gray-200">
          <div class="flex items-center py-2 px-2 border-b border-pink-300">
            <a-button class="px-2 mr-3" >
              <air-link path="orders" >订单列表</air-link>
            </a-button>
            <div class="px-2">订单编号{{orderId}}</div>
          </div>
          <div class="flex items-center py-2 px-4">
            订单状态
            <pay-states :pay-state="orderData.payState" :create-time="orderData.createTime"></pay-states>
          </div>

          <div class="flex items-center py-2 px-4">
            出发城市:<span class="ml-3">{{ orderData.departureCityName }}</span>
          </div>
          <div class="flex items-center py-2 px-4">
            目的地: <span class="ml-3">{{ orderData.targetCityName }}</span>
          </div>
          <div class="flex items-center py-2 px-4">
            起飞时间:
            <span class="ml-2">{{ moment((orderData.sailingTime - 0) * 1000).format('YY-MM-DD hh:mm:ss') }}</span>
          </div>
          <div class="flex items-center py-2 px-4">
            落地时间:
            <span class="ml-2">{{ moment((orderData.langdinTime - 0) * 1000).format('YY-MM-DD hh:mm:ss') }}</span>
          </div>
          <div class="flex items-center py-2 px-4">
            航班信息:
            <span class="ml-2">{{ orderData.flightName }} - {{orderData.airCode}}</span>
          </div>

          <div class="flex py-2 px-4 ">
            乘客信息:
<!--            等待支付状态 -->
            <div class="ml-2 flex flex-col border border-blue-300" v-if="orderData.payState == field.payState_create||orderData.ticks">
              <div class="flex py-2 px-2 w-48 border-b border-white cursor-default"
                   v-for="travel in orderData.travels"
                   :key="'travel'+travel.id"
              >{{ travel.name }}</div>
            </div>
<!--            已经退款的状态 -->

<!--            其他状态 -->
            <div class="ml-2 flex w-5/12 p-2  flex-col border border-blue-100 bg-white" v-else>
              <div
                   v-for="tick in orderData.ticks"
                   :key="'travel'+tick.id"
                   :class="`flex py-2 px-2 border-b border-white cursor-default
                        ${tick.tickState == field.tickState_create?'bg-gray-300':''}
                        ${tick.tickState == field.tickState_seat?'bg-blue-300':''}
                        ${tick.tickState == field.tickState_refund?'bg-yellow-400':''}
                   `"
              >
                <div class="px-1 w-32">{{ tick.name }}</div>
<!--              座位信息 -->
                <div class="border-l px-3">
                  <div class="px-1" v-if="tick.tickState == field.tickState_create">等待选择座位,值机</div>
                  <div class="px-1" v-else>
<!--                    已经值机,或者是-->
                    <span class="mx-1">{{ tick.row }}</span>
                    <span class="text-xl">排</span>
                    <span class="mx-1">{{ tick.col }}</span>
                    <span class="text-xl">坐</span>
                  </div>
                </div>
<!--                机票状态-->
                <div class="border-l px-3">
                  <tick-state :tick-state="tick.tickState"></tick-state>
                </div>
                <div class="border-l px-3 ">
                  <a-button class="mx-2" type="primary" :disabled="tick.tickState != field.tickState_create">立即选坐</a-button>
                  <a-button class="mx-2" type="danger" :disabled="tick.tickState != field.tickState_create">退票</a-button>
                </div>
              </div>
            </div>

          </div>

<!--          订单价格 -->
          <div class="flex items-center py-2 px-2 ">
            <span class="text-xl">{{orderData.payState  == field.payState_create?'订单价格':'购买时价格' }}</span>
            <div class="flex items-center ml-5">
              <div class="">
                <div>机票单价</div>
                <span class="text-red-500 text-xl">{{orderData.payState  == field.payState_create?currentPrice:orderData.unitPrice }}</span>
                  <span class="mx-2">*</span>
                <span class="text-xl">{{orderData.ticketNum}}</span>
              </div>
              <span class="text-3xl mx-3">/</span>
              <div class="">
                <div class="div">总价</div>
                <span class="text-red-500 text-2xl">{{orderData.payState  == field.payState_create?(currentPrice*travelNum):orderData.payPrice }}</span>
              </div>
            </div>
          </div>

<!--            操作栏 -->
          <div class="flex items-center py-2 px-2 bg-blue-300 border-t border-pink-300">

            <a-button @click="showPop" v-if="orderData.payState == field.payState_create">支付订单</a-button>
            <div class="flex"  v-if="orderData.payState == field.payState_pay || orderData.payState == field.payState_rebates ">
              <a-button type="primary">立即选坐</a-button>
              <a-button class="ml-2" type="danger">退票</a-button>
            </div>

          </div>
        </div>
      </div>


      <template v-slot:loadFail>
        <div class="w-full h-96 flex justify-center items-center flex-col">
          <h2 class="text-2xl text-red-700">加载航班订单失败:{{loadingMessage}}</h2>
          <a-button type="primary">
            <air-link path="/orders" >订单列表</air-link>
          </a-button>

        </div>
        <div class="h-96"></div>
      </template>
    </loading>
    <pop  :show="editPopShow" :loading="editLoading">
      <pay-order :buy-num="travelNum" :flight-price="currentPrice" :order-id="orderId" @ok="okHandle" @cancel="cancelHandle"></pay-order>
    </pop>

  </layout_user>
</template>

<script>
import moment from "moment";
import layout_user from "@components/index/components/layout_user";
import Loading from "@components/public/loading";
import airLink from "@components/public/airLink";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import api_user from "@/apis/api_user";
import Pop from "@components/public/pop";
import PayOrder from "@components/index/components/payOrder";
import PayStates from "@components/index/components/payStates";
import code from "@/mapField/rcodeMap";
import field from "@/mapField/field";
import TickState from "@components/index/components/tickState";
export default {
  name: "order",
  components: {TickState, PayStates, PayOrder, Pop, airLink, Loading, layout_user},
  data(){
    return {
      field,
      orderId:null,
      loadingState: 0,
      loadingMessage: '',
      orderData:{},
      editPopShow:false,
      editLoading: false,
      travelNum:null,
      currentPrice:null
    }
  },
  mounted(){
    if(!this.$route.query.orderId){
      this.loadingState = 2;
      this.loadingMessage = '无法找到的对订单'
      return this.$message.warn(this.loadingMessage);
    }
    this.orderId = this.$route.query.orderId;
    this.loadOrderInfo();
  },
  methods:{
    moment,
    async loadOrderInfo(){
      let [err,response] = await handle(api_user.orderInfo(this.orderId));
      let {ok,msg,res} = business.checkResponseRcode(response,err,{[code.notLogin]:console.log});
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
        return this.$message.error('订单加载失败');
      }
      this.loadingState = 1;
      this.orderData = res.data;
      this.travelNum = parseInt(res.data.ticketNum)
      this.currentPrice = parseFloat(res.data.currentPrice)
    },
    // 输入密码
    payOrder(){
      this.showPop()
    },
    showPop(){
      this.editPopShow=true;
      this.editLoading = false;
    },
    cancelHandle(){
      this.editLoading = false;
      this.editPopShow= false;
      // this.orderId = null;
    },
    // 订单支付成功
    async okHandle(){
      this.editLoading = true;
      // await this.loadOrders();
      this.cancelHandle();
    },
  }
}
</script>

<style scoped>

</style>
