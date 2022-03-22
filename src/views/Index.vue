<!--
 * @Description: 
 * @Version: 
 * @Autor: kindring
 * @Date: 2021-08-03 17:49:50
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-30 17:11:48
-->
<!--
 * @Author: your name
 * @Date: 2021-08-03 17:49:50
 * @LastEditTime: 2021-08-30 15:43:18
 * @LastEditors: kindring
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\views\home.vue
-->
<template>

      <div class="w-full box-border p-2 flex">
        <!-- 左边布局 -->
        <div class=" w-full lg:w-3/4 xl:w-4/5 flex flex-wrap ">
          <qucik-module 
            v-for="item in quickModules"
            :key="item.id"
            
          >
              <div class="quick-module ">
                {{item.text}}
              </div>
          </qucik-module>
          <!-- sm md lg xl -->
        </div>

        <!-- 侧边时间框 -->
        <div class=" w-1/5 hidden lg:block lg:w-1/4 xl:w-1/5 h-full box-border px-1 pb-1">
          <clock-chunk class="mt-1"></clock-chunk>
        </div>
        
      </div>


</template>

<script>
import qucikModule from '@components/index/quickModule.vue'
import clockChunk from '@components/index/clockChunk.vue'
export default {
    name: 'index',
    components:{
      qucikModule,
      clockChunk
    },
    data(){
      return {
        quickModules:[
          {
            id:'quickModule1',
            text: '摄像头管理',
            path: '/camera/list'
          },
          {
            id:'quickModule2',
            text: '监控大厅',
            path: '/camera/list'
          },
          {
            id:'quickModule3',
            text: '账户管理',
            path: '/camera/list'
          },
          {
            id:'quickModule4',
            text: '设备日志信息',
            path: '/camera/list'
          }
        ]
      }
    }
}
</script>

<style lang="scss">
.quick-module{
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  .div{
    font-size: 100px;
    color: red;
  }
}
.map_bg{
  width: 100%;
  height: 100%;
  color: #e3e3e3;
  background-color: rgb(114, 114, 114);
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  *{
    color: #e3e3e3;
  }
}
</style>