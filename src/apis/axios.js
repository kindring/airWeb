/*
 * @Description:
 * @Version:
 * @Autor: kindring
 * @Date: 2021-08-31 10:56:44
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-31 14:59:41
 */
/*
 * @Description: http请求封装
 * @Version:
 * @Autor: kindring
 * @Date: 2021-08-31 10:56:44
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-31 11:07:17
 */
import axios from './axionsBefore'
let header_data = {
    Authorization: ''
}
// axios.get('/')
export default {
    get(url,auth = false){
        if(auth){
            return axios.get(url,{headers:{Authorization:header_data.Authorization}})
        }else{
            return axios.get(url)
        }
    },
    post(url,data,headers)
    {
        return axios.post(url,data,headers)
    },
    put(url,data,auth = false)
    {
        if(auth)
        {
            return axios.put(url,data,{headers:{Authorization:header_data.Authorization}})
        }else
        {
            return axios.put(url,data);
        }
    },
    del(url,auth = false)
    {
        if(auth)
        {
            return axios.delete(url,{headers:{Authorization:header_data.Authorization}})
        }else
        {
            return axios.delete(url);
        }
    },
    uploader(url,file,auth = false)
    {
        let param = new FormData();
        param.append('file',file)
        if(auth){
            return axios.post(url,param,{headers:{Authorization:header_data.Authorization}})
        }else
        {
            return axios.post(url,param)
        }
    },
    axios:axios
}