<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { onMounted } from 'vue'

const { isAuthenticated } = useAuth()

onMounted(() => {
  // Force redirect to login if not authenticated
  if (!isAuthenticated.value) {
    navigateTo('/login', { replace: true })
  }
})
</script>
