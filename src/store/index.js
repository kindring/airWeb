/*
 * @Author: your name
 * @Date: 2021-08-03 15:43:24
 * @LastEditTime: 2021-11-22 16:55:03
 * @LastEditors: kindring
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\store\home.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const { Store } = Vuex

import globel from './globel'
import camera from './camera'
import home from './home'
import camControl from './cameraControl/index'



const store = new Store({
    modules: {
        namespaced: true,
        globel,
        camera,
        home: home,
        camControl: camControl
    }
});

export default store;