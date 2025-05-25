<template>
    <div>
      <!-- NavBar -->
      <NavBar />
  
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar Filters -->
        
  
        <!-- Main Content -->
        <div class="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start gap-4 mt-8 mb-8">
          <h1 class="text-[#3D6625] font-bold font-poppins text-[24px] md:text-[40px] md:ml-8 max-w-[300px]">
            {{ $t('blog.title') }}
          </h1>
          <div class="block md:hidden"><svg width="327" height="2" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="gold" stroke-width="2" d="M0 1h327"/></svg></div>
          
          <div class="flex flex-row justify-start items-start gap-4 w-full px-4 md:px-8">
            <button 
              @click="showFilters = !showFilters"
              class="md:hidden h-[50px] w-[130px] flex flex-row justify-center items-center border-2 border-black text-[14px] hover:bg-gray-50 transition-colors"
            >
              {{ $t('blog.filters.button') }}
              <img src="/img/icon-filter.png" alt="filter icon" class="ml-2">
            </button>

            <p class="mt-2 text-[12px] font-light">
              {{ displayedPosts.length.toLocaleString() }} {{ $t('blog.postsAvailable') }}
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
              <div 
                v-if="showFilters" 
                class="fixed inset-0 bg-black bg-opacity-50"
                @click="showFilters = false"
              ></div>
              
              <div class="absolute inset-y-0 left-0 w-full bg-[#FFE65E] shadow-lg overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b border-black">
                  <h2 class="text-lg font-bold">{{ $t('blog.filters.title') }}</h2>
                  <button 
                    @click="showFilters = false"
                    class="p-2 hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
              </div>
            </div>
          </transition>

          <!-- Separator -->
          <div class="w-full px-4">
            <div class="md:block hidden h-1 bg-[#FFD700] my-4"></div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center h-64">
              <div class="animate-spin h-16 w-16 border-t-2 border-b-2 border-[#3D6625]"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!loading && displayedPosts.length === 0" class="text-center py-12">
              <p class="text-xl">{{ $t('blog.empty.message') }}</p>
              <NuxtLink
                to="/admin"
                class="mt-4 inline-block bg-[#3D6625] text-white px-6 py-2"
              >
                {{ $t('blog.empty.adminLink') }}
              </NuxtLink>
            </div>

            <!-- Posts Grid -->
            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
            >
              <div
                v-for="post in paginatedPosts"
                :key="post._id"
                class="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <img
                  v-if="post.image"
                  :src="post.image"
                  alt=""
                  class="w-full h-48 object-cover"
                />
                <div class="p-6">
                  <h2 class="text-2xl font-semibold mb-4">{{ post.title }}</h2>
                  <NuxtLink
                    :to="`/blog/${post._id}`"
                    class="inline-block text-[#1446A0] font-medium hover:underline"
                  >
                    {{ $t('blog.readMore') }}
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="!loading && totalPages > 1"
              class="flex justify-center mt-8 space-x-2"
            >
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                :class="[currentPage === 1 ? 'opacity-50 cursor-not-allowed' : '', 'px-3 py-1 border']"
              >&lt;</button>

              <button
                v-for="page in paginationPages"
                :key="page"
                @click="goToPage(page)"
                :class="['px-3 py-1 border', currentPage === page ? 'bg-[#FFD700] text-white' : '']"
              >{{ page }}</button>

              <span v-if="showEllipsis" class="px-3 py-1">...</span>

              <button
                v-if="showLastPages"
                v-for="page in lastPages"
                :key="`last-${page}`"
                @click="goToPage(page)"
                :class="['px-3 py-1 border', currentPage === page ? 'bg-[#FFD700] text-white' : '']"
              >{{ page }}</button>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                :class="[currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : '', 'px-3 py-1 border']"
              >&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchBlogs } from '@/utils/api'

const posts = ref<any[]>([])
const displayedPosts = ref<any[]>([])
const loading = ref(true)
const currentPage = ref(1)
const perPage = 12 // Updated to match all-animals page
const showFilters = ref(false)

const totalPages = computed(() =>
  Math.ceil(displayedPosts.value.length / perPage)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return displayedPosts.value.slice(start, start + perPage)
})

const paginationPages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }
  
  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5]
  }
  
  return [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2
  ].filter(page => page > 0 && page <= totalPages.value)
})

const showEllipsis = computed(() => {
  return totalPages.value > 5 && currentPage.value < totalPages.value - 4
})

const showLastPages = computed(() => {
  return totalPages.value > 5 && currentPage.value < totalPages.value - 2
})

const lastPages = computed(() => {
  return [
    totalPages.value - 2,
    totalPages.value - 1,
    totalPages.value
  ].filter(page => !paginationPages.value.includes(page) && page > 0)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

function clearAllFilters() {
  displayedPosts.value = [...posts.value]
  currentPage.value = 1
}

onMounted(async () => {
  try {
    const all = await fetchBlogs()
    posts.value = all
    displayedPosts.value = all
  } catch (err) {
    console.error('Failed to load posts', err)
  } finally {
    loading.value = false
  }
})
</script>
