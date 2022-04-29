<template>
  <a-card title="支付订单" :bordered="false" class="w-96">
    <a-form-model
        class="relative"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <div class="px-1 py-2 text-2xl">
        请确认是否支付订单
      </div>
      <div class="px-1 py-2">
        乘客数量: <span class="px-2">{{buyNum}}</span>
      </div>
      <div class="px-1 py-2">
        机票单价: <span class="px-2 text-red-400">{{flightPrice}}</span>
      </div>
      <div class="px-1 py-2">
        订单总价: <span class="px-2 text-red-500">{{buyNum*flightPrice}}</span>
      </div>
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
            <a-button type="primary" @click="submitHandle">支付订单</a-button>
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
  name: "payOrder",
  props:{
    orderId:{required:true},
    flightPrice:{required:true},
    buyNum:{default:1}
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        phone: '',
        passwd: ''
      },
      rules: {
        passwd: [
          {required: 'true',message: '请输入密码'},
        ],
      }
    }
  },
  methods:{
    hideEditPop(){
      this.$emit('cancel');
    },
    async submitHandle(){
      // 支付订单
      if(!this.orderId){
        return this.$message.error('未选择订单');
      }
      if(!this.form.passwd){
        return this.$message.error('请输入密码');
      }
      let [err,response] = await handle(api_user.payOrder(this.orderId,this.form.passwd));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      this.$message.success('订单支付成功');
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>

</style>
