const state = {
    // 国内城市列表
    domestic: 'STATE_DOMESTIC_CITY',
    // 国际城市列表
    international: 'STATE_INTERNATIONAL_CITY',
    cityTableColumns: 'STATE_CITY_TABLE_COLUMNS'
}

const mutations = {
    setCitys: 'MUTATION_SET_CITYS'
}

const actions = {
    loadCity: 'ACTION_LOAD_CITYS'
}

export default {
    mutations,
    actions,
    state
}
