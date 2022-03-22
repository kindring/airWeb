/*
 * @Description: 
 * @Autor: kindring
 * @Date: 2021-09-26 14:29:09
 * @LastEditors: kindring
 * @LastEditTime: 2021-11-25 17:12:11
 * @LastDescript: 
 */
import types from './type'

export default {
    [types.mutations.LoginLog]: (state, logins) => {
        state.logins = logins;
    },
    // 隐藏header
    [types.mutations.HideHeader]: (state) => {
        state[types.state.header] = false;
    },
    // 显示header
    [types.mutations.ShowHeader]: (state) => {
        state[types.state.header] = true;
    },
//    修改menu数据
    [types.mutations.switchDrop]: (state,id)=>{
        let index = state[types.state.menus].findIndex(val=>val.id == id)
        state[types.state.menus][index].drop = !state[types.state.menus][index].drop;
    },
    //    修改menu数据
    [types.mutations.hideDrop]: (state)=>{
        state[types.state.menus].forEach(val=>val.drop = false);
    },
    // 设置设备状态信息
    [types.mutations.setUserState]: (state,list)=>{
        state[types.state.userDeviceState] = list;
    },
    // 修改加载状态以及显示的文字
    [types.mutations.changeUserDeviceState]:(state,object)=>{
        state[types.state.userDeviceStateLoading] = object.state;
        state[types.state.userDeviceStateMsg] = object.msg || '';
    },
    // 修改信息
    [types.mutations.setInfos]:(state,array)=>{
        state[types.state.platInfos] = array;
    },
    // 修改加载状态以及显示的文字
    [types.mutations.changePlatState]:(state,object)=>{
        state[types.state.platInfoState] = object.state;
        state[types.state.platInfoMsg] = object.msg || '';
    },
    // 修改加载信息总数
    [types.mutations.setInfoTotal]:(state,total)=>{
        state[types.state.platInfoTotal] = total;
    },
    // 设置设备离线和在线状态
    [types.mutations.setDeviceOnline]:(state,object)=>{
        state[types.state.deviceTotal] = object.total;
        state[types.state.deviceOnline] = object.online;
    },
    // 设置类型数量
    [types.mutations.setDeviceType]:(state,object)=>{
        object.type = object.type || 0;
        console.log(object);
        let index = state[types.state.cameraType].findIndex(val=>val.type == object.type);
        state[types.state.cameraType][index].total = object.val;
    },

}
