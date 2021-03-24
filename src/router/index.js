import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Menu from '../pages/Menu/Index'
import User from '../pages/User/Index'
import Role from "../pages/role/Index"
import Cate from "../pages/Cate/Index"
import Specs from "../pages/Specs/Index"
import Goods from "../pages/Goods/Index"


// 解决跳转到登录页报错问题，重复点击导航
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}


Vue.use(Router)

let router = new Router({
        routes: [{
                path: '/',
                name: 'Layout',
                component: Layout,
                meta: {
                    title: '主页面'
                },
                children: [{
                        path: '/menu',
                        name: 'Menu',
                        component: Menu,
                        meta: {
                            title: '菜单页面'
                        },
                    },
                    {
                        path: '/user',
                        name: 'User',
                        component: User,
                        meta: {
                            title: '管理员页面'
                        },
                    }, {
                        path: '/role',
                        name: 'Role',
                        component: Role,
                        meta: {
                            title: '角色页面'
                        },
                    },
                    {
                        path: '/cate',
                        name: 'cate',
                        component: Cate,
                        meta: {
                            title: '商品分类'
                        },
                    },
                    {
                        path: '/specs',
                        name: 'specs',
                        component: Specs,
                        meta: {
                            title: '商品规格'
                        },
                    },
                    {
                        path: '/goods',
                        name: 'goods',
                        component: Goods,
                        meta: {
                            title: '商品管理'
                        },
                    },
                ]
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: {
                    title: '登录'
                }
            }
        ]
    })
    // 全局前置守卫
router.beforeEach((to, from, next) => {
    next()
    document.title = to.meta.title
})


export default router