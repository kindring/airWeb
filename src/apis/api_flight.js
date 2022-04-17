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
function chnageFlight(flightId,newOption,url='/api/flight/update'){
    return axios.post(url, {
        flightId:flightId,
        newOption:newOption
    });
}

function flightInfo(flightId,url = '/api/flight/info'){
    url += `?flightId=${flightId}`
    return axios.get(url)
}

function news(isAll = false,url='/api/flight/news'){
    url += `?all=${isAll}`
    return axios.get(url);
}
export default {
    searchFlights,
    flightList,
    addFlight,
    chnageFlight,
    flightInfo,
    news
}


