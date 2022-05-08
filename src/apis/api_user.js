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

/**
 * 登录管理员用户
 * @param account 账户
 * @param passwd 密码
 * @param captcha 验证码
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function adminLogin(account,passwd,captcha,url = `/admin/login`){
    return axios.post(url,{
        account,
        passwd,
        captcha
    });
}

/**
 * 检查是否有重复账号
 * @param account
 * @param url
 */
function checkAccount(account,url='/user/api/check'){
    url += `?account=${account}`
    return axios.get(url);
}

function adminLogout(url = `/admin/logout`){
    return axios.post(url);
}

/**
 * 注册用户
 * @param nickName
 * @param account
 * @param passwd
 * @param captcha
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function register(nickName,account,passwd,captcha,url=`/user/register`){
    return axios.post(url,{
        nickName,
        account,
        passwd,
        captcha
    })
}

/**
 * 用户登录
 * @param account
 * @param passwd
 * @param captcha
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function login(account,passwd,captcha,url = `/user/login`){
    return axios.post(url,{
        account,
        passwd,
        captcha
    });
}

// 获取用户登录信息
function loadInfo(url=`/user/api/info`){
    return axios.get(url);
}
// 修改用户手机号
function changePhone(phone,passwd,url=`/user/api/changePhone`){
    return axios.post(url,{
        phone,
        passwd
    });
}
// 加载用户购物车
// 加载用户购物车
function loadCar(url = '/user/api/cars'){
    return axios.get(url);
}
// 新增航班到购物车
function addCar(flightId,url='/user/api/car/add'){
    return axios.post(url,{flightId:flightId});
}
// 移除购物车
function removeCar(carId,url='/user/api/car/remove'){
    return axios.post(url,{carId:carId});
}

/**
 * 获取用户的乘机人
 * @param url
 * @returns {Promise<AxiosResponse<any>>|*}
 */
function travels(url = '/user/api/travels'){
    return axios.get(url);
}

/**
 * 新增乘机人
 * @param name
 * @param card
 * @param phone
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function addTravel(name,card,phone,url='/user/api/travel/add'){
    return axios.post(url,{
        name:name,
        card: card,
        phone: phone
    });
}

/**
 * 修改乘机人信息
 * @param travelId 乘机人id
 * @param params 要修改的信息
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function changeTravel(travelId,params,url='/user/api/travel/change'){
    console.log(...arguments);
    return axios.post(url,{
        travelId:travelId,
        params:params
    });
}

function travelInfo(passwd,travelId,url = '/user/api/travel/info'){
    return axios.post(url,{
        travelId:travelId,
        passwd:passwd,
    });
}

function addOrder(flightId,travelIds,url = '/user/api/order/add'){
    return axios.post(url,{
        travelIds:travelIds,
        flightId:flightId,
    });
}

function orders(orderType,url = '/user/api/orders'){
    url+=`?type=${orderType}`
    return axios.get(url);
}

function payOrder(orderId,passwd,url='/user/api/order/pay'){
    return axios.post(url,{
        orderId: orderId,
        passwd:passwd,
    });
}


function orderInfo(orderId,url=`/user/api/order/info`){
    url+=`?orderId=${orderId}`
    return axios.get(url);
}

/**
 * 选择座位
 * @param seatId
 * @param row
 * @param col
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
function chooseSeat(seatId,row,col , url = '/user/api/seat/choose'){
    return axios.post(url,{
        seatId,
        row,
        col
    })
}

function refundOrder(orderId, url = '/user/api/order/refund'){
    return axios.post(url,{orderId:orderId})
}
function refundTick(tickId, url = '/user/api/seat/refund'){
    return axios.post(url,{tickId:tickId})
}

export default {
    adminLogin,
    checkAccount,
    register,
    changePhone,
    login,
    loadInfo,
    loadCar,
    addCar,
    removeCar,
    travels,
    addTravel,
    changeTravel,
    travelInfo,
    addOrder,
    orders,
    payOrder,
    orderInfo,
    chooseSeat,
    refundOrder,
    refundTick
}


