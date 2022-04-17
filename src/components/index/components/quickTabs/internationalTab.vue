<template>
  <a-form class="py-2 w-full h-full h-60">
<!--    国外出发还是国内出发-->
    <a-row class="w-full flex justify-center px-2 ">
      <div class="w-10/12 flex items-center py-1.5 px-1 bg-purple-200  rounded">
        <a-radio-group v-model="routerType" @change="routerChange">
          <a-radio-button value="a">
            国内飞国际
          </a-radio-button>
          <a-radio-button value="b">
            国外飞国内
          </a-radio-button>
          <a-radio-button value="c">
            国际飞行
          </a-radio-button>
        </a-radio-group>
      </div>
    </a-row>

<!--    起始城市-->
    <a-row class="w-full flex justify-center items-center  mt-1">
<!--     出发城市-->

      <div class="w-2/5  px-2 py-2 shadow bg-green-200 rounded">
        <div class="pl-1 flex text-xl items-center">
          出发城市:
        </div>
        <div class="w-full">
          <table-select
              :options="departureCityOptions"
              v-model="departureCity"
              :disableds="departuretDisableds"
              placeholder="出发城市"
              @change="changeDisables"
              keystr="departureCity">
          </table-select>
        </div>

      </div>
      <svg-icon  class="text-3xl  px-1 hover:text-red-300"  icon-class="fly" ></svg-icon>
<!--      目标城市-->
      <div class="w-2/5 px-2 py-2 shadow bg-yellow-200 rounded">
      <div class="pl-1 flex text-xl items-center">
        目标城市:
      </div>
        <div class="w-full">
          <table-select
            :options="targetCityOptions"
            :disableds="targetDisableds"
            v-model="targetCity"
            placeholder="目标城市"
            @change="()=>{changeDisables()}"
            keystr="targetCity">
        </table-select>
        </div>
      </div>
    </a-row>
<!-- 搜索时间框范围-->
    <a-row class="w-full flex justify-center mt-1.5 px-2">
      <div class="w-10/12 flex items-center py-1.5 bg-red-200  rounded">
        <div class="px-3">预计出发时间</div>
        <a-range-picker
            :disabled-date="disabledDate"
            v-model="startTimes"
            format="YYYY-MM-DD"
            @change="timeHandle"
        />
      </div>
    </a-row>
<!--   占位演示-->

<!-- 确认框-->
    <a-row class="w-full flex justify-center mt-1.5 px-2">
      <div class="w-10/12 flex items-center py-1.5 bg-red-200 px-2 rounded">
        <a-button type="primary">
          <air-link path="/search">
            查找航班
          </air-link>
        </a-button>
      </div>
    </a-row>
  </a-form>
</template>

<script>
import moment from "moment";
import tableSelect from "@components/admin/components/tableSelect";
import {mapActions, mapState} from "vuex";
import types from "@/store/homeTypes";
import fields from "@/mapField/field"
import AirLink from "@components/public/airLink";
export default {
  name: "internationalTab",
  components:{
    AirLink,
    tableSelect
  },
  computed:{
    ...mapState({
      // 城市列表
      domestics:state=>state.citys[types.citys.state.domestic],
      internationals:state=>state.citys[types.citys.state.international],
      //开始时间
      startTime:state=>state.user[types.user.state.startTime],
      // 结束时间
      endTime:state=>state.user[types.user.state.endTime],
      // 用户选择的
    }),
    departureCity: {
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
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
  data(){
    return {
      departureCityOptions:[],
      departuretDisableds:[],
      targetCityOptions:[],
      targetDisableds:[],
      domesticOptions:[],
      internationalOptions:[],
      startTimes:[],
      backTimes:[],
      offsetDays: 86400000 * 7,
      routerType: 'a',
      nowRouteType: null
    }
  },
  async mounted() {
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
    // 加载时间
    if(this.startTime){
      this.$set(this.startTimes,0,this.startTime)
    }
    if(this.endTime){
      this.$set(this.startTimes,1,this.endTime)
    }
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
      if(this.nowRouteType == this.routerType){
        return console.log('憨八龟')
      }
      if(this.routerType === 'a'){
        // 国内飞国外
        this.departureCityOptions = this.domesticOptions;
        this.targetCityOptions = this.internationalOptions;
        let tmpTarget = this.targetCity;
        this.targetCity = this.departureCity;
        this.departuretDisableds = [];
        this.targetDisableds = [];
        // 国内航班改变
        if(this.nowRouteType === 'b'){
          // 国外飞国内转变为国外
          this.departureCity = tmpTarget;
        }else if(this.nowRouteType==='c'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.departureCity = null;
        }else{
          this.departureCity = null;
          this.targetCity = this.departureCity;
        }
      }
      else if(this.routerType === 'b'){
        // 国外飞国内
        this.departureCityOptions = this.internationalOptions;
        this.targetCityOptions = this.domesticOptions;
        let tmpDeparture = this.departureCity;
        this.departureCity = this.targetCity;
        this.departuretDisableds = [];
        this.targetDisableds = [];
        // 国内航班改变
        if(this.nowRouteType === 'a'){
          // 内飞外转变为外飞内
          this.targetCity = tmpDeparture;
        }else if(this.nowRouteType==='c'){
          // 外飞外转变为外飞内
          // this.departureCity = tmpDeparture;
          this.targetCity = null;
        }else{
          this.departureCity = null;
        }
      }else if(this.routerType === 'c'){
        // 国外飞国内
        this.departureCityOptions = this.internationalOptions;
        this.targetCityOptions = this.internationalOptions;
        // 国内航班改变
        if(this.nowRouteType === 'a'){
          // 国内飞国外转变为国外飞国外
          this.departureCity = null;
        }else if(this.nowRouteType === 'b'){
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
      if(this.routerType === 'c'){
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
    }
  }
}
</script>

<style scoped>

</style>