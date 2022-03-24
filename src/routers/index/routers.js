import airHome from "../../components/index/view/airHome.vue";

const routers = [{
    id: '/',
    text: '首页',
    is_menu: true,
    path: '/',
    name: '首页',
    meta:{title:"首页"},
    component: airHome,
},]

export default {
    router: routers
}