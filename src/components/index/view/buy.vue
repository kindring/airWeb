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
  </div>
</template>

<script>
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import moment from "moment";

export default {
  name: "buy",
  data(){return {
    loadingMessage:'',
    loadingState: 0,
    flightId:null,
    flightData:{
      sailingTime:null,
      langdinTime:null
    },
  }},
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
  }
}
</script>

<style scoped>

</style>
