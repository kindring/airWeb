import types from './type'
import field from '@/mapField/field'
export default {
    // 设置航线列表
    [types.mutations.setFlights]: (state, array) => {
        console.log(array);
        state[types.state.flights] = array;
    },
}
