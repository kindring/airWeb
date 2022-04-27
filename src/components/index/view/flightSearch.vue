<template>
  <div class="w-full bg-gray-300">
<!--    航班列表 -->
    <div class="w-full h-14 flex items-center justify-center bg-white">
        <div class="w-p1200 flex h-full items-center">

          <div class="flex shadow bg-pink-200 rounded py-1 px-2">
            <table-select class="w-48" :options="routeTypeOptions" v-model="routeType" @change="routerChange"/>
          </div>
<!--          起始城市-->
          <div class="px-2 w-2/4 flex items-center"><!--     出发城市-->

            <div class=" px-2 py-1 shadow bg-green-200 rounded">
              <div class="w-48">
                <table-select
                    class="w-full"
                    :options="departureOptions"
                    v-model="departureCity"
                    :disableds="departureDisabled"
                    placeholder="出发城市"
                    @change="changeDisables"
                    keystr="departureCity">
                </table-select>
              </div>

            </div>
            <div v-if="(routeType==='d-d'||routeType==='i-i')"
            @click="switchCity">
              <svg-icon
                         class="text-3xl  px-1 hover:text-red-300"
                         icon-class="switch" />
            </div>
            <svg-icon
                        v-if="!(routeType==='d-d'||routeType==='i-i')"
                       class="text-3xl  p-1 hover:text-red-300"
                       icon-class="fly" />
            <!--      目标城市-->
            <div class=" px-2 py-1 shadow bg-yellow-200 rounded">
              <div class="w-48">
                <table-select
                    class="w-full"
                    :options="targetOptions"
                    :disableds="targetDisabled"
                    v-model="targetCity"
                    placeholder="目标城市"
                    @change="()=>{changeDisables()}"
                    keystr="targetCity">
                </table-select>
              </div>
            </div>
          </div>

          <div class="px-2 ">
            <a-range-picker
                :disabled-date="disabledDate"
                v-model="startTimes"
                format="YYYY-MM-DD"
                @change="timeHandle"
            />
          </div>

          <div class="px-2 flex">
            <a-button class="px-2.5 mx-1" type="primary" @click="search">搜索</a-button>
            <a-button class="px-2.5 ml-2" type="primary" @click="loadFlightList">全部</a-button>
          </div>
        </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-p1200  mt-2">

        <loading
            :loading-state="loadingState"
            tip="搜索航班中"
        >
        <div class="bg-pink-100 w-full px-2 py-1">
          <div class="w-full h-96 flex justify-center items-center bg-blue-300" v-if="results.length<1">
            <h1 class="text-white">无法找到对应航班</h1>
          </div>
          <div class="w-full h-auto flex justify-center flex-col" v-else>
            <div
                v-for="flight in results"
                :key="flight.id"
                :class="`w-full py-1.5 my-2 flex rounded ${flight.routeType==1?'bg-pink-300':'bg-green-200'}`">
              <div class="w-1/5 flex items-center">
                <div class="px-2.5">{{flight.departureCityName}}</div>
                <svg-icon class="mx-1" icon-class="fly"/>
                <div class="px-2.5">{{flight.targetCityName}}</div>
              </div>
              <div class="w-2/5 flex items-center">
                <div class="px-2.5">启航:{{moment((flight.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
                <div class="px-2.5">到站:{{moment((flight.sailingTime-0)*1000).format('YY-MM-DD hh:mm:ss')}}</div>
              </div>
              <div class="w-1/5 flex items-center">
                <div class="px-1.5 "> <span class="text-red-400 text-2xl">现价:{{flight.currentPrice}}</span>元</div>/
                <div class="px-1.5 "> <span class="text-gray-300">原价:{{flight.originalPrice}}</span>元</div>
              </div>
              <div class="w-1/5 flex justify-center items-center">
                <a-button type="success">
                  <air-link :type="2" :path="`#/info?flightId=${flight.id}`">购票</air-link>
                </a-button>
              </div>
            </div>
          </div>
        </div>

        <template v-slot:loadFail>
          <div class="w-full h-96 flex justify-center items-center">
            <h2 class="text-2xl text-red-700">{{loadingMessage}}</h2>
            <a-button type="primary" @click="reSearch">重新加载</a-button>
          </div>
        </template>
        </loading>
      </div>
    </div>
<!--    广告-->
    <flight-ad/>
  </div>
</template>

<script>
import FlightAd from "@components/index/components/flightAd";
import TableSelect from "@components/admin/components/tableSelect";
import types from "@/store/homeTypes";
import fields from "@/mapField/field";
import moment from "moment";
import {mapActions,mapState} from "vuex";
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import business from "@/utils/business";
import Loading from "@components/public/loading";
import AirLink from "@components/public/airLink";
export default {
  name: "flightSearch",
  components: {AirLink, Loading, TableSelect, FlightAd},
  data(){
    return {
      routeTypeOptions:[
        {text:'国内飞国内',value:'d-d'},
        {text:'国际飞国际',value:'i-i'},
        {text:'国内飞国外',value:'d-i'},
        {text:'国外飞国内',value:'i-d'}
      ],
      departureOptions: [],
      departureDisabled: [],
      targetOptions: [],
      targetDisabled: [],

      // 国内外城市选项
      domesticCityOptions : [],
      internationalCityOptions : [],
      startTimes:[],
      offsetDays: 86400000 * 7,
      nowRouteType: null,
      loadingState: 0,//设置为加载成功
      loadingMessage: '',
      results: [],
    };
  },
  computed:{
    // 城市列表
    ...mapState({
      domestics: state => state.citys[types.citys.state.domestic],
      internationals: state => state.citys[types.citys.state.international],
      //开始时间
      startTime: state => state.user[types.user.state.startTime],
      // 结束时间
      endTime: state => state.user[types.user.state.endTime],
    }),
    routeType:{
      get() {
        console.log('获取routeType');
        let a = this.$store.state.user[types.user.state.routeType]
        console.log(a)
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return a;
      },
      set(newVal) {
        this.$store.commit(types.user.mutations.setRouteType, newVal)
      }
    },
    departureCity: {
      get() {
        return this.$store.state.user[types.user.state.departureCity]
      },
      set(newVal) {
        this.$store.commit(types.user.mutations.setDepartureCity, newVal)
      }
    },
    targetCity: {
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return this.$store.state.user[types.user.state.targetCity]
      },
      set(newVal) {
        this.$store.commit(types.user.mutations.setTargetCity, newVal)
      }
    },
  },
  async mounted()
  {
    if(!this.routeType){
      this.routeType = 'd-d'
    }
    let x = await this.loadCity({cityType:fields.cityType_domestic});
    if(!x){return this.$message.warn('无法获取国内城市列表')}
    this.domestics.forEach(val=>{
      this.domesticCityOptions.push({
        value:val.id,
        text: val.cityName
      });
    });
    let y = await this.loadCity({cityType:fields.cityType_international});
    if(!y){return this.$message.warn('无法获取国际城市列表')}
    this.internationals.forEach(val=>{
      this.internationalCityOptions.push({
        value:val.id,
        text: val.cityName
      });
    });
    this.routerChange();
    this.loadFlightList();
  },
  methods:{
    moment,
    ...mapActions({
      loadCity: types.citys.actions.loadCity,
    }),
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current < moment().endOf('day') || current >moment(new Date().getTime()+this.offsetDays).endOf('day') ;
    },
    // 航班路线改变
    async routerChange(){
      if(this.nowRouteType === this.routeType){
        return console.log('憨八龟')
      }
      if(this.routeType === 'd-d'){
        // 国内 飞 国内
        this.departureOptions = this.domesticCityOptions;
        this.targetOptions = this.domesticCityOptions;
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          // 国内飞国外转变为国外飞国外
          this.targetCity = null;
        }else if(this.nowRouteType === 'i-d'){
          this.departureCity = null;
        }else if(this.nowRouteType === 'i-i'){
          this.targetCity = null;
          this.departureCity = null;
        }
        this.changeDisables();
      }else if(this.routeType === 'd-i'){
        // 国内飞国外
        this.departureOptions = this.domesticCityOptions;
        this.targetOptions = this.internationalCityOptions;
        let tmpTarget = this.targetCity;

        this.departureDisabled = [];
        this.targetDisabled = [];
        // 国内航班改变
        if(this.nowRouteType === 'i-d'){
          // 国外飞国内转变为国外
          this.targetCity = this.departureCity;
          this.departureCity = tmpTarget;
        }else if(this.nowRouteType==='i-i'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.departureCity = null;
        }else  if(this.nowRouteType==='d-d'){
          this.targetCity = null;
        }
      }
      else if(this.routeType === 'i-d'){
        // 国外飞国内
        this.departureOptions = this.internationalCityOptions;
        this.targetOptions = this.domesticCityOptions;
        let tmpDeparture = this.departureCity;
        this.departureDisabled = [];
        this.targetDisabled = [];
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          this.departureCity = this.targetCity;
          // 内飞外转变为外飞内
          this.targetCity = tmpDeparture;
        }else if(this.nowRouteType==='i-i'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.targetCity = null;
        }else if(this.nowRouteType === 'd-d'){
          this.departureCity = null;
        }
      }else if(this.routeType === 'i-i'){
        // 国外飞国内
        this.departureOptions = this.internationalCityOptions;
        this.targetOptions = this.internationalCityOptions;
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          // 国内飞国外转变为国外飞国外
          this.departureCity = null;
        }else if(this.nowRouteType === 'i-d'){
          this.targetCity = null;
        }else if(this.nowRouteType === 'd-d'){
          this.targetCity = null;
          this.departureCity = null;
        }
        // 改变禁止选中
        this.changeDisables()
      }
      this.nowRouteType = this.routeType;
    },
    changeDisables(){
      if(this.routeType === 'i-i' || this.routeType === 'd-d'){
        this.targetDisabled = [this.departureCity]
        this.departureDisabled = [this.targetCity]
      }
    },
    // 时间管理函数
    timeHandle(){
      if(this.startTimes[0]){
        this.setStartTime(this.startTimes[0]);
      }
      if(this.startTimes[1]){
        this.setStartTime(this.startTimes[1]);
      }
    },
    switchCity(){
      let targetCity = this.targetCity;
      let departureCity = this.departureCity;
      this.targetCity = null, this.departureCity =null
      this.targetCity = departureCity, this.departureCity = targetCity;
    },
    // 加载基础航班
    async loadFlightList(){
      this.loadingState = 0;
      let [err,response] = await handle(api_flights.sellFlights());
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
        return this.$message.error('航班搜索失败');
      }
      this.loadingState = 1;
      this.$message.success('航班加载完成');
      this.results = res.data;
    },
    reSearch(){
      this.search()
    },
    // 搜索
    async search(tip){
      if(!this.departureCity ||!this.targetCity){
        if(tip){
          this.$message.warn('请选择起始城市')
        }
        return console.log('未选择起始城市')
      }
      this.loadingState = 0;
      // 获取起始城市,筛选时间
      let searchOptions = {};
      searchOptions.departureCity = this.departureCity;
      searchOptions.targetCity = this.targetCity;
      searchOptions.startTime = this.startTimes[0];
      searchOptions.endTime = this.startTimes[1];
      let [err,response] = await handle(api_flights.searchSellFlights(searchOptions));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
        return this.$message.error('航班搜索失败');
      }
      this.loadingState = 1;
      this.$message.success('航班加载完成');
      this.results = res.data;
    }
  }
}
</script>

<style scoped>

</style>
