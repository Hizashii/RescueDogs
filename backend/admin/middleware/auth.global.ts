export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/Login') return

  if (import.meta.client && !localStorage.getItem('isAdmin')) {
    return navigateTo('/Login')
  }
})
