import types from './type'

export default {
    [types.getters.car]: state => {
        //
        let cars = state[types.state.cars];
        return cars.splice(0,5)
    }
};
