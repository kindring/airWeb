import  axios from '../axios'


function login(owner,passwd,captcha,url = '/api/user/login'){
    let  formData = new FormData();
    formData.append('owner',owner);
    formData.append('passwd',passwd);
    formData.append('captcha',captcha);
    return axios.post(url,formData, {"Content-Type": "multipart/form-data"})
}

export default {
    login,
}