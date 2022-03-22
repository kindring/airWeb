/*
 * @Description: 工具函数
 * @Version: 
 * @Autor: kindring
 * @Date: 2021-08-30 17:28:13
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-02 09:52:36
 */

/**
 * 数字转字符串,前置加0
 * @param {*} num 
 */
function numberAddZero(num){
    return num/10<1?'0'+num:num
}

/**
 * 深拷贝
 * @param object 要拷贝的数组
 * @param weakMap
 * @returns {*[]|any}
 */
function deepClone(object, weakMap = new WeakMap()) {
    if (object === null){
        // console.log('object 为空')
        return object
    }
    if (typeof object === 'object') {
        let cloneTarget = Array.isArray(object) ? [] : {}
        console.log(cloneTarget)
        if (weakMap.get(object)) {
            // console.log('当前值已经存在')
            return weakMap.get(object)
        }
        weakMap.set(object,cloneTarget)
        for (const key in object) {
            if(!object[key]){
                cloneTarget[key] = object[key]
            }
            cloneTarget[key] = deepClone(object[key], weakMap)
        }
        // console.log('cloneTarget --- ')
        // console.log(cloneTarget)
        return cloneTarget
    } else {
        // console.log('deepclone')
        // console.log(object,weakMap)
        return object
    }
}

/**
 * 判断两个对象的值是否相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns {boolean} 是否相等
 */
function isEqual(obj1, obj2) {
    if (obj1 instanceof Array) {
        if (obj1.length != obj2.length) {
            return false
        }
        for (let index = 0; index < obj1.length; index++) {
            if (obj1[index] instanceof Object) {
                if (!isEqual(obj1[index], obj2[index])) {
                    return false
                }
            } else {
                if (obj1[index] != obj2[index]) {
                    return false
                }
            }
        }
    } else if (obj1 instanceof Object) {
        if (Object.keys(obj1).length != Object.keys(obj2).length) {
            console.log('对象值数量不一致');
            return false
        }
        for (let key in obj1) {
            // 防止循环引用
            if (obj1[key] instanceof Object) {
                if (!isEqual(obj1[key], obj2[key])) {
                    return false
                }
            } else {
                if (obj1[key] != obj2[key]) {
                    return false
                }
            }
        }
    } else {
        return obj1 == obj2
    }
    return true
}





export default {
    numberAddZero,
    deepClone,
    isEqual
}
