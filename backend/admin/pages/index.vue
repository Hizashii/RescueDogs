<script setup lang="ts">
import { useCookie, navigateTo, useRuntimeConfig } from '#imports'
import { ref, onMounted } from 'vue'

const isAdmin = useCookie('isAdmin').value
if (!isAdmin) {
  navigateTo('/login')
}
const dogs = ref<any[]>([])
const loading = ref(true)
const apiError = ref(false)
const { public: { apiBase } } = useRuntimeConfig()

async function fetchDogs() {
  loading.value = true
  apiError.value = false
  try {
    const res = await fetch(`${apiBase}/api/dogs`)
    if (!res.ok) throw new Error('Failed to fetch dogs')
    const data = await res.json()
    dogs.value = data.dogs
  } catch (err) {
    console.error(err)
    apiError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchDogs)
</script>

<template>
  <div class="min-h-screen bg-[#F8F6ED] p-8 space-y-6">
    <h1 class="text-3xl font-bold text-[#3D4836]">Dashboard Home</h1>

    <div v-if="loading" class="text-[#3D4836] text-lg font-medium py-4">
      Loading dogs...
    </div>

    <div v-else-if="apiError" class="text-center text-red-600 font-medium py-4">
      Error loading dogs. Please try again.
    </div>

    <div v-else-if="!dogs.length" class="font-medium py-4">
      No dogs available at the moment.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="dog in dogs" :key="dog._id" class="bg-white shadow">
        <img
          :src="`${apiBase}${dog.image}`"
          :alt="dog.name"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-5">
          <h2 class="text-xl font-bold mb-2 text-[#1446A0]">{{ dog.name }}</h2>
          <p class="text-black mb-3 line-clamp-3">{{ dog.description }}</p>
          <div class="space-y-1 border-t border-gray-200 pt-3 mt-3">
            <p class="text-sm"><span class="font-semibold">Location:</span> {{ dog.location || 'N/A' }}</p>
            <p class="text-sm"><span class="font-semibold">Breed:</span>    {{ dog.breed    || 'N/A' }}</p>
            <p class="text-sm"><span class="font-semibold">Size:</span>     {{ dog.size     || 'N/A' }}</p>
            <p class="text-sm"><span class="font-semibold">Age:</span>      {{ dog.age      || 'N/A' }}</p>
            <p class="text-sm"><span class="font-semibold">Gender:</span>   {{ dog.gender   || 'N/A' }}</p>
            <p class="text-sm">
              <span class="font-semibold">Good With:</span>
              <span v-if="dog.goodWith?.length">{{ dog.goodWith.join(', ') }}</span>
              <span v-else>N/A</span>
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <NuxtLink
              :to="{ path: '/dogs/add', query: { id: dog._id } }"
              class="px-4 py-2 bg-green-500 text-white hover:bg-green-600"
            >
              Edit
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
