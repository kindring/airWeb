/*
 * @Description: moke主入口文件
 * @Version: 
 * @Autor: kindring
 * @Date: 2021-08-31 14:29:53
 * @LastEditors: kindring
 * @LastEditTime: 2021-08-31 14:33:44
 */
const Mock = require('mockjs')
require('./test/a.js')
require('./camera/camera.js')
require('./city')
Mock.setup({
    timeout:800
});

