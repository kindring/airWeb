
const state = {
    // 是否登录
    isLogin: 'STATE_IS_LOGIN',
    nickName: 'STATE_NICK_NAME',
    phone: 'STATE_PHONE',
    userId: 'STATE_USER_ID',
    // 出发城市
    departureCity: 'STATE_USER_DEPARTURE_CITY',
    // 目标城市
    targetCity: 'STATE_USER_TARGET_CITY',
    // 出发时间段
    startTime: "STATE_START_TIME",
    // 出发时间结束时间段
    endTime: "STATE_END_TIME",
    // 航班类型
    routeType: 'STATE_ROUTE_TYPE',
    // 购物车
    cars: 'STATE_USER_CAR',
    orders: "STATE_USER_ORDERS"
}

const mutations = {
    setUser: 'MUTATION_SET_USER',
    isLogin: 'MUTATION_SET_LOGIN',
    setDepartureCity: 'MUTATION_SET_DEPARTURE',
    setTargetCity: 'MUTATION_SET_TARGET',
    setStartTime: 'MUTATION_SET_START_TIME',
    setEndTime: 'MUTATION_SET_END_TIME',
    setRouteType: "MUTATION_SET_ROUTE_TYPE",
    setCar: 'MUTATION_SET_CARS'
}

const actions = {
    loadUser: 'ACTION_LOAD_USER',
    loadCar: 'ACTION_USER_CAR'
}

const getters = {
    car: 'GETTERS_CAR',
}

export default {
    mutations,
    actions,
    getters,
    state
}
