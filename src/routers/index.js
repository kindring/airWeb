/*
 * @Author: your name
 * @Date: 2021-08-03 10:07:06
 * @LastEditTime: 2021-08-27 16:07:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \web_camera\src\router\home.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './routers.js'

Vue.use(VueRouter);

const routes = Router.bigRouters;

const router = new VueRouter({
    routes:routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta){
        if(to.meta.title){//判断是否有标题
            document.title = to.meta.title
        }
    }
    next()  //执行进入路由，如果不写就不会进入目标页
})

export default router
