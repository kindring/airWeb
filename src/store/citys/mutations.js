import types from './type'
import field from '@/mapField/field'
export default {
    // 设置城市
    [types.mutations.setCitys]: (state, options) => {
        switch(options.type){
            case field.cityType_domestic:
                state[types.state.domestic] = options.array;
                break;
            case field.cityType_international:
                state[types.state.international] = options.array;
                break;
            default:
                console.error('未知的数据格式')
        }
    },
}
