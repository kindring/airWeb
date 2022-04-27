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

function setState(flightId,nextState,url = `/api/flight/state`){
    return axios.post(url,{flightId:flightId,nextState:nextState});
}

function searchSellFlights(searchOptions,url = '/api/flight/sells'){
    return axios.post(url,searchOptions);
}
function sellFlights(url = '/api/flight/sellist'){
    return axios.get(url);
}

function addAir(airCode,airRow,airCol,url = '/api/flight/air/add'){
    return axios.post(url, {
        airCode:airCode,
        row: airRow,
        col: airCol
    });
}

function airs(state,url = '/api/flight/airs'){
    url+=`?state=${state}`
    return axios.get(url);
}

function changeAir(airId,params,url = '/api/flight/air/change'){
    return axios.post(url,{
        airId:airId,
        params: params
    });
}

export default {
    searchFlights,
    flightList,
    addFlight,
    chnageFlight,
    flightInfo,
    setState,
    searchSellFlights,
    sellFlights,
    news,
    addAir,
    airs,
    changeAir
}


