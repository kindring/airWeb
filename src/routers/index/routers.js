import airHome from "../../components/index/view/airHome.vue";
import flightSearch from "@components/index/view/flightSearch";
import flightInfo from "@components/index/view/flightInfo";
import userCar from "@components/index/view/userCar";
import user from '@components/index/view/user';
import orders from '@components/index/view/orders';
const routers = [{
    id: '/',
    text: '首页',
    is_menu: true,
    path: '/',
    name: '首页',
    meta:{title:"首页"},
    component: airHome,
},
    {
        id: '/search',
        text: '搜索航班',
        is_menu: true,
        path: '/search',
        name: '首页',
        meta:{title:"搜索航班"},
        component: flightSearch,
    },
    {
        id: '/info',
        text: '航班信息',
        is_menu: true,
        path: '/info',
        name: '航班信息',
        meta:{title:"航班信息"},
        component: flightInfo,
    },
    {
        id: '/cars',
        text: '购物车',
        is_menu: true,
        path: '/cars',
        name: '购物车',
        meta:{title:"购物车"},
        component: userCar,
    },
    {
        id: '/user',
        text: '用户中心',
        is_menu: true,
        path: '/user',
        name: '用户中心',
        meta:{title:"用户中心"},
        component: user,
    },
    {
        id: '/orders',
        text: '我的订单',
        is_menu: true,
        path: '/orders',
        name: '我的订单',
        meta:{title:"我的订单"},
        component: orders,
    },
]

export default {
    router: routers
}
