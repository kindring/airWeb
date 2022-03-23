<template>
  <div class="w-full flex justify-center ">
    <!--      轮播,广告-->
    <div class="banner h-48">
<!--      轮播图片,通过show切换-->
      <img src="" alt="">
<!--      点击切换控制 -->
      <div class="banner-control">
        <div class="banner-handle"></div>
      </div>
    </div>
<!--    -->
    <div class="w-p1200 h-full">
    </div>

<!--      机票搜索-->

<!--      低价线路机票-->

  </div>
</template>

<script>
export default {
  name: "airHome",
  data(){
    return {

    }
  },

}
</script>

<style lang="scss" scoped>
.banner{
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  .img{
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
  }
  .banner-control{
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    bottom: 35px;
    transform: translate(-50%,0);
    z-index: 3;
    display: flex;
    padding: 5px;
    border-radius: 3px;
    background-color: #fff;
    opacity: 0.8;
    .banner-handle{
      width: 10px;
      height: 5px;
      border-radius: 2px;
      transition: all 0.6s;
      margin: 0 2px;
      background-color: rgba(178, 160, 160, 0.79);
    }
    .banner-handle-now{
      width: 15px;
      background-color: rgba(178, 170, 160, 0.79);
    }
  }
}
</style>
