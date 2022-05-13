import  axios from './axios';

/**
 * 获取活动列表
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function getRecommends(url = `/api/recommend/recommends`){
    return axios.get(url);
}

/**
 * 获取活动详情
 * @param recommendId 活动Id
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function recommendInfo(recommendId,url = `/api/recommend/info`){
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
 * 修改绑定的推荐信息
 * @param recommendId
 * @param changeParams
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function changeRecommend(recommendId,changeParams,url='/api/recommend/change'){
    return axios.post(url,{id:recommendId,params:changeParams})
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
 * @param params 航班信息 图片和排序
 * @param url
 */
function changeRecommendItem(recommendId,flightId,params,url='/api/recommend/flight/change'){
    return axios.post(url,{recommendId:recommendId,flightId:flightId,params:params})
}

/**
 * 新增航班活动项
 * @param recommendId
 * @param flightId
 * @param img
 * @param zIndex
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function addRecommendItem(recommendId,flightId,img,zIndex,url = '/api/recommend/flight/add'){
    return axios.post(url,{
        recommendId:recommendId,
        flightId:flightId,
        zIndex:zIndex,
        img:img,
    })
}

function homer(url='/api/recommend/homer'){
    return axios.get(url);
}

/**
 * 获取未加载的航班列表
 * @param recommendId
 * @param url
 * @returns {Promise<AxiosResponse<any>>|*}
 */
function recommendNotSelected (recommendId,url='/api/recommend/nof'){
    url+=`?id=${recommendId}`
    return axios.get(url);
}
export default {
    homer,
    getRecommends,
    recommendInfo,
    addRecommend,
    changeRecommend,
    addRecommendItem,
    deleteRecommendFlight,
    recommendNotSelected,
    changeRecommendItem
}


