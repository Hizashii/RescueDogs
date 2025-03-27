<template>
  <header class="bg-[#1446A0] text-white p-4 flex justify-between items-center shadow-md">
    <h1 class="text-2xl font-bold">Rescue Dashboard</h1>
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
/* Tailwind handles most of the styling */
</style>