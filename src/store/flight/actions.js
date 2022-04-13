import types from './type'
import api_city from '@/apis/api_city'
import business from '@/utils/business'
import field from '@/mapField/field'
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";

export default {
    [types.actions.loadFlights]:  async(context,searchOption)=>{
        // 加载图片
        let [err,response] = await handle(api_flights.flightList());
        let {ok,msg,res} = business.checkResponseRcode(response,err);
        if(!ok){
            this.msg = msg;
            return false;
        }
        context.commit(types.mutations.setFlights,res.data);
        return true;
    }
}
