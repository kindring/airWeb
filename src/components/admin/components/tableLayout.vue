<template>
  <div class="w-full px-4 py-1 ">
    <div class="w-full rounded shadow bg-gray-100">
<!--      搜索框部分-->
      <div class="border-b p-2">
        <slot name="header"></slot>
      </div>
<!--      内容展示部分-->
      <div class="h-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableLayout"
}
</script>

<style scoped>

</style>