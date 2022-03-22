import  axios from '../axios'

/**
 * 获取用户设备状态信息
 * @param url
 * @returns {Promise<void>}
 */
async function loadDeviceStates(url='/api/device/states'){
    return axios.get(url);
}

/**
 * 获取平台信息接口
 * @param url
 * @returns {Promise<*>}
 */
async function loadPlatInfo( url = '/api/plat/infos'){
    return axios.get(url);
}

// 获取城市摄像头数量
async function getCityCameraNumber(cityCode,url = '/api/camera/city'){
    let data = await axios.get(url+`?city=${cityCode}`)
    // console.log('axios----------');
    // console.log(data);
    return data.data;
}

/**
 * 搜索城市摄像头
 * @param key imei号片段
 * @param level 城市等级
 * @param cityId 城市id
 * @param page 当前页数
 * @param url 请求地址
 * @returns {Promise<*>}
 */
async function searchCityCameras(key,level,cityId,page,url='/api/camera/search'){
    return await axios.post(url,{
        key:key,
        page:page,
        level:level,
        city:cityId
    });
}

export default {
    loadDeviceStates,
    loadPlatInfo,
    getCityCameraNumber,
    searchCityCameras
}