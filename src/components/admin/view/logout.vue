<template>
  <div>
    <round-title>功能页面</round-title>
    <a-button>
      <a href="/admin/logout">退出登陆</a>
    </a-button>
    <br/>
    <a-button>
      <a href="/">跳转首页</a>
    </a-button>
  </div>
</template>

<script>
import RoundTitle from "@components/public/roundTitle";
export default {
  name: "logout.vue",
  components: {RoundTitle}
}
</script>

<style scoped>

</style>
