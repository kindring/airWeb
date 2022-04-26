<template>
  <div class="w-full bg-gray-50">
    <div class="w-p1200 h-auto mx-auto">

      <loading
          :loading-state="loadingState"
          tip="加载航班信息中"
      >
        <div class="w-full px-1 py-2 border-l">

          <div class=" px-2.5 py-2 border-b">
            <div class="text-3xl text-green-300">航班-{{flightData.flightName}}</div>
            <div class="text-sm text-gray-400">airCode-{{flightData.airCode}}</div>
          </div>
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

            <div class="flex py-2 relative right-1">
              <div class="px-12 h-14 flex items-center bg-blue-300 text-xl"> {{flightData.routeType==1?'国内':'国际'}}航线</div>
              <div class="w-14 h-14 bg-yellow-300 rounded-full relative right-7">
                <div class="w-14 h-14 bg-red-300 rounded-full absolute left-1"/>
                <div class="w-14 h-14 bg-green-300 rounded-full absolute left-2"/>
                <div class="w-14 h-14 bg-blue-300 rounded-full absolute left-3"/>
              </div>
              <br/>
            </div>
<!--          出发时间地点-->
            <a-timeline class="mt-2">
              <a-timeline-item>登机</a-timeline-item>
<!--              出发时间 -->
              <a-timeline-item class=" flex flex-col justify-center">
                <div class="px-2.5 w-2/4 relative top-1 rounded py-1 flex bg-yellow-300 overflow-hidden text-white">
                  <div class="text-black py-0.5 flex items-center text-5xl">
                    <b><svg-icon class="mx-1" icon-class="fly"/></b>
                  </div>
                  <div class="div px-3 flex text-3xl items-center">
                    <b>---</b>
                  </div>
                  <div class="text-black">
                    <div class="py-0.5 text-xl">
                      <b>{{flightData.departureCityName}}</b></div>
                    <div class="py-0.5">{{moment((flightData.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                  </div>

                </div>
              </a-timeline-item>
<!--              飞行 -->
              <a-timeline-item class="py-1 flex flex-col justify-center ">
                <div class="px-2.5 relative top-1 w-2/4 rounded py-1.5 flex justify-around overflow-hidden text-pink-300">
                  <b v-for="item in 7" :key="'fly1-'+item"><svg-icon class="mx-1  text-xl" icon-class="fly2"/></b>
                </div>
                <div class="px-2.5 flex items-center relative top-1 w-2/4 rounded py-1.5 bg-gray-300 overflow-hidden text-white text-xl">
                  <b class="pl-2"><svg-icon class="mx-1 text-4xl" icon-class="flightWait"/></b>飞行时间:{{flightTime}}
                </div>
                <div class="px-2.5 relative top-1 w-2/4 rounded py-1.5 flex justify-around overflow-hidden text-pink-300">
                  <b v-for="item in 7" :key="'fly2-'+item"><svg-icon class="mx-1 text-xl" icon-class="fly2"/></b>
                </div>
              </a-timeline-item>
<!--              到站 -->
              <a-timeline-item class="py-5 flex flex-col justify-center">
                <div class="px-2.5 w-2/4 relative top-1 rounded py-1 flex bg-green-300 overflow-hidden text-white">
                  <div class="text-black py-0.5 flex items-center text-5xl">
                    <b><svg-icon class="mx-1" icon-class="dz"/></b>
                  </div>
                  <div class="div px-3 flex text-3xl items-center">
                    <b>---</b>
                  </div>
                  <div class="text-black">
                    <div class="py-0.5 text-xl">
                      <b>{{flightData.targetCityName}}</b></div>
                    <div class="py-0.5">{{moment((flightData.langdinTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                  </div>

                </div>
              </a-timeline-item>
              <a-timeline-item>结束航班</a-timeline-item>
            </a-timeline>

          <div class="flex py-2 mt-2 items-center">
            <div class="text-xl">票数:</div>
            <progress-bar
                class="ml-1.5 w-1/5 py-0.5 h-10 rounded"
              :total="flightData.totalVotes"
              :item="{
                title: '已售',
                bgColor: 'bg-gray-400',
                value: flightData.pay
              }"
              :bg="{
                title: '剩余',
                  bgColor: 'bg-green-300',
                  value: flightData.totalVotes
              }"
              bg-color="bg-gray-600"/>
          </div>
<!--        其他描述  -->
            <div class="flex py-2 mt-2 items-center">
              <div class="px-1.5 border-r"> <span class="text-red-400 text-2xl">现价:{{flightData.currentPrice}}</span>元</div>
              <div class="px-1.5 "> <span class="text-black">原价:{{flightData.originalPrice}}</span>元</div>
            </div>

            <div class="flex">
              <a-button :disabled="flightData.flightState!=='1'" class="bg-red-600 text-white mx-3" @click="addCar" >加入购物车</a-button>
              <a-button :disabled="flightData.flightState!=='1'" class="bg-red-600 text-white mx-3">直接购买</a-button>
            </div>
        </div>
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
    <flight-ad></flight-ad>
  </div>
</template>

<script>
import moment from "moment";
import AirLink from "@components/public/airLink";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import Loading from "@components/public/loading";
import FlightAd from "@components/index/components/flightAd";
import ProgressBar from "@components/public/progressBar";
import api_user from "@/apis/api_user";
import {mapActions} from "vuex";
import types from "@/store/homeTypes";
export default {
  name: "flightInfo",
  components: {ProgressBar, FlightAd, Loading, AirLink},
  data(){
    return {
      flightId:null,
      flightData:{
        sailingTime:null,
        langdinTime:null
      },
      loadingMessage:'',
      loadingState: 0,
      flightTime: null
    }
  },
  mounted(){
    if(!this.$route.query.flightId){
      this.loadingState = 2;
      this.loadingMessage = '无法找到的航班,请联系客服'
      return this.$message.warn(this.loadingMessage);
    }
    this.flightId = this.$route.query.flightId;
    this.loadInfo();
  },
  methods:{
    moment,
    ...mapActions({
      loadCar: types.user.actions.loadCar,
    }),
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
    async addCar(){
      let [err,response] = await handle(api_user.addCar(this.flightId));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      this.$message.success('添加至购物车成功');
      setTimeout(()=>{
        this.loadCar();
      },700)
    }
  }
}
</script>

<style scoped>

</style>
