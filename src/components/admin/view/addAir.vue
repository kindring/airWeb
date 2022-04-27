<template>
  <div class="w-full">
    <round-title>新增飞机</round-title>
    <table-layout >
      <template #header>请输入飞机信息</template>
      <a-form-model
          class="relative pb-3"
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
            ref="airRow"
            label="座位行数"
            has-feedback
            prop="airRow">
          <a-input-number class="w-full"
                          v-model="form.airRow"
                          placeholder="座位行数"
                          step="1"
                          @blur="
                  () => {
                    $refs.airRow.onFieldBlur();
                  }
                "></a-input-number>
        </a-form-model-item>
        <!--            每行多少排 -->
        <a-form-model-item
            class="mt-2"
            ref="airCol"
            label="每排座位"
            has-feedback
            prop="airCol">
          <a-input-number class="w-full"
                          v-model="form.airCol"
                          placeholder="每排座位"
                          step="1"
                          @blur="
                  () => {
                    $refs.airCol.onFieldBlur();
                  }
                "></a-input-number>
        </a-form-model-item>

        <!--             提交按钮            -->
        <a-row class="mt-10">
          <a-col :span="labelCol.span">

          </a-col>
          <a-col>
            <a-button-group>
              <a-button @click="resetForm">重置</a-button>
              <a-button type="primary" @click="submitHandle">增加飞机</a-button>
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
import api_flight from "@/apis/api_flight";
import AirLink from "@components/public/airLink";
export default {
  name: "addAir",
  components: { tableLayout, RoundTitle},
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        airCode: '',
        airRow: 0,
        airCol: 0,
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
  methods:{
    // 重置表单
    resetForm(){
      this.form.airCode = '';
      this.form.airRow = 0;
      this.form.airCol = 0;
    },
    async submitHandle(e) {
      let airCode = this.form.airCode;
      let airRow = this.form.airRow;
      let airCol = this.form.airCol;
      // console.log(cityName,cityType);
      let [err,response] = await handle(api_flight.addAir(airCode,airRow,airCol));
      console.log(response);
      let rcodeMean = business.checkResponseRcode(response,err);
      if(rcodeMean.ok){
        // 登陆成功
        this.$message.success(`添加飞机成功`);
        this.countDown();
      }else{
        this.$message.error('添加飞机失败')
        this.$message[rcodeMean.type](rcodeMean.msg);
      }
    },
    // 新增成功
    countDown() {
      let that=this;
      const modal = this.$success({
        title: '新增飞机成功',
        content: `新飞机添加成功,.`,
        okText:'跳转飞机列表',
        cancelText: '继续添加',
        onCancel() {
          that.resetForm();
        },
        onOk() {
          that.$router.push('/airs');
        },
      });
    },
  }
}
</script>

<style scoped>

</style>
