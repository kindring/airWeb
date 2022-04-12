// import adminHome from "../../components/index/view/airHome.vue";
import index from '../../components/admin/view/index'
import citys from '../../components/admin/view/citys.vue';
import addCity from "@components/admin/view/addCity";

import logout from '@/components/admin/view/logout'
const routers = [{
    id: '/',
    text: '航班管理系统',
    is_menu: true,
    path: '/',
    name: '航班管理系统',
    meta:{title:"航班管理系统"},
    component: index,
},{
    id: '/citys',
    text: '城市管理',
    is_menu: true,
    path: '/citys',
    name: '城市管理',
    meta:{title:"城市管理"},
    component: citys,
},{
    id: '/addCity',
    text: '城市管理',
    is_menu: true,
    path: '/addCity',
    name: '城市管理',
    meta:{title:"城市管理"},
    component: addCity,
},
    {
        id: '/logout',
        text: '退出登陆',
        is_menu: true,
        path: '/logout',
        name: '退出登陆',
        meta:{title:"退出登陆"},
        component: logout,
    },]

export default {
    router: routers
}
