<template>
    <div class="max-w-3xl mx-auto py-16">
      <h1 class="text-4xl font-bold mb-8">All Blog Posts</h1>
  
      <div v-if="loading" class="text-gray-500">Loading posts…</div>
      <div v-else-if="posts.length === 0" class="text-center">
        <p class="mb-4">No posts published yet.</p>
        <router-link to="/admin" class="text-blue-600 underline">Go to Admin</router-link>
      </div>
      <div v-else class="space-y-8">
        <div 
          v-for="post in posts" 
          :key="post._id" 
          class="p-6 border rounded hover:shadow"
        >
          <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          <router-link 
            :to="`/blog/${post._id}`" 
            class="text-blue-600 hover:underline"
          >
            Read more →
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { fetchBlogs } from '@/utils/api'
  
  const posts = ref<any[]>([])
  const loading = ref(true)
  
  onMounted(async () => {
    try {
      posts.value = await fetchBlogs()
    } catch (err) {
      console.error('Failed to load posts', err)
    } finally {
      loading.value = false
    }
  })
  </script>
  