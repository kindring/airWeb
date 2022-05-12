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
    <br/>
    <a-button @click="showPop">
      上传文件
    </a-button>

    <pop :show="popShow" :loading="popLoading">
      <image-table @cancel="cancelPop" @ok="okHandle"></image-table>
<!--      <choose-to-sit></choose-to-sit>-->
    </pop>
  </div>
</template>

<script>
import RoundTitle from "@components/public/roundTitle";
import Pop from "@components/public/pop";
import ImageTable from "@components/admin/components/imageTable";
import ChooseToSit from "@components/index/components/chooseToSit";
export default {
  name: "logout.vue",
  components: {ImageTable, Pop, RoundTitle},
  data(){
    return {
      popShow:false,
      popLoading:false,
    }
  },
  methods:{
    showPop(){
      this.popShow = true;
      this.popLoading = false;
    },
    cancelPop(){
      this.popShow = false;
      this.popLoading = false;
    },
    okHandle(url){
      console.log(url);
      this.cancelPop();
    }
  }
}
</script>

<style scoped>

</style>
