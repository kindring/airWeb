<template>
  <layout_user>
    <loading
        :loading-state="loadingState"
        tip="加载订单数据中">
      <div class="w-full flex justify-center py-1 px-2">
        <div class="w-full h-auto rounded bg-gray-200">
          <div class="flex">
            <div class="px-2">订单:{{orderId}}</div>
          </div>
        </div>
      </div>


      <template v-slot:loadFail>
        <div class="w-full h-96 flex justify-center items-center flex-col">
          <h2 class="text-2xl text-red-700">加载航班订单失败:{{loadingMessage}}</h2>
          <a-button type="primary">
            <air-link path="/orders" >订单列表</air-link>
          </a-button>

        </div>
        <div class="h-96"></div>
      </template>
    </loading>
  </layout_user>
</template>

<script>
import layout_user from "@components/index/components/layout_user";
import Loading from "@components/public/loading";
import airLink from "@components/public/airLink";
export default {
  name: "order",
  components: {airLink, Loading, layout_user},
  data(){
    return {
      orderId:null,
      loadingState: 0,
      loadingMessage: '',
    }
  },
  mounted(){
    if(!this.$route.query.orderId){
      this.loadingState = 2;
      this.loadingMessage = '无法找到的对订单'
      return this.$message.warn(this.loadingMessage);
    }
  }
}
</script>

<style scoped>

</style>
