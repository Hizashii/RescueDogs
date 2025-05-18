export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/login') return

  if (import.meta.client && !localStorage.getItem('isAdmin')) {
    return navigateTo('/login')
  }
})
