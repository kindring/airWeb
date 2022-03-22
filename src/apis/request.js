/**
 * 重度封装Axios进行请求发送
 * 1. 自动获取url和method进行发送数据
 * 2. 能够进行中止http请求
 * 3. 能够对接口的返回值进行自动化处理
 */
import {apis,apiKeys} from './apiData'
import axios from './axionsBefore';
import handle from "@/utils/handle";


// 接口只有成功或者失败的区别
async function request(key,body,params){
    // 获取是否有定义此接口
    if(apis[key]){
        return false;
    }
    let apiData = apis[key];
    let [err,result] = handle(axios.create({
        url:apiData.url,
        method:apiData.method,
        params:params,
        body: body
    }));

    return result;
}
