<template>
  <div class="w-full">
    <round-title>推荐详情</round-title>
    <table-layout >
      <template #header>活动信息</template>
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
            ref="recommendName"
            label="活动名称"
            has-feedback
            prop="recommendName">
          <a-input
              class="w-full"
              v-model="form.recommendName"
              placeholder="活动名称"
              @blur="
                  () => {
                    $refs.recommendName.onFieldBlur();
                  }
                "
          />
        </a-form-model-item>
        <!--            用户密码-->
        <a-form-model-item
            class="mt-2"
            ref="discript"
            label="推荐详情"
            has-feedbackkilo
            prop="discript">
          <a-textarea placeholder="推荐详情" v-model="form.discript" auto-size />
        </a-form-model-item>
        <!--            推荐等级-->
        <a-form-model-item
            class="mt-2"
            ref="zindex"
            label="推荐等级"
            has-feedbackkilo
            prop="zindex">
          <a-input-number :min="0" :max="15" :step="1" v-model="form.zIndex" />
        </a-form-model-item>

        <!--        推荐图片-->
        <a-row class="mt-3">
          <a-col :span="labelCol.span" class="text-right">
            推荐图片:
          </a-col>
          <a-col class="flex">
            <div class="recommend flex justify-center items-center bg-gray-300">
              <img class="w-full h-full" v-show="form.imgUrl" :src="form.imgUrl" :alt="form.imgUrl">
            </div>
            <a-button class="ml-2" @click="showImgSelect">选择图片</a-button>
          </a-col>
        </a-row>

        <!--             提交按钮            -->
        <a-row class="mt-10">
          <a-col :span="labelCol.span">

          </a-col>
          <a-col>
            <a-button-group>
              <a-button @click="resetForm">重置</a-button>
              <a-button type="primary" @click="submitHandle">修改活动</a-button>
            </a-button-group>
          </a-col>
        </a-row>

      </a-form-model>
      <div class="mt-2 border">

      </div>
    </table-layout>
    <table-layout >
      <template #header>
        <div class="flex justify-between">航班情况<a-button @click="addItem">新增推荐项</a-button></div>
        </template>
      <a-table
          :columns="recommendItemColumns"
          :data-source="recommendData.flights"
          :loading="loading"
          rowKey="id"
      >
        <template class="flex justify-center" slot="img" slot-scope="text">
          <div class="w-full flex py-1 justify-center bg-gray-300 " >
            <img style="width:176px;height:132px;" :src="text" :alt="text">
          </div>
        </template>
        <template class="flex justify-center" slot="city" slot-scope="text,record">
          {{record.departureCityName}}-{{record.targetCityName}}
        </template>
        <template class="flex justify-center" slot="operation" slot-scope="text,record">
          <a-button  type="primary" @click="editItem(record)">
            编辑
          </a-button>
          <a-button class="ml-1.5" type="danger" @click="deleteItem(record.flightId)">
            删除
          </a-button>
        </template>
      </a-table>
    </table-layout>
    <pop :show="imgShow" :loading="imgLoading">
      <image-table @ok="okHandle" @cancel="hideImgPop"></image-table>
    </pop>
    <pop :show="recommendItemShow" :loading="recommendItemLoading">
      <recommend-item
          :recommend-id="recommendId"
          :flight-id="flightId"
          :flight-data="flightData"
          :img="img"
          :z-index="zIndex"
          @ok="loadRecommendInfo"
          @cancel="hideRecommendPop"></recommend-item>
    </pop>
  </div>
</template>

