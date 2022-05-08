// 统一处理业务逻辑
import code from "@/mapField/rcodeMap"
let rcodeHandleMap = {
};
function registerHandle(rcode,handle){
  rcodeHandleMap[rcode] = handle;
}

// 1. 获取当前url地址
// 2. 存储sessionStore
// 3. 自动前往登陆页
function toLogin(newUrl){
    let nowUrl = window.location.href;
    window.sessionStorage.setItem('lastUrl',nowUrl);
    // 刷新页面
    setTimeout(()=>{
        if(newUrl){
            window.location.href = newUrl
        }else{
            window.location.reload();
        }
        // window.location.href = '/login';
    },3000)
}

/**
 * 检查api返回值对应含义,普通服务器接口
 * @param response axios 接口返回的请求值
 * @param errDeal {boolean} 是否是否由此函数自动处理错误
 * @param fns {object} 对应的rcocd绑定对应的函数
 * @returns {{msg: string, ok: boolean, type: string}}
 */
function checkResponseRcode(response,err,fns={}){
    let defaultFns = {
        [code.notLogin]:toLogin,
    }
    // console.log(fns)
    let fnHandle={
        ...defaultFns,
        ...fns
    }
    // console.log(fnHandle)
    let res = {
        //请求是否成功
        ok: false,
        /**
         * 错误描述
         */
        msg: err?err.message:'',
        /**
         * 错误类型
         */
        type: 'error',
        /**
         * 请求成功后的结果 body
         */
        res:null
    }
    if(err){return res;}
    let data = response.data;

    switch(data.rcode) {
        case 1:
            res.ok = true;
            res.type = 'success';
            break;
        case 2:
            res.msg = data.msg||'参数缺失';
            break;
        case 3:
            res.msg = '登陆失效';
            console.log('登录失效')
            if(fnHandle[code.notLogin]){
                fnHandle[code.notLogin]();
            }
            break;
        case 4:
            res.msg = '无权限访问接口';
            break;
        case 5:
            res.msg = data.msg||'自定义错误信息';
            break;
        case 6:
            res.msg = '服务器内部错误';
            break;
        case 7:
            res.msg = '服务器操作超时';
            break;
        case 8:
            res.msg = data.msg||'无法找到';
            break;
        default:
            res.msg = '未受支持的rcode码';
            break;
    }
    res.res = data;
    return res;
}

function checkErr(err){
    console.log(err);
}

export default {
    checkResponseRcode,
    checkErr,
    toLogin,
    registerHandle
}
