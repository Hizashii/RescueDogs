<template>
  <div class="min-h-screen bg-[#FFFADF] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">

      <div v-if="loading" class="text-center py-20">
        <div class="animate-spin  h-12 w-12 border-t-2 border-b-2 border-[#3D6625] mx-auto"></div>
      </div>

      <div v-else-if="!dog" class="text-center text-gray-700 py-20">
        <h2 class="text-2xl font-semibold">Dog Not Found</h2>
        <p>Sorry, we couldn't locate that pup in our records.</p>
      </div>

      <div v-else class="flex flex-col md:flex-row gap-32">
        <img
          :src="dog.image"
          :alt="dog.name"
          class="w-[320px] h-[400px] object-cover drop-shadow-[20px_20px_0px_#FFD700]"
        />

        <div class="w-full">
          <h1 class="text-4xl font-bold text-[#2C3338] mb-8">{{ dog.name }}</h1>

          <div class="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <InfoRow label="Status:" :value="dog.status || '—'" />
            <InfoRow label="Came in:" :value="dog.cameIn || '—'" />
            <InfoRow label="Location:" :value="dog.location || '—'" />
            <InfoRow label="Looking for owner:" :value="dog.lookingForOwner || '—'" />
            <InfoRow label="Age:" :value="dog.age || '—'" />
            <InfoRow label="Went out:" :value="dog.wentOut || '—'" />
            <InfoRow label="Breed:" :value="dog.breed || '—'" />
            <InfoRow label="Adapted:" :value="dog.adapted || '—'" />
            <InfoRow label="Size:" :value="dog.size || '—'" />
            <InfoRow label="Vaccination and chips:" :value="dog.vaccination || '—'" />
            <InfoRow label="Fur length:" :value="dog.furLength || '—'" />
            <InfoRow label="Gender:" :value="dog.gender || '—'" />
            <InfoRow label="Relation to people:" :value="dog.relationToPeople || '—'" />
          </div>

          <div class="mb-8">
            <p class="text-black leading-relaxed">{{ dog.description || 'No description available.' }}</p>
          </div>

          <div v-if="dog.goodWith && dog.goodWith.length" class="mb-8">
            <p class="text-black text-sm font-semibold">Good with:</p>
            <p class="text-black leading-relaxed">{{ dog.goodWith.join(', ') }}</p>
          </div>

          <div v-if="dog.moreInfo" class="mb-8">
            <p class="text-black text-sm font-semibold">More info:</p>
            <p class="text-black leading-relaxed">{{ dog.moreInfo || '—' }}</p>
          </div>

          <button
            class="text-black px-6 py-5 font-bold border-2 border-[#FFD700] hover:bg-[#FFD700] transition-colors"
          >
            Send an inquiry
          </button>
        </div>
      </div>

      <div v-if="dog && dog.thumbnails?.length" class="mt-8">
        <div class="flex gap-4">
          <NuxtLink
            v-for="thumb in dog.thumbnails"
            :key="thumb.id"
            :to="`/up-for-adoption/${thumb.id}`"
            class="w-[150px] h-[190px] overflow-hidden cursor-pointer"
          >
            <img
              :src="API_BASE + thumb.image"
              :alt="thumb.name"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="h-[2px] bg-[#FFD700] w-full my-12"></div>

      <h2 class="text-[#3D6625] text-2xl font-bold mb-6">Other Doggos</h2>
      <div class="flex gap-6">
        <NuxtLink
          v-for="other in filteredOtherDogs"
          :key="other.id"
          :to="`/up-for-adoption/${other.id}`"
          class="block w-[150px] h-[240px]"
        >
          <DogCard :dog="other" />
        </NuxtLink>
      </div>

      <div class="bg-[#FFE65E] p-6 mt-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <h3 class="font-bold">Can't adopt?</h3>
          <p>Make a donation to support animals in our care.</p>
          <div class="flex space-x-4 mt-4">
            <button class="bg-white px-4 py-2 hover:bg-gray-100">500 Ft</button>
            <button class="bg-white px-4 py-2 hover:bg-gray-100">1000 Ft</button>
            <button class="bg-white px-4 py-2 hover:bg-gray-100">2000 Ft</button>
            <button class="bg-white px-4 py-2 hover:bg-gray-100">3000 Ft</button>
          </div>
        </div>
        <div class="w-full md:w-1/3">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import useDogApi from '~/composables/useDogApi'
import { useRuntimeConfig } from '#imports'
import InfoRow from '~/components/InfoRow.vue'
import DogCard from '@/components/DogCard.vue'

const config = useRuntimeConfig()
const API_BASE = 'http://localhost:5000'  // Direct backend URL for images

const dogApi = useDogApi()
const route = useRoute()

const dog = ref<any|null>(null)
const otherDogs = ref<any[]>([])
const loading = ref(true)

async function fetchDogAndList() {
  loading.value = true
  const id = route.params.id as string

  try {
    // Fetch the specific dog
    const fetchedDog = await dogApi.fetchDogById(id)
    if (fetchedDog) {
      dog.value = fetchedDog
    }

    // Fetch other dogs for the list
    const response = await dogApi.fetchDogs()
    otherDogs.value = response.dogs
  } catch (error) {
    console.error('Error fetching dogs:', error)
  } finally {
    loading.value = false
  }
}

const filteredOtherDogs = computed(() => {
  if (!otherDogs.value || !Array.isArray(otherDogs.value)) {
    return []
  }
  return otherDogs.value
    .filter(d => d.id !== dog.value?.id)
    .slice(0, 4)
})

onMounted(fetchDogAndList)

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    fetchDogAndList()
  }
})
</script>
