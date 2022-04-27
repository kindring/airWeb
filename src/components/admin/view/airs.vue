<template>
  <div class="w-full">
    <round-title>飞机管理</round-title>
    <table-layout >
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <table-select
                class="w-48"
                :options="airStates"
                v-model="airState"
                keystr="airState">

            </table-select>
          </div>

          <a-button-group>
            <a-button @click="search()">查询</a-button>
            <a-button type="primary" >
              <router-link to="addAir">新增飞机</router-link>
            </a-button>
          </a-button-group>
        </div>
      </template>
      <!--    条件搜索列表-->
      <a-table
          :columns="airColumns"
          :data-source="airs"
          :loading="loading"
      >
        <template slot="maxs" slot-scope="text,record">
          <div class="p-2 rounded">{{maxTotal(text,record)}}</div>
        </template>

        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button @click="editAir(text,record)" type="primary">编辑飞机</a-button>
        </template>
      </a-table>
    </table-layout>
    <!--    弹窗组件,弹窗修改城市信息 -->
    <pop :show="editPopShow" :loading="editLoading">
      <a-card title="编辑飞机信息" :bordered="false" class="w-96">
        <a-form-model
            class="relative"
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
          <!--            飞机代号-->
          <a-form-model-item
              class="mt-6"
              ref="airCode"
              label="飞机代号"
              has-feedback
              prop="cityName">
            <a-input
                class="w-full"
                v-model="form.airCode"
                placeholder="请输入飞机代号"
                @blur="
                  () => {
                    $refs.airCode.onFieldBlur();
                  }
                "
            />
          </a-form-model-item>
          <!--            飞机行数 -->
          <a-form-model-item
              class="mt-2"
              ref="row"
              label="座位行数"
              has-feedback
              prop="row">
            <a-input-number class="w-full"
                            v-model="form.row"
                            placeholder="座位行数"
                            step="1"
                            @blur="
                  () => {
                    $refs.row.onFieldBlur();
                  }
                "></a-input-number>
          </a-form-model-item>
          <!--            每行多少排 -->
          <a-form-model-item
              class="mt-2"
              ref="col"
              label="每排座位"
              has-feedback
              prop="col">
            <a-input-number class="w-full"
                            v-model="form.col"
                            placeholder="每排座位"
                            step="1"
                            @blur="
                  () => {
                    $refs.col.onFieldBlur();
                  }
                "></a-input-number>
          </a-form-model-item>
          <!--             提交按钮            -->
          <a-row class="mt-10">
            <a-col :span="labelCol.span">

            </a-col>
            <a-col>
              <a-button-group>
                <a-button @click="hideEditPop">取消修改</a-button>
                <a-button type="primary" @click="submitHandle">修改飞机</a-button>
              </a-button-group>
            </a-col>
          </a-row>

        </a-form-model>
      </a-card>
    </pop>
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
import api_city from "@/apis/api_city";
import business from "@/utils/business";
import {airColumns} from "@/mapField/columns"
import api_flight from "@/apis/api_flight";
export default {
  name: "airs",
  components: {
    Pop,
    TableSelect,
    TableLayout,
    RoundTitle,
  },
  data(){
    return {
      airColumns,
      airStates:[
        {
          text:'所有飞机',
          value: fields.airState_all
        },
        {
          text:'启用',
          value: fields.airState_enable
        },
        {
          text:'停用',
          value: fields.airState_disable
        }
      ],
      // 显示的飞机类型
      airState:fields.airState_all,
      airs: [],
      saveData:{},
      // 加载城市
      loading: true,
      // 修改城市弹窗部分
      editPopShow: false,
      editLoading: true,
      editChangeLock: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        airId: null,
        airCode: '',
        row: 0,
        col: 0,
      },
      rules: {
        airCode: [
          {required: 'true',message: '请输入飞机代号'},
        ],
        airRow: [
          {required:'true',message:'请输入航班行数'}
        ],
        airCol: [
          {required:'true',message:'请输入每排座位数'}
        ],
      }
    }
  },

  computed:{

  },
  mounted(){
    this.loading =false;
    this.search(true);
  },
  methods:{

    ...mapActions({
      loadCity: types.citys.actions.loadCity,
    }),
    // 加载城市数据
    async loadCitys(showCityType,reload){

      let x = await this.loadCity({cityType:showCityType,load:reload});

    },
    // 筛选城市
    async search(load){
      if(this.loading){
        return this.$message.info('正在加载飞机中');
      }
      this.loading = true;
      let [err,response] = await handle(api_flight.airs(this.airState));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      this.loading =false;
      if(!ok){return this.$message.error(msg)}
      this.airs = res.data;
    },
    maxTotal(text,record){
      return parseInt(record.row) * parseInt(record.col);
    },
    editAir(text,record){
      this.editPopShow = true;
      this.editLoading = false;
      this.saveData =  record;
      this.form.airId = record.id;
      this.form.airCode = record.airCode;
      this.form.row =  record.row;
      this.form.col =  record.col;
    },
    // 取消修改城市
    hideEditPop(){
      this.editPopShow = false;
      this.editLoading = true;
      this.form.airId = null;
      this.form.airCode = '';
      this.form.row = 0;
      this.form.col = 0;
    },
    // 重置表单
    resetForm(){
      this.form.airId = null;
      this.form.airCode = '';
      this.form.row = 0;
      this.form.col = 0;
    },
    async submitHandle(e) {
      let airId = this.form.airId;
      let airCode = this.form.airCode;
      let row = this.form.row;
      let col = this.form.col;
      let params = {};
      this.editLoading = true;
      if(this.saveData.airCode !== airCode){params.airCode = airCode}
      if(this.saveData.row !== row){params.airCode = row}
      if(this.saveData.col !== col){params.airCode = col}
      let [err,response] = await handle(api_flight.changeAir(airId, params));
      this.editLoading = false;
      let {ok,msg,type} = business.checkResponseRcode(response,err);
      if(!ok){return this.$message[type](msg);}
      // 登陆成功
      this.$message.success(`修改飞机成功`);
      this.editPopShow = false;
      await this.search();

    },
  }
}
</script>

<style scoped>

</style>
