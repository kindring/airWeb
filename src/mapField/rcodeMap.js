export default {
    // 请求正常
    ok: 1,
    // 缺少参数
    notParam: 2,
    // 没有登录
    notLogin: 3,
    // 鉴权失败,没有权限, 不同场景不同提示内容 在登录页面账号显示封禁
    permissionDenied: 4,
    // 自定义错误信息,用于前端直接显示的信息
    customError: 5,
    // 服务器内部逻辑错误
    serverError: 6,
    // 服务器操作超时
    timeout: 7,
    // 无法找到记录,可用于账号密码错误等场景的自动化提示
    notFound: 8,

    // 二次访问接口异常
    apiError: 8,
    // 存储异常
    saveError: 9,
    // 数据重复,在某些新增的场景表示该数据已经重复
    dataRepeat: 10,
}
