<template>
  <div class="w-full">
    <round-title>活动列表</round-title>
    <table-layout >
      <template #header>
        <div class="flex justify-between items-center">
          <div>
          </div>

          <a-button-group>
            <a-button @click="search()">查询</a-button>
            <a-button type="primary" >
              <router-link to="addRecommend">新增活动</router-link>
            </a-button>
          </a-button-group>
        </div>
      </template>
      <!--    条件搜索列表-->
      <a-table
          :columns="recommendColumns"
          :data-source="recommends"
          :loading="loading"
      >
        <template slot="remommend" slot-scope="text,record">
          <div class="my-1 recommend-title relative">
            <img :src="record.bg" :alt="record.recommendName">
            <span>{{record.recommendName}}</span>
          </div>
        </template>

        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button type="primary">
            <air-link :path="`/recommend?recommendId=${record.id}`">活动详情</air-link></a-button>
        </template>
      </a-table>
    </table-layout>
  </div>
</template>

<script>
import RoundTitle from "@/components/public/roundTitle.vue";
import TableLayout from "../components/tableLayout";
import fields from "@/mapField/field.js";
import TableSelect from "@components/admin/components/tableSelect";
import {mapActions, mapState} from "vuex";
import types from "@/store/adminTypes";
import field from "@/mapField/field";
import Pop from "@components/public/pop";
import handle from "@/utils/handle";
import api_recommend from "@/apis/api_recommend";
import business from "@/utils/business";
import {recommendColumns} from "@/mapField/columns"
import AirLink from "@components/public/airLink";
export default {
  name: "recommends",
  components: {
    AirLink,
    TableLayout,
    RoundTitle,
  },
  data(){
    return {
      recommendColumns,
      airs: [],
      saveData:{},
      // 加载城市
      loading: true,
    }
  },

  computed:{

  },
  mounted(){
    this.loading =false;
    this.search(true);
  },
  methods:{
    // 筛选城市
    async search(load){
      if(this.loading){
        return this.$message.info('正在加载推荐中');
      }
      this.loading = true;
      let [err,response] = await handle(api_recommend.getRecommends());
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      this.loading =false;
      if(!ok){return this.$message.error(msg)}
      this.recommends = res.data;
    },
  }
}
</script>

<style scoped lang="scss">

  .recommend-title {
    width: 100%;
    height: 68px;
    position: relative;
    line-height: 68px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    span {
      position: relative;
      font-size: 2em;
      color: white;
      margin-left: 1em;
    }
  }

</style>
