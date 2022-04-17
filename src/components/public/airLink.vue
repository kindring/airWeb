<template>
  <router-link v-if="type===1" :to="path">
    <slot></slot>
  </router-link>
  <a :href="path" v-else-if="type===2">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "airLink",
  props:{
    type: {default:1},
    path: {default:''}
  }
}
</script>

<style scoped>

</style>