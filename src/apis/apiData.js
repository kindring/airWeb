/**
 * api接口数据
 * 模块 -> 对应的接口列表
 */

let userApis = {
    // 用户登陆接口
    login:{
        method: 'post',
        url: '/api/user/login',
    },
    // 获取平台信息
    platInfo:{
        method: 'get',
        url:'/api/plat/infos'
    }
}

/**
 * 设备api列表
 * @type {{}}
 */
let deviceApis = {
    // 获取设备拍摄到的图片
    images:{
      method: 'get',
      url: '/api/device/images',
    },
    // 删除指定图片
    delImage:{
        method: 'get',
        url: '/api/device/image/delete'
    },
    // 获取设备状态数量信息
    deviceStates:{
        method: 'get',
        url: '/api/device/states'
    },
    // 设备列表
    devices:{
        method: 'post',
        url: '/api/devices'
    },
    // 获取城市摄像头数量
    cityDeviceNumber:{
        method: 'get',
        url: '/api/camera/city'
    },
    // 搜索摄像头
    searchDevices:{
      method: 'post',
      url: '/api/camera/search'
    },

}

/**
 * 设备控制接口
 * @type {{takePhoto: {method: string, url: string}}}
 */
let deviceControlApis = {
    // 设备拍照
    takePhoto:{
        method: 'post',
        url: '/api/device/control/photo'
    },
}

// 接口数据
let apis = {
    ...userApis,
    ...deviceApis,
    ...deviceControlApis
}

export default {
    apis:apis,
    apiKeys:Object.keys(apis)
};