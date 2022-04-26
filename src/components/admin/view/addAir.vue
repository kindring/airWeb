<template>
  <div class="w-full">
    <round-title>新增城市</round-title>
    <table-layout >
      <template #header>请输入城市信息</template>
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
        <!--            用户密码-->
        <a-form-model-item
            class="mt-2"
            ref="cityType"
            label="城市类型"
            has-feedback
            prop="cityType">
          <table-select
              class="w-48"
              :options="cityTypes"
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
              <a-button @click="resetForm">重置</a-button>
              <a-button type="primary" @click="submitHandle">增加城市</a-button>
            </a-button-group>
          </a-col>
        </a-row>

      </a-form-model>
    </table-layout>
  </div>
</template>

<script>
import RoundTitle from "@components/public/roundTitle";
import tableLayout from "@components/admin/components/tableLayout";
import fields from '@/mapField/field'
import TableSelect from "@components/admin/components/tableSelect";
import handle from "@/utils/handle";
import userApi from "@/apis/api_user";
import business from "@/utils/business";
import api_city from "@/apis/api_city";
export default {
  name: "addAir",
  components: {TableSelect, tableLayout, RoundTitle},
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        cityName: '',
        cityType: fields.cityType_domestic,
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
      }
    }
  },
  methods:{
    // 重置表单
    resetForm(){
      this.form.cityName = '';
      this.form.cityType = fields.cityType_domestic;
    },
    async submitHandle(e) {
      let cityName = this.form.cityName;
      let cityType = this.form.cityType;
      // console.log(cityName,cityType);
      let [err,response] = await handle(api_city.addCity(cityType,cityName));
      console.log(response);
      let rcodeMean = business.checkResponseRcode(response,err);
      if(rcodeMean.ok){
        // 登陆成功
        this.$message.success(`添加城市成功`);
        this.countDown();
      }else{
        this.$message.error('添加城市失败')
        this.$message[rcodeMean.type](rcodeMean.msg);
      }
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
          that.$router.push('/citys');
        },
      });
    },
  }
}
</script>

<style scoped>

</style>
