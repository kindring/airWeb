/*
 * @Description: mockjs测试文件
 * @Version:
 * @Autor: kindring
 * @Date: 2021-08-31 14:36:20
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-31 15:04:35
 */
// 导入mockjs
let Mock = require('mockjs');
let params = require('../params')
let cameraItem = {
    id:'@id',
    imei:'@id',
    name: '@cname',
    title: '@ctitle',
    'state|1-3': 1,
    'offline|1-3':1,
    'sort|10-1':10
}
// 返回数据结构
let responseData = {
    'code|0-1': 1,
    'err|1': [
        '数据异常',
        '服务器繁忙',
        '数据写入失败'
    ]
}
let responseMock = {
    'rcode|0-1':1,
}
let roomTemplate = {
    name: '@city 大厅',
    'total|2-10': 1,
}


let rooms = ((n)=>{
    let arr = [];
    for (let i =1;i<=n;i++) {
        arr.push({
            ...Mock.mock(roomTemplate),
            id: i
        })
    }
    return arr;
})(10)



let roomIds = rooms.map(val=>val.id)

let minList = 15
let maxList = 30
// let total = 1000
// 创建成一个函数用来返回数据
let cameras = function(param) {
    console.log(param)
    param = params.getParams(param.url)
    return Mock.mock({
        'total': 1000,
        page: param.page,
        [`data|${minList}-${maxList}`]:[cameraItem]
    })
}

let detail = function(param){
    param = params.getParams(param.url)
    console.log('post param')
    console.log(param)
    let _tmp_obj = Mock.mock({
        ...cameraItem,
        id:param.id,
        imei: param.id,
        'resolution|1-3': 1,
        'uploadUrl|1': [null,'http://www.bing.com'],
        'workerMode|1-3': 1,
        'current|1-2': 1,
        rooms: `@shuffle([${roomIds.join(',')}], 0, 5)`
    })
    return _tmp_obj
}

let changeCamera = function (param) {
    let body = params.postParams(param)
    console.log(body)
    let data = Mock.mock(responseData)
    return data
}

let deleteCamera = function (param) {
    let body = params.postParams(param)
    console.log(`body`)
    console.log(body)
    if(!body.id){
        return {
            code: 0,
            err: '缺少设备id'
        }
    }
    let data = Mock.mock(responseData)
    return data
}

let infosMock = {
    'data|0-20':[{
        id: '@id',
        'type|1': ['info','fatalError','warn'],
        title: '@string("lower", 5)',
        msg: '@csentence',
        date: '@datetime'
    }]
}
let getStates = function (){
    let data = Mock.mock( responseMock)
    data.data =
        {
            default: 300,
            warn: 15,
            err: 5
        }
    return data;
}

let infosFn = function(){
    let data = Mock.mock(infosMock);
    data.data.forEach(val=>{
        let date = new Date(val.date)
        val.date = date.getTime() / 1000;
    })
    return data;
}
let getInfos = function (){
    let data =  infosFn();
    let res = Mock.mock(responseMock)
    res.data = data.data;
    res.total = data.data.length;
    console.log(res);
    return res;
}
let deviceMock = {
    'data|0-20':[{
        'imei': '@id',
        lastLogin: '@datetime'
    }]

}
function searchDevice(){
    let devices = Mock.mock(deviceMock);
    devices.data.forEach(val=>{
        let date = new Date(val.lastLogin)
        val.lastLogin = date.getTime() / 1000;
    })
    let res = Mock.mock(responseMock)
    res.rcode = 0;
    res.data = devices.data;
    res.total = 1200;
    res.page = Math.floor(Math.random()*20);
    res.page = 1;

    res.count = 20;
    return res;
}

let imagesMock = {
    'data|0-20':[
        {
            'id': '@id',
            VideoUrl:'@image',
            UpdateTime:'@datetime',
            'temp_env|0-100': 1,
            'temp_cpu|0-100': 1,
            'width': 1920,
            'height': 1080,
            'signal|0-100': 1,
            'battery|0-100': 1,
            'firmware_version': '1.8 re0',
        }
    ]};
function images(){
    let devices = Mock.mock(imagesMock);
    devices.data.forEach(val=>{
        let date = new Date(val.UpdateTime)
        val.UpdateTime = date.getTime() / 1000;
    })
    let res = Mock.mock(responseMock)
    res.rcode = 0;
    res.data = devices.data;
    res.total = 120000;
    res.page = Math.floor(Math.random()*20);
    res.page = 1;
    res.count = 20;
    return res;
}
// 第一个参数写正则来匹配路径,第二个参数写上method(get|post),a则为函数,返回一个值
Mock.mock(/\/api\/camera\/list/, 'get', cameras);
Mock.mock(/\/api\/camera\/detail/, 'get', detail);
Mock.mock(/\/api\/camera\/rooms/, 'get', ()=>rooms);
Mock.mock(/\/api\/camera\/detail/, 'post', changeCamera)
Mock.mock(/\/api\/camera\/delete/, 'post', deleteCamera)
Mock.mock(/\/api\/camera\/state/, 'get', getStates);
Mock.mock(/\/api\/plat\/infos/,'get',getInfos);
Mock.mock(/\/api\/devices/,'post',searchDevice);
Mock.mock(/\/api\/device\/images/,'get',images);