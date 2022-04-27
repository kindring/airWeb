<template>
  <a-card :title="title" :bordered="false" class="w-96">
    <a-form-model
        class="relative"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <!--           乘车人名字-->
      <a-form-model-item
          class="mt-6"
          ref="name"
          label="乘车人名字"
          has-feedback
          prop="name">
        <a-input
            class="w-full"
            v-model="form.name"
            placeholder="请输入乘车人名字"
            @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }
                "
        />
      </a-form-model-item>

      <!--           乘车人身份证号-->
      <a-form-model-item
          class="mt-6"
          ref="card"
          label="身份证号"
          has-feedback
          prop="card">
        <a-input
            class="w-full"
            v-model="form.card"
            placeholder="请输入乘车人身份证号"
            @blur="
                  () => {
                    $refs.card.onFieldBlur();
                  }
                "
        />
      </a-form-model-item>

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


      <!--             提交按钮            -->
      <a-row class="mt-10">
        <a-col :span="labelCol.span">

        </a-col>
        <a-col>
          <a-button-group>
            <a-button @click="hideEditPop">取消修改</a-button>
            <a-button type="primary" @click="submitHandle">{{title}}</a-button>
          </a-button-group>
        </a-col>
      </a-row>
    </a-form-model>
    <a-modal
        title="安全验证"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <!--           登陆密码-->
      <a-form-model-item
          class="mt-6"
          has-feedback>
        <a-input
            class="w-full"
            v-model="passwd"
            placeholder="请输入登陆密码"
        />
      </a-form-model-item>
    </a-modal>
  </a-card>
</template>

<script>
import fields from "@/mapField/field";
import api_user from "@/apis/api_user";
import handle from "@/utils/handle";
import business from "@/utils/business";
export default {
  name: "addTravel",
  props: {
    travelId: {},
  },
  data(){
    return {
      title: '新增乘车人',
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      visible: false,
      confirmLoading: false,
      name: '',
      phone: '',
      card: '',
      passwd: '',
      form: {
        name: '',
        card: '',
        phone: '',
        passwd: ''
      },
      rules: {
        name: [
          {required: 'true',message: '请输入乘车人姓名'},
        ],
        card: [
          {required: 'true',message: '请输入身份证号'},
          {validator: this.checkCard}
        ],
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
  mounted(){
    if(this.travelId){
      this.title = `编辑乘车人`
      this.visible = true;
    }else{
      this.title = `新增乘车人`
      this.form.name = '';
      this.form.card = '';
      this.form.phone = '';
    }

  },
  methods:{
    checkCard(rule, value, callback){
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (reg.test(value)) {
        // 如果需要返回 error msg，就把它传给 `callback()`
        callback();
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback('身份证号格式不对');
      }
    },
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
    async loadTravelInfo(passwd){

    },
    async submitHandle(){
      let fn,params = {},_arguments;
      // 检查是否成功
      if(this.travelId){
        if(this.name == this.form.name&&this.card == this.form.card&&this.phone == this.form.phone){
          return this.$message.warn('没有修改项');
        }
        if(this.name != this.form.name){params.name=this.form.name
          console.log(params)}
        if(this.card != this.form.card){params.card=this.form.card}
        if(this.phone != this.form.phone){params.phone=this.form.phone}
        fn=api_user.changeTravel;
        _arguments= [this.travelId,params]
      }else{
        fn=api_user.addTravel;
        _arguments= [this.form.name,this.form.card,this.form.phone]
      }
      console.log(_arguments);
      let [err,response] = await handle(fn(..._arguments));
      let recodeMeta = business.checkResponseRcode(response,err);
      if(!recodeMeta.ok){
        return this.$message.error(recodeMeta.msg);
      }
      this.$message.success(`${this.title}成功`);
      this.$emit('ok')
    },
    async handleOk(){
      if(!this.passwd){
        return this.$message.warn('请输入密码');
      }
      this.confirmLoading = true;
      let [err,response] = await handle(api_user.travelInfo(this.passwd,this.travelId));
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      this.confirmLoading = false;
      if(!ok){
        return this.$message.error(msg);
      }
      this.name = res.data.name;
      this.card = res.data.card;
      this.phone = res.data.phone;
      this.form.name = res.data.name;
      this.form.card = res.data.card;
      this.form.phone = res.data.phone;
      this.visible = false;
    },
    handleCancel(){
      this.hideEditPop();
    }
  }
}
</script>

<style scoped>

</style>