<script>
import tableLayout from "@components/admin/components/tableLayout";
import RoundTitle from "@components/public/roundTitle";
import handle from "@/utils/handle";
import api_recommend from "@/apis/api_recommend";
import business from "@/utils/business";
import Pop from "@components/public/pop";
import ImageTable from "@components/admin/components/imageTable";
import {recommendItemColumns} from "@/mapField/columns";
import RecommendItem from "@components/admin/components/recommendItem";
export default {
  name: "recommend",
  components: {RecommendItem, ImageTable, Pop, tableLayout, RoundTitle},
  data(){
    return {
      recommendItemColumns,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        recommendName: '',
        discript: '',
        zIndex: 1,
        imgUrl: ''
      },
      rules: {
        recommendName: [
          {required: 'true',message: '请输入推荐名称'},
        ],
        discript: [
          {required:'true',message:'推荐详情'}
        ],
        zIndex: [
          {required:'true',message:'排序'}
        ],
      },
      recommendId: '',
      imgShow: false,
      imgLoading: false,
      recommendData:{},
      loading: false,
      recommendItemShow: false,
      recommendItemLoading: false,
      flightId: null,
      zIndex: null,
      img: null,
      flightData: {}
    }
  },
  async mounted(){
    if(!this.$route.query.recommendId){
      this.$message.warn('无推荐信息');
      return this.$router.push('/recommends')
    }
    this.loading = true;
    this.recommendId = this.$route.query.recommendId;
    await this.loadRecommendInfo();
    this.loading = false;
  },
  methods:{
    async loadRecommendInfo(){
      this.loading = true;
      this.hideRecommendPop();
      this.initItem();
      let [err,response] = await handle(api_recommend.recommendInfo(this.recommendId));
      console.log(response);
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      this.loading = false;
      if(!ok){return this.$message.error(msg)}
      this.recommendData = res.data;
      this.form.recommendName = res.data.recommendName;
      this.form.discript = res.data.discript;
      this.form.zIndex = res.data.zIndex;
      this.form.imgUrl = res.data.bg;
    },
    initItem(){
      this.flightId = null;
      this.img = null;
      this.zIndex = null;
      this.flightData = null;
    },
    // 重置表单
    resetForm(){
      this.form.recommendName = this.recommendData.recommendName;
      this.form.discript =this.recommendData.discript;
      this.form.zIndex = this.recommendData.zIndex;
      this.form.imgUrl = this.recommendData.bg;
    },
    async submitHandle(e) {
      let changeParam = {};
      let b = false;
      if(this.form.imgUrl != this.recommendData.bg){
        b=true;
        changeParam.bg = this.form.imgUrl
      }

      if(this.form.recommendName != this.recommendData.recommendName){
        b=true;
        changeParam.recommendName = this.form.recommendName
      }
      if(this.form.discript != this.recommendData.discript){
        b=true;
        changeParam.discript = this.form.discript
      }
      if(this.form.zIndex != this.recommendData.zIndex){
        b=true;
        changeParam.zIndex = this.form.zIndex
      }

      if(!b){
        return this.$message.warn('没有修改项')
      }
      let [err,response] = await handle(api_recommend.changeRecommend(this.recommendId,changeParam));
      console.log(response);
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        // 登陆成功
        this.$message.error(`编辑活动失败`);
        this.$message.error(msg);
        return;
      }
      this.$message.success(`编辑活动成功`);
    },
    // 新增成功
    countDown() {
      let that=this;
      const modal = this.$success({
        title: '新增城市成功',
        content: `新城市添加成功,.`,
        okText:'跳转城市列表',
        cancelText: '继续添加',
        onCancel() {
          that.resetForm();
        },
        onOk() {
          that.$router.push('/recommends');
        },
      });
    },
    hideImgPop(){
      this.imgShow = false;
      this.imgLoading = false;
    },
    okHandle(imgUrl){
      this.form.imgUrl = imgUrl;
      this.hideImgPop();
    },
    showImgSelect(){
      this.imgShow = true;
      this.imgLoading = false;
    },
    showRecommendPop(){
      this.recommendItemShow = true;
      this.recommendItemLoading = false;
    },
    hideRecommendPop(){
      this.initItem();
      this.recommendItemShow = false;
      this.recommendItemLoading = false;
    },
    // 新增航班
    addItem(){
      this.initItem();
      this.showRecommendPop()
    },
    // 编辑项目
    editItem(record){
      console.log(record);
      this.flightId =record.flightId;
      this.img =record.img;
      this.zIndex =record.zIndex;
      this.flightData = record;
      this.showRecommendPop()
    },
    // 删除项目
    async deleteItem(flightId){
      let [err,response] = await handle(api_recommend.deleteRecommendFlight(this.recommendId,flightId));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){return this.$message.error(msg)}
      await this.loadRecommendInfo();
    }

  }
}
</script>

<style scoped>

</style>
