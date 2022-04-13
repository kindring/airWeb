import  axios from './axios';

/**
 * 搜索航班
 * @param searchOption
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function searchFlights(searchOption,url = '/api/flight/list'){
    return axios.post(url,{
        departure:searchOption.departure,
        target:searchOption.target,
        startTime:searchOption.startTime,
        endTime:searchOption.endTime,
    })
}

/**
 * 航班列表
 * @param url
 * @returns {*|Promise<AxiosResponse<any>>}
 */
function flightList(url='/api/flight/list'){
    return axios.get(url);
}

export default {
    searchFlights,
    flightList,
}


