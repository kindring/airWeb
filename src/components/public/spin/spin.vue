<template>
  <div
      class=" w-screen h-screen fixed left-0 top-0 flex overflow-hidden justify-center items-center"
      v-if="isShow"
  >
    <div
        class="mask absolute left-0 top-0 w-full h-full"
    ></div>
    demo
    <a-spin
        :tip="text"
        size="large"
        class="w-full h-full flex flex-col justify-center items-center"
    >
    </a-spin>

  </div>
</template>

<script>

export default {
  name: "spin",
  props:{
    show:{
      default: true
    },
  },
  data(){
    return {
      isShow: false,
      text: ''
    }
  },
  watch:{
    show: function(newVal){
      // console.log('值修改')
      this.isShow = newVal
    }
  },
  methods:{
    showPop(text){
      // console.log('显示')
      this.text = text
      this.isShow = true
    },
    hidePop(){
      this.isHide = false
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