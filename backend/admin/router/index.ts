import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Login from '../pages/Login.vue';
import Dashboard from '../layouts/default.vue';
import Users from '../pages/Users.vue';
import Statistics from '../pages/Statistics.vue';
import Blog from '../pages/Blog.vue';
import Report from '../pages/Report.vue';
import Settings from '../pages/Settings.vue';
import add from '../pages/dogs/add.vue';
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/users', name: 'Users', component: Users, meta: { requiresAuth: true } },
  { path: '/statistics', name: 'Statistics', component: Statistics, meta: { requiresAuth: true } },
  { path: '/blog', name: 'Blog', component: Blog, meta: { requiresAuth: true } },
  { path: '/report', name: 'Report', component: Report, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/dogs/add', name: 'add', component: add, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
