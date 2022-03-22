/*
 * @Description: 统一导出模块type
 * @Autor: kindring
 * @Date: 2021-09-26 14:29:09
 * @LastEditors: kindring
 * @LastEditTime: 2021-11-22 16:49:14
 * @LastDescript: 导出index模块
 */
import globel from './globel/type'
import camera from './camera/type'
import home from './home/type'
import camControl from "./cameraControl/type";
const typeModule = {
        globel,
        camera,
        home,
        camControl
    }
    // // 获取 mutations
    // function getMutations(_module,_type){
    //     typeModule[_module]['mutations'][_type]
    // }
export default typeModule;