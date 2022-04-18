<template>
  <div class="py-2 w-full h-auto">
    <div class="w-full px-2 flex flex-row items-center flex-col">
      <div class="w-11/12  py-1.5  bg-purple-200  rounded">
        <round-title >售卖中</round-title>
        <div class="w-full">
<!--          售卖中-->
          <div
              v-for="item in sellFlights"
              :key="item.id"
              class="w-full flex py-1 items-center border-b border-gray-400 justify-around" >
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
              <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">出发时间:{{moment((item.sailingTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
              <span class="mx-1.5">---</span>
              <div class="px-1.5 py-0.5 rounded bg-green-200 flex">到站时间:{{moment((item.langdinTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
            </div>
</div>
              <!-- 正在售票中-->
            <div class="w-1/5 flex justify-center">
            <div class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
              正在售票中
            </div>
</div>
            <div class="w-1/6 flex justify-center">
            <div class="px-1.5 flex items-center ml-3 ">
              <a-button type="primary">
                <air-link :type="2" :path="`#/flight?id=${item.id}`">立即购票</air-link>
              </a-button>
            </div>
              </div>
          </div>
        </div>
        <div class="px-4 mt-1">
          <div class="w-full bg-blue-300  rounded flex py-1 justify-around items-center">
            <div class="px-2">------------购票就上AIR-------------</div>
            <a-button type="primary">
              <air-link :type="2" :path="`#/search`">更多机票</air-link>
            </a-button>

            <div class="px-2">------------购票就上AIR-------------</div>
          </div>
        </div>
      </div>
      <div class="w-11/12 mt-5 py-1.5  bg-green-100  rounded">
        <round-title>正在检票中</round-title>
        <div class="w-full">
          <!--          售卖中-->
          <div
              v-for="item in wicketFlights"
              :key="item.id"
              class="w-full flex py-1 items-center border-b border-gray-400 justify-around" >
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
              <div class="px-1.5 py-0.5  flex items-center ml-3 bg-red-200 rounded">
                <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">出发时间:{{moment((item.sailingTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
                <span class="mx-1.5">---</span>
                <div class="px-1.5 py-0.5 rounded bg-green-200 flex">到站时间:{{moment((item.langdinTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
            <!-- 正在售票中-->
            <div class="w-1/5 flex justify-center">
              <div class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                正在检票中
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 mt-1">
          <div class="w-full bg-pink-100  rounded flex py-1 justify-around items-center">
            <a-button type="primary">
              <air-link :type="2" :path="`#/wicket`">更多检票信息</air-link>
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api_flight from "@/apis/api_flight";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import RoundTitle from "@components/public/roundTitle";
import AirLink from "@components/public/airLink";
export default {
  name: "newsTab",
  components: {AirLink, RoundTitle},
  data(){
    return {
      // 正在售票的航班
      sellFlights:[],
      // 正在值机检票的航班
      wicketFlights:[],
    }
  },
  mounted(){
    this.loadNews();
  },
  methods:{
    moment,
    async loadNews(){
      let [err,response] = await handle(api_flights.news());
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        return this.$message.error('无法获取航班动态');
      }
      this.sellFlights = res.data.sellFlights;
      this.wicketFlights = res.data.wicketFlights;
      this.$message.success('航班动态加载完成');
      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>
