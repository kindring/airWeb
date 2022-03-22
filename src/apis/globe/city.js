import  axios from '../axios'

function getChina(url='/api/china'){
    return axios.get(url)
}
function getAreaCode(url='/api/areacode'){
    return axios.get(url)
}


function getProvinces(url='/api/map/province'){
    return axios.get(url);
}
function getCitys(province,url='/api/map/city'){
    url += `?province=${province}`;
    return axios.get(url);
}
function getDistrict(city,url='/api/map/district'){
    url += `?city=${city}`;
    return axios.get(url);
}

/**
 * 获取指定adCode的地图数据
 * @param adcode
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function getMapData(adcode,url = `https://geo.datav.aliyun.com/areas_v3/bound/`){
    url = `${url}${adcode}_full.json`
    return axios.get(url);
}

/**
 * 获取城市摄像头列表
 * @param level
 * @param cityCode
 * @param url
 * @returns {Promise<AxiosResponse<any>>|*}
 */
function getCityCamera(level,cityCode,url = '/api/map/cameras'){
    console.log(url);
    url += `?level=${level}&code=${cityCode}`;
    return axios.get(url);
}

// function getProvince



export default {
    getChina,
    getAreaCode,
    getProvinces,
    getCitys,
    getDistrict,
    getCityCamera,
    getMapData,
}
