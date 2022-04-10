/*
 * @Description: axios拦截器
 * @Version:
 * @Autor: kindring
 * @Date: 2021-08-31 11:07:49
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-31 15:03:03
 */
import axios from 'axios'
import Vue from 'vue';
// 加载app
// console.log(Vue)
axios.interceptors.request.use(config => {
    config.headers.withCredentials = true;
    // App.$message.info('test')
    config.changeOrigin= true
    config.credentials= true;
        config.secure= true
    return config
},error =>{
    return Promise.reject(error)
})

// 统一处理错误
axios.interceptors.response.use(response=>{
    return response;
},error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                console.log('400错误');
                // 对400错误您的处理\
                break
            case 401:
                console.log('401权限错误');
                break
            // 对 401 错误进行处理
            default:
                // 如果以上都不是的处理
                return Promise.reject(error);
        }
    }
})

export default axios