/*
 * @Description: 服务器返回数据表
 * @Autor: kindring
 * @Date: 2022-01-24 14:22:04
 * @LastEditors: kindring
 * @LastEditTime: 2022-01-24 14:41:08
 * @LastDescript:
 */
module.exports = {
    // 请求正常
    ok: 1,
    // 缺少参数
    notParam: 2,
    // 没有登录
    notLogin: 3,
    // 鉴权失败
    permissionDenied: 4,
    // 自定义错误信息,用于前端直接显示的信息
    customError: 5,
    // 服务器内部逻辑错误
    serverError: 6,
}