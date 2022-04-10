<template>
  <div class="captchaBox">
    <img :src="captcha" alt="验证码加载失败,点击刷新" @load="loadedImage" @error="imageErrorHandle">
    <div class="captchaFull refresh" @click="refreshCaptcha" v-show="!loading">点击刷新验证码</div>
    <div class="captchaFull image-loading" v-show="loading">加载中...</div>
  </div>
</template>

<script>
export default {
  name: "captcha",
  props: {
    captchaUrl: {default:''},
  },
  data(){
    return {
      captcha:'',
      loading: true,
    }
  },
  mounted() {
    this.captcha = this.captchaUrl;
  },
  methods:{
    refreshCaptcha(){
      this.loading = true;
      this.captcha = this.captchaUrl + `?k1=${Math.random()}&k2=${Math.random()}`
    },
    loadedImage(){
      console.log('图片加载完毕')
      this.loading = false;
    },
    imageErrorHandle(){
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.captchaBox{
  position: relative;
  border: 1px solid whitesmoke;
  background-color: #fff;
}
.captchaBox > img{
  width: 100%;
  height: 100%;
}
.captchaFull{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0,0,0,0.3);
  transition: opacity 0.7s;
  cursor: pointer;
  user-select:none;
}
.refresh{
  opacity: 0;
}
.refresh:hover{
  opacity: 1;
}
</style>