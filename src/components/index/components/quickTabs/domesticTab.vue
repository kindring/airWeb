<template>
  <a-form class="py-2 w-full h-60 h-full">
<!--    起始城市-->
    <a-row class="w-full flex justify-center items-center">
<!--     出发城市-->

      <div class="w-2/5  px-2 py-2 shadow bg-green-200 rounded">
        <div class="pl-1 flex text-xl items-center">
          出发城市:
        </div>
        <div class="w-full">
          <table-select
              :options="cityOptions"
              v-model="departureCity"
              :disableds="[targetCity]"
              placeholder="出发城市"
              keystr="departureCity">
          </table-select>
        </div>

      </div>
      <div @click="switchCity" title="切换起始城市" class="cursor-pointer">
        <svg-icon  class="text-3xl  px-1 hover:text-red-300"  icon-class="switch" ></svg-icon>
      </div>
<!--      目标城市-->
      <div class="w-2/5 px-2 py-2 shadow bg-yellow-200 rounded">
      <div class="pl-1 flex text-xl items-center">
        目标城市:
      </div>
        <div class="w-full">
          <table-select
            :options="cityOptions"
            :disableds="[departureCity]"
            v-model="targetCity"
            placeholder="目标城市"
            keystr="targetCity">
        </table-select>
        </div>
      </div>
    </a-row>
<!-- 搜索时间框范围-->
    <a-row class="w-full flex justify-center mt-2.5 px-2">
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
    <a-row class="w-full flex justify-center mt-2.5 px-2">
      <div class="w-10/12 flex items-center py-1.5 bg-pink-200  rounded">
      </div>
    </a-row>
<!-- 确认框-->
    <a-row class="w-full flex justify-center mt-2.5 px-2">
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
import {mapActions, mapMutations, mapState} from "vuex";
import types from "@/store/homeTypes";
import fields from "@/mapField/field"
import AirLink from "@components/public/airLink";
export default {
  name: "domesticTab",
  components:{
    AirLink,
    tableSelect
  },
  computed:{
    ...mapState({
      // 城市列表
      citys:state=>state.citys[types.citys.state.domestic],
      //开始时间
      startTime:state=>state.user[types.user.state.startTime],
      // 结束时间
      endTime:state=>state.user[types.user.state.endTime],
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
      cityOptions:[],
      startTimes:[],
      backTimes:[],
      offsetDays: 86400000 * 7
    }
  },
  async mounted() {
    let x = await this.loadCity({cityType:fields.cityType_domestic})
    if(!x){return this.$message.warn('无法获取城市列表')}
    this.citys.forEach(val=>{
      this.cityOptions.push({
        value:val.id,
        text: val.cityName
      });
    });
    // 加载时间
    if(this.startTime){
      this.$set(this.startTimes,0,this.startTime)
      // this.startTimes[0] = this.startTime;
    }
    if(this.endTime){
      this.$set(this.startTimes,1,this.endTime)
    }
  },
  methods:{
    moment,
    ...mapMutations({
      setStartTime: types.user.mutations.setStartTime,
      setEndTime: types.user.mutations.setEndTime,
    }),
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
      return current < moment().endOf('day') || current >=moment(new Date().getTime()+this.offsetDays).endOf('day') ;
    },
    switchCity(){
      let targetCity = this.targetCity;
      let departureCity = this.departureCity;
      this.targetCity = null, this.departureCity =null
      this.targetCity = departureCity, this.departureCity = targetCity;
    },
    // 时间管理函数
    timeHandle(){
      console.log('=========================================')
      console.log(this.startTimes)
      if(this.startTimes[0]){
        this.setStartTime(this.startTimes[0]);
      }
      if(this.startTimes[1]){
        this.setEndTime(this.startTimes[1]);
      }
    }
  }
}
</script>

<style scoped>

</style>