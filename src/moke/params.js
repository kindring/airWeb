function getParams(url){
    let strs = url.split('?').splice(1).join("?")
    let params = {}

    strs.split('&').forEach(val=>{
        let str = val.split('=')
        if(str.length>1){
            params[str[0]] = str[1]
        }
    })
    return params
}

function postParams(params){
    let body = params.body;
    return JSON.parse(body)
}
module.exports = {
    getParams,
    postParams
}