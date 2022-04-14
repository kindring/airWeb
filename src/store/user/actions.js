import types from './type'
import api_user from '@/apis/api_user';
import api_city from '@/apis/api_city'
import business from '@/utils/business'
import field from '@/mapField/field'
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";

export default {
    [types.actions.loadUser]:  async(context)=>{
        // 加载航班
        let [err,response] = await handle(api_user.loadInfo());
        let recodeMeta = business.checkResponseRcode(response,err);
        if(!recodeMeta.ok){
            return recodeMeta;
        }
        context.commit(types.mutations.setUser,recodeMeta.res.data);
        return recodeMeta;
    }
}
