<template>
  <div class="w-full">
    <round-title>{{ pageText }}</round-title>
    <table-layout >
      <template #header>请输入航班信息</template>
      <a-form-model
          class="relative"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
      >
        <!--            航班名-->
        <a-form-model-item
            class="mt-6"
            ref="flightName"
            label="航班名"
            has-feedback
            prop="flightName">
          <a-input
              class="w-full"
              v-model="form.flightName"
              placeholder="请输入航班名"
              @blur="
                  () => {
                    $refs.flightName.onFieldBlur();
                  }
                "
          />
        </a-form-model-item>
        <!--            飞机代号-->
        <a-form-model-item
            class="mt-6"
            ref="airCode"
            label="飞机代号"
            has-feedback
            prop="airCode">
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

        <!--            价格-->
        <a-form-model-item
            class="mt-2"
            ref="originalPrice"
            label="机票原价"
            has-feedback
            prop="originalPrice">
          <a-input-number
              class="w-full"
              :default-value="1000"
              :min="0"
              :max="99999"
              step="0.01"
              :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              v-model="form.originalPrice"
          />
        </a-form-model-item>

        <!--            优惠价格-->
        <a-form-model-item
            class="mt-2"
            ref="currentPrice"
            label="当前价格"
            has-feedback
            prop="currentPrice">
          <a-input-number
              class="w-full"
              :default-value="1000"
              :min="0"
              :max="99999"
              step="0.01"
              :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              v-model="form.currentPrice"
          />
        </a-form-model-item>

<!--        机票数量-->
        <a-form-model-item
            class="mt-2"
            ref="totalVotes"
            label="机票数量"
            has-feedback
            prop="totalVotes">
          <div class="flex w-full">
            <div class="w-1/12 flex justify-center items-center" v-if="flightId">
              已售{{ flightData.pay}}/
            </div>
            <a-input-number
                class="w-11/12"
                :default-value="100"
                :min="0"
                :max="150"
                step="1"
                v-model="form.totalVotes"
            />
          </div>

        </a-form-model-item>

        <!--            起始时间-->
        <a-form-model-item
            class="mt-2"
            ref="currentPrice"
            label="起始时间"
            has-feedback
            prop="currentPrice">
          <a-range-picker
              :disabled-date="disabledDate"
              :disabled-time="disabledRangeTime"
              :show-time="{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
              }"
              v-model="form.times"
              format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-model-item>

        <!--            起始城市-->
        <a-form-model-item
            class="mt-2"
            ref="currentPrice"
            label="起始城市"
            has-feedback
            prop="currentPrice">
          <div class="flex items-center">
<!--            出发城市-->
            <a-switch class="mt-4"
                      checked-children="国内"
                      un-checked-children="国际"
                      v-model="departureTypeIsDomestic"
                      default-checked
                      @change="cityTypeChange(false)"
            />
            <div class=" w-48">
              <table-select
                  class="w-24"
                  :options="departureOptions"
                  v-model="form.departureCity"
                  keystr="departureCity">
              </table-select>
            </div>

            <div class="w-8 text-center">-</div>
<!--            目标城市-->
            <a-switch class="mt-4"
                      checked-children="国内"
                      un-checked-children="国际"
                      v-model="targetTypeIsDomestic"
                      @change="cityTypeChange(false)"
                       />
            <div class=" w-48">
              <table-select
                  class="w-24"
                  :options="targetOptions"
                  v-model="form.targetCity"
                  @change="cityTypeChange(false)"
                  keystr="targetCity">
              </table-select>
            </div>
          </div>
        </a-form-model-item>

        <!--             提交按钮            -->
        <a-row class="mt-10">
          <a-col :span="labelCol.span">

          </a-col>
          <a-col>
            <a-button-group>
              <a-button >
                <router-link
                    to="/flights"
                    v-if="flightId"
                    type="danger"
                >取消</router-link>
              </a-button>
              <a-button @click="resetForm" v-if="!flightId">重置</a-button>
              <a-button type="primary" @click="submitHandle">{{ flightId?'修改航班':'增加航班' }}</a-button>
            </a-button-group>
          </a-col>
        </a-row>

      </a-form-model>
    </table-layout>
  </div>
</template>

