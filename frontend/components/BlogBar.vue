<template>
  <div class="bg-[#FFDC20] p-4 space-y-6 w-full md:w-64">
    <button
      @click="onClear"
      class="w-full bg-white text-black font-semibold py-2 rounded"
    >
      {{ $t('blog.filters.clearAll') }}
    </button>

    <div>
      <label class="block mb-1 text-black font-semibold">{{ $t('blog.filters.category.label') }}</label>
      <select
        v-model="selectedCategory"
        @change="e => onFilterChange('category', selectedCategory)"
        class="w-full p-2 rounded border border-gray-300"
      >
        <option value="">{{ $t('blog.filters.category.any') }}</option>
        <option
          v-for="category in categories"
          :key="category.key"
          :value="category.key"
        >
          {{ $t(`blog.filters.category.options.${category.key}`) }}
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
  { key: 'adoption_stories', label: 'Adoption Stories' },
  { key: 'volunteer_spotlights', label: 'Volunteer Spotlights' },
  { key: 'dog_care_tips', label: 'Dog Care Tips' },
  { key: 'training_advice', label: 'Training Advice' },
  { key: 'medical_updates', label: 'Medical Updates' },
  { key: 'success_stories', label: 'Success Stories' },
  { key: 'events_fundraisers', label: 'Events & Fundraisers' },
  { key: 'behind_the_scenes', label: 'Behind the Scenes' },
  { key: 'foster_programs', label: 'Foster Programs' },
  { key: 'rescue_missions', label: 'Rescue Missions' }
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
