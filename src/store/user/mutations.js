import types from './type'
import field from '@/mapField/field'
export default {
    // 设置航线列表
    [types.mutations.setUser]: (state, user) => {
        // console.log(user);
        state[types.state.userId] = user.id;
        state[types.state.nickName] = user.nickName;
    },
    [types.mutations.isLogin]: (state, b) => {
        state[types.state.isLogin] = b;
    },
    [types.mutations.setTargetCity]: (state, v) => {
        state[types.state.targetCity] = v;
    },
    [types.mutations.setDepartureCity]: (state, v) => {
        state[types.state.departureCity] = v;
    },
    [types.mutations.setEndTime]: (state, v) => {
        // console.log('setEndTime')
        state[types.state.endTime] = v;
    },
    [types.mutations.setStartTime]: (state, v) => {
        state[types.state.startTime] = v;
    },
    [types.mutations.setRouteType]: (state, v) => {
        console.log(`设置routeType${v} - ${state[types.state.routeType]}`)
        state[types.state.routeType] = v;
        console.log(state[types.state.routeType])
    },
}
