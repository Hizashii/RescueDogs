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
        v-model="selectedCategory"
        @change="e => onFilterChange('category', selectedCategory)"
        class="w-full p-2 rounded border border-gray-300"
      >
        <option value="">Any</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
 </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'clear-filters'): void
  (e: 'update-filter', key: string, value: string): void
}>()

const categories = [
  'Adoption Stories',
  'Volunteer Spotlights',
  'Dog Care Tips',
  'Training Advice',
  'Medical Updates',
  'Success Stories',
  'Events & Fundraisers',
  'Behind the Scenes',
  'Foster Programs',
  'Rescue Missions',
]

const selectedCategory = ref<string>('')

function onClear() {
  selectedCategory.value = ''
  emit('clear-filters')
}

function onFilterChange(key: string, value: string) {
  emit('update-filter', key, value)
}

// (Optional) auto-emit on mount/change
watch(selectedCategory, val => {
  emit('update-filter', 'category', val)
})
</script>
