<template>
  <div class="w-full flex justify-center">
    <div class="w-p1200">
      <div class="recommend-title">
        <img :src="recommendData.bg" :alt="recommendData.recommendName">
        <span>{{recommendData.recommendName}}</span>
      </div>
      <div class="w-full mt-0.5 border bg-gray-500 px-1 py-2 text-white text-xl cursor-default">
        <p>{{recommendData.discript}}</p>
      </div>
      <div class="mt-1.5">
        <div
            v-for="item in recommendData.flights"
            :key="'f_'+item.flightId"
            class="w-full flex px-1 py-2 mb-2 rounded bg-gray-300">
          <img class="w-48 h-48" :src="item.img" :alt="item.img" >
          <div class="h-full px-2 text-white  ">
            <div class="flex rounded bg-blue-300 h-20  mt-2 items-center text-2xl overflow-hidden">
              <div class="pl-2  pr-12  h-20 flex items-center">出发城市{{item.departureCityName}}</div>
              <div class="pl-2  pr-12  h-20 flex items-center bg-blue-400">
                出发时间{{moment((item.sailingTime-0)*1000).format('YY-MM-DD')}}</div>
            </div>
            <div class="flex rounded bg-green-300 h-20  mt-2 items-center text-2xl overflow-hidden">
              <div class="pl-2  pr-12  h-20 flex items-center">目标城市{{item.departureCityName}}</div>
              <div class="pl-2  pr-12  h-20 flex items-center bg-green-400">
                到站时间{{moment((item.langdinTime-0)*1000).format('YY-MM-DD')}}</div>
            </div>
          </div>
          <div class="h-full px-1 text-red-500 ">
            <div class="h-24 mt-2 flex pl-2 pr-10 flex items-center text-3xl bg-yellow-200">当前价格{{item.currentPrice}}</div>
            <div class="h-12  mt-3 flex pl-2 pr-10 flex items-center text-sm text-gray-600 bg-gray-200">原始价格{{item.currentPrice}}</div>
          </div>
          <div class="h-full px-1 text-white ">
            <div class="flex px-4 mt-8 rounded py-2 bg-blue-300 mt-2 items-center text-2xl">
              <a-button>
                <air-link :path="'/buy?flightId='+item.flightId">
                  立即购买
                </air-link>
              </a-button>
            </div>
            <div class="flex px-4 mt-9 rounded py-2 bg-green-300 mt-4 items-center  text-2xl">
              <a-button>
                <air-link :path="'/info?flightId='+item.flightId">
                查看详情
              </air-link>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import handle from "@/utils/handle";
import api_recommend from "@/apis/api_recommend";
import business from "@/utils/business";
import AirLink from "@components/public/airLink";

export default {
  name: "recommend",
  components: {AirLink},
  data(){return {
    recommendId: null,
    recommendData:{}
  }
  },
  async mounted(){
    if(!this.$route.query.recommendId){
      this.$message.warn('无推荐信息');
      return this.$router.push('/recommends')
    }
    this.recommendId = this.$route.query.recommendId;
    await this.loadRecommendInfo();
  },
  methods:{
    moment,
    async loadRecommendInfo(){
      let [err,response] = await handle(api_recommend.recommendInfo(this.recommendId));
      console.log(response);
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){return this.$message.error(msg)}
      this.recommendData = res.data;
    },
  }
}
</script>

<style scoped lang="scss">
.recommend-title {
  width: 100%;
  height: 136px;
  position: relative;
  line-height: 136px;
  cursor: default;

img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

span {
  position: relative;
  font-size: 6em;
  color: white;
  margin-left: 0.5em;
}

}
</style>