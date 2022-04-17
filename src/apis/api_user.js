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

export default {
    adminLogin,
    checkAccount,
    register,
    login,
    loadInfo
}


