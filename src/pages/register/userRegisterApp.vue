<!--
 * @Author: your name
 * @Date: 2021-08-02 09:37:49
 * @LastEditTime: 2021-11-22 17:08:53
 * @LastEditors: kindring
 * @Description: 用户登陆页面
 * @FilePath: \web_camera\src\adminLoginApp.vue
-->
<template>
  <div class="w-screen h-screen flex flex-col">
    <div
        class="
        content
        w-full
        h-full
        bg-gray-200
        flex-shrink-1
        relative
        box-border
        overflow-hidden
        "
    >
      <div class="bg-block bg-blue-300">
        <div class="bg-block bg-yellow-200">
          <div class="bg-block bg-block2  bg-blue-100"></div>
          <div class="bg-block right-1/4 bg-green-300">
            <div class="bg-block bg-pink-600">
              <div class="bg-block bg-block2  bg-blue-100"></div>
            </div>
            <div class="bg-block2 bg-yellow-200">
              <div class="bg-block bg-block2  bg-red-100"></div>
            </div>
            <div class="bg-block2 bg-pink-300">
              <div class="bg-block bg-block2  bg-blue-100"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-block right-1/4 bg-green-300">
        <div class="bg-block bg-yellow-200">
          <div class="bg-block bg-block2  bg-blue-100"></div>
        </div>
        <div class="bg-block2 bg-yellow-200">
          <div class="bg-block bg-block2  bg-red-100"></div>
        </div>
        <div class="bg-block2 bg-pink-300">
          <div class="bg-block bg-block2  bg-blue-100"></div>
        </div>
      </div>

      <div class=" px-2.5 relative w-full h-full  flex justify-center items-center ">
        <div class="left-0 lg:-left-10 w-4/6  h-4/5 login-box relative border overflow-auto rounded">
          <div class="overflow-hidden w-full h-full absolute">
            <div class="bg-block bg-blue-300">
              <div class="bg-block bg-yellow-200">
                <div class="bg-block bg-block2  bg-red-100"></div>
              </div>
            </div>
          </div>

          <div class="title relative  text-xl">Z机票预定网-注册</div>
          <a-form-model
              class="relative"
              ref="ruleForm"
              :model="form"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
          >
            <!--            用户名-->
            <a-form-model-item
                class="mt-6"
                ref="nickName"
                label="昵称"
                has-feedback
                prop="nickName">
              <a-input
                  class="w-full"
                  v-model="form.nickName"
                  placeholder="你的名字"
                  @blue="() => {
                    $refs.nickName.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>

            <!--            用户名-->
            <a-form-model-item
                class="mt-6"
                ref="account"
                label="账号"
                has-feedback
                prop="account">
              <a-input
                  class="w-full"
                  v-model="form.account"
                  placeholder="登录用的账号"
                  @blur="() => {
                    $refs.account.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>

            <!--            用户密码-->
            <a-form-model-item
                class="mt-2"
                ref="password"
                label="密码"
                has-feedback
                prop="password">
              <a-input-password
                  class="w-full"
                  placeholder="用户密码"
                  v-model="form.password"
                  @blur="() => {$refs.password.onFieldBlur();}"
              />
            </a-form-model-item>

            <!--            用户密码2-->
            <a-form-model-item
                class="mt-2"
                ref="password2"
                label="确认密码"
                has-feedback
                prop="password2"

            >
              <a-input-password
                  class="w-full"
                  placeholder="确认密码"
                  v-model="form.password2"
                  @blur="() => {$refs.password.onFieldBlur();}"
              />
            </a-form-model-item>
            <!--            用户名-->
            <a-form-model-item
                class="mt-6"
                ref="captcha"
                label="验证码"
                has-feedback
                prop="captcha">
              <a-input
                  class="w-full"
                  v-model="form.captcha"
                  placeholder="验证码,忽略大小写"
                  @keydown.enter="submitHandle"
                  @blur="
                  () => {
                    $refs.captcha.onFieldBlur();
                  }
                "
              />
              <captcha class="w-full h-24 overflow-hidden mt-1.5 rounded" ref="captchaImg" captcha-url="/api/captcha"></captcha>
            </a-form-model-item>
            <!--             提交按钮            -->
            <a-row class="mt-10">
              <a-col :span="labelCol.span">

              </a-col>
              <a-col>
                <a-button-group>
                  <a-button @click="resetForm">重置</a-button>
                  <a-button type="primary" @click="submitHandle">确认</a-button>
                </a-button-group>
              </a-col>
            </a-row>

          </a-form-model>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "@/components/public/captcha";
