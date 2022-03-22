<template>
  <div class="banner w-full h-48 overflow-hidden absolute w-10">
    <img src="" alt="">
  </div>
</template>

<script>
export default {
  name: "banner",
  data(){
    return {
      banner:[
        {
          id:1,
          url: '',
          img: '',
          title:''
        }
      ]
    }
},
}
</script>

<style scoped>
.banner img{
  width: 100%;
  height: 100%;
  transition: all 0.7s;
}
</style>