<template>
  <div class="w-full">
    <round-title>航班管理</round-title>
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
        <template class="flex justify-center" slot="state" slot-scope="text,record">
          <div class=" rounded bg-green-200 cursor-pointer hover:opacity-70 flex justify-center" @click="editFlightState(record)">
            <span class="py-1 px-2 rounded bg-green-200" v-if="text==='1'">售票中</span>
            <span class="py-1 px-2 rounded bg-yellow-600" v-else-if="text==='2'">检票中</span>
            <span class="py-1 px-2 rounded bg-blue-200" v-else-if="text==='3'">飞行中</span>
            <span class="py-1 px-2 rounded bg-gray-200" v-else-if="text==='4'">结束</span>
          </div>
        </template>
        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button  type="primary" v-if="record.flightState!=='4'">
            <router-link :to="`/editFlight?flightId=${record.id}`">
              航线详情
            </router-link>
          </a-button>
          <a-button  type="primary" v-if="record.flightState==='4'">
            <router-link :to="`/editFlight?flightId=${record.id}&reAdd=true`">
              微调航班,参数新增
            </router-link>
          </a-button>
        </template>
      </a-table>
    </table-layout>
    <!--    弹窗组件,弹窗修改航班状态 -->
    <pop :show="editPopShow" :loading="editLoading">
      <a-card title="编辑航班状态" :bordered="false" class="w-96">
        <round-title v-if="flightState==='4'">航班已经结束</round-title>
        <a-button class="py-1 px-2 rounded bg-green-200" @click="nextState" v-if="flightState==='1'">切换为检票状态</a-button>
        <a-button class="py-1 px-2 rounded bg-yellow-600" @click="nextState" v-else-if="flightState==='2'">切换为飞行状态</a-button>
        <a-button class="py-1 px-2 rounded bg-blue-200" @click="nextState" v-else-if="flightState==='3'">切换到已经到站</a-button>
        <a-button class="py-1 px-2 rounded bg-gray-200" @click="popHide" v-else-if="flightState==='4'">关闭</a-button>
      </a-card>
    </pop>
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
import api_flight from "@/apis/api_flight";
import business from "@/utils/business";
import Pop from "@components/public/pop";
import api_flights from "@/apis/api_flight";
export default {
  name: "flights",
  components: {
    Pop,
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
      fieldId:null,
      flightState: null,
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
    editFlightState(record){
      console.log(record);
      this.flightId = record.id;
      this.flightState = record.flightState;
      this.popShow();
    },
    // 将下一步
    async nextState(){
      let nextState = (this.flightState-0) +1;
      if(nextState>4&&nextState<=0){
        return this.$message.warn('无法切换到指定的模式')
      }
      this.editLoading = true;
      let [err,response] = await handle(api_flights.setState(this.flightId,nextState));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        return this.$message.error('无法修改航班状态');
      }
      this.$message.success('修改航班状态成功');
      this.flightId = null;
      this.flightState = null;
      await this.loadFlights();
      this.editLoading = false;
      this.editPopShow = false;
    },
    popShow(){
      this.editPopShow = true;
      this.editLoading = false;
    },
    popHide(){
      this.editPopShow = false
    }
  }
}
</script>

<style scoped>

</style>
