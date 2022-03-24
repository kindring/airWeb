<template>
  <div class="w-p1200 mt-4 ">
    <div class="h-12">
        <span class="text-2xl">低价速报</span>
    </div>
    <div class="h-auto flex justify-between">
      <div class="recommend"
           v-for="recommend in recommends"
           :key="recommend.href"
      >
        <div class="recommend-title">
          <img :src="recommend.bgImg" :alt="recommend.title">
         <span>{{recommend.title}}</span>
        </div>
<!--        列表-->
        <div class="recommend-list">
          <div class="recommend-item"
               v-for="(item,i) in recommend.child"
              :key="item.id"
          >
<!--            排序-->
            <div class="rank">
              <span :class="'rank-item rank'+(i+1)">{{i+1}}</span>
            </div>
<!--            图片-->
            <div class="img">
              <img :src="item.img" :alt="item.startAddr+item.targetAddr">
            </div>
<!--            详细信息-->
            <div class="info">
<!--              航班信息-->
              <div class="info1 text-xl">
                <span class="city-name"><span>{{item.startAddr}}</span>-<span>{{item.targetAddr}}</span></span>
                <span class="price">￥{{item.price}}起</span>
              </div>
              <div class="info2 mt">
                <span class="se-time"><span>{{item.startTime}}</span>去<span>{{item.endTime}}</span>回</span>
                <span>{{item.discount}}折</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data(){
    return {
      recommends:[
          {
              title:'周末省心游',
              href: 'weekend',
              bgImg: process.env.BASE_URL+'image/weekend.jpg',
              child: [
                {
                  startAddr: '深圳',
                  targetAddr: '杭州',
                  img: process.env.BASE_URL+'image/addr/丽江.jpg',
                  startTime: '3-04',
                  endTime: '3-08',
                  price:154,
                  discount: 1.2,
                  id: 466
                },
                {
                  startAddr: '深圳',
                  targetAddr: '上海',
                  img: process.env.BASE_URL+'image/addr/丽江.jpg',
                  startTime: '3-04',
                  endTime: '3-08',
                  price:423,
                  discount: 0.3,
                  id: 321
                },
                {
                  startAddr: '深圳',
                  targetAddr: '北京',
                  img: process.env.BASE_URL+'image/addr/丽江.jpg',
                  startTime: '3-04',
                  endTime: '3-08',
                  price:567,
                  discount: 0.3,
                  id: 123
                },
                {
                  startAddr: '深圳',
                  targetAddr: '天津',
                  img: process.env.BASE_URL+'image/addr/丽江.jpg',
                  startTime: '3-04',
                  endTime: '3-08',
                  price:999,
                  discount: 0.2,
                  id: 234
                },
                {
                  startAddr: '深圳',
                  targetAddr: '程度',
                  img: process.env.BASE_URL+'image/addr/丽江.jpg',
                  startTime: '3-04',
                  endTime: '3-08',
                  price:100,
                  discount: 0.1,
                  id: 567,
                },
              ]
          },
        {
          title:'青青大草原',
          href: 'grassland',
          bgImg: process.env.BASE_URL+'image/grassland.jpg',
          child: [
            {
              startAddr: '深圳',
              targetAddr: '杭州',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:154,
              discount: 1.2,
              id: 466
            },
            {
              startAddr: '深圳',
              targetAddr: '上海',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:423,
              discount: 0.3,
              id: 321
            },
            {
              startAddr: '深圳',
              targetAddr: '北京',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:567,
              discount: 0.3,
              id: 123
            },
            {
              startAddr: '深圳',
              targetAddr: '天津',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:999,
              discount: 0.2,
              id: 234
            },
            {
              startAddr: '深圳',
              targetAddr: '程度',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:100,
              discount: 0.1,
              id: 567,
            },
          ]
        },
        {
          title:'海边浪一浪',
          href: 'surfing',
          bgImg: process.env.BASE_URL+'image/surfing.jpg',
          child: [
            {
              startAddr: '深圳',
              targetAddr: '杭州',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:154,
              discount: 1.2,
              id: 466
            },
            {
              startAddr: '深圳',
              targetAddr: '上海',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:423,
              discount: 0.3,
              id: 321
            },
            {
              startAddr: '深圳',
              targetAddr: '北京',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:567,
              discount: 0.3,
              id: 123
            },
            {
              startAddr: '深圳',
              targetAddr: '天津',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:999,
              discount: 0.2,
              id: 234
            },
            {
              startAddr: '深圳',
              targetAddr: '程度',
              img: process.env.BASE_URL+'image/addr/丽江.jpg',
              startTime: '3-04',
              endTime: '3-08',
              price:100,
              discount: 0.1,
              id: 567,
            },
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend{
  width: 382px;
  height: auto;
  border-radius: 3px;
  overflow: hidden;
  .recommend-title{
    width: 100%;
    height: 68px;
    position: relative;
    line-height: 68px;
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
      font-size: 2em;
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
