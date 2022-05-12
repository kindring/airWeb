import  axios from './axios';

/**
 * 获取img列表
 * @param url
 * @returns {Promise<AxiosResponse<any>>|*}
 */
function loadImages(url="/api/file/list"){
    return axios.get(url);
}

export default {
    loadImages,
}
