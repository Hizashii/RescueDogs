<template>
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl">Admin Dashboard</h1>
      <button
        @click="onToggleDark"
        class="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
      >
        {{ dark ? 'Light' : 'Dark' }} Mode
      </button>
    </header>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    dark: boolean
    onToggleDark: () => void
  }>()
  
  const { dark, onToggleDark } = props
  </script>
  
  <style scoped>
  /* Tailwind handles most of the styling, but feel free to add more here */
  </style>
  