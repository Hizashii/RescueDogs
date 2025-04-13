<template>
    <div 
      class="bg-white overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer" 
      @click="$emit('click', dog.id)"
    >
      <!-- Use a fallback div if image fails to load -->
      <div v-if="imageError" class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">{{ dog.name }}</span>
      </div>
      <img 
        v-else
        :src="dog.image" 
        :alt="dog.name" 
        class="w-full h-48 object-cover" 
        @error="handleImageError"
      />
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-lg">{{ dog.name }}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#3D6625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <!-- Dog details -->
        <div class="text-sm text-gray-600 mt-2">
          <p v-if="dog.breed"><span class="font-medium">Breed:</span> {{ dog.breed }}</p>
          <p v-if="dog.size"><span class="font-medium">Size:</span> {{ formatSize(dog.size) }}</p>
          <p v-if="dog.age"><span class="font-medium">Age:</span> {{ formatAge(dog.age) }}</p>
          <p v-if="dog.location"><span class="font-medium">Location:</span> {{ dog.location }}</p>
          
          <!-- Good with (if available) -->
          <p v-if="dog.goodWith && dog.goodWith.length > 0" class="mt-1">
            <span class="font-medium">Good with:</span> {{ formatGoodWith(dog.goodWith) }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  defineProps({
    dog: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['click']);
  
  const imageError = ref(false);
  
  const handleImageError = () => {
    imageError.value = true;
  };
  
  // Format helpers
  const formatSize = (size) => {
    if (!size) return 'Unknown';
    return size.charAt(0).toUpperCase() + size.slice(1);
  };
  
  const formatAge = (age) => {
    if (!age) return 'Unknown';
    return age.charAt(0).toUpperCase() + age.slice(1);
  };
  
  const formatGoodWith = (goodWith) => {
    if (!goodWith || !Array.isArray(goodWith) || goodWith.length === 0) return 'None';
    return goodWith.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
  };
  </script>