<template>
  <div class="banner h-72">
    <!--      轮播图片,通过show切换-->
    <div
        v-for="(item,i) in banners"
        :key="'img-'+item.id"
        :class="{
            'banner-show':true,
            'banner-show-now':i===bannerIndex
          }"
        v-show="i===bannerIndex"
    >
      <!--        图片框-->
      <img :src="item.img" :alt="item.title">
      <!--        文本框-->
      <div class="w-p1200 h-full py-2 border-box relative">
        <div class="view-text">
          <div class="title">{{item.title}}</div>
          <div class="content indent-8">
            {{item.text}}
          </div>
        </div>
      </div>

    </div>


    <!--      点击切换控制 -->
    <div class="banner-control bottom-14">
      <div
          v-for="(item,i) in banners"
          :key="'handle-'+item.id"
          :class="{
               'banner-handle':true,
               'banner-handle-now':i===bannerIndex
               }"
          @click="changeBanner(i)"
      >

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data(){
    return {
      banners:[{
        id: '1',
        url:'http://',
        title: '特价机票',
        text: '很长一段文字',
        img:process.env.BASE_URL+'image/banner/01.jpg'
      },{
        id: '2',
        url:'http://',
        title: '马尔代夫一日游',
        text: '很长一段文字',
        img:process.env.BASE_URL+'image/banner/img.jpg'
      },{
        id: '3',
        url:'http://',
        title: '埃及之春',
        text: '很长一段文字',
        img:process.env.BASE_URL+'image/banner/a1.png'
      }],
      bannerIndex:0,
      timer:null
    }
},mounted() {
    this.cursor()
  },
  methods:{
    cursor(){
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        this.nextBanner();
      },3000)
    },
    nextBanner(){
      let nextBanner = this.bannerIndex+1;
      if(nextBanner>=this.banners.length){
        nextBanner = 0;
      }
      this.changeBanner(nextBanner);
    },
    changeBanner(i){
      this.bannerIndex = i;
      this.cursor();
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
.banner-show{
  position: absolute;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
.view-text{
  height:80%;
  width: 480px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.47);
  color: floralwhite;
  padding:2px 5px;

.title{
  font-size: 1.7em;
}
.content{
  font-size: 0.9em;
}
}
img{
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
}
}

.banner-control{
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  //bottom: 15px;
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
