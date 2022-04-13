import types from './type'
import api_city from '@/apis/api_city'
import business from '@/utils/business'
import field from '@/mapField/field'
import handle from "@/utils/handle";
import apis from "@/apis/apis";

export default {
    [types.actions.loadCity]:  async(context,obj)=>{
        // 加载图片
        // 判断是否有
        let cityType = obj.cityType || field.cityType_domestic,
            array = [];
        console.log(obj)
        if(obj.load){
            console.log('重新加载')
            // 判断是否存在对应的只
            if(cityType == field.cityType_international){
                array = context.state[types.state.international];
            }else{
                array = context.state[types.state.domestic];
            }
        }
        if(!array.length){
            let [err,response] = await handle(api_city.getCitys(cityType));
            let {ok,msg,res} = business.checkResponseRcode(response,err);
            if(!ok){
                console.log('未知的值')
                return false;
            }
            array = res.data;
        }

        context.commit(types.mutations.setCitys,{
            type: cityType,
            array: array
        });
        return true;
    }
}
