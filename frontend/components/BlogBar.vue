<template>
    <div class="bg-[#FFDC20] p-4 space-y-6 w-full md:w-64">
      <button
        @click="onClear"
        class="w-full bg-white text-black font-semibold py-2 rounded"
      >
        Clear All Filters
      </button>
  
      <div>
        <label class="block mb-1 text-black font-semibold">CATEGORY</label>
        <select
          @change="e => onFilterChange('category', e)"
          class="w-full p-2 rounded border border-gray-300"
        >
          <option>Any</option>
          <!-- more options -->
        </select>
      </div>
  
      <div>
        <label class="block mb-1 text-black font-semibold">TAGS</label>
        <select
          @change="e => onFilterChange('tags', e)"
          class="w-full p-2 rounded border border-gray-300"
        >
          <option>Any</option>
          <!-- more options -->
        </select>
      </div>
  
      <div>
        <label class="block mb-1 text-black font-semibold">DATE OF POSTING</label>
        <select
          @change="e => onFilterChange('date', e)"
          class="w-full p-2 rounded border border-gray-300"
        >
          <option>Any</option>
          <!-- more options -->
        </select>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits<{
    (e: 'clear-filters'): void
    (e: 'update-filter', key: string, value: string): void
  }>()
  
  function onClear() {
    emit('clear-filters')
  }
  
  function onFilterChange(key: string, e: Event) {
    const select = e.target as HTMLSelectElement
    emit('update-filter', key, select.value)
  }
  </script>
  