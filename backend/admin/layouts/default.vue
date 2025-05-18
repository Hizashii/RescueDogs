<template>
  <div :class="{ dark: isDark }">
    <TopNav :dark="isDark" :onToggleDark="toggleDarkMode" />
    <div class="flex">
      <SideNav />
      <main class="flex-1 p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopNav from '~/components/TopNav.vue'
import SideNav from '~/components/SideNav.vue'

const isDark = ref(false)
function toggleDarkMode() {
  isDark.value = !isDark.value
}
</script>
