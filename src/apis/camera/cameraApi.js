import  axios from '../axios'

// url函数

async function loadList(page,search){
    page = page || 1;
    search = search || '';
    let url = `/api/camera/list?page=${page}`
    url += search? `&key=${search}`:''
    let list = await axios.get(url);
    return list;
}


async function loadRooms(){
    let url = `/api/camera/rooms`
    let data = await axios.get(url)
    return data.data;
}

/**
 * 获取指定相机信息
 * @param id
 * @returns {Promise<void>}
 */
async function getDetail(id){
    let url = `/api/camera/detail?id=${id}`
    let data =  await axios.get(url)
    return data.data;
}

async function changeDetail(id,obj){
    let url = `/api/camera/detail`
    let data = await  axios.post(url,{
        id: id,
        changeData: obj
    })
    return data.data
}
async function deleteCamera(id){
    let url = `/api/camera/delete`
    let data = await  axios.post(url,{
        id: id,
    })
    return data.data
}

/**
 * 获取设备状态
 * @returns {Promise<void>}
 */
async function loadDeviceStates(){
    let url = `/api/camera/states`
    let data = await axios.get(url)
    return data.data;
}

/**
 * 搜索设备列表
 * @param options
 * @param url
 * @returns {Promise<*>}
 */
async function searchDevice(options,url='/api/devices'){
    return await axios.post(url,options);
}

/**
 * 拍照
 * @returns {Promise<void>}
 */
async function doPhoto(option,url='/api/device/control/photo'){
    let defaultOption = {
        imeis:[],
        count: 1,
    };
    option = {
        ...defaultOption,
        ...option
    }
    return await axios.post(url,option);
}
/**
 * 录像
 * @returns {Promise<void>}
 */
async function doVideo(option,url='/api/device/control/Video'){
    let defaultOption = {
        imeis:[],
        count: 1,
    };
    option = {
        ...defaultOption,
        ...option
    }
    return await axios.post(url,option);
}

/**
 * 调整云台
 * @param imei 设备iemi号
 * @param action 执行的操作
 * @param url 请求路径
 * @returns {Promise<AxiosResponse<any>>}
 */
async function setPlat(imei,action,url = '/api/control/ptz'){
    return await axios.post(url, {imei:imei,action:action});
}

/**
 * 获取图片列表
 * @param imei
 * @param page
 * @param url
 * @returns {Promise<*|AxiosResponse<any>>}
 */
async function loadImages(imei,page,url ='/api/device/images'){
    url += `?imei=${imei}&page=${page}`
    return axios.get(url);
}

/**
 * 删除指定照片
 * @param id 要删除的照片id
 * @param url
 * @returns {Promise<*|AxiosResponse<any>>}
 */
async function deleteImage(id,url = '/api/device/image/delete'){
    url += `?id=${id}`;
    return axios.get(url);
}

/**
 * 获取图片列表
 * @param imei
 * @param page
 * @param url
 * @returns {Promise<*|AxiosResponse<any>>}
 */
async function loadVideos(imei,page,url ='/api/device/videos'){
    url += `?imei=${imei}&page=${page}`
    return axios.get(url);
}

export default {
    loadList,
    getDetail,
    changeDetail,
    deleteCamera,
    loadRooms,
    loadDeviceStates,
    searchDevice,
    doPhoto,
    doVideo,
    setPlat,
    loadImages,
    loadVideos,
    deleteImage,
}