// import china from './china';


/**
 * 获取基础图片信息,适应于
 * @returns {*}
 */
function getBaseCitys(china){
    let citys = china.features.map(val=>{
        let res = {
            id: val.id,
            city: val.properties.id,
            name: val.properties.name,
            value: val.properties.id,// 适应antd级联选择
            label: val.properties.name,// 适应antd级联选择
            level: 1,
            isLeaf: false,// 适应antd级联选择
        };
        return res
    })
    return citys;
}

function apiResponseToCity(responseData,level = 2,isLeaf = false){
    return responseData.map(val=>{
        let res = {
            id: val.id,
            value: val.code,
            label: val.name,
            level: level,
            isLeaf
        }
        return res;
    })
}




export default {
    getBaseCitys,
    apiResponseToCity
};




