<template>
  <div class="w-full bg-gray-100">
    <!--      轮播,广告-->
    <banner></banner>
    <div class="w-full flex items-center flex-col relative bottom-12">
<!--    快捷按钮,国内机票,航班信息,在线选坐,退票改签-->
    <quick-tab></quick-tab>

<!--      推荐线路-->
      <recommend></recommend>
    </div>
  </div>
</template>

<script>
import banner from '@/components/index/components/banner'
import QuickTab from "@components/index/components/quickTab";
import Recommend from "@components/index/components/recommend";
import {mapState} from "vuex";
import types from "@/store/homeTypes";
export default {
  name: "airHome",
  components:{
    Recommend,
    QuickTab,
    banner
  },
  data(){
    return {

    }
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      // 用户选择的
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
