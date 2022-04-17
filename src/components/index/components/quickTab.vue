<template>

  <div class="w-p1200 h-auto rounded">
<!--    切换框-->
    <div class="tabs w-full flex h-12">
      <div
          v-for="(item,i) in tabRouter"
          :key="item.com"
          @click="changeBanner(i)"
          :class="`
          tab-handle
          ${(tabNow-1)===i?'table-left':''}
          ${tabNow===i?'table-now':''}
          ${(tabNow+1)===i?'table-right':''}
          flex-1 text-2xl text-red-50
          flex justify-center items-center cursor-pointer
          bg-black`">
        {{item.text}}
      </div>
    </div>
    <div class="h-auto bg-blue-300" >
      <component :is="tabRouter[tabNow].com"></component>
    </div>
  </div>
</template>

<script>
import domesticTab from "@components/index/components/quickTabs/domesticTab";
import internationalTab from "@components/index/components/quickTabs/internationalTab";
import newsTab from "@components/index/components/quickTabs/newsTab";
export default {
  name: "quickTab",
  components:{
    domesticTab,
    internationalTab,
    newsTab,
  },
  data(){
    return {
      tabNow:0,
      tabRouter:[
          {
            text:'国内机票',
            com: 'domesticTab'
          },
          {
            text:'国际机票',
            com: 'internationalTab'
          },
          {
            text:'航班动态',
            com: 'newsTab'
          },
          {
            text:'退票改签',
            com: 'refund'
          },
          {
            text:'更多服务',
            com: 'more'
          },
      ]
    }
  },
  methods:{
    changeBanner(i){
      this.tabNow = i;
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  background-color: skyblue;
}
.tab-handle{

  &:hover{
     background-color: #ffffff;
    color: black;
   }
}
.table-left{
  border-radius:0 0 0.25em 0;
}
.table-right{
  border-radius:0 0 0 0.25em;
}
.table-now{
  background-color: skyblue;
}
</style>