import userApi from '@/apis/api_user';
import handle from "@/utils/handle";
import business from "@/utils/business";
export default {
  name: 'App',
  components: {
    Captcha
    // HelloWorld,
  },
  data(){
    return {
      // 是否为固定
      labelCol: {span: 4},
      wrapperCol: {span: 16},
      form: {
        nickName: '',
        account: '',
        password: '',
        password2: '',
        captcha: '',
      },
      // 要切换的url地址
      jumpUrl: '/login',
      rules: {
        nickName: [
          {required: 'true', message: '请输入用户名'}
        ],
        account: [
          {required: 'true', message: '请输入登录账户'},
          {validator: this.checkAccount}
        ],
        password: [
          {required: 'true', message: '请输入登陆密码'}
        ],
        password2: [
          {required: 'true', message: '请再次输入登陆密码'},
          {validator: this.checkPassword}
        ],
        captcha: [
          {required: 'true', message: '请输入验证码'}
        ]
      },
      timer: null
    }
  },
  computed:{
  },
  beforeMount(){
  },
  mounted(){
    let url = window.sessionStorage.getItem('lastUrl');
    if(url){
      this.jumpUrl = url;
    }
  },
  methods:{
    checkPassword(rule, value, callback) {
      if (this.form.password != value) {
        // 如果需要返回 error msg，就把它传给 `callback()`
        callback('两次密码不一致');
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback();
      }
    },
    checkAccount(rule, value, callback){
      if(this.timer){
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(async()=>{
        let [err,response] = await handle(userApi.checkAccount(value));
        console.log(response);
        let {ok,msg,res} = business.checkResponseRcode(response,err);
        if(ok){
          callback();
        }else{
          callback(msg);
        }
      },700);
    },
    resetForm(){
      this.form.nickName = '';
      this.form.account = '';
      this.form.password = '';
      this.form.password2 = '';
      this.form.captcha = '';
    },
    async submitHandle(e){
      let nickName = this.form.nickName;
      let account = this.form.account;
      let passwd = this.form.password;
      let captcha = this.form.captcha;
      this.$refs.ruleForm.validate(async valid=>{
        console.log(valid)
        if(!valid){
          this.$message.warn('请正确填写数据');
        }else{
          console.log(account,passwd,captcha);
          let [err,response] = await handle(userApi.register(nickName,account,passwd,captcha));
          console.log(response);
          let rcodeMean = business.checkResponseRcode(response,err);
          if(rcodeMean.ok){
            // 登陆成功
            this.$message.success(`注册成功,稍后进行页面跳转`);
            this.countDown();
          }else{
            // 登陆失败
            this.$message[rcodeMean.type](rcodeMean.msg);
            // 更新验证码
            this.$refs.captchaImg.refreshCaptcha();
            this.form.captcha = '';
          }
        }
      })


    },
    // 登陆成功
    countDown() {
      let secondsToGo = 5,that=this;

      const modal = this.$success({
        title: '注册成功',
        content: `将在${secondsToGo} 秒后自动跳转页面.`,
        okText:'立即跳转',
        onOk() {
          window.location.href=that.jumpUrl;
        },
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `将在${secondsToGo} 秒后自动跳转页面.`,
        });
      }, 1000);
      setTimeout(() => {
        window.location.href=that.jumpUrl;
      }, 1+(secondsToGo * 1000));
    },
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.bg-block{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 33%;
  top: 0%;
  transform: rotate(
      288deg);
  box-shadow: 0px 0px 15px 0px black;
}
.title{
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid black;
  text-indent: 1em;
}
.bg-block2{
  left: 10%;
}
.bg-block2 > .bg-block2{
  transform: scale(0.5);
}
.logo{
  width: 100%;
  height: auto;
}
.login-box{
  background-color: hsl(0deg 0% 99% / 66%);;
  box-shadow: 1px 3px 20px #525252;
}

.logo > img{
  display: block;
  width: 100%;
}
.full-screen{
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 0px;
  top: 0px;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .7s;
  z-index: 999;
  border-radius: 3px;
}
.full-screen:hover{
  width: 28px;
  height: 28px;
  left: 2px;
  top: 2px;
}
</style>
