import types from './type'

export default {
    [types.getters.cityOptions]: state => {
        //
        let results = [];
        let showCityType = state[types.state.showCityType];
        state[types.state.domestic].forEach(val=>{
            results.push({
                value:val.id,
                text: val.cityName
            })
        })
        state[types.state.domestic].forEach(val=>{
            results.push({
                value:val.id,
                text: val.cityName
            })
        })
        return state[types.state.menus].filter(val=>{
            if(val.children){
                val.children = val.children.filter(c=>!c.hide);
            }
            return !val.hide
        })
    }
};