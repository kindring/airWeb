<template>
  <div class="w-6/12 h-5/6 p-2 rounded flex flex-col justify-center border bg-white">
    <div class="mx-1.5 h-16  text-2xl">选择座位</div>
    <div class="mt-2  w-full h-5/6 flex flex-col">
      <div class="w-full h-12 flex flex-shrink ">
        <div class="w-1/2">
          选择乘机人:<table-select class="ml-2"  :options="tickOptions" v-model="tickValue" @change="tickChange"></table-select>
        </div>
        <div class="w-1/2 border-l px-2 flex items-center">
          <span v-if="tickData.tickState == field.tickState_seat || tickData.tickState == field.tickState_seat">{{tickRow}}排-{{tickCol}}座</span>
          <span v-else-if="tickData.tickState == field.tickState_refund" class="text-red-500">已经退款</span>
          <span v-else>待选中座位</span>
        </div>
      </div>
      <div class="w-full h-5/6 overflow-auto">
        <loading :loading-state="loadingState" tip="获取座位信息中">

          <div class="w-full " v-if="tickData.tickState!=field.tickState_refund">
            <!--            座位信息 -->

<!--              头部列信息-->
            <div class="w-full h-14 flex  justify-center items-center relative right-1 top-2">
              <div class="bg-gray-400 w-12 h-12 flex justify-center items-center text-white relative bottom-0.5">列\行</div>
              <div
                  v-for="__col in col"
                  :key="`col-header-${__col}`"
                  class="bg-gray-400 w-10 h-10 mx-1 flex justify-center items-center text-xl text-white"
              >
                {{__col}}
              </div>
            </div>
<!--            每行信息 -->
            <div
                v-for="_row in row"
                :key="`row-${_row}`"
                class="w-full h-12 my-0.5 flex  justify-center items-center">
              <div class="bg-gray-400 w-10 h-10 flex justify-center items-center text-xl text-white">{{_row}}</div>
              <div
                  v-for="_col in col"
                  :key="`col-${_col}`"
                  :class="`w-12 h-12  flex
                      justify-center items-center
                      flex-shrink-1 border
                      ${isSelected(_row,_col)?
                      `bg-red-500 cursor-disable `:
                      `cursor-pointer bg-green-200 hover:bg-red-300`}
                      ${isTrySelected(_row,_col)?`bg-pink-300`:``}
                      `"
              >
                  <div class="w-full h-full" v-if="!isSelected(_row,_col)" @click="selectedSeat(_row,_col)"></div>
              </div>
            </div>
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
      <div class="flex mt-2 ">
        <a-button-group>
          <a-button @click="hideEditPop">关闭选坐界面</a-button>
          <a-button @click="okSeat" v-if="selectedRow&&selectedCol " :disabled="tickData.tickState!=field.tickState_create"
                    type="primary">选择{{selectedRow}}排{{selectedCol}}座</a-button>
        </a-button-group>
      </div>
      <!--      选择乘客-->
      <!--      选择座位框 透明白色未选 黄色已经选择 红色为对应乘客选择 -->
    </div>
  </div>
</template>

<script>
import TableSelect from "@components/admin/components/tableSelect";
import loading from "@components/public/loading"
import handle from "@/utils/handle";
import api_user from "@/apis/api_user";
import business from "@/utils/business";
import api_flight from "@/apis/api_flight";
import field from '@/mapField/field'
export default {
  name: "chooseToSit",
  components: {TableSelect,loading},
  props:{
    flightId: {required:true},
    ticks: {
      required:true,
      default(){return []}
    },
    defaultTick:null,
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
      tickRow:null,
      tickCol:null,
      // 已经被选择的座位
      selecteds: [],
      // 机票
      tickValue: null,
      // 机票选择
      tickOptions:[],
      // 机票数据,是否退款,是否已经选择座位
      tickData:{},
      // 是否显示座位
      selectedRow:null,
      selectedCol:null
    }
  },
  async mounted(){
    this.loadSeatInfo();
    this.transformTick();
  },
  methods:{
    hideEditPop(){
      this.$emit('cancel');
    },
    // 转换机票信息
    transformTick(){
      this.tickOptions = [];
      let tmpDefaultTick;
      this.ticks.forEach(val=>{
        let item = {
          ...val,
          value: val.id,
          text: val.name,
        }
        if(this.defaultTick&&this.defaultTick==val.id){
          tmpDefaultTick=item;
        }
        this.tickOptions.push(item)
      });

      console.log(tmpDefaultTick)
      if(tmpDefaultTick){
        this.tickValue = tmpDefaultTick.value
        this.tickData = tmpDefaultTick
      }else if(this.tickOptions[0]){
        this.tickValue = this.tickOptions[0].value
        this.tickData = this.tickOptions[0]
      }
      this.tickRow = this.tickData.row;
      this.tickCol = this.tickData.tickCol;
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
      console.log(res)
      this.loadingState = 1;
      this.selecteds = res.data.selecteds;
      this.row = res.data.row;
      this.col = res.data.col;
    },
    // 检查座位是否已经被选择
    isSelected(row,col){
      for(let selected of this.selecteds){
          if(selected.row == row && selected.col == col){
            return true;
          }
      }
      return false;
    },
    // 是否为尝试选择
    isTrySelected(row,col){
      if(this.selectedRow === row && this.selectedCol === col ){
        return true
      }
      return false
    },
    // 选中座位
    selectedSeat(row,col){
      if(this.isSelected(row,col)){
        return console.log('当前座位已经有人,不允许选择')
      }
      this.selectedRow = row;
      this.selectedCol = col;
    },
    tickChange(tickId){
      console.log(`c-------------------`);
      console.log(...arguments);
      // 找到对应的值
      let v = this.tickOptions.find(val=>val.id==tickId);
      if(v){
        this.tickData = v;
        this.tickRow = this.tickData.row;
        this.tickCol = this.tickData.col;
      }
    },
    // 乘客选中座位
    async okSeat(){
      console.log(`行${this.selectedRow}`)
      console.log(`列${this.selectedCol}`)
      console.log(this.tickData);
    //  选中位置,发送请求
      let [err,response] = await handle(api_user.chooseSeat(this.tickData.id,this.selectedRow,this.selectedCol));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){this.$message.error(msg)}
      this.tickData.row = this.selectedRow;
      this.tickData.col = this.selectedCol;
      // 选座完成
      await this.loadSeatInfo();
      this.$emit('ok');
    }
  }
}
</script>

<style scoped>

</style>
