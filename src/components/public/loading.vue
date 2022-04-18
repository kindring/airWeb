<template>
  <a-spin
      :class="{
        'my-loading-default':true,
        'my-loading-css':(loadingState===0)}"
      :spinning="loadingState===0"
      :tip="tip">
    <!--      加载中-->
    <slot v-if="loadingState===1" ></slot>
    <!--      加载成功插槽-->
    <slot v-else-if="loadingState===2" name="loadFail"></slot>
    <!--      加载失败插槽 -->
  </a-spin>
</template>

<script>
export default {
  name: "loading",
  props: {
    tip: {
      default: 'Loading...'
    },
    size: {
      default: 'default',
    },
  //  加载状态 0加载中 1加载失败 2加载成功
    loadingState: {
      default: 0
    }
  },
}
</script>

<style >
.my-loading-default{
  width: 100%;
  height: 100%;
}
.my-loading-css{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ant-spin-container{
  width: 100%;
  height: 100%;
}
</style>