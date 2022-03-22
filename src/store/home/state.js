/*
 * @Description: 登陆日志状态
 * @Version: 
 * @Autor: kindring
 * @Date: 2021-08-31 10:34:43
 * @LastEditors: kindring
 * @LastEditTime: 2021-11-22 16:55:20
 */
import types from './type'
import Router from '@/routers/routers'
const routers = Router.bigRouters.filter(val=>!val.hide);
let cameraType = [
    {
        type: 0,
        name: '摄像头总数',
        total: 1
    },
    {
        type: 1,
        name: '星光摄像头',
        total: 100
    },
    {
        type: 2,
        name: '烟火识别',
        total: 60
    },
    {
        type: 3,
        name: '智能识别',
        total: 59
    },
    {
        type: 4,
        name: '长焦摄像头',
        total: 15
    },
];
export default {
    [types.state.loginLogs]: [],
    [types.state.header]: true, //默认为显示
    [types.state.menus]: routers,//列表数据
    [types.state.userDeviceState]: [],//用户设备状态
    [types.state.userDeviceStateLoading]: 0,//用户设备状态加载状态
    [types.state.userDeviceStateMsg]: '',// 用户信息
    [types.state.platInfos]: [],//推送信息
    [types.state.platInfoState]: 0,//加载中
    //描述文字
    [types.state.platInfoMsg]: '',
    //消息总数量
    [types.state.platInfoTotal]: 0,
    //摄像头类型
    [types.state.cameraType]:cameraType,
    //设备总数量
    [types.state.deviceTotal]:0,
    //在线设备
    [types.state.deviceOnline]:0
};