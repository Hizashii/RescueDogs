<template>
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar Filters -->
      <BlogBar
        class="w-full md:w-64 flex-shrink-0"
        @clear-filters="clearAllFilters"
        @update-filter="updateFilter"
      />
  
      <!-- Main Content -->
      <section class="flex-1 max-w-7xl mx-auto py-16 px-4">
        <h1 class="text-4xl font-bold mb-8">All Blog Posts</h1>
  
        <!-- Loading / Empty States -->
        <div v-if="loading" class="text-gray-500">Loading posts…</div>
        <div v-else-if="!loading && displayedPosts.length === 0" class="text-center">
          <p class="mb-4">No posts published yet.</p>
          <NuxtLink
          to="/admin" class="text-blue-600 underline">
            Go to Admin
          </ NuxtLink>
        </div>
  
        <!-- Posts Grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="post in paginatedPosts"
            :key="post._id"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
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
                Read more →
              </ NuxtLink>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <div
          v-if="!loading && totalPages > 1"
          class="flex justify-center mt-12 space-x-2"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
          >&lt;</button>
  
          <button
            v-for="page in paginationPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 border rounded text-[#FFD700]',
              page === currentPage ? 'bg-black text-white' : ''
            ]"
          >{{ page }}</button>
  
          <span
            v-if="showEllipsis"
            class="px-3 py-1 text-[#FFD700]"
          >…</span>
  
          <button
            v-if="showLastPages"
            v-for="page in lastPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 border rounded text-[#FFD700]"
          >{{ page }}</button>
  
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
          >&gt;</button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import BlogBar from '~/components/BlogBar.vue'
  import { fetchBlogs } from '@/utils/api'
  const posts = ref<any[]>([])
  const displayedPosts = ref<any[]>([])
  const loading = ref(true)
  const currentPage = ref(1)
  const perPage     = 9
  const totalPages = computed(() =>
    Math.ceil(displayedPosts.value.length / perPage)
  )
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return displayedPosts.value.slice(start, start + perPage)
  })
  const paginationPages = computed(() => {
    if (totalPages.value <= 5)
      return Array.from({ length: totalPages.value }, (_, i) => i + 1)
    if (currentPage.value <= 3) return [1,2,3,4,5]
    return [
      currentPage.value-2,
      currentPage.value-1,
      currentPage.value,
      currentPage.value+1,
      currentPage.value+2
    ].filter(p => p > 0 && p <= totalPages.value)
  })
  const showEllipsis  = computed(() =>
    totalPages.value > 5 && currentPage.value < totalPages.value - 2
  )
  const showLastPages = computed(() =>
    totalPages.value > 5 && currentPage.value >= totalPages.value - 2
  )
  const lastPages = computed(() =>
    [totalPages.value - 1, totalPages.value]
      .filter(p => !paginationPages.value.includes(p) && p > 0)
  )
  function goToPage(page: number) {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }
  function clearAllFilters() {
    displayedPosts.value = [...posts.value]
    currentPage.value = 1
  }
function updateFilter(key: string, value: string) {
   currentPage.value = 1
   if (key === 'category') {
     if (!value) {
       displayedPosts.value = [...posts.value]
     } else {
       displayedPosts.value = posts.value.filter(post => post.category === value)
     }
   }
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
