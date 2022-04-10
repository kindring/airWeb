<template>
  <a-select
      @change="changeSelected"
      :value="val"
  >
    <a-select-option
        v-for="option in options"
        :key="`${keystr}-${option.value}`"
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
    }
  },
  beforeMount() {
    this.val = this.keystr+'-'+this.value;
  },
  watch:{
    value(newVal){
      console.log(newVal)
      console.log('11111111')
      this.val = this.keystr+'-'+newVal;
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
    }
  }
}
</script>

<style scoped>

</style>