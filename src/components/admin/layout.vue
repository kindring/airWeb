<template>
  <div class="w-full flex">
<!--    侧边栏-->
    <div class="w-64 flex-shrink-0 relative">
      <div class="fixed w-64 h-screen bg-white-300">
        <Layout_sidebar></Layout_sidebar>
      </div>
    </div>
<!--    右侧内容框-->
    <div class="w-full relative ">
      <slot></slot>
      <layout_footer></layout_footer>
    </div>
  </div>
</template>

<script>
import layout_footer from "./layout_footer";
import Layout_sidebar from "./layout_sidebar";
export default {
  name: "layout",
  components: {
    Layout_sidebar,
    layout_footer
  },
}
</script>

<style scoped>

</style>