<template>
  <div class="w-full flex justify-center ">
    首页1
    <!--      轮播,广告-->
    <div class="banner h-56">
<!--      轮播图片,通过show切换-->
      <div
          v-for="(item,i) in banners"
          :key="'img-'+item.id"
          :class="{
        'banner-show-now':i==bannerIndex
        }"
      >
        <img :src="item.url" alt="">
        <div class="viewText">
          <div class="title">{{item.title}}</div>
          <div class="content">
            {{item.text}}
          </div>
        </div>
        <a>

        </a>
      </div>


<!--      点击切换控制 -->
      <div class="banner-control">
        <div
             v-for="(item,i) in banners"
             :key="'handle-'+item.id"
             :class="{
               'banner-handle':true,
               'banner-handle-now':i==bannerIndex
               }"
        >

        </div>
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
      banners:[{
        id: '1',
        url:'http://',
        title: '特价机票',
        text: '很长一段文字',
        img:''
      },{
        id: '2',
        url:'http://',
        title: '马尔代夫一日游',
        text: '很长一段文字',
        img:''
      },{
        id: '3',
        url:'http://',
        title: '埃及之春',
        text: '很长一段文字',
        img:''
      }],
      bannerIndex:0
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
      margin: 0 5px;
      cursor:pointer;
      background-color: rgba(178, 160, 160, 0.79);
      &hover{
        background-color: rgba(196, 167, 167, 0.79);
      }
    }
    .banner-handle-now{
      width: 15px;
      background-color: rgb(244,155,0)
    }
  }
}
</style>
