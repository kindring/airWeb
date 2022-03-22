import { computed } from 'vue'
import { mapGetters, mapState, useStore, createNamespacedHelpers } from 'vuex'

const useMapper = (mapper, mapFn) => {
    const store = useStore()
    console.log('store')
    //
    // console.log(store)
    // console.log(mapFn)
    //
    // console.log(mapper)
    const storeStateFns = mapFn(mapper)
    const storeState = {}
    console.log(storeStateFns)
    Object.keys(storeStateFns).forEach((keyFn) => {
        const fn = storeStateFns[keyFn].bind({ $store: store })
        storeState[keyFn] = computed(fn)
    })

    return storeState
}

export const useState = (moduleName, mapper) => {
    let mapperFn = mapState
    if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState
    } else {
        mapper = moduleName
    }
    return useMapper(mapper, mapperFn)
}

export const useGetters = (moduleName, mapper) => {
    let mapperFn = mapGetters
    if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters
    } else {
        mapper = moduleName
    }
    return useMapper(mapper, mapperFn)
}
