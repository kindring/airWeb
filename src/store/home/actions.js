import types from './type'
import apis from '@/apis/apis'
import business from '@/utils/business'
import time from '@/utils/time'
import handle from '@/utils/handle'

function getTypeStr(type){
    let resStr = ''
    switch (type){
        case 1:
            resStr = 'warn'
            break;
        case 2:
            resStr = 'fatalError'
            break;
        case 0:
        default:
            resStr = 'info'
            break;
    }
    return resStr;
}
export default {
    // 加载设备状态
    [types.actions.LoadStates]: async(context)=>{
        context.commit(types.mutations.changeUserDeviceState,{state:0})
        let [err,response] = await handle(apis.bigScreen.loadDeviceStates());
        let rcodeMean = business.checkResponseRcode(response,err);
        let res = rcodeMean.res;
        console.log(res)
        if(rcodeMean.ok){
            // 匹配成功
            // 解析处理数据结构,然后用于展示
            let deviceNumbers = [
                {
                    id: 'default_states',
                    label: '正常设备',
                    val:(res.data.total -res.data.err)
                },
                {
                    id: 'warn_states',
                    label: '告警',
                    val:res.data.warn
                },
                {
                    id: 'err_state',
                    label: '错误设备',
                    val:res.data.err
                },
            ];
            //提交数据
            context.commit(types.mutations.setUserState,deviceNumbers);
            context.commit(types.mutations.changeUserDeviceState,{state:1})
            // 设置最大数量和离线设备
            context.commit(types.mutations.setDeviceOnline,{total:res.data.total,online:res.data.online})
            context.commit(types.mutations.setDeviceType,{type:0,val:res.data.total})
        }else{
            //匹配失败
            context.commit(types.mutations.changeUserDeviceState,{state:2,msg:rcodeMean.msg})
        }
    },
    // 加载平台信息状态
    [types.actions.loadInfo]: async(context)=>{
        // console.log(context,page);
        // 加载api信息
        context.commit(types.mutations.changePlatState,{state:0})
        let [err,response] = await handle(apis.bigScreen.loadPlatInfo());
        if(err){
            context.commit(types.mutations.changePlatState,{state:2,msg:err.message})
            return
        }
        let {ok,msg,res} = business.checkResponseRcode(response);
        if(ok){
            // 匹配成功
            let list = res.data;
            // 数据格式
            list.forEach(val=>{
                val.CreateTime = time.dateFormat(new Date(val.CreateTime),'YY年MM月DD日H:m:s')
                val.typeClass = getTypeStr(val.Type);
            })
            // console.log(list);
            // 修改平台消息总数
            context.commit(types.mutations.setInfoTotal,res.total);
            //提交数据
            context.commit(types.mutations.setInfos,res);
            // 修改加载状态
            context.commit(types.mutations.changePlatState,{state:1})
        }else{
            //匹配失败
            context.commit(types.mutations.changePlatState,{state:2,msg})
        }

    },
}