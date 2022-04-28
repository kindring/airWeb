<template>
  <div class="px-2">
    <div class="px-2 py-2 bg-blue-100" v-if="payState=='1' ">订单等待支付</div>
    <div class="px-2 py-2 bg-green-100" v-if="payState=='2' ">订单等待值机</div>
    <div class="px-2 py-2 bg-green-300" v-if="payState=='3' ">订单已经全部值机</div>
    <div class="px-2 py-2 bg-blue-300" v-if="payState=='4' ">订单完成</div>
    <div class="px-2 py-2 bg-yellow-200" v-if="payState=='5' ">订单已经取消</div>
    <div class="px-2 py-2 bg-yellow-300" v-if="payState=='6' ">订单已经退款</div>
    <div class="px-2 py-2 bg-yellow-300" v-if="payState=='7' ">订单部分机票退款</div>
    <div class="px-2 py-2 bg-red-300" v-if="payState=='8' ">订单超时取消</div>
  </div>
</template>

<script>
export default {
  name: "payStates",
  props:['payState']
}
</script>

<style scoped>

</style>
