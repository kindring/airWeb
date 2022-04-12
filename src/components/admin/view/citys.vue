<template>
  <div class="w-full">
    <round-title>城市管理</round-title>
    <table-layout >
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <table-select
                class="w-48"
                :options="cityTypes"
                v-model="showCityType"
                keystr="cityType">

            </table-select>
          </div>

          <a-button-group>
            <a-button @click="search">查询</a-button>
            <a-button type="primary" >
              <router-link to="addCity">新增城市</router-link>
            </a-button>
          </a-button-group>
        </div>
      </template>
      <!--    条件搜索列表-->
      <a-table
          :columns="cityColumn"
          :data-source="showCitys"
          :loading="loading"
      >
        <template slot="cityType" slot-scope="text">
          <div :class="`p-2 rounded bg-${text==domesticType?'blue':'green'}-300`">{{text==domesticType?'国内':'国际'}}</div>
        </template>

        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button @click="editCity(text,record)" type="primary">编辑城市</a-button>
        </template>
      </a-table>
    </table-layout>
<!--    弹窗组件,弹窗修改城市信息 -->
    <pop :show="editPopShow" :loading="editLoading">
      <a-card title="编辑城市信息" :bordered="false" class="w-96">
        <a-form-model
            class="relative"
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
          <!--            城市名-->
          <a-form-model-item
              class="mt-6"
              ref="cityName"
              label="城市名"
              has-feedback
              prop="cityName">
            <a-input
                class="w-full"
                v-model="form.cityName"
                placeholder="请输入城市名"
                @blur="
                  () => {
                    $refs.cityName.onFieldBlur();
                  }
                "
            />
          </a-form-model-item>
          <!--            城市类型-->
          <a-form-model-item
              class="mt-2"
              ref="cityType"
              label="城市类型"
              has-feedback
              prop="cityType">
            <table-select
                class="w-48"
                :options="formCityTypes"
                v-model="form.cityType"
                keystr="cityType">
            </table-select>
          </a-form-model-item>

          <!--             提交按钮            -->
          <a-row class="mt-10">
            <a-col :span="labelCol.span">

            </a-col>
            <a-col>
              <a-button-group>
                <a-button @click="hideEditPop">取消修改</a-button>
                <a-button type="primary" @click="submitHandle">修改城市</a-button>
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
export default {
  name: "citys",
  components: {
    Pop,
    TableSelect,
    TableLayout,
    RoundTitle,
  },
  data(){
    return {
      domesticType:fields.cityType_domestic,
      internationalType:fields.cityType_international,
      cityTypes:[
        {
          text:'全类型',
          value: fields.cityType_default
        },
        {
          text:'国内城市',
          value: fields.cityType_domestic
        },
        {
          text:'国际城市',
          value: fields.cityType_international
        }
      ],
      showCityType: fields.cityType_domestic,
      showCitys: [],
      // 加载城市
      loading: true,
      // 修改城市弹窗部分
      editPopShow: false,
      editLoading: true,
      editChangeLock: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        cityId: '',
        cityName: '',
        cityType: fields.cityType_domestic,
      },
      formCityTypes:[
        {
          text:'国内城市',
          value: fields.cityType_domestic
        },
        {
          text:'国际城市',
          value: fields.cityType_international
        }
      ],
      rules: {
        cityName: [
          {required: 'true',message: '请输入城市名称'},
        ],
        cityType: [
          {required:'true',message:'请选择城市类型'}
        ],
      }
    }
  },

  computed:{
    ...mapState({
      cityColumn: state=>state.citys[types.citys.state.cityTableColumns],
      // 国内城市
      domesticCitys: state=>state.citys[types.citys.state.domestic],
      // 国际城市
      internationalCitys: state=>state.citys[types.citys.state.international],
    }),
  },
  mounted(){
    this.loading =false;
    this.search();
  },
  methods:{

    ...mapActions({
      loadCity: types.citys.actions.loadCity,
    }),
    // 加载城市数据
    async loadCitys(showCityType){
      this.loading = true;
      let x = await this.loadCity(showCityType);
      this.loading =false;
    },
    // 筛选城市
    async search(){
      if(this.loading){
        return this.$message.info('正在加载城市中');
      }
      if(this.showCityType == fields.cityType_default){
        // 加载所有城市
        if(!this.domesticCitys.length){
          await this.loadCitys(fields.cityType_domestic)
        }
        if(!this.internationalCitys.length){
          await this.loadCitys(fields.cityType_international)
        }
        this.$message.success('城市加载完成');
      }else{
        await this.loadCitys(this.showCityType);
      }
      this.showCitys = [];
      console.log(this.showCityType,fields.cityType_international)

      if(this.showCityType == field.cityType_domestic){
        console.log('国内')
        this.showCitys = this.domesticCitys;
      }else if(this.showCityType == field.cityType_international){
        console.log('国际')
        this.showCitys = this.internationalCitys;
      }else{
        console.log('全部')
        this.showCitys = [...this.internationalCitys,...this.domesticCitys];
      }
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
