<template>
  <div class="w-8/12 h-5/6 p-2 rounded flex flex-col justify-center border bg-white">
    <div class="p-header mx-1.5 h-16  text-2xl flex border-b">
      <a-button :type="tabKey===1?'primary':''" @click="callback(1)">选择图片</a-button>
      <a-button class="ml-1" :type="tabKey===2?'primary':''" @click="callback(2)">上传图片</a-button>
    </div>
    <div class="p-con w-full px-1">

      <loading v-if="tabKey===1" class="w-full h-full" :loading-state="loadingState" tip="获取图片中">
        <div class="w-full h-full overflow-auto grid grid-cols-5 gap-1 ">
          <div
              v-for="item in imgs"
              :key="item.path"
              :class="`flex w-full h-48 justify-between justify-center px-0.5 border items-center ${item.path === imgUrl?'bg-red-300':'bg-gray-400'}`"
              @click="selectImg(item)"
          >
            <img class="w-full h-auto" :src="item.path" alt="item.fileName">
          </div>
        </div>
        <template v-slot:loadFail>
          <div class="w-full h-full flex justify-center items-center flex-col" >
            <h2 class="text-2xl text-red-700">{{loadingMessage}}</h2>
          </div>
        </template>
      </loading>

      <a-upload
          v-else-if="tabKey===2"
          :action="uploadUrl"
          list-type="picture"
          @change="handleFileChange"
      >
        <a-button> <a-icon type="upload" /> 选择文件 </a-button>
      </a-upload>
    </div>
    <div class="p-header w-full mt-2">
      <a-button @click="close" type="danger">X</a-button>
      <a-button class="ml-2" type="primary" @click="selectNowImg" :disabled="!imgUrl">选择当前照片</a-button>
    </div>
  </div>
</template>

<script>
import business from "@/utils/business";
import code from "@/mapField/rcodeMap";
import api_file from "@/apis/api_file";
import handle from "@/utils/handle";
import api_flight from "@/apis/api_flight";
import Loading from "@components/public/loading";

export default {
  name: "imageTable",
  components: {Loading},
  data(){
    return {
      uploadUrl: '/api/file/up',
      tabKey: 1,
      imgUrl:'',
      loadingState: 0,
      loadingMessage: '',
      imgs: []
    }
  },
  async mounted() {
    await this.loadImage();
  },
  methods:{
    close(){
      this.$emit('cancel')
    },
    async loadImage(){
      this.loadingState = 0;
      let [err,response] = await handle(api_file.loadImages());
      let {ok,msg,res} = business.checkResponseRcode(response,err);
      if(!ok){
        this.loadingState = 2;
        this.loadingMessage = msg;
      }
      this.loadingState = 1;
      console.log(res);
      this.imgs = res.data;
    },
    async handleFileChange(info) {
      console.log(`change`)
      console.log(info.file);
      let response = info.file.response
      console.log(response)
      let {ok, msg, res} = business.checkResponseRcode({data: response}, null, {[code.notLogin]: console.log});
      if (!ok) {
        this.$message.error(`${info.file.name} file upload failed. ${msg}`);
        return;
      }
      this.$message.success(`文件${info.file.name}上传成功`);
      // this.close();
      await this.loadImage();
      this.tabKey = '1'
    },
    callback(key) {
      console.log(key);
      this.tabKey = key;
    },
    // 选择图片
    selectImg(imgData){
      this.imgUrl = imgData.path;
    },
    // 选择图片
    selectNowImg(){
      if(!this.imgUrl){
        return this.$message.warn('请选择图片')
      }
      this.$emit('ok',this.imgUrl);
    }
  },
}
</script>

<style scoped>
.p-header{
  height:35px;
}
.p-con {
  height: calc(100% - 80px);
}
</style>
