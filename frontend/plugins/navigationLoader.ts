import { defineNuxtPlugin, useRouter, useState } from '#imports'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const isLoading = useState<boolean>('isLoading', () => false)

  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  })
})
