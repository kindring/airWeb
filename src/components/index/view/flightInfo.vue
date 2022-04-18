<template>
  <div class="w-full bg-gray-300">
    <div class="w-p1200 h-auto mx-auto">

      <loading
          :loading-state="loadingState"
          tip="加载航班信息中"
      >
        <div class="w-full px-1 py-2">
            <div class="flex px-2.5 py-2">
              航线名:{{flightData.flightName}}
              <br/>
              <br/>
              机票代号{{flightData.airCode}}
              <br/>
              <br/>
              {{flightData.routeType==1?'国内':'国际'}}航线
              <br/>
            </div>
            <div class="py-2.5 m-2 flex items-center">
              <div class="px-2.5">{{flightData.departureCityName}}</div>
              <svg-icon class="mx-1" icon-class="fly"/>
              <div class="px-2.5">{{flightData.targetCityName}}</div>
            </div>
            <div class="flex py-2 mt-2">
                <div class="px-2.5">启航:{{moment((flightData.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                <div class="px-2.5">到站:{{moment((flightData.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
            </div>
            <div class="flex py-2 mt-2 items-center">
              <div class="px-1.5 border-r"> <span class="text-red-400 text-2xl">现价:{{flightData.currentPrice}}</span>元</div>
              <div class="px-1.5 "> <span class="text-black">原价:{{flightData.originalPrice}}</span>元</div>
            </div>
            <div class="flex py-2 mt-2">
              <div class="ml-2">票数:</div>
              <span class="px-1.5 "> {{flightData.pay}}</span>/
              <span class="px-1.5 "> {{flightData.totalVotes}}</span>
            </div>
            <div class="flex">
              <a-button class="bg-red-600 text-white mx-3">加入购物车</a-button>
              <a-button class="bg-red-600 text-white mx-3">直接购买</a-button>
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

  </div>
</template>

<script>
import moment from "moment";
import AirLink from "@components/public/airLink";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import Loading from "@components/public/loading";
export default {
  name: "flightInfo",
  components: {Loading, AirLink},
  data(){
    return {
      flightId:null,
      flightData:{},
      loadingMessage:'',
      loadingState: 0,
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
    }
  }
}
</script>

<style scoped>

</style>