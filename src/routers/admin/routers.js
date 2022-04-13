// import adminHome from "../../components/index/view/airHome.vue";
import index from '../../components/admin/view/index'
import citys from '../../components/admin/view/citys.vue';
import addCity from "@components/admin/view/addCity";
import addRecommend from "@components/admin/view/addRcommend.vue";
import flights from '@components/admin/view/flights'
import addFlight from '@components/admin/view/addFlight'
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
        id: '/flights',
        text: '航班列表',
        is_menu: true,
        path: '/flights',
        name: '航班列表',
        meta:{title:"航班列表"},
        component: flights,
    },
    {
        id: '/addFlight',
        text: '新增航班',
        is_menu: true,
        path: '/addFlight',
        name: '新增航班',
        meta:{title:"新增航班"},
        component: addFlight,
    },
    {
        id: '/editFlight',
        text: '修改航班',
        is_menu: true,
        path: '/editFlight',
        name: '新增航班',
        meta:{title:"新增航班"},
        component: addFlight,
    },
    {
        id: '/addRecommend',
        text: '新增推荐',
        is_menu: true,
        path: '/addRecommend',
        name: '新增推荐',
        meta:{title:"新增推荐"},
        component: addRecommend,
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
