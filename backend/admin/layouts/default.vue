<template>
  <div class="min-h-screen bg-gray-100">
    <TopNav />
    <div class="flex">
      <SideNav />
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useCookie } from '#imports'
import TopNav from '../components/TopNav.vue'
import SideNav from '../components/SideNav.vue'

const router = useRouter()
const currentRoute = useRoute()
const adminCookie = useCookie('isAdmin')

if (!adminCookie.value) {
  if (currentRoute.path !== '/login') {
    router.push('/login')
  }
}
</script>
