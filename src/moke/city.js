let Mock = require('mockjs');
let params = require('./params');

let responseMock = {
    'rcode|0-1':1,
}

let citysArr = [
    {
        id: 100000,
        code: 100000,
        name: '北京'
    },
    {
        id: 1000044,
        code: 1000044,
        name: '上海'
    },
    {
        id: 100044,
        code: 100044,
        name: '深圳'
    },
]

function citys(param){
    // 返回
    param = params.getParams(param.url)
    console.log(param)
    let response = Mock.mock(responseMock)
    response.total = 3;
    response.data = citysArr.map(val=>{
        return {
            ...val,
            name:param.city + val.name
        };
    });
    return response
}

Mock.mock(/\/api\/citys/, 'get', citys);