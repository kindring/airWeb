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
// 创建成一个函数用来返回数据
let a = function() {
    return {
        abc: 123,
        name:'mock接口数据'
    }
}
// 第一个参数写正则来匹配路径,第二个参数写上method(get|post),a则为函数,返回一个值
Mock.mock(/\/mock\/news/, 'get', a);