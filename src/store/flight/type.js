
const state = {
    // 航班列表
    flights: 'STATE_FLIGHTS',
    // 航班columns
    flightTableColumns: 'STATE_CITY_TABLE_COLUMNS'
}

const mutations = {
    setFlights: 'MUTATION_SET_FLIGHTS'
}

const actions = {
    loadFlights: 'ACTION_loadFlights'
}

export default {
    mutations,
    actions,
    state
}
