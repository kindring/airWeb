import spin from './spin.vue'

// console.log(spin)
let $vm = null
export default {
    install(Vue){
        if(!$vm){
            let myLoading = Vue.extend(spin)
            $vm = new myLoading({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        $vm.show = false
        let Methods = {
            show(text){
                $vm.show = true
                $vm.text = text
                // $vm.showPop(text)
            },
            hide(){
                setTimeout(()=>{
                    $vm.show = false
                },400)
                // $vm.hidePop()
            }
        }
        if(!Vue.$vloading){
            Vue.$vloading = Methods
            Vue.prototype.$vloading = Vue.$vloading
        }else{
            console.log('$vloading占用')
        }
    }
}