<script>
import moment from 'moment';
import RoundTitle from "@components/public/roundTitle";
import tableLayout from "@components/admin/components/tableLayout";
import fields from '@/mapField/field'
import TableSelect from "@components/admin/components/tableSelect";
import handle from "@/utils/handle";
import userApi from "@/apis/api_user";
import business from "@/utils/business";
import api_flight from "@/apis/api_flight";
import {mapActions, mapState} from "vuex";
import types from "@/store/adminTypes";
export default {
  name: "addFlight",
  components: {
    TableSelect,
    tableLayout, RoundTitle},
  data(){
    return {
      pageText: '新增航班',
      isAdd: true,
      flightId: null,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        flightName: '',
        airCode: '',
        originalPrice: 0,
        currentPrice: 0,
        times:[
          moment(1649870807*1000),
          '',
        ],
        sailingTime: '',
        langdinTime: '',
        // 票数
        totalVotes: 0,
        // 出发城市
        departureCity: '',
        // 目标城市
        targetCity:'',
      },
      cityTypes:[
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
      },

      domesticCityOption: [],
      internationalCityOption: [],
      // 出发城市可选项
      departureOptions: [],
      // 目标城市可选项
      targetOptions: [],
      // 出发城市可选项类型
      departureTypeIsDomestic: true,
      // 目标城市可选类型
      targetTypeIsDomestic: true,
      // 航班具体数据
      flightData: {}
    }
  },
  computed:{
    ...mapState({
      // 国内城市
      domesticCitys: state=>state.citys[types.citys.state.domestic],
      // 国际城市
      internationalCitys: state=>state.citys[types.citys.state.international],
    }),
  },
  async mounted(){
    console.log(this.$route.query);
    if(this.$route.query&&this.$route.query.flightId){
      this.flightId = this.$route.query.flightId;
      this.pageText = '编辑航班信息';
      await this.loadFlight();
    }else{
      this.resetForm();
    }
    await this.loadCityList();
    this.cityTypeChange(true);
  },
  methods:{
    ...mapActions({
      loadCitys: types.citys.actions.loadCity,
    }),
    // 时间选择框部分
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },
    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },

    // 直接按照类型进行切换出发和结束城市
    cityTypeChange(first){
      console.log('修改类型')
      // 根据内容修改数据
      if(this.departureTypeIsDomestic){
        this.departureOptions = this.domesticCityOption;
      }else{
        this.departureOptions = this.internationalCityOption;
      }
      if(first&&!this.flightId){
        this.form.departureCity = this.departureOptions[0].value;
      }
      console.log(this.targetTypeIsDomestic)
      // 根据内容修改数据
      if(this.targetTypeIsDomestic){
        this.targetOptions = this.domesticCityOption;
      }else{
        this.targetOptions = this.internationalCityOption;
      }
      if(first&&!this.flightId){
        this.form.targetCity = this.targetOptions[0].value
      }

    },
    // 加载表单
    async loadCityList(first){

      await this.loadCitys({cityType:fields.cityType_domestic,load:true});
      await this.loadCitys({cityType:fields.cityType_international,load:true});

      // 转换为options的数据结构
      this.domesticCitys.forEach(val=>{
        if(val.id == this.flightData.departureCity){
          this.departureTypeIsDomestic = true;
        }
        if(val.id == this.flightData.targetCity){
          this.targetTypeIsDomestic = true;
        }
        this.domesticCityOption.push({
          value:val.id,
          text: val.cityName
        });
      });
      // 转换为options的数据结构
      this.internationalCitys.forEach(val=>{
        // console.log(val);
        if(val.id == this.flightData.departureCity){
          this.departureTypeIsDomestic = false;
        }
        if(val.id == this.flightData.targetCity){
          this.targetTypeIsDomestic = false;
        }
        this.internationalCityOption.push({
          value:val.id,
          text: val.cityName
        });
      })
    },
    // 加载航班具体数据
    async loadFlight(){
      if(!this.flightId){
        return this.$message.info('没有id拒绝获取机票信息')
      }
      let [err,response] = await handle(api_flight.flightInfo(this.flightId));
      console.log(response);

      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(err)return this.$message.error(msg);
      res.data;
      this.$message.success('航班数据加载完成');
      this.flightData = res.data;
      this.form.flightName = res.data.flightName;
      this.form.airCode = res.data.airCode;
      this.form.originalPrice = res.data.originalPrice;
      this.form.currentPrice = res.data.currentPrice;
      this.form.departureCity = res.data.departureCity;
      this.form.targetCity = res.data.targetCity;
      this.form.totalVotes = res.data.totalVotes;
      this.form.times[0] = moment((res.data.sailingTime-0)*1000);
      this.form.times[1] = moment((res.data.langdinTime -0)*1000);
      // 判断是什么类型的数据
    },
    // 重置表单
    resetForm(){
      if (this.flightId){
        return this.$message.warn('无法重置表单');
      }
      this.flightId = '';
      this.form.flightName = '';
      this.form.airCode = '';
      this.form.departureCity = 0;
      this.form.targetCity = 0;
      this.form.times = [];
      this.form.currentPrice = 0;
      this.form.originalPrice = 0;
      this.form.totalVotes = 0;
    },
    async submitHandle(e) {
      // 读取数据
      let times = this.form.times,
          sailingTimeUnix,
          langdinTimeUnix,
          body = {};
          body.departureCity = this.form.departureCity;
          body.targetCity = this.form.targetCity;
          body.times = this.form.times;
          body.airCode = this.form.airCode;
          body.flightName = this.form.flightName;
          body.currentPrice = this.form.currentPrice;
          body.originalPrice = this.form.originalPrice;
          body.totalVotes = this.form.totalVotes;
      console.log(times)
          if(times[0]){
            sailingTimeUnix = times[0].valueOf();
            body.sailingTime = (sailingTimeUnix-0) / 1000;
          }
          if(times[1]){
            langdinTimeUnix = times[1].valueOf();
            body.langdinTime = (langdinTimeUnix-0) / 1000;
          }
      // return false;
      let promiseFn,changeOption = {};
      if (this.flightId){
      //  修改航班
          // 获取修改项
          // 航班名
        if(this.flightData.flightName != this.form.flightName) {changeOption.flightName = this.form.flightName;}
          // 飞机code
          if(this.flightData.airCode != this.form.airCode) { changeOption.flightName = this.form.flightName;}
          // 原价
          if(this.flightData.originalPrice != this.form.originalPrice) {changeOption.originalPrice = this.form.originalPrice;}
          if(this.flightData.currentPrice != this.form.currentPrice) {changeOption.currentPrice = this.form.currentPrice;}
          if(this.flightData.sailingTime !=  body.sailingTime) {changeOption.sailingTime = body.sailingTime;}
          if(this.flightData.departureCity != this.form.departureCity) {changeOption.departureCity = this.form.departureCity;}
          if(this.flightData.targetCity != this.form.targetCity) {changeOption.targetCity = this.form.targetCity;}
          if(this.flightData.flightName != this.form.flightName) {changeOption.flightName = this.form.flightName;}
          if(this.flightData.langdinTime != body.langdinTime) {changeOption.langdinTime =  body.langdinTime}
        if(this.flightData.totalVotes != this.form.totalVotes) {changeOption.totalVotes = this.form.totalVotes;}
          promiseFn = api_flight.chnageFlight(this.flightId,changeOption);
      }else{
        //  新增航班
        // 判断参数是否合法
        if(!body.flightName){return this.$message.warn('请输入航班名');}
        if(!body.departureCity){return this.$message.warn('请选择出发城市');}
        if(!body.targetCity){return this.$message.warn('请选择目标城市');}
        if(!body.sailingTime){return this.$message.warn('请输入出发时间');}
        if(!body.langdinTime){return this.$message.warn('请输入到站时间');}
        if(!body.totalVotes){return this.$message.warn('请输入机票数量');}
        // api_flight.addFlight(body)
        promiseFn = api_flight.addFlight(body)
      }
      // console.log(cityName,cityType);
      let [err,response] = await handle(promiseFn);
      console.log(response);
      let rcodeMean = business.checkResponseRcode(response,err);
      if(rcodeMean.ok){
        // 登陆成功
        this.$message.success(`操作航班成功`);
        this.countDown();
      }else{
        this.$message.error('操作航班成功');
        this.$message[rcodeMean.type](rcodeMean.msg);
      }
    },
    // 新增成功
    countDown() {
      let that=this;
      const modal = this.$success({
        title: '成功',
        content: `操作航班成功,.`,
        okText:'跳转航班列表',
        cancelText: '继续添加',
        onCancel() {
          that.resetForm();
        },
        onOk() {
          that.$router.push('/flights');
        },
      });
    },
  }
}
</script>

<style scoped>

</style>
