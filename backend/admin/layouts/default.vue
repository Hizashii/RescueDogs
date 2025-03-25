<template>
  <!-- The root wrapper toggles dark mode via a class binding -->
  <div :class="{ dark: isDark }">
    <!-- Top Navigation -->
    <TopNav :dark="isDark" :onToggleDark="toggleDarkMode" />

    <!-- Main Layout -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <SideNav />

      <!-- Page Content -->
      <main class="flex-1 p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Import our new components
import TopNav from '~/components/TopNav.vue'
import SideNav from '~/components/SideNav.vue'

const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
}
</script>

<style scoped>
/* Additional global or layout-specific styles can go here */
</style>
