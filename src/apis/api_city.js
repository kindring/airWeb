import  axios from './axios';

/**
 * 获取城市
 * @param cityType 城市类型
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function getCitys(cityType,url = `/api/citys`){
    url += `?city=cityType`
    return axios.get(url);
}

export default {
    getCitys
}


