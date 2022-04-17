<template>
  <div class="py-2 w-full h-auto">
    <div class="w-full px-2 flex flex-row items-center flex-col">
      <div class="w-11/12  py-1.5  bg-purple-200  rounded">
        <round-title>售卖中</round-title>
        <div class="w-full">

        </div>
      </div>
      <div class="w-11/12 mt-5 py-1.5  bg-green-100  rounded">
        <round-title>正在检票</round-title>
      </div>
    </div>
  </div>
</template>

<script>
import api_flight from "@/apis/api_flight";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import RoundTitle from "@components/public/roundTitle";
export default {
  name: "newsTab",
  components: {RoundTitle},
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