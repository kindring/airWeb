import types from './type'
import api_city from '@/apis/api_city'
import business from '@/utils/business'
import field from '@/mapField/field'
import handle from "@/utils/handle";
import apis from "@/apis/apis";

export default {
    [types.actions.loadCity]:  async(context,cityType = field.cityType_domestic)=>{
        // 加载图片
        let [err,response] = await handle(api_city.getCitys(cityType));
        let {ok,msg,res} = business.checkResponseRcode(response,err);
        if(!ok){
            this.msg= msg;
            return false;
        }
        context.commit(types.mutations.setCitys,{
            type: cityType,
            array: res.data
        });
        return true;
    }
}
