import types from './type'

export default {
    [types.getters.car]: state => {
        //
        console.log(state[types.state.cars])
        console.log('-------------------------car--------------------------------')
        let cars = state[types.state.cars];
        return cars.filter((val,i)=>i<5)
    },
};
