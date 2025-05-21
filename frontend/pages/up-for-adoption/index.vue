<template>
  <div>
    <!-- NavBar -->
    <NavBar />

    <div class="flex flex-col md:flex-row">
      
      <div class="hidden md:block bg-[#FFE65E] shadow-lg">
        <FilterSidebar
          :filters="filters"
          :breeds="breeds"
          :locations="locations"
          @update-filter="updateFilter"
          @clear-filters="clearAllFilters"
          class="text-left"
        />
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start gap-4 mt-8 mb-8">
        <h1 class="text-[#3D6625] font-bold font-poppins text-[24px] md:text-[40px] md:ml-8 max-w-[300px]">
          {{ $t('adoption.title') }}
        </h1>
        <div class="block md:hidden"><svg width="327" height="2" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="gold" stroke-width="2" d="M0 1h327"/></svg></div>
       
        <div class="flex flex-row justify-start items-start gap-4 w-full px-4 md:px-8">
          
          <button 
            @click="showFilters = !showFilters"
            class="md:hidden h-[50px] w-[130px] flex flex-row justify-center items-center border-2 border-black text-[14px] hover:bg-gray-50 transition-colors"
          >
            FILTERS
            <img src="/img/icon-filter.png" alt="filter icon" class="ml-2">
          </button>

          <p class="mt-2 text-[12px] font-light">
            {{ totalDogs.toLocaleString() }}
            {{ $t('adoption.dogsUp') }}
          </p>
        </div>

        
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-x-full"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-full"
        >
          <div v-if="showFilters" class="md:hidden fixed inset-0 z-50">
            <!-- Mobile Overlay -->
            <div 
              v-if="showFilters" 
              class="fixed inset-0 bg-black bg-opacity-50"
              @click="showFilters = false"
            ></div>
            
            
            <div class="absolute inset-y-0 left-0 w-full bg-[#FFE65E] shadow-lg overflow-y-auto">
              <div class="flex justify-between items-center p-4 border-b border-black">
                <h2 class="text-lg font-bold">Filters</h2>
                <button 
                  @click="showFilters = false"
                  class="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <FilterSidebar
                  :filters="filters"
                  :breeds="breeds"
                  :locations="locations"
                  @update-filter="updateFilter"
                  @clear-filters="clearAllFilters"
                  class="text-center"
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- Main Content -->
        <div class="w-full px-4 md:px-8">
          <!-- Separator -->
          <div class=" md:block hidden h-1 bg-[#FFD700] my-4"></div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div
              class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3D6625]"
            ></div>
          </div>

          <!-- Error State -->
          <ErrorState
            v-else-if="apiError"
            :title="$t('adoption.error.title')"
            :message="$t('adoption.error.message')"
            @retry="fetchDogs"
          />

          <!-- Dog Grid -->
          <div
            v-else-if="dogs.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          >
            <NuxtLink
              v-for="dog in dogs"
              :key="dog.id"
              :to="`/up-for-adoption/${dog.id}`"
              class="block"
            >
              <DogCard :dog="dog" />
            </NuxtLink>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12 ">
            <p class="text-xl">{{ $t('adoption.empty.message') }}</p>
            <button 
              @click="clearAllFilters"
              class="mt-4 bg-[#3D6625] text-white px-6 py-2 rounded"
            >
              {{ $t('adoption.empty.clear') }}
            </button>
          </div>

          <!-- Pagination -->
          <div
            v-if="!loading && dogs.length > 0"
            class="flex justify-center mt-8 space-x-2"
          >
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-black',
                'px-3 py-1 border'
              ]"
            >
              &lt;
            </button>

            <button
              v-for="page in paginationPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 border',
                'text-black',
                currentPage === page ? 'bg-[#FFD700] text-white' : ''
              ]"
            >
              {{ page }}
            </button>

            <span v-if="showEllipsis" class="px-3 py-1 text-[#FFD700]">…</span>

            <button
              v-if="showLastPages"
              v-for="page in lastPages"
              :key="`last-${page}`"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 border',
                'text-black',
                currentPage === page ? 'bg-[#FFD700] text-white' : ''
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="[
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-black',
                'px-3 py-1 border'
              ]"
            >
              &gt;
            </button>
          </div>

          <!-- Donation Section -->
          <div
            class="bg-[#FFE65E] p-6 mt-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <div class="flex-1">
              <h3 class="font-bold">{{ $t('donation.title') }}</h3>
              <p>{{ $t('donation.subtitle') }}</p>
              <div class="flex space-x-4 mt-4">
                <button
                  @click="makeDonation(500)"
                  class="bg-white px-4 py-2 hover:bg-gray-100"
                >
                  500 Ft
                </button>
                <button
                  @click="makeDonation(1000)"
                  class="bg-white px-4 py-2 hover:bg-gray-100"
                >
                  1000 Ft
                </button>
                <button
                  @click="makeDonation(3000)"
                  class="bg-white px-4 py-2 hover:bg-gray-100"
                >
                  3000 Ft
                </button>
              </div>
            </div>
            <div class="w-full md:w-1/3">
              <!-- optional image or graphic -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useRuntimeConfig } from '#imports'
