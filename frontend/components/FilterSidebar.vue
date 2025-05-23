<template>
  <div class="w-full md:w-64 bg-[#FFE65E] p-4 flex flex-col space-y-6 sticky top-0 h-screen overflow-y-auto">
    <button
      @click="clearFilters"
      class="bg-white px-4 py-2 text-center text-sm font-bold hover:bg-gray-100 w-full md:w-auto"
    >
      CLEAR ALL FILTERS
    </button>
    <div class="flex flex-col space-y-2">
      <label class="font-bold text-center">NAME</label>
      <div class="relative">
        <input
          type="text"
          :value="filters.name"
          @input="onInput('name', $event)"
          class="w-full p-2 border text-center md:text-left"
          placeholder="Search by name"
        />
        <span class="absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <label class="font-bold text-center">BREED</label>
      <input
        type="text"
        :value="filters.breed"
        @input="onInput('breed', $event)"
        class="w-full p-2 border text-center md:text-left"
        placeholder="Enter breed"
      />
    </div>
    <div
      v-for="(opts, key) in selectConfig"
      :key="key"
      class="flex flex-col space-y-2"
    >
      <label class="font-bold text-center">{{ labels[key] }}</label>
      <select
        :value="filters[key]"
        @change="onInput(key, $event)"
        class="w-full p-2 border appearance-none text-center md:text-left"
      >
        <option value="Any">Any</option>
        <option v-for="opt in opts" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

type FilterKey = 
  | 'name' 
  | 'location' 
  | 'breed' 
  | 'size' 
  | 'age' 
  | 'gender' 
  | 'goodWith'
  | 'status'

interface Props {
  filters: Record<FilterKey, string>
  breeds: string[] 
  locations: string[] 
  showStatus?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-filter', key: FilterKey, value: string): void
  (e: 'clear-filters'): void
}>()

function onInput(key: FilterKey, e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update-filter', key, val)
}
function clearFilters() {
  emit('clear-filters')
}

const labels: Record<FilterKey, string> = {
  name:     'NAME',
  location: 'LOCATION',
  breed:    'BREED',
  size:     'SIZE',
  age:      'AGE',
  gender:   'GENDER',
  goodWith: 'GOOD WITH',
  status:   'STATUS'
}

const hardcodedLocations = [
  'Báránd','Bihardancsháza','Biharnagybajom','Hosszúhát','Komádi',
  'Körösszakál','Körösszegapáti','Magyarhomorog','Mezőpeterd','Mezősas',
  'Nádudvar','Nagyrábé','Püspökladány','Sáp','Sárrétudvari','Szerep',
  'Tetétlen','Zsáka'
]

const hardcodedStatuses = [
  'Örökbefogadható','Megfigyelés alatt','Örökbefogadott',
  'Eredeti gazdája érte jött','Átvevő szervezethez került','Elhunyt'
]

type SelectKey = Exclude<FilterKey, 'name' | 'breed'>
const selectConfig = computed<Partial<Record<SelectKey, string[]>>>(() => {
  const config: Partial<Record<SelectKey, string[]>> = {
    location: hardcodedLocations, 
    size:     ['Small','Medium','Large'],
    age:      ['Puppy','Young','Adult','Senior'],
    gender:   ['Male','Female'],
    goodWith: ['children','dogs','cats'], 
  }
  
  if (props.showStatus) {
    config.status = hardcodedStatuses 
  }
  
  return config
})
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}
</style>
