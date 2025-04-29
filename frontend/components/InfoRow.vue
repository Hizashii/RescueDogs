<template>
    <div class="flex items-center gap-2">
      <p class="text-black text-sm font-semibold">{{ label }}</p>
      <p class="text-black text-sm font-light">{{ value }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Props {
    label: string
    value: string | number
  }
  
  const props = defineProps<Props>()
  const { label, value } = props
  </script>
  
  <style scoped>
  </style>
  