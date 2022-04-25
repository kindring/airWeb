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
export default {
    adminLogin,
    checkAccount,
    register,
    login,
    loadInfo,
    loadCar,
    addCar,
    removeCar
}


