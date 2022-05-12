import  axios from './axios';

/**
 * 获取活动列表
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function getRecommends(url = `/api/recommend/list`){
    return axios.get(url);
}

/**
 * 获取活动详情
 * @param recommendId 活动Id
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function loadRecommend(recommendId,url = `/api/recommend`){
    url += `?id=${recommendId}`;
    return axios.get(url);
}

/**
 * 新增推荐
 * @param recommendName
 * @param descript
 * @param zIndex
 * @param imgUrl
 * @param url
 */
function addRecommend(recommendName,descript,zIndex,imgUrl,url = '/api/recommend/add'){
    return axios.post(url,{recommendName:recommendName,descript:descript,zIndex:zIndex,imgUrl:imgUrl});
}

/**
 * 航班绑定推荐
 * @param recommendId
 * @param flights
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function addRecommendFlight(recommendId,flights,url = '/api/recommend/flight'){
    return axios.post(url,{recommendId:recommendId,flights:flights})
}

/**
 * 删除某个活动中的某个航班
 * @param recommendId
 * @param flightId
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteRecommendFlight(recommendId,flightId,url = '/api/recommend/flight/delete'){
    return axios.post(url,{recommendId:recommendId,flightId:flightId})
}

/**
 * 修改航班的推荐
 * @param recommendId 推荐活动id
 * @param flightId 航班id
 * @param recommendIndex 新的推荐级别
 * @param url
 */
function changeRecommendFlight(recommendId,flightId,recommendIndex,url='/api/recommend/flight/change'){
    return axios.post(url,{recommendId:recommendId,flightId:flightId,recommendIndex:recommendIndex})
}

function homer(url='/api/recommend/homer'){
    return axios.get(url);
}

export default {
    homer,
    getRecommends,
    loadRecommend,
    addRecommend,
    addRecommendFlight
}


