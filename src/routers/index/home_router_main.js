import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './routers.js'

Vue.use(VueRouter);

const routes = Router.router;

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
