// import adminHome from "../../components/index/view/airHome.vue";
import citys from '../../components/admin/view/citys.vue';
import addCity from "@components/admin/view/addCity";
const routers = [{
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
},]

export default {
    router: routers
}