<template>
  <div class="w-full bg-gray-300">
<!--    航班列表 -->
    <div class="w-full h-14 flex items-center justify-center bg-white">
        <div class="w-p1200 flex h-full items-center ">

          <div class="flex shadow bg-pink-200 rounded py-1 px-2">
            <table-select class="w-48" :options="routeTypeOptions" v-model="routeType"/>
          </div>
<!--          起始城市-->
          <div class="px-2 w-2/4 flex items-center"><!--     出发城市-->

            <div class=" px-2 py-1 shadow bg-green-200 rounded">
              <div class="w-48">
                <table-select
                    class="w-full"
                    :options="departureCityOptions"
                    v-model="departureCity"
                    :disableds="departuretDisableds"
                    placeholder="出发城市"
                    @change="changeDisables"
                    keystr="departureCity">
                </table-select>
              </div>

            </div>
            <svg-icon  v-if="(routeType==='d-d'||routeType==='i-i')"
                       @click="switchCity"
                       class="text-3xl  px-1 hover:text-red-300"
                       icon-class="switch" />
            <svg-icon  v-if="!(routeType==='d-d'||routeType==='i-i')"
                       class="text-3xl  p-1 hover:text-red-300"
                       icon-class="fly" />
            <!--      目标城市-->
            <div class=" px-2 py-1 shadow bg-yellow-200 rounded">
              <div class="w-48">
                <table-select
                    class="w-full"
                    :options="targetCityOptions"
                    :disableds="targetDisableds"
                    v-model="targetCity"
                    placeholder="目标城市"
                    @change="()=>{changeDisables()}"
                    keystr="targetCity">
                </table-select>
              </div>
            </div></div>
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
import {mapActions} from "vuex";
export default {
  name: "flightSearch",
  components: {TableSelect, FlightAd},
  data(){
    return {
      routeTypeOptions:[
        {text:'国内飞国内',value:'d-d'},
        {text:'国际飞国际',value:'i-i'},
        {text:'国内飞国外',value:'d-i'},
        {text:'国外飞国内',value:'i-d'}
      ],
      domesticOptions : [],
      departuretDisableds: [],
      internationalOptions : [],
      internationalDisableds: [],
      startTimes:[],
      offsetDays: 86400000 * 7,
      nowRouteType: null
    };
  },
  computed:{
    // 城市列表
    domestics:state=>state.citys[types.citys.state.domestic],
    internationals:state=>state.citys[types.citys.state.international],
    //开始时间
    startTime:state=>state.user[types.user.state.startTime],
    // 结束时间
    endTime:state=>state.user[types.user.state.endTime],
    routeType:{
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return this.$store.state.user[types.user.state.routeType]
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
      this.domesticOptions.push({
        value:val.id,
        text: val.cityName
      });
    });
    let y = await this.loadCity({cityType:fields.cityType_international});
    if(!y){return this.$message.warn('无法获取国际城市列表')}
    this.internationals.forEach(val=>{
      this.internationalOptions.push({
        value:val.id,
        text: val.cityName
      });
    });
    this.routerChange();
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
    routerChange(){
      if(this.nowRouteType === this.routerType){
        return console.log('憨八龟')
      }
      if(this.routeType === 'd-d'){
        // 国内 飞 国内
        this.departureCityOptions = this.domesticOptions;
        this.targetCityOptions = this.internationalOptions;
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          // 国内飞国外转变为国外飞国外
          this.targetCity = null;
        }else if(this.nowRouteType === 'i-d'){
          this.departureCity = null;
        }else{
          this.targetCity = null;
          this.departureCity = null;
        }
        this.changeDisables();
      }else if(this.routerType === 'd-i'){
        // 国内飞国外
        this.departureCityOptions = this.domesticOptions;
        this.targetCityOptions = this.internationalOptions;
        let tmpTarget = this.targetCity;
        this.targetCity = this.departureCity;
        this.departuretDisableds = [];
        this.targetDisableds = [];
        // 国内航班改变
        if(this.nowRouteType === 'i-d'){
          // 国外飞国内转变为国外
          this.departureCity = tmpTarget;
        }else if(this.nowRouteType==='i-i'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.departureCity = null;
        }else{
          this.departureCity = null;
          this.targetCity = this.departureCity;
        }
      }
      else if(this.routerType === 'i-d'){
        // 国外飞国内
        this.departureCityOptions = this.internationalOptions;
        this.targetCityOptions = this.domesticOptions;
        let tmpDeparture = this.departureCity;
        this.departureCity = this.targetCity;
        this.departuretDisableds = [];
        this.targetDisableds = [];
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          // 内飞外转变为外飞内
          this.targetCity = tmpDeparture;
        }else if(this.nowRouteType==='i-i'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.targetCity = null;
        }else{
          this.departureCity = null;
        }
      }else if(this.routerType === 'i-i'){
        // 国外飞国内
        this.departureCityOptions = this.internationalOptions;
        this.targetCityOptions = this.internationalOptions;
        // 国内航班改变
        if(this.nowRouteType === 'd-i'){
          // 国内飞国外转变为国外飞国外
          this.departureCity = null;
        }else if(this.nowRouteType === 'i-d'){
          this.targetCity = null;
        }else{
          this.targetCity = null;
          this.departureCity = null;
        }
        // 改变禁止选中
        this.changeDisables()
      }
      this.nowRouteType = this.routerType;
    },
    changeDisables(){
      if(this.routerType === 'i-i' || this.routeType === 'd-d'){
        this.targetDisableds = [this.departureCity]
        this.departuretDisableds = [this.targetCity]
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
  }
}
</script>

<style scoped>

</style>
