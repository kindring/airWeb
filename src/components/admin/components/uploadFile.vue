<template>
  <a-card title="上传图片" class="w-96">
    <a-upload
        :action="uploadUrl"
        list-type="picture"
        :default-file-list="fileList"
        @change="handleChange"
    >
      <a-button> <a-icon type="upload" /> 选择文件 </a-button>
    </a-upload>
    <a-button-group class="mt-2 px-2">
      <a-button @click="close" type="danger">X</a-button>
    </a-button-group>
  </a-card>
</template>

<script>
import business from "@/utils/business";
import code from "@/mapField/rcodeMap";

export default {
  name: 'uploadFile',
  data() {
    return {
      uploadUrl: '/api/file/up',
      fileList: [
      ],
    };
  },
  methods:{
    close(){
      this.$emit('cancel')
    },
    handleChange(info) {
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
      this.close();
    }
  }
};
</script>
<style scoped>
/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
