// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login       from '@/pages/login.vue'      
import Dashboard   from '@/pages/index.vue'     
import Users       from '@/pages/Users.vue'
import Blog        from '@/pages/Blog.vue'
import Report      from '@/pages/Report.vue'
import DogAdd      from '@/pages/dogs/add.vue'

const routes: RouteRecordRaw[] = [
    {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: { requiresAuth: true }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { requiresAuth: true }
  },
  {
    path: '/dogs/add',
    name: 'DogAdd',
    component: DogAdd,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAdmin = !!localStorage.getItem('isAdmin')
  if (to.meta.requiresAuth && !isAdmin) {
    return next({ name: 'login' })
  }
  next()
})

export default router
