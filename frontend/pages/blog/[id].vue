<!-- INDIVIDUAL BLOG POST -->
<template>
    <div class="flex flex-col items-center justify-center bg-[#FFF9D6]">
        <ImageTitle 
        :title="post.title" 
        image="/img/dog-placeholder.png" 
        :overlayOpacity="0.5" 
      />

    <div class="max-w-2xl mx-auto py-24">
      <div class="relative min-w-[800px] mx-auto pl-8">
        <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-black"></div>
        <div class="text-left text-black leading-relaxed text-sm md:text-[18px]" v-html="post.content" />
       
        <router-link 
          to="/blog" 
          class="mt-8 items-center text-black font-semibold text-sm md:text-[17px] h-[65px] w-[200px] border-4 border-black text-black flex items-center justify-center"
        >
          All blogs
        </router-link>
      </div>
    </div>
    
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const postId = route.params.id
  const post = ref({})
  
  // FOR LUCHE: This is just fake data for now, you can add your own as you wish 
  const fakeBlogPosts = {
    'blog-1': {
      title: 'The Heartwarming Journey of Shelter Dogs',
      content: '<p>Every dog deserves a loving home, yet many find themselves abandoned, lost, or in shelters, waiting for a second chance. At Mancsmentő Állatvédő Egyesület, we dedicate ourselves to rescuing, caring for, and rehoming these wonderful animals. Join us as we share inspiring stories, adoption success tales, and tips on how you can help make a difference in the lives of these furry friends. Every dog deserves a loving home, yet many find themselves abandoned, lost, or in shelters, waiting for a second chance. At Mancsmentő Állatvédő Egyesület, we dedicate ourselves to rescuing, caring for, and rehoming these wonderful animals. Join us as we share inspiring stories, adoption success tales, and tips on how you can help make a difference in the lives of these furry friends. Every dog deserves a loving home, yet many find themselves abandoned, lost, or in shelters, waiting for a second chance. At Mancsmentő Állatvédő Egyesület, we dedicate ourselves to rescuing, caring for, and rehoming these wonderful animals. Join us as we share inspiring stories, adoption success tales, and tips on how you can help make a difference in the lives of these furry friends. Every dog deserves a loving home, yet many find themselves abandoned, lost, or in shelters, waiting for a second chance. At Mancsmentő Állatvédő Egyesület, we dedicate ourselves to rescuing, caring for, and rehoming these wonderful animals. Join us as we share inspiring stories, adoption success tales, and tips on how you can help make a difference in the lives of these furry friends. Every dog deserves a loving home, yet many find themselves abandoned, lost, or in shelters, waiting for a second chance. At Mancsmentő Állatvédő Egyesület, we dedicate ourselves to rescuing, caring for, and rehoming these wonderful animals. Join us as we share inspiring stories, adoption success tales, and tips on how you can help make a difference in the lives of these furry friends.</p>',
    },
   
  }
  
  onMounted(() => {
    post.value = fakeBlogPosts[postId] || {
      title: 'Post Not Found',
      author: '',
      content: '<p>Oops! No post found with that ID.</p>',
    }
  })
  </script>
  