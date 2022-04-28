<template>
  <layout_user>
    <div class="w-full flex justify-center py-1 px-2">
      <div class="w-full h-auto rounded bg-gray-200">
        <div class="flex">
          <div class="px-2">订单:{{}}</div>
        </div>
      </div>
    </div>
  </layout_user>
</template>

<script>
export default {
  name: "order",
  data(){
    return {
      orderId:null,
      orderNumber:
    }
  },
  mounted(){
    if(!this.$route.query.flightId){
      this.loadingState = 2;
      this.loadingMessage = '无法找到的航班,请联系客服'
      return this.$message.warn(this.loadingMessage);
    }
  }
}
</script>

<style scoped>

</style>
