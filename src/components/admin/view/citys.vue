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
export default {
  name: "citys",
  components: {
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
    changeCityType(cityType){
      console.log(cityType)
      if(this.showCityType == cityType){
        return this.$message.info('未修改城市类型');
      }
      // 移除关键字符
      console.log(cityType)
    },

    editCity(text){
      // 城市id
    }
  }
}
</script>

<style scoped>

</style>