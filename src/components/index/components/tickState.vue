<template>
  <div class="px-2">
    <div class="px-2 py-2 bg-blue-100" v-if="tickState==field.tickState_create ">等待选坐</div>
    <div class="px-2 py-2 bg-green-100" v-if="tickState==field.tickState_seat  ">乘客已经值机</div>
    <div class="px-2 py-2 bg-green-300" v-if="tickState==field.tickState_wait  ">已经检票</div>
    <div class="px-2 py-2 bg-yellow-700" v-if="tickState==field.tickState_refund ">订单已经退款</div>
  </div>
</template>

<script>
import field from "@/mapField/field";
export default {
  name: "tickState",
  props:['tickState'],
  data(){
    return{
      field
    }
  },
}
</script>

<style scoped>

</style>
