
const routers = [
    {
        id: '/',
        text: '首页',
        is_menu: true,
        path: '/',
        name: '首页',
        meta:{title:"AIR"},
        component: Index
    },
    {
        text: '摄像头',// 页面标题
        is_menus: true,//是否为侧边栏的大项
        children: [
            {   
                
                is_menu: true,//是否为侧边栏内直接可以点击的内容
                text: '摄像头列表',
                path: '/camera/list',
                name: '摄像头',
                meta:{title:"摄像头列表",menuKey: '/camerList',},
                component: webList
            },
            {
                is_menu: true,
                text: '录像',
                path: '/camera/video',
                name: '录像',
                meta:{title:"录像",menuKey: '/cameraVideo',},
                component: Home
            }
        ],
    },
    {
        text: '账户',
        is_menus: true,
        children: [
            {
                is_menu: true,
                text: '用户列表',
                path: '/user/config',
                name: '用户列表',
                meta:{title:"用户列表"},
                component: Home
            }
        ],
        
    },
    {
        title: '日志',
        is_menu: true,
        path: '/log',
        name: '日志',
        text: '日志',
        meta:{title:"日志管理"},
        component: Home
    },
    {
        title: '测试',
        is_menu: true,
        path: '/log/:id',
        name: '测试',
        text: '测试',
        meta:{title:"测试",menuKey:'test'},
        component: Home
    },
    {
        title: 'notFound',
        path: '/:pathMatch(.*)*',
        name: '未知页面',
        meta:{title:"404 Not Found 合方圆"},
        text: 'notFound',
        component: notFound
    }
]

/**
 * 大屏路由列表
 */
const bigRouters = [
    {
        id:'index',
        text: '系统概况',
        path: '/',
        meta:{title:"AIR"},
        component: BigHome,
        icon: 'system',
        drop: false,
    },
    {
        id:'camera',
        text: '监控大厅',
        path: '/camera',
        router: '/camera',
        meta:{title:"AIR-监控大厅"},
        component: cameraControl,
        icon: 'camera',
        drop: false,
        children: [
            {
              text: '大厅',
              path: '/',
                meta:{title:"AIR-设备大厅"},
                component: cameraControlIndex,
                hide:true,
            },
            {
                text: '拍照',
                path: 'photo',
                router: 'photo',
                icon:'addPhoto',
                action: 'takePhoto',
                meta:{title:"AIR-拍照"},
                component: takePhoto,
            },
            {
                text: '录像',
                path: 'video',
                router: 'video',
                icon:'addVideo',
                action: 'takeVideo',
                meta:{title:"AIR-录像"},
                component: takeVideo,
            },
            {
                text: '推流',
                path: 'live',
                router: 'live',
                icon:'addLive',
                meta:{title:"AIR-推流"},
                component: takeLive,
            },
        ]
    },
    {
        id:'statistics',
        text: '统计报表',
        path: '/statistics',
        meta:{title:"AIR-统计数据"},
        component: Index,
        icon: 'statistics',
        drop: false,
    },
    {
        id:'warning',
        text: '预警大厅',
        path: '/warning',
        meta:{title:"AIR-预警大厅"},
        component: Index,
        icon: 'warning',
        drop: false,
    },
    {
        id:'logs',
        text: '日志中心',
        path: '/logs',
        meta:{title:"AIR-日志中心"},
        component: Index,
        icon: 'logs',
        drop: false,
    },
    {
        text: '用户中心',
        path: '/user',
        hide: true,
        meta:{title:"AIR-用户中心"},
        component: Index,
    },
    {
        title: 'notFound',
        path: '/:pathMatch(.*)*',
        meta:{title:"404 Not Found AIR"},
        text: 'notFound',
        hide: true,
        component: notFound
    }
];


// 生成侧边栏列表
function getSidebar(){
    let sidebarArr = [];
    //递归生成列表
    routers.forEach(item=>{
       if(item.is_menus){
            sidebarArr.push(item);
       }
       if(item.is_menu){
            sidebarArr.push(item);
       }
    });
    return sidebarArr;
}

// 生成路由注册表 数组扁平化
function getRouters(){
    let _routers = [];
    routers.forEach((val)=>{
        if(val.is_menu){
            _routers.push(val);
        }else if(val.is_menus){
            // foreach 
            getChildrens(val).forEach((item)=>{
                _routers.push(item);
            })
        }else{
            _routers.push(val);
        }
    })
    return _routers;
}

// 扁平化子项
function getChildrens(item){
    let _arrs = [];
    item.children.forEach(val=>{
        if(val.is_menu){
            _arrs.push(val);
        }else if(val.is_menus){
            getChildrens(val).forEach((item)=>{
                _arrs.push(item);
            })
        }else{
            _arrs.push(val);
        }
    })
    return _arrs;
}



export default {
    getRouters,
    getSidebar,
    bigRouters
}
