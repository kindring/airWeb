<template>
  <div class="w-full">
<!--    logo部分布局 -->
    <div class="w-full flex justify-center h-24">
      <div class="w-p1200 flex items-center">
        <div class="logo">
          <a href="/">
            <img :src="logoUrl" alt="机票预定">
          </a>
        </div>
        <h1 class="text-3xl mt-2">极速,互联,稳定,便捷</h1>
      </div>
    </div>

<!--    页面导航-->
    <div class="w-full  h-12 flex justify-center bg-blue-300">
      <div class="w-p1200 flex justify-between">
        <div class="flex">
          <air-link
              v-for="item in menuList"
              :key="'header-'+item.id"
              :type="item.type"
              :path="item.path"
              class="menu-item pl-2 w-full flex items-center w-12 md:w-28 lg:w-40 cursor-pointer hover:bg-blue-400 hover:text-white "
          >
            <svg-icon
                class="text-2xl pr-1"
                :icon-class="item.icon"
            ></svg-icon>
            <span>{{item.text}}</span>
          </air-link>
        </div>

        <div class="flex">
          <div
              v-if="isLogin"
              class="flex items-center px-6 cursor-pointer hover:bg-blue-400  hover:text-white " >
            <a-popover :title="`${nickName}的购物车`" class="w-full h-full">
              <template slot="content" >
                <div class="px-2">

                  <div class=" h-auto" v-if="cars.length">
                    <!--          购物车-->
                    <div
                        v-for="item in cars"
                        :key="item.id"
                        class="w-full flex py-1 items-center border-b border-gray-400 justify-around" >
                      <!--            出发城市-->
                      <div class="w-1/5">
                        <div class="px-1.5 flex items-center">
                          <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">{{item.departureCityName}}</div>
                          <svg-icon class="mx-1.5 text-xl text-green-600" icon-class="fly"></svg-icon>
                          <div class="px-1.5 py-0.5 rounded bg-green-200 flex">{{item.targetCityName}}</div>
                        </div>
                      </div>

                      <!-- 到站时间-->
                      <div class="w-2/4 flex justify-center">
                        <div class="px-1.5 py-0.5  flex items-center ml-3 bg-yellow-200 rounded">
                          <div class="px-1.5 py-0.5 rounded bg-blue-200 flex">{{moment((item.sailingTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
                          <span class="mx-1.5">---</span>
                          <div class="px-1.5 py-0.5 rounded bg-green-200 flex">{{moment((item.langdinTime-0)*1000).format('YYYY-MM-DD hh:mm:ss')}}</div>
                        </div>
                      </div>
                      <!-- 售票状态-->
                      <div class="w-1/5 flex justify-center">
                        <div v-if="item.flightState === 1" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                          正在售票中
                        </div>
                        <div v-else-if="item.flightState === 2" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                          正在检票中
                        </div>
                        <div v-else-if="item.flightState === 3" class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                          飞行中
                        </div>
                        <div v-else class="px-2.5 flex items-center ml-3 bg-yellow-200 py-1" >
                          航班已经结束
                        </div>
                      </div>
                      <div class="w-1/6 flex justify-center">
                        <div class="px-1.5 flex items-center ml-3 ">

                          <a-button v-if="item.flightState === 1" type="primary">
                            <air-link :type="2" :path="`#/info?flightId=${item.id}`">立即购票</air-link>
                          </a-button>
                          <a-button v-else type="danger" @click="removeCar(item.id)">
                            移出购物车
                          </a-button>
                        </div>
                      </div>
                    </div>
                    <div class="w-full my-2">
                      <air-link class="w-10/12 py-1.5 flex justify-center items-center" :type="2" path="/user#/car">更多购物车项</air-link>
                    </div>
                  </div>
                  <div class="w-72 h-48 flex justify-center items-center" v-else>
                    <h1>购物车中暂时没有航班</h1>
                  </div>
                </div>
              </template>
<!--              按钮-->
              <div class="flex items-center">
                <air-link
                    :type="2"
                    :path="'/user#/car'"
                    class="menu-item pl-3 w-full flex items-center hover:bg-blue-400  hover:text-white "
                >
                  <svg-icon
                      class="text-2xl  pr-1"
                      icon-class="car"
                  ></svg-icon>
                  <span>购物车</span>
                </air-link>
              </div>

            </a-popover>
          </div>
          <air-link
              :type="2"
              :path="isLogin?'/user':'login'"
              class="menu-item pl-3 w-full flex items-center w-12 md:w-28 lg:w-40 cursor-pointer hover:bg-blue-400  hover:text-white "
          >
            <svg-icon
                class="text-2xl  pr-1"
                icon-class="user"
            ></svg-icon>
            {{isLogin?`个人中心`:'登录/注册'}}
          </air-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import AirLink from "@components/public/airLink";
import {mapActions, mapGetters, mapState} from "vuex";
import types from "@/store/homeTypes";
import api_user from "@/apis/api_user";
export default {
  name: "layout_header",
  components: {AirLink},
  data:()=>{
    return {
      logoUrl: process.env.BASE_URL+'image/logo.jpg',
      menuList:[
        {
          id:1,
          text: '首页',
          path: '/',
          icon: 'home',
          type: 2
        },
        {
          id:2,
          text: '购票',
          path: '/#/search',
          icon: 'buy',
          type: 2
        },
        {
          id:3,
          text: '推荐机票',
          path: '/#/recommend',
          icon: 'recommend',
          type: 2
        },
        {
          id:4,
          text: '攻略',
          path: '/#/gl',
          icon: 'gl',
          type: 2,
        },
        {
          id:5,
          text: '更多',
          path: '/#/more',
          icon: 'more',
          type: 2
        },
      ],
    }
  },
  computed:{
    ...mapState({
      // 城市列表
      isLogin:state=>state.user[types.user.state.isLogin],
      nickName:state=>state.user[types.user.state.nickName],
      // 用户选择的
    }),
    ...mapGetters({
      cars: types.user.getters.car,
    })
  },
  async mounted(){
    let {ok,msg} = await this.loadCar();
    if(!ok){return this.$message.warn(msg)}
    console.log(this.cars);
  },
  methods:{
    moment,
    ...mapActions({
      loadCar: types.user.actions.loadCar,
    }),
    async removeCar(id){
      api_user.removeCar
    },
    // 移除指定购物车
    removeCarHandle(id){
      let _this = this;
      this.$confirm({
        title: '确定将购物车从航班中移除吗?',
        content: h => <div style="color:red;">确定将购物车从航班中移除吗?</div>,
        onOk() {
          console.log('OK');
          // 确定移除
          _this.removeCar(id)
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    }
  }


}
</script>

<style scoped lang="scss">
.logo{
  height: 100%;
  img{
    height: 100%;
    width: auto;
  }
}
</style>
