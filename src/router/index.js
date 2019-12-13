import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
      },
      {
        path: '/user2',
        name: 'user2',
        component: () => import(/* webpackChunkName: "about" */ '../views/User2.vue')
      },
      {
        // 关于应用页面
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
      },
      {
        // 用户信息页面
        path: '/userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue')
      }, {
        // 编辑用户信息页面
        path: '/userEdit',
        name: 'userEdit',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserEdit.vue')
      }
    ]
  },
  {
    path: '/music',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
