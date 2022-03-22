/*
 * @Description: 字段值转化为可读值
 * @Autor: kindring
 * @Date: 2021-09-17 16:04:07
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-17 17:12:51
 * @LastDescript: 
 */

let map_resolution = [{
        n: '1',
        str: '320p'
    },
    {
        n: '2',
        str: '480p'
    },
    {
        n: '3',
        str: '720p'
    },
    {
        n: '4',
        str: '1080p'
    },
]
let map_workerMode = [{
        n: '1',
        str: '节能模式'
    },
    {
        n: '2',
        str: '普通模式'
    },
    {
        n: '3',
        str: '性能模式'
    },
]
let map_current = [
    {
        n: '1',
        str: '3v模式'
    },
    {
        n: '2',
        str: '10v模式'
    },
]

/**
 * 在线状态转换
 * @param n
 * @returns {string}
 */
function online(n) {
    let str = ''
    switch (n) {
        case 1:
        case "1":
            str = '在线'
            break;
        case 2:
        case "2":
            str = '离线'
            break;
        case 3:
        case "3":
            str = '未知'
            break;
    }
    return str
}
function cameraState(n){
    let str = ''
    switch (n) {
        case 1:
        case "1":
            str = '正常'
            break;
        case 2:
        case "2":
            str = '休眠'
            break;
        case 3:
        case "3":
            str = '掉线'
            break;
        default:
            str = '未知'
            break;
    }
    return str
}

/**
 * url地址转换成字符串
 * @param url 要转换的url地址
 * @returns {string}
 */
function uploadUrl(url) {
    return url ? url : '使用设备配置地址'
}

/**
 * 视频分辨率值替换显示
 * @param n
 * @returns {string}
 */
function resolution(n) {
    let obj = map_resolution.find(val => val.n == n);
    return obj ? obj.str : '未知分辨率'
}

export default {
    map_resolution,
    online,
    uploadUrl,
    resolution,
    cameraState,
    map_workerMode,
    map_current
}