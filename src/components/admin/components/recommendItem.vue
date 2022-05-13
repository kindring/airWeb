<template>
  <a-card class="w-5/12 h-auto" :title="isEdit?'编辑活动项':'新增活动项'">
    <a-form-model
        class="relative"
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-row class="mt-3 flex" >
        <a-col :span="labelCol.span" class="text-right">
          航班:
        </a-col>
        <a-col>
          <div class="w-96">
            <table-select  v-if="!isEdit" :options="options" v-model="form.flightId" :keystr="`hbon`" ></table-select>
            <div v-else class="div">
              {{`
                ${nowFlightData.flightName}___
                ${moment((nowFlightData.sailingTime-0)/1000).format('hh-mm')}
                ${nowFlightData.departureCityName}-
                ${moment((nowFlightData.langdinTime-0)/1000).format('hh-mm')}
                ${nowFlightData.targetCityName}`
              }}
            </div>
          </div>

        </a-col>
      </a-row>

      <a-form-model-item
          class="mt-2"
          label="推荐等级">
        <a-input-number :min="0" :max="15" :step="1" v-model="form.zIndex" />
      </a-form-model-item>

      <!--        推荐图片-->
      <a-row class="mt-3">
        <a-col :span="labelCol.span" class="text-right">
          推荐图片:
        </a-col>
        <a-col class="flex">
          <div class="w-48 h-48 flex justify-center items-center bg-gray-300">
            <img class="w-full h-full" v-show="form.img" :src="form.img" :alt="form.img">
          </div>
          <a-button class="ml-2" @click="showImgSelect">选择图片</a-button>
        </a-col>
      </a-row>

      <a-row class="mt-10">
        <a-col :span="labelCol.span">

        </a-col>
        <a-col>
          <a-button-group>
            <a-button type="danger" @click="cancelHandle">关闭</a-button>
            <a-button @click="initForm">重置</a-button>
            <a-button v-if="isEdit" type="primary"  @click="submitHandle">修改活动</a-button>
            <a-button v-if="!isEdit" type="primary"  @click="addHandle">新增活动</a-button>
          </a-button-group>
        </a-col>
      </a-row>
    </a-form-model>

    <pop :show="imgShow" :loading="imgLoading">
      <image-table @ok="imgOkHandle" @cancel="hideImgPop"></image-table>
    </pop>
  </a-card>
</template>

<script>
import moment from "moment";
import handle from "@/utils/handle";
import api_recommend from "@/apis/api_recommend";
import business from "@/utils/business";
import TableSelect from "@components/admin/components/tableSelect";
import Pop from "@components/public/pop";
import ImageTable from "@components/admin/components/imageTable";

export default {
  name: "recommendItem",
  components: {ImageTable, Pop, TableSelect},
  props: {
    recommendId: {require:true},
    flightId: {},
    zIndex: {},
    img: {},
    flightData: {}
  },
  data(){
    return {
      isEdit: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      notFlights:[],
      options: [],
      // 当前的航班西信息
      nowFlightData: {},
      form:{
        flightId: null ,
        zIndex: 0,
        img: '',
      },
      imgShow: false,
      imgLoading: false,
    }
  },
  async mounted(){

    if(this.flightId){
      console.log('编辑')
      this.isEdit = true;
    }else{
      console.log('新增')
      this.isEdit = false;
    }
    await this.loadNotRecommendFlights();
    this.transToOption()
  },
  methods:{
    moment,
    initForm(){
      if(this.isEdit){
        console.log('编辑初始化')
        this.form.flightId = this.flightId;
        this.form.zIndex = this.zIndex;
        this.form.img = this.img;
        this.nowFlightData = this.flightData;
      }else{
        if(this.options[0]){
          this.form.flightId = this.options[0].value
        }else{
          this.form.flightId = null;
        }
        this.form.zIndex = 0;
        this.form.img = '';
      }
    },
   async loadNotRecommendFlights(){
      let [err,response] = await handle(api_recommend.recommendNotSelected(this.recommendId));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){this.$message.error('获取可选的航班列表失败');return this.$message.error(msg)}
      this.notFlights = res.data;
    },
    transToOption(){
      console.log(this.notFlights)
      this.options = this.notFlights.map(val=>{
        let result = {value:val.flightId,text:`${val.flightName}
                ${val.departureCityName}
                ${moment((val.sailingTime-0)*1000).format('hh-mm')}
                ---
                ${val.targetCityName}
                ${moment((val.langdinTime-0)*1000).format('hh-mm')}`
                }
        return result
      });
      this.initForm();
    },
    async addHandle(){
      let recommendId = this.recommendId;
      let flightId = this.form.flightId;
      let zIndex = this.form.zIndex;
      let img = this.form.img;
      let [err,response] = await handle(api_recommend.addRecommendItem(recommendId,flightId,img,zIndex));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){return this.$message.error(msg)}
      this.okHandle();
    },
    // 修改航班
    async submitHandle(e) {
      if(!this.isEdit){return this.$message.warn('非编辑状态,不允许编辑')}
      let changeParam = {};
      let b = false;
      if(this.form.img != this.img){
        b=true;
        changeParam.img = this.form.img
      }

      if(this.form.zIndex != this.zIndex){
        b=true;
        changeParam.zIndex = this.form.zIndex
      }
      if(!b){
        return this.$message.warn('没有修改项')
      }
      let [err,response] = await handle(api_recommend.changeRecommendItem(this.recommendId,this.flightId,changeParam));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        // 登陆成功
        this.$message.error(`编辑活动项失败`);
        this.$message.error(msg);
        return;
      }
      this.$message.success(`编辑活动项成功`);
      this.okHandle();
    },
    okHandle(){
      this.hideImgPop();
     this.$emit('ok');
    },
    cancelHandle(){
      this.initForm();
      this.hideImgPop();
      this.$emit('cancel');
    },

    hideImgPop(){
      this.imgShow = false;
      this.imgLoading = false;
    },
    imgOkHandle(imgUrl){
      this.form.img = imgUrl;
      this.hideImgPop();
    },
    showImgSelect(){
      this.imgShow = true;
      this.imgLoading = false;
    },
  }
}
</script>

<style scoped>

</style>