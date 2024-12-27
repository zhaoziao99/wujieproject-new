import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/BaseLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/wecome',
    children: [
      {
        path: '/wecome',
        name: 'wecome',
        component: () => import('../views/wecome.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/sub-vue2',
        name: 'subVue2',
        component: () => import('../views/SubVue2.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, _from, next) => {
  const token = sessionStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // 需要登录但未登录，重定向到登录页
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    // 已登录时访问登录页，重定向到首页
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
