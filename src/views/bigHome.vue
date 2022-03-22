<template>
  <div class="w-full h-full box-border pt-4 px-2 flex flex-col lg:flex-row">
<!--    侧边栏位-->
    <div class="w-full lg:w-96 xl:w-96 h-auto lg:h-full flex flex-col ">

<!--  设备概览-->
      <div class="
              w-full
              rounded
              bg-blue-300
              h-56 flex
              flex-col
              flex-shrink-0
              overflow-hidden
              text-2xl">

<!--        标题-->
        <div class="title flex border-b">
          <h2 >设备概览 </h2>
          <svg-icon class="text-4xl" icon-class="ybp"></svg-icon>
        </div>

        <div class="flex h-full bg-white flex-shrink">

          <div class="
                chunk
                border-r
                w-2/5
                flex
                flex-col">
            <div class="title text-center justify-center">在线率</div>
            <div class="charts w-full h-full">
              <flow-ball></flow-ball>
            </div>
          </div>
          <div class="chunk w-3/5">
<!--            信息概览-->
            <device-tabel ></device-tabel>
          </div>
        </div>
      </div>

<!--      侧边信息推送中心 -->
      <info-tabel></info-tabel>

    </div>

<!--    地图板块-->
    <div class="w-full lg:w-4/5 2xl:w-3/5 px-1 pb-2 box-border relative">
      <big-map @areaChange="selectAreaHandle">
      </big-map>
      <div v-show="cityId" class="absolute top-16 md:top-36 lg:top-56 right-2">
        <a-button v-show="cityId&&areaLevel>1" @click="exitCity">离开城市</a-button>
        <a-button v-show="cityId&&areaLevel<3" @click="enterCity">进入城市</a-button>
      </div>
    </div>

<!--    设备信息板块-->
    <div class="w-full lg:w-96 xl:w-96 h-auto lg:h-full flex flex-col pb-2  ">
      <div class="w-full
              rounded
              bg-blue-300
              h-80 flex
              flex-col
              flex-shrink-0
              overflow-hidden" v-show="cityId">
        <!--        城市名-->
        <div class="title flex border-b">
          <h2 >{{ allCityName }}
            <span class="ml-2">{{cityDeviceCount}}台</span></h2>
        </div>
<!--        内容-->
        <div class="flex flex-col h-full bg-white flex-shrink">
          <div class="w-full h-10 border-b flex items-center justify-center cursor-pointer hover:bg-gray-200"
          @click="openCitysDevice"
          >
            管理城市设备
          </div>
<!--          设备情况图表-->
          <chart-table></chart-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flowBall from '@components/bigScreen/flowBall'
import DeviceTabel from "@components/bigScreen/deviceTabel";
import InfoTabel from "@components/bigScreen/infoTabel";
import BigMap from "@components/bigScreen/bigMap";
import chartTable from "@components/bigScreen/chartTable"
import {mapActions, mapState} from "vuex";
import types from "@/store/types";

export default {
  name: 'bigScreen',
  components: {
    BigMap,
    InfoTabel,
    DeviceTabel,
    flowBall,
    chartTable
  },
  data(){
    return {
      areaData: {},
      // 城市级别 1,2,3
      areaLevel: 1,
      allCityName: '',
      cityDeviceCount: 0,
      cityId: 0,
      loadCityCameraTimer:null
    }
  },
  computed:{
    ...mapState({
      cityCameras: state => {return state.camera[types.camera.states.cityCameras]}
    })
  },
  methods:{
    ...mapActions({
      loadCityCameras:types.camera.actions.loadCityCameras,
    }),
    selectAreaHandle(data){
      console.log(data);
      if(this.loadCityCameraTimer){
        clearTimeout(this.loadCityCameraTimer)
        this.loadCityCameraTimer = null;
      }
      this.allCityName = data.allName;
      this.cityDeviceCount = data.count;
      this.cityId = data.id;
      this.areaCode = data.areaCode;
      // 加载城市设备
      this.loadCityCameraTimer = setTimeout(async ()=>{
        let  isLoad = await this.loadCityCameras({level:this.areaLevel,id:this.cityId})
        if(isLoad){
          this.$message.success('城市数据加载完成')
          console.log(this.cityCameras)
        }else{
          this.$message.success('城市数据加载失败')
        }
      },700)

    },
    // 打开城市设备列表,弹窗模式,自己写一个?
    openCitysDevice(){

    },
    // 城市下钻
    enterCity(){
      //获取当前选择的城市
      console.log(this.cityId);
      // 加载二级城市
    },
    // 城市上行
    exitCity(){

    }
  },
  mounted() {
    // 加载设备状态数据
  }

}
</script>
<style>

.title{
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  box-sizing: border-box;
  padding-left: 0.5em;
  align-items: center;
}
.title .title-text,.title .title-action{
  height: 100%;
  font-size: 1.3em;
}

</style>
