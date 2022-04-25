import types from './type'
import api_user from '@/apis/api_user';
import api_city from '@/apis/api_city'
import business from '@/utils/business'
import field from '@/mapField/field'
import handle from "@/utils/handle";
import api_flights from "@/apis/api_flight";
import code from '@/mapField/rcodeMap';
export default {
    [types.actions.loadUser]:  async(context)=>{
        // 加载航班
        let [err,response] = await handle(api_user.loadInfo());
        let recodeMeta = business.checkResponseRcode(response,err,{
            [code.notLogin]:()=>{
                console.log('未登录')
                context.commit(types.mutations.isLogin,false);
            }
        });
        if(!recodeMeta.ok){
            return recodeMeta;
        }
        context.commit(types.mutations.isLogin,true);
        context.commit(types.mutations.setUser,recodeMeta.res.data);
        return recodeMeta;
    },
    [types.actions.loadCar]:  async(context)=>{
        console.log('获取购物车')
        // 加载航班
        let [err,response] = await handle(api_user.loadCar());
        let recodeMeta = business.checkResponseRcode(response,err,{
            [code.notLogin]:()=>{
                console.log('未登录')
                context.commit(types.mutations.isLogin,false);
            }
        });
        if(!recodeMeta.ok){
            return recodeMeta;
        }
        let arr = recodeMeta.res.data
        context.commit(types.mutations.isLogin,true);
        console.log(arr)
        context.commit(types.mutations.setCar,arr);
        return recodeMeta;
    }
}
