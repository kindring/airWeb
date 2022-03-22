<template>
<div class="w-full h-full box-border pt-4 px-2 flex flex-col lg:flex-row">

  <div class="w-full lg:w-96 xl:w-96 lg:h-full box-border py-1">
    <cam-devices></cam-devices>
  </div>
  <div class="w-full h-full box-border py-1 pl-0 lg:pl-1.5 relative">
    <a-badge
        class="selects-imei absolute p-2 cursor-pointer"
        :count="imeis.length"
        @click="showDrawer"
    />

<!--    头部导航栏-->
    <div class="w-full h-full rounded bg-blue-300 flex flex-col ">
      <div class="w-full h-16 flex bg-red-200 items-center justify-between">
        <div class="flex h-full items-end ">

            <div :class="'sub-menu '+(pageName==='index'?'sub-menu-select':'') "   @click="jump('index')"><span>控制页</span></div>
            <div :class="'sub-menu '+(pageName==='photo'?'sub-menu-select':'') " @click="jump('photo')"><span>拍照</span></div>
            <div :class="'sub-menu '+(pageName==='video'?'sub-menu-select':'') " @click="jump('video')"><span>录像</span></div>
            <div :class="'sub-menu '+(pageName==='live'?'sub-menu-select':'') " @click="jump('live')"><span>推流</span></div>
            <div :class="'sub-menu '+(pageName==='control'?'sub-menu-select':'') " @click="jump('control')"><span>高级</span></div>
        </div>
        <div class="more-control bg-gray-200 p-2 cursor-default" @click="showChnageImeiPop">
          <a-tooltip>
            <template slot="title">
              修改当前选择的IMEI号
            </template>
            自定义IMEI号
          </a-tooltip>
        </div>
      </div>
      <div class="w-full h-auto lg:h-full bg-blue-300">
        <router-view></router-view>
      </div>
    </div>
  </div>

<!--  已经选择的设备列表-->
  <a-drawer
      width="320"
      :placement="placement"
      :closable="false"
      :visible="visible"
      @close="onClose"
  >

    <a-checkbox-group
        @change="onChange"
        class="w-full">
      <div v-for="item in imeis"
           :key="`bft-${item}`"
           class="w-full border-b pb-1.5 mt-1 flex justify-between items-center">
          <a-checkbox :value="item"/>
          {{ item }}
          <a-button type="danger" @click="removeImei(item)">x</a-button>
      </div>
    </a-checkbox-group>
  </a-drawer>
  <max-from size="small" title="手动输入IMEI号" ref="customImei">
    <div>IMEI号格式：356802050xxxxxx</div>
    <br/>
    <div class="w-full flex items-center">
      <div class="flex-shrink-0 pr-1">
        手动输入imei号:
      </div>
      <a-input  v-model="imeiTemplate" />
      <a-input  v-model="imeiStr" placeholder="xxxxxx" />
    </div>
    <div class="text-red-700" v-show="errorText">{{errorText}}</div>
    <br/>
    <a-button-group class="mt-2">
      <a-button type="primary" @click="changeImei">修改imei号</a-button>
    </a-button-group>
  </max-from>
</div>
</template>

<script>
import camDevices from '@components/cameraControl/cam-devices'
import CamControl from "@components/cameraControl/cam-control";
import MaxFrom from "@components/bigScreen/maxFrom";
import {mapMutations, mapState} from "vuex";
import types from '@/store/types'
export default {
  name: "cameraControl",
  components:{
    camDevices,
    MaxFrom
  },
  computed:{
    ...mapState({
      imei: state => {return state.camControl[types.camControl.states.nowDevice]},
      imeis: state => {return state.camControl[types.camControl.states.bftImeis]}
    })
  },
  data(){
    return {
      placement:'left',
      visible: false,
      imeiStr: '',
      errorText: '',
      // imei号格式检查
      imeiTemplate: '356802050',
      pageName:'index',
    }
  },
  watch:{
    imei:function (newVal,oldVal){
      this.imeiStr = newVal.substr(9);
    }
  },
  created() {
    if(this.imei){
      this.imeiStr = this.imei.substr(9);
    }
    switch(this.$route.path){
      case '/camera/video':this.pageName='video';break;
      case '/camera/photo':this.pageName='photo';break;
      case '/camera/control':this.pageName='control';break;
      case '/camera/live':this.pageName='live';break;
      case '/camera/':this.pageName='index';break;
    }
  },
  methods:{
    ...mapMutations({
      setImei:types.camControl.mutations.setImei,
      removeImei: types.camControl.mutations.removeImei
    }),
    // 跳转到指定页面
    jump(pageString){
      this.pageName = pageString;
      switch (pageString){
        case 'photo':
          this.$router.push('/camera/photo');
          break;
        case 'video':
          this.$router.push('/camera/video');
          break;
        case 'live':
          this.$router.push('/camera/live');
          break;
        case 'index':
          this.$router.push('/camera');
          break;
      }
    },
    onClose() {
      this.visible = false;
    },
    showDrawer(){
      this.visible = true;
    },
    onChange(checkedVal){
      console.log(checkedVal)
    },

    hideChnageImeiPop(){
      this.$refs.customImei.hide();
    },
    showChnageImeiPop(){
      this.$refs.customImei.show();
    },
    // 修改当前选择的imei号
    changeImei(){
      let imeiStr = this.imeiTemplate + this.imeiStr;
      if(imeiStr.length!==15){
        this.errorText = 'IMEI号长度不对';
        this.$message.warn(this.errorText);
        return;
      }
      this.errorText = '';
      this.setImei(imeiStr);
      this.$message.info(`自定义IMEI号成功`);
      this.hideChnageImeiPop();
    }
  }
}
</script>

<style scoped lang="scss">
.item{
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #AAAAAA;
  margin-right: 5px;
  .chunk{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    cursor:pointer;
    &:hover{
      background-color: #ece9e9;
    }
  }
  .chunk1{
    border-right: 1px solid #dcd8d8;
    &:hover{
      border-right: 1px solid #4b4949;
    }
  }
  .chunk2{
    padding: 0 15px;
  }

}
.sub-menu{
  width: auto;
  height: 100%;
  padding: 0 2em;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover::before{
    background-color: #6ebae0;
    box-shadow: 1px 1px 5px #fff;
    transform: rotate(5deg);
  }
  &::before{
    content:'';
    position: absolute;
    width: 90%;
    height: 90%;
    background-color: #66ccff;
    transform: rotate(-5deg);
    box-shadow: 1px 1px 3px #3ba7e0;
    transition: all 0.7s ease-in-out;
  }
  span{
    position: relative;
  }
}
.sub-menu-select{
  &::before{
    width: 95%;
    height: 95%;
    transform: rotate(0deg);
    box-shadow: 1px 1px 5px orangered;
  }
}
.selects-imei{
  top: -17px;
  left: -8px;
}
.changeImei{
  box-shadow: 1px 1px 3px gray;
  background-color: rgba(255,255,255,0.3);
  &::before{
    transform: rotate(0);
    background-color: #84afb2;
  }
}
</style>