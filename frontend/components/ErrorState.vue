<template>
    <div class="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div class="text-red-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <slot name="actions">
        <NuxtLink
          :to="link"
          class="bg-[#3D6625] text-white px-6 py-2 hover:bg-opacity-90 transition-colors"
        >
          Try Again
        </NuxtLink>
      </slot>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: 'Something went wrong'
    },
    message: {
      type: String,
      default: 'We encountered an error while loading the data. Please try again.'
    },
    link: {
      type: String,
      default: '/'
    }
  });
  
  defineEmits(['retry']);
  </script>