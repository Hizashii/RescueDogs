<template>
    <div class="everything">
      <div class="hero-container lg:h-[420px] h-[200px] flex items-center justify-center bg-custom-main-blue w-screen">
        <h2 v-if="title" class="hero-title relative z-20 text-center">{{ title }}</h2> 
              <img 
        v-if="image" 
        :src="getImageUrl(image)" 
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="hero-overlay absolute inset-0 bg-black z-10" :style="{ opacity: overlayOpacity }"></div>

      </div>
  
  
    </div>
  </template>
  
<script setup lang="ts">
import { useRuntimeConfig } from '#app'

const props = withDefaults(defineProps<{
  title: string
  image: string | null
  overlayOpacity: number
}>(), {
  title: '',
  image: null,
  overlayOpacity: 0.2
})
const config = useRuntimeConfig()
const getImageUrl = (image: string | null): string => {
  if (!image) {
    return '/img/default-hero.jpg'
  }
  return image
}
</script>


<style>
.everything {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  
}

.hero-title {
  font-weight: 600;
  color: white; 
  font-size: 3rem;
}

.hero-image {
  width: 100%;
  height: auto;
}

.hero-subtitle {
  text-align: left;
  font-weight: bold;
  color: var(--color-navy);
  margin: 3rem auto;
  max-width: 800px;
  font-size: 2rem;
  
}

.hero-description {
  text-align: left;
  margin: 0 auto;
  max-width: 800px;
  color: rgb(0, 0, 0);
  font-size: 1.3rem;
}

.vision-image {
  margin: 2rem auto;
  max-width: 300px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem auto;
    max-width: 300px;
  }
  .hero-description {
    font-size: 1rem;
    text-align: center;
    margin: 0 auto;
    max-width: 300px;
  }
}
</style>