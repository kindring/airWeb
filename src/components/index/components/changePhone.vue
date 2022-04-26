<template>
  <a-card title="编辑绑定的手机号" :bordered="false" class="w-96">
    <a-form-model
        class="relative"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <!--           手机号-->
      <a-form-model-item
          class="mt-6"
          ref="phone"
          label="手机号"
          has-feedback
          prop="phone">
        <a-input
            class="w-full"
            v-model="form.phone"
            placeholder="请输入手机号"
            @blur="
                  () => {
                    $refs.phone.onFieldBlur();
                  }
                "
        />
      </a-form-model-item>
      <!--           登陆密码-->
      <a-form-model-item
          class="mt-6"
          ref="passwd"
          label="登陆密码"
          has-feedback
          prop="passwd">
        <a-input
            class="w-full"
            v-model="form.passwd"
            placeholder="请输入登陆密码"
            @blur="
                  () => {
                    $refs.passwd.onFieldBlur();
                  }
                "
        />
      </a-form-model-item>

      <!--             提交按钮            -->
      <a-row class="mt-10">
        <a-col :span="labelCol.span">

        </a-col>
        <a-col>
          <a-button-group>
            <a-button @click="hideEditPop">取消修改</a-button>
            <a-button type="primary" @click="submitHandle">修改手机号</a-button>
          </a-button-group>
        </a-col>
      </a-row>

    </a-form-model>
  </a-card>
</template>

<script>
import fields from "@/mapField/field";
import api_user from "@/apis/api_user";
import handle from "@/utils/handle";
import business from "@/utils/business";
export default {
  name: "changePhone",
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        phone: '',
        passwd: ''
      },
      rules: {
        phone: [
          {required: 'true',message: '手机号为必填'},
          {validator: this.checkPhone}
        ],
        passwd: [
          {required: 'true',message: '请输入密码'},
        ],
      }
    }
  },
  methods:{
    checkPhone(rule, value, callback){
      let reg = /^1[3-9]\d{9}$/;
      if (reg.test(value)) {
        // 如果需要返回 error msg，就把它传给 `callback()`
        callback();
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback('手机号格式不对');
      }
    },
    hideEditPop(){
      this.$emit('cancel');
    },
    async submitHandle(){
      let [err,response] = await handle(api_user.changePhone(this.form.phone,this.form.passwd));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      this.$message.success('修改手机号成功');
      this.$emit('ok',this.form.phone)
    }
  }
}
</script>

<style scoped>

</style>
