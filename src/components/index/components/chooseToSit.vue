<template>
  <a-card title="选择座位" :bordered="false" class="w-9/12 h-5/6">
    <div class="w-full flex flex-col">
      <div class="">
        选择乘机人:<table-select :options="tickOptions" v-model="tickValue"></table-select>
      </div>
      <div class="w-full h-full">
        <loading :loading-state="loadingState" tip="获取座位信息中">

          <div class="w-full" v-if="tickData.tickState!=field.tickState_refund">
<!--            座位信息 -->

          </div>

          <div class="w-full h-full flex justify-center items-center flex-3xl" v-else>
            该乘客已取消订单,无座位信息
          </div>

          <template v-slot:loadFail>
            <div class="w-full h-full flex justify-center items-center flex-col" >
              <h2 class="text-2xl text-red-700">{{loadingMessage}}</h2>
            </div>
          </template>
        </loading>
      </div>
      <div class="flex">
        <a-button-group>
          <a-button @click="hideEditPop">关闭选坐界面</a-button>
        </a-button-group>
      </div>
<!--      选择乘客-->
<!--      选择座位框 透明白色未选 黄色已经选择 红色为对应乘客选择 -->
    </div>
  </a-card>
</template>

<script>
import TableSelect from "@components/admin/components/tableSelect";
import handle from "@/utils/handle";
import api_user from "@/apis/api_user";
import business from "@/utils/business";
import api_flight from "@/apis/api_flight";
import field from '@/mapField/field'
export default {
  name: "chooseToSit",
  components: {TableSelect},
  props:{
    flightId: {required:true},
    ticks: {
      required:true,
      default(){return []}
    }
  },
  data(){
    return {
      field,
      loadingState: 0,
      loadingMessage: '',
      // 座位信息
      row: 0,
      // 座位信息
      col: 0,
      // 已经被选择的座位
      selecteds: [],
      // 机票
      tickValue: null,
      // 机票选择
      tickOptions:[],
      // 机票数据,是否退款,是否已经选择座位
      tickData:{},
      // 是否显示座位
    }
  },
  mounted(){
    this.transformTick();
  },
  methods:{
    hideEditPop(){
      this.$emit('cancel');
    },
    // 转换机票信息
    transformTick(){
      this.tickOptions = [];
      this.ticks.forEach(val=>{
        this.tickOptions.push({
          ...val,
          value: val.id,
          text: val.name,
        })
      })
    },
    // 获取机票信息
    async loadSeatInfo(){
      if(!this.flightId){
        return this.$message.error('无航班信息')
      }
      this.loadingState = 0;
      let [err,response] = await handle(api_flight.seatInfo(this.flightId));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
      }
      this.loadingState = 1;
      this.selecteds = res.selecteds;
      this.row = res.row;
      this.col = res.col;
    }
  }
}
</script>

<style scoped>

</style>
