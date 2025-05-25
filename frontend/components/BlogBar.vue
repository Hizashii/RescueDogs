<template>
  <div class="bg-[#FFDC20] p-4 space-y-6 w-full md:w-64">
    <button
      @click="onClear"
      class="w-full bg-white text-black font-semibold py-2"
    >
      {{ $t('blog.filters.clearAll') }}
    </button>
 </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'clear-filters'): void
  (e: 'update-filter', key: string, value: string): void
}>()

function onClear() {
  emit('clear-filters')
}
</script>
