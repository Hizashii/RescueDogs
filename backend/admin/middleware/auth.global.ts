export default defineNuxtRouteMiddleware((to) => {
  const adminCookie = useCookie('isAdmin')
  if (to.path !== '/login' && !adminCookie.value) {
    return navigateTo('/login', { replace: true })
  }
  if (to.path === '/login' && adminCookie.value) {
    return navigateTo('/', { replace: true })
  }
})