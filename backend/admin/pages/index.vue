<template>
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Dashboard Home</h1>
      <p>Welcome to the admin dashboard! Below is a list of our dogs:</p>
  
      <!-- Loading Indicator -->
      <div v-if="loading" class="text-gray-500">
        Loading dogs...
      </div>
  
      <!-- Dogs Grid -->
      <div v-else>
        <!-- Show a message if no dogs are available -->
        <div v-if="dogs.length === 0" class="text-gray-500">
          No dogs available at the moment.
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <!-- Dog Card -->
          <div
            v-for="dog in dogs"
            :key="dog._id"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              :src="dog.image"
              :alt="dog.name"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{{ dog.name }}</h2>
              <p class="text-gray-700 dark:text-gray-300 line-clamp-3">
                {{ dog.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'
  
  // Use the "default" layout (or "admin" if you've named it differently)
  definePageMeta({
    layout: 'default'
  })
  
  const dogs = ref<Array<any>>([])
  const loading = ref(true)
  
  // Fetch dog data when the component is mounted
  onMounted(async () => {
    try {
      // If you have an Axios plugin set up, you can do:
      // const { $api } = useNuxtApp()
      // const { data } = await $api.get('/dogs')
      // dogs.value = data
  
      // Otherwise, here's a plain fetch example:
      const response = await fetch('http://localhost:3000/api/dogs')
      if (!response.ok) {
        throw new Error('Failed to fetch dogs')
      }
      const data = await response.json()
      dogs.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  /* Tailwind's "line-clamp" feature requires the line-clamp plugin or custom CSS. 
     If you haven't set that up, you can remove "line-clamp-3" above or replace it 
     with your own styling. */
  </style>
  