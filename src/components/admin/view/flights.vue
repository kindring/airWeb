<template>
  <div class="w-full">
    <round-title>城市管理</round-title>
    <table-layout >
      <template #header>
        <div class="flex justify-between items-center">
          <div>
<!--            航班时间 -->
<!--            相关城市 -->
          </div>

          <a-button-group>
            <a-button @click="loadFlights">查询</a-button>
            <a-button type="primary" >
              <router-link to="addFlight">新增航班</router-link>
            </a-button>
          </a-button-group>
        </div>
      </template>
      <!--    条件搜索列表-->
      <a-table
          :columns="flightColumn"
          :data-source="flights"
          :loading="loading"
          rowKey="id"
      >
        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button  type="primary">
            <router-link :to="`/editFlight?flightId=${record.id}`">
              航线详情
            </router-link>
          </a-button>
        </template>
      </a-table>
    </table-layout>
  </div>
</template>

<script>
import RoundTitle from "@/components/public/roundTitle.vue";
import TableLayout from "../components/tableLayout";
import fields from "@/mapField/field.js";
import {mapActions, mapState} from "vuex";
import types from "@/store/adminTypes";
import field from "@/mapField/field";
import handle from "@/utils/handle";
import api_city from "@/apis/api_city";
import business from "@/utils/business";
export default {
  name: "flights",
  components: {
    TableLayout,
    RoundTitle,
  },
  data(){
    return {
      // 加载城市
      loading: true,
      // 修改城市弹窗部分
      editPopShow: false,
      editLoading: true,
      editChangeLock: true,
    }
  },

  computed:{
    ...mapState({
      // 国际城市
      flightColumn: state=>state.flights[types.flights.state.flightTableColumns],
      // 国内城市
      flights: state=>state.flights[types.flights.state.flights],
    }),
  },
  mounted(){
    this.loading =false;
    this.loadFlights();
  },
  methods:{
    ...mapActions({
      loadFlight: types.flights.actions.loadFlights,
    }),
    // 加载城市数据
    async loadFlights(){
      this.loading = true;
      let x = await this.loadFlight();
      this.loading =false;
    },

    editCity(text,record){
      // 城市id
      this.editPopShow = true;
      this.editLoading = false;
      this.form.cityId = record.id;
      this.form.cityName = record.cityName;
      this.form.cityType =  record.cityType;
      // console.log(record);
    },
    // 取消修改城市
    hideEditPop(){
      this.editPopShow = false;
      this.editLoading = true;
      this.form.cityId = '';
      this.form.cityName = '';
      this.form.cityType = '';
    },
    // 重置表单
    resetForm(){
      this.form.cityName = '';
      this.form.cityType = fields.cityType_domestic;
    },
    async submitHandle(e) {
      let cityId = this.form.cityId;
      let cityName = this.form.cityName;
      let cityType = this.form.cityType;
      this.editLoading = true;
      let [err,response] = await handle(api_city.changeCity(cityId,cityType,cityName));
      console.log(response);
      let rcodeMean = business.checkResponseRcode(response,err);
      if(rcodeMean.ok){
        // 登陆成功
        this.$message.success(`修改城市成功`);
        this.showCityType = cityType;
        this.editPopShow = false;
        await this.search();
      }else{
        this.$message.error('修改城市失败')
        this.$message[rcodeMean.type](rcodeMean.msg);
      }
      this.editLoading = false;
    },
  }
}
</script>

<style scoped>

</style>
