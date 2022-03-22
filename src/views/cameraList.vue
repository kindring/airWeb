<template>
  <div class=" px-2 w-full h-full   overflow-hidden " ref="windowEl">
<!--    顶部搜索控件-->
    <div class="custom-header w-full flex items-center justify-between">

      <div class=" w-1/3 h-full flex items-center">
        <div class="h-full mx-4 h-full">
          已选: <b>{{ selectedRowKeys.length}}</b>
        </div>
<!--        添加到监控大厅选项按钮 -->
        <transition
            name="fade"
            enter-active-class="animate__animated animate__bounceInLeft"
            leave-active-class="animate__animated animate__bounceOutLeft"
        >
          <a-button
              class="mx-3"
              v-if="selectedRowKeys.length"
              @click="addToRoom"
          > 添加到监控大厅
          </a-button>
        </transition>

        <transition
            name="fade"
            enter-active-class="animate__animated animate__bounceInLeft"
            leave-active-class="animate__animated animate__bounceOutLeft"
        >
          <a-button
              class="mx-3"
              v-if="selectedRowKeys.length"
          >
            配置摄像头
          </a-button>
        </transition>
      </div>

      <div class="search">
        <a-input-search
            placeholder="输入imei号进行搜索"
            v-model="cameras.searchKey"
            v-show="!popShow"
            @value="onSearchChange"
            :loading="searchLoading"
            @search="onSearch"
        />
      </div>
      length: {{cameras.length}}
      <div
          class="h-full"
      >
        <a-button
            @click="reload"
        >
          刷新
        </a-button>
      </div>
    </div>
<!-- 表格部分-->
    <a-table
        :columns="columns"
        :data-source="cameras"
        :loading="loading"
        :pagination="pageination"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :scroll="{y:scrollY}"
        @change="change"
    >
      <template
          slot="operation"
          slot-scope="text, record"
      >
        <div class="btns flex items-center h-full justify-between px-3">
          <a-button
              class="px-3"
              type="primary"
              @click="edit(text,record)">编辑</a-button>
          <a-button
              class="px-3"
              type="dashed"
              @click="deleteItem(text)"
          >删除</a-button>
        </div>
      </template>
    </a-table>


    <!--        弹窗部分-->
    <pop
        :show="popShow"
        :loading="popLoading"
        class="w-full h-full flex justify-center "
    >

      <div
          class="pop-from h-2/3
          w-full flex flex-col rounded
          bg-white relative  px-4 py-1
"
          :title="cameraItemBack.name"
      >
        <h2
            class="text-xl border-b-2 border-black"

        >{{cameraItemBack.name}}</h2>
        <!--        退出按钮-->
        <div
            class="
            rounded-full h-8 absolute top-0 right-3
            text-2xl hover:shadow-sm hover:text-red-300"
            @click="hidePop"
        >
          x
        </div>
