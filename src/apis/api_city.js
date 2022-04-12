import  axios from './axios';

/**
 * 获取城市
 * @param cityType 城市类型
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function getCitys(cityType,url = `/api/city/list`){
    url += `?type=${cityType}`
    return axios.get(url);
}

/**
 * 新增城市
 * @param cityType
 * @param cityName
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function addCity(cityType,cityName,url='/api/city/add'){
    return axios.post(url,{cityType:cityType,cityName:cityName});
}

function changeCity(cityId,cityType,cityName,url='/api/city/change'){
    return axios.post(url,{cityId:cityId,cityType:cityType,cityName:cityName});
}

export default {
    getCitys,
    addCity,
    changeCity
}


