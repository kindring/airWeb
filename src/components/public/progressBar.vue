<template>
  <div :class="`relative overflow-hidden flex ${bgColor}`">

      <div
          :style="`width:${(item.value/total)*100}%`"
          :class="`h-full flex items-center flex-shrink ${item.bgColor} pl-0.5 min-w-8`">
          {{item.title}}:{{item.value}}
      </div>
      <div
          :class="`w-full h-full flex items-center ${bg.bgColor} pl-0.5`">
        {{bg.title}}:{{bg.value}}
      </div>
  </div>
</template>

<script>
export default {
  name: "progressBar",
  props:{
    total:{default:0},
    bg:{default(){return {}}},
    item:{default(){return {}}},
    bgColor:{default:'bg-red-300'}
  },

}
</script>

<style scoped>

</style>
