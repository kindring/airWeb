import types from './type'

export default {
    [types.getters.menus]: state => {
        console.log(state[types.getters.menus])
        return state[types.state.menus].filter(val=>{
            if(val.children){
                val.children = val.children.filter(c=>!c.hide);
            }
            return !val.hide
        })
    }
};