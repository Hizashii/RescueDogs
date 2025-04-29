<template>
  <!-- Main container with min-h-screen for full height and padding for spacing -->
  <div class="min-h-screen bg-gray-100 text-black p-8 space-y-6">
    <h1 class="text-3xl font-bold text-[#1446A0]">Dashboard Home</h1>
    <p class="text-lg">
      Welcome to the admin dashboard! Below is a list of our dogs:
    </p>
    <!-- LOADING STATE -->
    <div v-if="loading" class="text-[#1446A0] text-lg font-medium py-4">
      Loading dogs...
    </div>

    <!-- DOGS GRID -->
    <div v-else>
      <div v-if="dogs.length === 0" class="text-black font-medium py-4">
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
          class="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <img
            :src="dog.image"
            :alt="dog.name"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-5">
            <h2 class="text-xl font-bold mb-2 text-[#1446A0]">{{ dog.name }}</h2>
            <p class="text-black mb-3">
              {{ dog.description }}
            </p>
            <div class="space-y-1 border-t border-gray-200 pt-3 mt-3">
              <p class="text-sm text-black">
                <span class="font-semibold">Location:</span> {{ dog.location || 'N/A' }}
              </p>
              <p class="text-sm text-black">
                <span class="font-semibold">Breed:</span> {{ dog.breed || 'N/A' }}
              </p>
              <p class="text-sm text-black">
                <span class="font-semibold">Size:</span> {{ dog.size || 'N/A' }}
              </p>
              <p class="text-sm text-black">
                <span class="font-semibold">Age:</span> {{ dog.age || 'N/A' }}
              </p>
              <p class="text-sm text-black">
                <span class="font-semibold">Gender:</span> {{ dog.gender || 'N/A' }}
              </p>
              <p class="text-sm text-black">
                <span class="font-semibold">Good With:</span>
                <span v-if="dog.goodWith && dog.goodWith.length > 0">
                  {{ dog.goodWith.join(', ') }}
                </span>
                <span v-else>N/A</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default'
})

const dogs = ref<Array<any>>([])
const loading = ref(true)

// Filter states
const locationFilter = ref('')
const breedFilter = ref('')
const sizeFilter = ref('')
const ageFilter = ref('')
const genderFilter = ref('')
const goodWithFilter = ref<string[]>([])

// Fetch dogs on mount (initial load)
onMounted(() => {
  applyFilters()
})

// Function to apply filters (calls the backend with query params)
const applyFilters = async () => {
  loading.value = true
  try {
    const params: Record<string, any> = {}
    if (locationFilter.value) params.location = locationFilter.value
    if (breedFilter.value) params.breed = breedFilter.value
    if (sizeFilter.value) params.size = sizeFilter.value
    if (ageFilter.value) params.age = ageFilter.value
    if (genderFilter.value) params.gender = genderFilter.value
    if (goodWithFilter.value.length) params.goodWith = goodWithFilter.value

    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`http://localhost:5000/api/dogs?${queryString}`)
    if (!response.ok) {
      throw new Error('Failed to fetch dogs')
    }
    dogs.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>