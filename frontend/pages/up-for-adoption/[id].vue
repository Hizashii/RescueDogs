<template>
  <div class="min-h-screen bg-[#FFFADF] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">

      <div v-if="loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D6625] mx-auto"></div>
      </div>

      <div v-else-if="!dog" class="text-center text-gray-700 py-20">
        <h2 class="text-2xl font-semibold">Dog Not Found</h2>
        <p>Sorry, we couldn’t locate that pup in our records.</p>
      </div>

      <div v-else class="flex flex-col md:flex-row gap-32">
        <img
          :src="API_BASE + dog.image"
          :alt="dog.name"
          class="w-[320px] h-[400px] object-cover drop-shadow-[20px_20px_0px_#FFD700]"
        />

        <div class="w-full">
          <h1 class="text-4xl font-bold text-[#2C3338] mb-8">{{ dog.name }}</h1>

          <div class="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <InfoRow label="Status:"                :value="dog.status          || '—'" />
            <InfoRow label="Came in:"               :value="dog.cameIn         || '—'" />
            <InfoRow label="Location:"              :value="dog.location       || '—'" />
            <InfoRow label="Looking for owner:"     :value="dog.lookingForOwner|| '—'" />
            <InfoRow label="Age:"                   :value="dog.age             || '—'" />
            <InfoRow label="Went out:"              :value="dog.wentOut         || '—'" />
            <InfoRow label="Breed:"                 :value="dog.breed           || '—'" />
            <InfoRow label="Adapted:"               :value="dog.adapted         || '—'" />
            <InfoRow label="Size:"                  :value="dog.size            || '—'" />
            <InfoRow label="Vaccination and chips:" :value="dog.vaccination     || '—'" />
            <InfoRow label="Fur length:"            :value="dog.furLength       || '—'" />
            <InfoRow label="Relation to people:"    :value="dog.relationToPeople|| '—'" />
          </div>

          <div class="mb-8">
            <p class="text-black leading-relaxed">{{ dog.description || 'No description available.' }}</p>
          </div>
          <div class="mb-8">
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
          v-for="other in otherDogs"
          :key="other.id"
          :to="`/up-for-adoption/${other.id}`"
          class="block w-[150px] h-[240px]"
        >
          <DogCard :dog="other" />
        </NuxtLink>
      </div>

      <div class="bg-[#FFE65E] p-6 mt-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <h3 class="font-bold">Can’t adopt?</h3>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'
import { useRuntimeConfig } from '#imports'
import InfoRow from '~/components/InfoRow.vue'
import DogCard from '@/components/DogCard.vue'

const config   = useRuntimeConfig()
const API_BASE = config.public.apiBase || ''

const api   = useApi()
const route = useRoute()

const dog     = ref<any|null>(null)
const dogs    = ref<any[]>([])
const loading = ref(true)

async function fetchDogAndList() {
  loading.value = true
  const id = route.params.id as string

  try {
    dog.value = await api(`/api/dogs/${id}`, { method: 'GET' })
    dogs.value = await api<any[]>('/api/dogs', { method: 'GET' })
  } catch {
    const all = await api<any[]>('/api/dogs', { method: 'GET' })
    dogs.value = all
    dog.value = all.find(d => String(d.id) === id) ?? null
  } finally {
    loading.value = false
  }
}

const otherDogs = computed(() =>
  dogs.value
    .filter(d => String(d.id) !== String(dog.value?.id))
    .slice(0, 4)
)

onMounted(fetchDogAndList)
</script>
