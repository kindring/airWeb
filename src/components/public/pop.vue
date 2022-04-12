<template>
<div
    class=" w-screen h-screen fixed left-0 top-0 flex overflow-hidden justify-center items-center"
    v-if="show"
>
  <div
      class="mask absolute left-0 top-0 w-full h-full"
      v-if="mask"
  ></div>

  <a-spin
      :spinning="loading"
      size="large"
      class="w-full h-full flex justify-center items-center"
  >
    <div class="w-full h-full flex justify-center items-center">
      <slot/>
    </div>
  </a-spin>

</div>
</template>

<script>
export default {
  name: "pop",
  props:{
    mask:{
      default: true
    },
    loading:{
      default: false
    },
    show:{
      default: false
    }
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>
  .mask{
    background-color: #000;
    opacity: 0.3;
  }
</style>