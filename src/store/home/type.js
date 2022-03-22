/*
 * @Description: 类型描述
 * @Autor: kindring
 * @Date: 2021-09-26 14:29:09
 * @LastEditors: kindring
 * @LastEditTime: 2021-11-25 10:43:24
 * @LastDescript: 增加大屏下的header栏状态
 */
const state = {
    //登陆日志
    loginLogs: 'loginLogs',
    //大屏模式下的header是否显示
    header: 'header',
    //大屏模式下的菜单列表
    menus: 'menus',
    // 设备总量
    deviceTotal: 'deviceTotal',
    // 在线设备总数
    deviceOnline: 'deviceOnline',
    // 用户设备状态
    userDeviceState: 'userDeviceState',
    //用户设备状态的加载状态
    userDeviceStateLoading: 'userDeviceStateLoading',
    //用户设备的错误文字
    userDeviceStateMsg: 'userDeviceStateMsg',
    // 平台推送消息.
    platInfos: 'platInfos',
    // 平台消息加载状态
    platInfoState: 'platInfoState',
    // 平台接口数据总数
    platInfoTotal: 'platInfoTotal',
    // 平台消息加载失败提示
    platInfoMsg: 'platInfoMsg',
    // 摄像头类型
    cameraType: 'cameraType',
    // 城市代码
    cityCode: 'cityCode'
}

const mutations = {
    LoginLog: 'MUTATION_LOGIN', //
    ShowHeader: 'MUTATION_SHOW_HEADER',
    HideHeader: 'MUTATION_HIDE_HEADER',
    switchDrop: 'MUTATION_SWITCH_DROP',//切换下拉菜单模式
    hideDrop: 'MUTATION_HIDE_DROP',
    setUserState: 'MUTATION_SET_USER_STATE',//修改用户的设备状态
    changeUserDeviceState: 'MUTATION_CHANGE_USER_DEVICE_STATE',//修改用户设备加载状态
    // 设置摄像头类型的数量
    setDeviceType: 'MUTATION_SET_DEVICE_TYPE',
    // 设置设备总数和在线设备数量
    setDeviceOnline: 'MUTATION_SET_DEVICE_ONLINE',
    // 修改平台信息状态 0,1,2 msg
    changePlatState: 'MUTATION_CHANGE_PLAT_STATE',
    // 从后端接口获取的信息
    setInfos: 'MUTATION_SET_INFOS',
    // 修改消息总数
    setInfoTotal: 'MUTATION_SET_INFO_TOTAL',
    // 修改某条指定的信息状态
    changePlatInfo: 'MUTATION_CHANGE_PLAT_INFO',
    // 修改指定城市下的
    changeCityCameraType: 'MUTATION_CHANGE_CITY_CAMERA_TYPE',
    // 修改当前的城市代码
    changeCityCode: 'MUTATION_CHANGE_CITY',
    // 城市代码
}

const getters = {
    menus: 'GETTERS_MENUS'
}
const actions = {
    LoginLog: 'ACTION_LOGIN',
    LoadStates: 'ACTION_LOAD_STATES',
    loadInfo: 'ACTION_LOAD_INFO',//加载平台消息数据
    markInfo: 'ACTION_MARK_INFO',//标记平台信息,标记为易读
}


export default {
    mutations,
    actions,
    getters,
    state
}
