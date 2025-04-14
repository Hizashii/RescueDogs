<template>
    <div class="w-64 bg-[#FFE65E] p-4 flex flex-col space-y-6">
      <button @click="$emit('clear-filters')" class="bg-white px-4 py-2 text-center text-sm font-bold hover:bg-gray-100">
        CLEAR ALL FILTERS
      </button>
  
      <!-- Name Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">NAME</label>
        <div class="relative">
          <input 
            type="text" 
            :value="filters.name"
            @input="$emit('update-filter', 'name', $event.target.value)" 
            class="w-full p-2 border" 
            placeholder="Search by name"
          />
          <span class="absolute right-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>
  
      <!-- Location Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">LOCATION</label>
        <select 
          :value="filters.location"
          @change="$emit('update-filter', 'location', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>
  
      <!-- Breed Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">BREED</label>
        <select 
          :value="filters.breed"
          @change="$emit('update-filter', 'breed', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option v-for="breed in breeds" :key="breed" :value="breed">
            {{ breed }}
          </option>
        </select>
      </div>
  
      <!-- Size Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">SIZE</label>
        <select 
          :value="filters.size"
          @change="$emit('update-filter', 'size', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
  
      <!-- Age Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">AGE</label>
        <select 
          :value="filters.age"
          @change="$emit('update-filter', 'age', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option value="Puppy">Puppy</option>
          <option value="Young">Young</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
  
      <!-- Gender Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">GENDER</label>
        <select 
          :value="filters.gender"
          @change="$emit('update-filter', 'gender', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
  
      <!-- Good With Filter -->
      <div class="flex flex-col space-y-2">
        <label class="font-bold text-center">GOOD WITH</label>
        <select 
          :value="filters.goodWith"
          @change="$emit('update-filter', 'goodWith', $event.target.value)" 
          class="w-full p-2 border appearance-none"
        >
          <option value="Any">Any</option>
          <option value="children">Children</option>
          <option value="dogs">Dogs</option>
          <option value="cats">Cats</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    filters: {
      type: Object,
      required: true
    },
    breeds: {
      type: Array,
      default: () => []
    },
    locations: {
      type: Array,
      default: () => []
    }
  });
  
  defineEmits(['update-filter', 'clear-filters']);
  </script>
  
  <style scoped>
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
  }
  </style>