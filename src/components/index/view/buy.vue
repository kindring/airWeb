<template>
  <div class="w-full bg-gray-50">
    <div class="w-p1200 h-auto mx-auto">
      <loading
          :loading-state="loadingState"
          tip="创建订单详情中"
      >
<!--        订单主内容 -->
        <div class="w-full px-1 py-2 border-l">
          <a-steps class="pt-4 pb-1"  :current="0" size="default" >
            <a-step title="创建订单" description="确认是否进行购买操作"/>
            <a-step title="支付订单" description="等待用户支付订单"/>
            <a-step title="等待飞行" description="等待航班飞行"/>
            <a-step title="完成" description="航班结束,不可进行操作"/>
          </a-steps>
          <div class="py-2 flex">
            航班号:{{flightData.flightName}}
          </div>
          <div class="py-2 flex">
            飞机代号:{{flightData.airCode}}
          </div>
          <div class="py-2 flex">
            乘车人:
            <div class="w-64 ml-2">
              <a-select
                  mode="multiple"
                  placeholder="选择乘车人"
                  :value="selectedTravels"
                  style="width: 100%"
                  @change="handleTravelChange"
              >
                <a-select-option v-for="item in travelOptions" :key="'travel-'+item.value" :value="item.value">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </div>
            <a-button class="mx-2" @click="showTravelPop">新增乘车人</a-button>
          </div>
          <!--          出发时间地点-->
          <a-timeline class="mt-2">
            <!--              出发时间 -->
            <a-timeline-item class=" flex flex-col justify-center">
              <div class="px-1.5 w-2/4 relative top-1 rounded py-1 flex bg-yellow-300 overflow-hidden text-white">
                <div class="text-black py-0.5 flex items-center text-5xl">
                  <b><svg-icon class="mx-1" icon-class="fly"/></b>
                </div>
                <div class="text-black">
                  <div class="py-0.5 text-xl">
                    <b>{{flightData.departureCityName}}</b></div>
                  <div class="py-0.5">{{moment((flightData.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                </div>

              </div>
            </a-timeline-item>
            <!--              到站 -->
            <a-timeline-item class="py-5 flex flex-col justify-center">
              <div class="px-2.5 w-2/4 relative top-1 rounded py-1 flex bg-green-300 overflow-hidden text-white">
                <div class="text-black py-0.5 flex items-center text-5xl">
                  <b><svg-icon class="mx-1" icon-class="dz"/></b>
                </div>
                <div class="text-black">
                  <div class="py-0.5 text-xl">
                    <b>{{flightData.targetCityName}}</b></div>
                  <div class="py-0.5">{{moment((flightData.langdinTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                </div>

              </div>
            </a-timeline-item>
          </a-timeline>
          <div class="flex py-2 mt-2 items-center">
            航班状态:
            <div v-if="flightData.flightState === '1'" class="px-2.5 flex items-center ml-3 bg-green-200 py-1" >
              正在售票中
            </div>
            <div v-else-if="flightData.flightState === '2'" class="px-2.5 flex items-center ml-3 bg-blue-300 py-1" >
              正在检票中
            </div>
            <div v-else-if="flightData.flightState === '3'" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
              飞行中
            </div>
            <div v-else class="px-2.5 flex items-center ml-3 bg-gray-400 py-1" >
              航班已经结束
            </div>
          </div>

          <div class="flex py-2 items-center">
            预计价格: <span class="text-red-700 text-3xl mx-3">{{price}}</span> 元
          </div>
          <div class="flex py-2.5 border-t">
            <a-button-group>
              <a-button>取消</a-button>
              <a-button @click="createOrder">提交订单</a-button>
            </a-button-group>
          </div>
        </div>
<!--        加载失败展示框-->
        <template v-slot:loadFail>
          <div class="w-full h-96 flex justify-center items-center">
            <h2 class="text-2xl text-red-700">加载航班信息失败:{{loadingMessage}}</h2>
            <a-button type="primary">
              <air-link path="/" type="2">回到首页</air-link>
            </a-button>
          </div>
        </template>
      </loading>
    </div>
    <pop :show="editTravelShow" :loading="editTravelLoading">
      <add-travel
          @ok="okTravelHandle" @cancel="cancelTravelHandle"
      >

      </add-travel>
    </pop>
  </div>
</template>

<script>
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import moment from "moment";
import {mapState} from "vuex";
import types from "@/store/homeTypes";
import api_user from "@/apis/api_user";
import pop from '@/components/public/pop'
import AddTravel from "@components/index/components/addTravel";
import Loading from "@components/public/loading";

export default {
  name: "buy",
  components: {Loading, AddTravel,pop},
  data(){return {
    loadingMessage:'',
    loadingState: 0,
    flightId:null,
    editTravelShow: false,
    editTravelLoading: true,
    flightData:{
      sailingTime:null,
      langdinTime:null
    },
    price: 0,
    travels: [],
    selectedTravels:[],
    travelOptions: []
  }},
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      phone:state=>state.user[types.user.state.phone],
      // 用户选择的
    }),
  },
  mounted(){
    if(!this.$route.query.flightId){
      this.loadingState = 2;
      this.loadingMessage = '无法找到的航班,请联系客服'
      return this.$message.warn(this.loadingMessage);
    }
    this.flightId = this.$route.query.flightId;
    this.loadInfo();
    this.loadTravel()
  },
  methods:{
    moment,
    async loadTravel(){
      let [err,response] = await handle(api_user.travels());
      let {ok,msg,res,type} = business.checkResponseRcode(response,err);
      if(!ok){
        return this.$message[type](msg)
      }
      this.travels = res.data;
      if(this.travels.length<1){return this.$message.error('请在个人中心,先添加乘车人!!!')}
      this.travelOptions = res.data.map(val=>{
        return {
          value: val.id,
          text: val.name
        }
      })
    },
    async loadInfo(){
      if(!this.flightId){
        return this.$message.error('请输入航班id');
      }
      this.loadingState = 0;
      let [err,response] = await handle(api_flights.flightInfo(this.flightId));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
        return this.$message.error('航班加载失败');
      }
      this.loadingState = 1;
      this.$message.success('航班加载完成');
      this.flightData = res.data;
      let sailingTime = moment((res.data.sailingTime-0)*1000);
      let langdinTime = moment((res.data.langdinTime-0)*1000);
      let flightTime = langdinTime.diff(sailingTime)
      flightTime=flightTime / 1000
      console.log(flightTime)
      let day = Math.floor(flightTime/(24*60*60)),
          h = Math.floor((flightTime-(day*24*60*60))/(60*60)),
          m = Math.floor((flightTime-(day*24*60*60)-(h*60*60))/60),
          s = flightTime-(day*24*60*60)-(h*60*60)-(m*60);
      console.log(`day: ${day} h:${h} m:${m} s:${s}`)
      this.flightTime = `${day?day+'天-':''}${h}小时-${m}分-${s}秒`

    },
    handleTravelChange(selectedItems){
      console.log(selectedItems);
      this.selectedTravels = selectedItems;
      this.price = Number(this.flightData.currentPrice) * this.selectedTravels.length;
    },
    showTravelPop(){
      this.editTravelShow=true;
      this.editTravelLoading = false;
    },
    cancelTravelHandle(){
      this.editTravelLoading = false;
      this.editTravelShow= false;
    },
    async okTravelHandle(){
      this.editTravelLoading = true;
      await this.loadTravel();
      this.cancelTravelHandle();
    },
    // 创建订单
    async createOrder(){
      let travels = this.selectedTravels;
      if(travels.length < 1){return this.$message.error('请选择乘机人')}

    }
  }
}
</script>

<style scoped>

</style>
