<template>
  <div class="w-full flex justify-center">
    <div class="w-p1200 mt-4 ">
      <div class="h-auto flex justify-between flex-col">
        <div class="recommend"
             v-for="recommend in recommends"
             :key="recommend.href"
        >
          <div class="recommend-title">
            <img :src="recommend.bg" :alt="recommend.recommendName">
            <span>{{recommend.recommendName}}</span>
          </div>
          <!--        列表-->
          <div class="recommend-list">
            <router-link class="recommend-item"
                         v-for="(item,i) in recommend.flights"
                         :key="'recommend-f-'+item.flightId+'-r-'+item.recommendId"
                         :to="`/info?flightId=${item.flightId}`"
            >
              <!--            排序-->
              <div class="rank">
                <span :class="'rank-item rank'+(i+1)">{{i+1}}</span>
              </div>
              <!--            图片-->
              <div class="img">
                <img :src="item.img" :alt="item.departureCityName+'-'+item.targetCityName">
              </div>
              <!--            详细信息-->
              <div class="info">
                <!--              航班信息-->
                <div class="info1 text-xl">
                  <span class="city-name"><span>{{item.departureCityName}}</span>-<span>{{item.targetCityName}}</span></span>
                  <span class="price">￥{{item.currentPrice}}起</span>
                </div>
                <div class="info2 mt">
                  <span class="se-time"><span>{{moment((item.sailingTime-0)*1000).format('YY-MM-DD')}}</span>去<span>{{moment((item.langdinTime-0)*1000).format('YY-MM-DD')}}</span>回</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api_recommend from "@/apis/api_recommend";
import handle from "@/utils/handle";
import api_city from "@/apis/api_city";
import business from "@/utils/business";
export default {
  name: "recommends",
  data(){
    return {
      recommends:[]
    }
  },
  async mounted(){
    await this.loadHomeRecommends();
  },
  methods:{
    moment,
    // 加载首页航班
    async loadHomeRecommends(){
      let [err,response] = await handle(api_recommend.homer());
      // console.log(response);
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){this.$message.error(msg)}
      this.recommends = res.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend{
  width: 100%;
  height: auto;
  border-radius: 3px;
  overflow: hidden;
  .recommend-title{
    width: 100%;
    height: 136px;
    position: relative;
    line-height: 136px;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    span{
      position: relative;
      font-size: 3em;
      color: white;
      margin-left: 1em;
    }
  }
  .recommend-list{
    width: 100%;
    height: auto;
    position: relative;
    top: -4px;
    padding: 5px 0;
    border-radius: 3px;
    background-color: #fff;
    .recommend-item{
      width: 100%;
      padding: 0 15px 0 12px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      .rank{
        width: 40px;
        height: 66px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 6px;
        margin-right: 12px;

        .rank-item{
          height: 22px;
          width: 22px;
          line-height: 22px;
          text-align: center;
          background: #a29c9c;
          border-radius: 5px;
        }
        .rank1{background: #ff6257;color: #fff;}
        .rank2{background: #f78a29;color: #fff;}
        .rank3{background: #faca06;color: #fff;}
      }
      .img{
        height: 66px;
        width: 88px;
        margin-right: 16px;
        overflow: hidden;
        border-radius: 4px;
        img{
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          -o-object-fit: cover;
          object-fit: cover;
          -webkit-transition: -webkit-transform .3s;
          transition: -webkit-transform .3s;
          -o-transition: transform .3s;
          transition: transform .3s;
          transition: transform .3s, -webkit-transform .3s;
        }
      }
      .info{
        padding: 20px 0;
        width: 200px;
        border-bottom: 1px solid #eee;
        div{
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .info1{
          font-size: 1.5em;
          .price{
            color: #0086f6;
            font-weight: 600;
            line-height: 16px;
          }
          .info2{
            font-size: 16px;
            color: #656464;
            font-size: 14px;
            font-weight: 600;
            line-height: 18px;
            display: -webkit-box;
            display: -ms-flexbox;
          }
        }


      }
    }
  }
}
</style>
