import airHome from "../../components/index/view/airHome.vue";
import flightSearch from "@components/index/view/flightSearch";
import flightInfo from "@components/index/view/flightInfo";
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
]

export default {
    router: routers
}