import DogCard from '@/components/DogCard.vue'
import FilterSidebar from '~/components/FilterSidebar.vue'
import ErrorState from '~/components/ErrorState.vue'
import useDogApi from '@/composables/useDogApi'

interface Dog {
  id: string
  name: string
  image: string
  description: string
  location?: string
  breed?: string
  size?: string
  age?: string
  gender?: string
  goodWith?: string[]
}
interface DogFilters {
  name: string
  location: string
  breed: string
  size: string
  age: string
  gender: string
  goodWith: string
}

const config   = useRuntimeConfig()
const apiBase  = config.public.apiBase || ''
const route    = useRoute()
const router   = useRouter()

const { fetchDogs, fetchFilterOptions, processDonation } = useDogApi()

const loading     = ref(false)
const apiError    = ref(false)
const dogs        = ref<Dog[]>([])
const totalDogs   = ref(0)
const currentPage = ref(1)
const totalPages  = ref(1)

const breeds    = ref<string[]>([])
const locations = ref<string[]>([])
const filters   = ref<DogFilters>({
  name: '',
  location: 'Any',
  breed: 'Any',
  size: 'Any',
  age: 'Any',
  gender: 'Any',
  goodWith: 'Any'
})

const paginationPages = computed(() => {
  if (totalPages.value <= 5) return Array.from({ length: totalPages.value }, (_, i) => i+1)
  if (currentPage.value <= 3) return [1,2,3,4,5]
  return [currentPage.value-2, currentPage.value-1, currentPage.value, currentPage.value+1, currentPage.value+2]
    .filter(p => p>0 && p<=totalPages.value)
})
const showEllipsis  = computed(() => totalPages.value > 5 && currentPage.value < totalPages.value - 4)
const showLastPages = computed(() => totalPages.value > 5 && currentPage.value < totalPages.value - 2)
const lastPages     = computed(() => [totalPages.value-2, totalPages.value-1, totalPages.value]
  .filter(p => !paginationPages.value.includes(p) && p>0)
)

const showFilters = ref(false)

async function fetchDogsData() {
  loading.value = true
  apiError.value = false
  try {
    const res = await fetchDogs(filters.value, currentPage.value, 12)
    dogs.value      = res.dogs
    totalDogs.value = res.total
    totalPages.value = res.totalPages
  } catch {
    apiError.value = true
  } finally {
    loading.value = false
  }
}

function clearAllFilters() {
  filters.value = { name:'', location:'Any', breed:'Any', size:'Any', age:'Any', gender:'Any', goodWith:'Any' }
  fetchDogsData()
}
function updateFilter(key: keyof DogFilters, value: string) {
  filters.value[key] = value
  currentPage.value = 1
  fetchDogsData()
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  router.replace({ query: { ...route.query, page: String(page) }})
  fetchDogsData()
}

async function makeDonation(amount: number) {
  try {
    const { success } = await processDonation(amount)
    alert(success
      ? `Thank you for donating ${amount} Ft!`
      : 'Donation failed, please try again.')
  } catch {
    alert('Error processing donation.')
  }
}

async function loadFilterOptions() {
  try {
    const opts = await fetchFilterOptions()
    breeds.value    = opts.breeds
    locations.value = opts.locations
  } catch {
    breeds.value    = ['Husky','German Shepherd','Terrier','Mix']
    locations.value = ['Budapest','Debrecen','Szeged']
  }
}

onMounted(async () => {
  await loadFilterOptions()
  const p = parseInt(route.query.page as string) || 1
  currentPage.value = p
  await fetchDogsData()
})

watch(() => route.query.page, (p) => {
  const page = parseInt(p as string) || 1
  if (page !== currentPage.value) {
    currentPage.value = page
    fetchDogsData()
  }
})
</script>
