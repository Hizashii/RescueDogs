<template>
  <div class="min-h-screen bg-gray-100 text-black p-8 space-y-6">
    <h1 class="text-3xl font-bold text-[#1446A0]">Dashboard Home</h1>
    <p class="text-lg">
      Welcome to the admin dashboard! Below is a list of our dogs:
    </p>

    <div v-if="loading" class="text-[#1446A0] text-lg font-medium py-4">
      Loading dogs...
    </div>

    <div v-else-if="dogs.length === 0" class="text-black font-medium py-4">
      No dogs available at the moment.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       <div v-for="dog in dogs" :key="dog._id" class="…">
         <img
    :src="`${apiBase}${dog.image}`"
    :alt="dog.name"
    class="w-full h-48 object-cover rounded-t-lg"
  />
    
        <img
          :src="dog.image"
          :alt="dog.name"
          class="w-full h-48 object-cover rounded-t-lg"
        />

        <div class="p-5">
          <h2 class="text-xl font-bold mb-2 text-[#1446A0]">{{ dog.name }}</h2>
          <p class="text-black mb-3 line-clamp-3">
            {{ dog.description }}
          </p>

          <div class="space-y-1 border-t border-gray-200 pt-3 mt-3">
            <p class="text-sm text-black">
              <span class="font-semibold">Location:</span>
              {{ dog.location || 'N/A' }}
            </p>
            <p class="text-sm text-black">
              <span class="font-semibold">Breed:</span>
              {{ dog.breed || 'N/A' }}
            </p>
            <p class="text-sm text-black">
              <span class="font-semibold">Size:</span>
              {{ dog.size || 'N/A' }}
            </p>
            <p class="text-sm text-black">
              <span class="font-semibold">Age:</span>
              {{ dog.age || 'N/A' }}
            </p>
            <p class="text-sm text-black">
              <span class="font-semibold">Gender:</span>
              {{ dog.gender || 'N/A' }}
            </p>
            <p class="text-sm text-black">
              <span class="font-semibold">Good With:</span>
              <template v-if="dog.goodWith?.length">
                {{ dog.goodWith.join(', ') }}
              </template>
              <span v-else>N/A</span>
            </p>
          </div>
        <div class="flex justify-end p-4">
          <nuxt-link
            :to="{ path: '/dogs/add', query: { id: dog._id } }"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit
          </nuxt-link>
        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#imports'

definePageMeta({ layout: 'default' })

const dogs = ref<any[]>([])
const loading = ref(true)
const { public: { apiBase } } = useRuntimeConfig()

const router = useRouter()

async function fetchDogs() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:5000/api/dogs')
    if (!res.ok) throw new Error('Failed to fetch dogs')
    dogs.value = await res.json()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDogs)

</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
