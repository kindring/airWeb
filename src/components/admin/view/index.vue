<template>
  <div class="w-full">
    <round-title>航班管理系统-z</round-title>
    <a-row type="flex" justify="space-around">
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/">首页</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/flight">航班管理</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/flight">航班管理</router-link>
        </round-title>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/citys">城市列表</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/addCity">新增城市</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/flight">航班管理</router-link>
        </round-title>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/">首页</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/flight">航班管理</router-link>
        </round-title>
      </a-col>
      <a-col :span="5">
        <round-title>
          <router-link  class="h-72 flex justify-center items-center" to="/flight">航班管理</router-link>
        </round-title>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import RoundTitle from "@components/public/roundTitle";
export default {
  name: "index",
  components: {RoundTitle}
}
</script>

<style scoped>

</style>
