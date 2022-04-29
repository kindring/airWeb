<template>
  <div class="px-2">
    <div class="px-2 py-2 bg-blue-100" v-if="payState=='1' ">等待支付,剩余 <span class="text-red-500 text-sm">{{remainStr}}</span></div>
    <div class="px-2 py-2 bg-green-100" v-if="payState=='2' ">等待乘客值机</div>
    <div class="px-2 py-2 bg-green-300" v-if="payState=='3' ">乘客已经全部值机</div>
    <div class="px-2 py-2 bg-blue-300" v-if="payState=='4' ">订单已完成</div>
    <div class="px-2 py-2 bg-yellow-200" v-if="payState=='5' ">订单已经取消</div>
    <div class="px-2 py-2 bg-yellow-300" v-if="payState=='6' ">订单已经退款</div>
    <div class="px-2 py-2 bg-yellow-300" v-if="payState=='7' ">订单部分机票退款</div>
    <div class="px-2 py-2 bg-red-300" v-if="payState=='8' ">订单超时自动取消</div>
  </div>
</template>

<script>
import {getUnixTimeStamp} from '@/utils/time'
import moment from "moment";
export default {
  name: "payStates",
  props:['payState','createTime'],
  data(){
    return{
      remainStr: '',
      // 等待支付时间
      waitTime: 60 * 15,
      endTime: null,
    }
  },
  mounted(){
    console.log(this.createTime)
    if(this.payState != 1){return}
    this.endTime = parseInt(this.createTime) + this.waitTime;
    this.tick();
  },
  methods:{
    tick(){
      setTimeout(()=>{
        let nowTimeStamp = getUnixTimeStamp();
        let str = '';
        console.log('\n\norderid-------')
        console.log(nowTimeStamp)
        console.log(this.endTime)
        // 1651217809
        // 1651139164
        // 0 h:21 m:50 s:45
        if(nowTimeStamp>this.endTime){
          str = '已超时:'+this.diffTime(this.endTime,nowTimeStamp)
          // 已经超时
        }else{
          // 剩余时间
          str = this.diffTime(nowTimeStamp,this.endTime)
        }
        this.remainStr = str;
        this.tick()
      },1000)
    },
    diffTime(start,end){
      let t = end - start;
      let str = '';
      let day = Math.floor(t/(24*60*60)),
          h = Math.floor((t-(day*24*60*60))/(60*60)),
          m = Math.floor((t-(day*24*60*60)-(h*60*60))/60),
          s = t-(day*24*60*60)-(h*60*60)-(m*60);
      str = `${m}分${s}秒`
      return str
    }
  }
}
</script>

<style scoped>

</style>
