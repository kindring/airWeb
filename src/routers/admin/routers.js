// import adminHome from "../../components/index/view/airHome.vue";
import index from '../../components/admin/view/index'
import citys from '../../components/admin/view/citys.vue';
import addCity from "@components/admin/view/addCity";
import addRecommend from "@components/admin/view/addRecommend.vue";
import recommends from "@components/admin/view/recommends.vue";
import recommend from "@components/admin/view/recommend.vue";
import flights from '@components/admin/view/flights'
import addFlight from '@components/admin/view/addFlight'
import logout from '@/components/admin/view/logout'
import addAir from '@/components/admin/view/addAir'
import airs from '@/components/admin/view/airs'
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
        name: '修改航班',
        meta:{title:"修改航班"},
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
        id: '/recommends',
        text: '推荐列表',
        is_menu: true,
        path: '/recommends',
        name: '推荐列表',
        meta:{title:"推荐列表"},
        component: recommends,
    },
    {
        id: '/recommend',
        text: '推荐详情',
        is_menu: true,
        path: '/recommend',
        name: '推荐详情',
        meta:{title:"推荐详情"},
        component: recommend,
    },
    {
        id: '/addAir',
        text: '新增飞机',
        is_menu: true,
        path: '/addAir',
        name: '新增飞机',
        meta:{title:"新增飞机"},
        component: addAir,
    },
    {
        id: '/airs',
        text: '飞机列表',
        is_menu: true,
        path: '/airs',
        name: '飞机列表',
        meta:{title:"飞机列表"},
        component: airs,
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
