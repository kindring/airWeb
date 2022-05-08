<template>
  <div class="w-full">
    <round-title>新增推荐</round-title>
    <table-layout >
      <template #header>请输入活动信息</template>
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

        <!--             提交按钮            -->
        <a-row class="mt-10">
          <a-col :span="labelCol.span">

          </a-col>
          <a-col>
            <a-button-group>
              <a-button @click="resetForm">重置</a-button>
              <a-button type="primary" @click="submitHandle">增加活动</a-button>
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
import handle from "@/utils/handle";
import userApi from "@/apis/api_user";
import business from "@/utils/business";
import api_city from "@/apis/api_city";
export default {
  name: "addRecommend",
  components: { tableLayout, RoundTitle},
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      form: {
        recommendName: '',
        discript: '',
        zIndex: 1,
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
      }
    }
  },
  methods:{
    // 重置表单
    resetForm(){
      this.form.recommendName = '';
      this.form.discript = '';
      this.form.zIndex = 1;
    },
    async submitHandle(e) {
      let recommendName = this.form.recommendName;
      let discript = this.form.discript;
      let zIndex = this.form.zIndex;
      let [err,response] = await handle(api_city.addRecommend(recommendName,discript,zIndex));
      console.log(response);
      let rcodeMean = business.checkResponseRcode(response,err);
      if(rcodeMean.ok){
        // 登陆成功
        this.$message.success(`添加活动成功`);
        this.countDown();
      }else{
        this.$message.error('添加活动失败')
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
          that.$router.push('/recommends');
        },
      });
    },
  }
}
</script>

<style scoped>

</style>
