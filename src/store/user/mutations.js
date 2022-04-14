import types from './type'
import field from '@/mapField/field'
export default {
    // 设置航线列表
    [types.mutations.setUser]: (state, user) => {
        state[types.state.userId] = user.id;
        state[types.state.nickName] = user.nickName;
    },
}
