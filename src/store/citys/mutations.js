import types from './type'
import field from '@/mapField/field'
export default {
    // 设置城市
    [types.mutations.setCitys]: (state, options) => {
        console.log('type'+options.type+'cityType_international'+field.cityType_international);
        if(options.type == field.cityType_domestic){
            state[types.state.domestic] = options.array;
        }else if(options.type == field.cityType_international){
            state[types.state.international] = options.array;
        }
    },
}
