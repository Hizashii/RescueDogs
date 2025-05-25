<template>
  <div class="flex flex-col items-center justify-center bg-[#FFF9D6]">
    <ImageTitle 
      :title="post?.title || 'Loading…'" 
      :image="post?.featuredImage || '/img/dog-placeholder.png'" 
      :overlayOpacity="0.5" 
    />

    <div class="max-w-2xl mx-auto py-24">
      <div class="relative pl-8">
        <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-black"></div>

        <div v-if="loading" class="text-gray-500">Loading post…</div>
        <div v-else-if="!post" class="text-red-600">
          Oops! Post not found.
        </div>
        <div 
          v-else 
          class="text-left text-black leading-relaxed text-sm md:text-[18px]" 
          v-html="post.content" 
        />

        <NuxtLink
          to="/blog" 
          class="mt-8 text-black font-semibold text-sm md:text-[17px] h-[65px] w-[200px] border-4 border-black flex items-center justify-center"
        >
          All blogs
        </ NuxtLink>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchBlogById } from '@/utils/api'

const route = useRoute()
const router = useRouter()
const postId = route.params.id as string

const post = ref<any | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await fetchBlogById(postId)
    if (!data) {

    }
    post.value = data
  } catch (err) {
  } finally {
    loading.value = false
  }
})
</script>
