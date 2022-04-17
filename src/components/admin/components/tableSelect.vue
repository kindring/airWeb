<template>
  <a-select
      @change="changeSelected"
      :value="val===''?undefined:val"
  >
    <a-select-option
        v-for="option in options"
        :key="`${keystr}-${option.value}`"
        :placeholder="placeholder"
        :disabled="disableds.find(val=>val==option.value)?true:false"
        :class="{'bg-blue-300':option.value==val}"
    >
      {{option.text}}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: "tableSelect",
  props: {
    options:{
      default:[]
    },
    value: {
      default: ''
    },
    keystr: {
      default: 'default-key'
    },
    placeholder:{
      default: ''
    },
    disableds:{
      default: []
    }
  },
  beforeMount() {
    if(this.value){
      this.val = this.keystr+'-'+this.value;
    }else{
      this.val = null;
    }
  },
  watch:{
    value(newVal){
      // console.log(newVal)
      // console.log('11111111')
      if(!newVal){
        this.val = newVal;
      }else{
        this.val = this.keystr+'-'+newVal;
      }
    }
  },
  data(){
    return {
      val:null,
    }
  },
  methods: {
    changeSelected(str){
      this.val = str;
      str = str.replace(this.keystr+'-','');
      this.$emit('input',str);
      this.$emit('change',str);
    }
  }
}
</script>

<style scoped>

</style>