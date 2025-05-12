<template>
  <header class="bg-[#FFE65E] text-[#3D4836] p-4 flex justify-between items-center shadow-md">
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
</style>