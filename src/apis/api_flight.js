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

function addFlight(options,url='/api/flight/add'){
    return axios.post(url,options);
}

// 修改航班信息
function chnageFlight(flightId,newOption,url='/api/flight/change'){
    return axios.post(url, {
        flightId:flightId,
        newOption:newOption
    });
}

export default {
    searchFlights,
    flightList,
}


