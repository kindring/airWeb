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

function adminLogout(url = `/admin/logout`){
    return axios.post(url);
}

export default {
    adminLogin
}


