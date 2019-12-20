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
        path: '/job',
        name: 'job',
        component: () => import(/* webpackChunkName: "about" */ '../views/job/job.vue')
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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.path == '/login') {
    console.log("登录页面");
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log(token);
    // 这个 null 不是字符串 'null'
    if (token == null || token == '') {
      console.log('跳转页面')
      // 如果没有token， 即没有登录， 则跳转登录页面
      // next('/login');
      next();
    } else {
      next();
    }
  }
});

export default router