<!--        摄像头表单-->
        <a-form
            :model="cameraItem"
            :rules="cameraRules"
            @submit="submitHandel"
            ref="formRef"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 14 }"
            class="h-full overflow-auto"
        >

          <a-form-item label="imei号">
            <a-input
                :disabled="true"
                :value="cameraItem.imei"
                v-decorator="[
                    'iemi',
                    {rules: [{
                      required:true,
                      message:'请输入imei号'}]}
                ]"
            />
          </a-form-item>
          <a-form-item label="摄像头名">
            <a-input
                v-model="cameraItem.name"
                v-decorator="[
                    'name',
                    {rules: [{
                      required:true,
                      message:'请输入摄像头名'}]}
                ]"
            />
          </a-form-item>
          <a-form-item label="所属大厅">
            <a-select
                mode="multiple"
                v-model="cameraItem.rooms"
                placeholder="Please select"
            >
              <a-select-option v-for="item in rooms" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="分辨率">
            <a-select
                v-model="cameraItem.resolution"
            >
              <a-select-option
                  v-for="item in fieldTool.map_resolution"
                  :key="'resolution-'+item.n"
                  :value="item.n"
              >
                {{ item.str }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="上传地址">
            <a-input
                placeholder="使用设备上配置的地址"
                v-model="cameraItem.uploadUrl"
            ></a-input>
          </a-form-item>
          <a-form-item label="工作模式">
            <a-select
                v-model="cameraItem.workerMode"
            >
              <a-select-option
                  v-for="item in fieldTool.map_workerMode"
                  :key="'workerMode-'+item.n"
                  :value="item.n"
              >
                {{ item.str }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="工作电流">
            <a-select
                v-model="cameraItem.current"
            >
              <a-select-option
                  v-for="item in fieldTool.map_current"
                  :key="'current-'+item.n"
                  :value="item.n"
              >
                {{ item.str }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="排序">
            <a-input-number
                id="inputNumber"
                class="w-full"
                v-model="cameraItem.sort"
                :min="0"
                :max="10" />
          </a-form-item>


          <a-form-item
              class="btns flex justify-start"
              label=" "
          >
            <a-button
                class="mr-1"
                type="primary"
                html-type="submit"
            >确认</a-button>
            <a-button
                class="ml-1"
                @click="hidePop"
            >取消</a-button>
          </a-form-item>
        </a-form>

      </div>
    </pop>
  </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from "vuex";
import types from '@/store/types'
import pop from '@/components/pop/pop'
import api from '@/apis/apis.js'
import field from '@/mapField/camera'
import tool from '@/assets/js/tool'
export default {
  name: "cameraList",
  components:{
    pop
  },
  data(){
    return {
      scrollY:600,
      'selectedRowKeys': [],
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '300px'
        },
        {
          title: '摄像头名',
          dataIndex: 'name',
          key: 'name',
          width: '150px'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          width: '150px',
          customRender: (text)=>{
            return field.cameraState(text);
          }
        },
        {
          title: '是否在线',
          dataIndex: 'offline',
          key: 'offline',
          width: '150px',
          customRender: (text)=>{
            return field.online(text);
          }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          width: '120px'
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'operation',
          width: '160px',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      searchLoading:false,
      popShow: false,
      popLoading: false,
      fieldTool:field,
      formLayout: 'horizontal',
      cameraRules: {
        name: {
          require: true,
          message: '摄像头名称为必填项'
        },
        title:{},
        resolution: {
          enum: 'String'
        },
        uploadUrl: {},
        workerMode: {},
        sort: {},
        current: null,
        rooms: {}
      },
      labelCol: { span: 4 },

      cameraItem: {
        id:'',
        imei: '',
        name: '摄像头',
        title: '',
        resolution: '',
        uploadUrl: '',
        workerMode: '',
        sort: null,
        current: null,
        rooms: [],
      },

      formName: {
        name
      },
      cameraItemBack:{},// 数据备份,用来检测数据是否改变
    }
  },
  async mounted() {

    await this.loadList();
    // 等待加载数据完成,来获取dom元素
    let windowEl = this.$refs.windowEl
    this.$nextTick(()=>{
      let offsetHeight = windowEl.offsetHeight
      offsetHeight = parseInt(offsetHeight) - 165
      this.scrollY = offsetHeight
    })
  },
  beforeCreate() {
    // this.form = this.$form.createForm(this,{name:''})
  },
  computed:{
    ...mapState({
      cameras:state =>  state.camera[types.camera.states.list],
      loading:state => state.camera[types.camera.states.loading],
      rooms:state=>state.camera[types.camera.states.rooms]
    }),
    ...mapGetters({
      pageination:types.camera.getters.pageination
    }),
  },
  methods:{
    ...mapActions(types.camera.actions),
    onSelectChange(selectedRowKeys){
      this.selectedRowKeys = selectedRowKeys;
    },
    async submitHandel(){
      console.log('++++ submit ++++')
      // console.log(tool.deepClone)
      console.log(this.cameraItem)
      console.log(this.cameraItemBack)
      let oldItem = tool.deepClone(this.cameraItemBack)
      console.log(oldItem)
      console.log()
      console.log('-----------------------------------------------------------------')
      let newItem = tool.deepClone(this.cameraItem)
      console.log(newItem)
      let changeItems = new Object(null)
      let changeNum = 0
      for (const eKey in newItem) {
        console.log(eKey)
        if(tool.isEqual(newItem[eKey],oldItem[eKey]))
        {
          console.log('未改变')
        }else{
          changeNum++
          changeItems[eKey] = newItem[eKey]
        }
      }
      if(changeNum){
        // 数据有修改
        console.log('dd--************')
        console.log('dd--')
        console.log(changeItems)
        this.$message.info("正在提交修改后的数据")
        this.$vloading.show('等待服务器响应...')
        console.log('dd--')
        console.log(changeItems)
        let res =  await api.camera.changeDetail(this.cameraItemBack.id,changeItems)
        // console.log(res)
        this.$vloading.hide()
        if(res.code == 1){
          this.$message.info('数据修改成功')
          this.hidePop()
        }else{
          this.$message.error(res.err)
        }

      }else{
        this.$message.info("数据未修改,不做变化")
        // 无数据修改不做反应
        this.hidePop()
      }

    },
    /**
     * 重新加载当前页的数据
     */
    reload(){
      this.loadList(this.pageination.current)
      this.selectedRowKeys = []
    },
    // 检测表格换页
    change(e){
      // console.log('表格数据改变')
      // console.log(e);
      if(this.pageination.current !== e.current) {
        this.loadList(e.current)
        this.selectedRowKeys = []
      }
    },
    onSearchChange(){
      console.log(this.searchKey)
    },
    // 发送搜索
    onSearch(){
      this.loadList(1);
      this.selectedRowKeys = []
    },
    // 修改数据
    async edit(text){
      // 加载数据
      this.showPop()
      let data = await api.camera.getDetail(text);
      // 加载完毕
      this.loadedPop();
      console.log('test detail')
      this.cameraItemBack = JSON.parse(JSON.stringify(data));
      // 深拷贝
      this.cameraItem = data;
      this.cameraItem.resolution = data.resolution +'';
      this.cameraItem.workerMode = data.workerMode + '';
      console.log(data)

    },
    // 处理删除按钮点击后的逻辑
    deleteItem(text){
      let self = this;
      this.$confirm({
        title: '警告!',
        content: '请再次确认是否删除该摄像头',
        okText: '确认删除',
        cancelText: '取消',
        onOk(){
          console.log('确认删除')
          self.doDeleteItem(text)
        }
      })
    },
    // 处理删除逻辑
    async doDeleteItem(id){
      console.log(id)
      this.$vloading.show('等待服务器处理删除任务')
      let res = await api.camera.deleteCamera(id)
      this.$vloading.hide()
      if(res.code == 1){
        this.$message.info('删除成功')
      }else{
        this.$message.error(`删除失败${res.err}`)
      }
    },
    chnageHandel(e){
      console.log('数据改变;')
      console.log(e)
    },
    addToRoom(){
      console.log(this.selectedRowKeys)
    },
    // 显示弹窗持续
    showPop(){
      this.popShow = true;
      this.popLoading = true;
    },
    loadedPop(){
      this.popShow = true;
      this.popLoading = false;
    },
    // 隐藏弹窗
    hidePop(){
      this.popShow = false;
      this.popLoading = true;
    }
  }
}
</script>

<style scoped>
.custom-header{
  height: 55px;
  line-height: 55px;
}
.maxPop{

}
</style>