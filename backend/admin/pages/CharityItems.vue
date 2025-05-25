<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import useCharityApi from '../../../backend/admin/composables/useCharityApi'
import type { CharityItem } from '../../../backend/admin/type/CharityItem'

const isAdmin = useCookie('isAdmin').value
if (!isAdmin) {
  navigateTo('/login')
}

const { fetchItems, create, update, remove, uploadImage } = useCharityApi() as any
const items = ref<CharityItem[]>([])
const showModal = ref(false)
const form = ref<Partial<CharityItem>>({
  name: '',
  price: 0,
  description: '',
  imageUrl: '',
  isActive: true,
  category: '',
  stock: 0
})
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const uploadProgress = ref(0)

const filter = ref('')
const categoryFilter = ref('')
const activeFilter = ref<'all'|'active'|'inactive'>('all')
const sortConfig = ref({ key: 'name', direction: 'asc' })

const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const totalPages = ref(1)

const loading = ref(false)

const dashboardStats = computed(() => ({
  totalItems: totalItems.value,
  activeItems: items.value.filter(i => i.isActive).length,
  totalValue: items.value.reduce((sum, i) => sum + (i.price * i.stock), 0),
  lowStock: items.value.filter(i => i.stock < 10).length
}))

const categories = computed(() => [...new Set(items.value.map(i => i.category))])

async function fetchAndFilterItems() {
  loading.value = true
  try {
    const params: any = {
      page: currentPage.value,
      limit: itemsPerPage.value,
      sortBy: sortConfig.value.key,
      sortDirection: sortConfig.value.direction,
    }
    if (filter.value) params.name = filter.value
    if (categoryFilter.value) params.category = categoryFilter.value
    if (activeFilter.value !== 'all') params.isActive = activeFilter.value === 'active'

    const response = await fetchItems(params)
    items.value = response.items
    totalItems.value = response.total
    totalPages.value = response.totalPages

  } catch (e) {
    console.error('Error fetching charity items:', e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchAndFilterItems()
})

function openForm(item?: CharityItem) {
  form.value = item
    ? { ...item }
    : { name:'', price:0, description:'', imageUrl:'', isActive:true, category:'', stock:0 }
  selectedFile.value = null
  uploadProgress.value = 0
  showModal.value = true
}

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    selectedFile.value = target.files[0]
    form.value.imageUrl = URL.createObjectURL(selectedFile.value)
  }
}

async function saveItem() {
  try {
    if (selectedFile.value) {
      const fd = new FormData()
      fd.append('image', selectedFile.value)
      const { url } = await uploadImage(fd, (p: number) => { uploadProgress.value = p })
      form.value.imageUrl = url
    }
    if (form.value._id) {
      await update(form.value._id, form.value as CharityItem)
    } else {
      await create(form.value as Omit<CharityItem,'_id'>)
    }
    await fetchAndFilterItems()
    showModal.value = false
  } catch (e) {
    console.error('Hiba a mentés során:', e)
    alert('Nem sikerült elmenteni az elemet. Nézze meg a konzolt a részletekért.')
  }
}

async function deleteItem(id: string) {
  if (!confirm('Biztosan törölni szeretné ezt a terméket?')) return
  await remove(id)
  await fetchAndFilterItems()
}

function handleSort(key: string) {
  const dir = sortConfig.value.key === key && sortConfig.value.direction === 'asc'
    ? 'desc'
    : 'asc'
  sortConfig.value = { key, direction: dir }
}

function getSortIcon(key: string) {
  if (sortConfig.value.key !== key) return ''
  return sortConfig.value.direction === 'asc' ? '▲' : '▼'
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    fetchAndFilterItems()
  }
}

watch([filter, categoryFilter, activeFilter, sortConfig], () => {
  currentPage.value = 1
  fetchAndFilterItems()
}, { deep: true })
</script>

<template>
  <div class="bg-yellow-50 min-h-screen">
    <div class="container mx-auto p-6">

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white shadow p-4 flex items-center">
          <div class="bg-yellow-100 p-3 mr-4">
            <span class="text-green-600">📊</span>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Összes termék</p>
            <p class="text-xl font-bold text-green-700">{{ totalItems.toLocaleString() }}</p>
          </div>
        </div>
        <div class="bg-white shadow p-4 flex items-center">
          <div class="bg-yellow-100 p-3 mr-4">
            <span class="text-green-600">✓</span>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Aktív termékek (aktuális oldalon)</p>
            <p class="text-xl font-bold text-green-700">{{ dashboardStats.activeItems }}</p>
          </div>
        </div>
        <div class="bg-white shadow p-4 flex items-center">
          <div class="bg-yellow-100 p-3 mr-4">
            <span class="text-green-600">💰</span>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Eddigi összeg (aktuális oldalon)</p>
            <p class="text-xl font-bold text-green-700">{{ dashboardStats.totalValue.toLocaleString() }} Ft</p>
          </div>
        </div>
        <div class="bg-white shadow p-4 flex items-center">
          <div class="bg-yellow-100 p-3 mr-4">
            <span class="text-red-600">⚠️</span>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Alacsony készleti termékek (aktuális oldalon)</p>
            <p class="text-xl font-bold text-red-600">{{ dashboardStats.lowStock }}</p>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="bg-white shadow mb-6">
        <div class="p-4 bg-gray-200">
          <h2 class="text-lg font-medium text-green-700">Termékek</h2>
        </div>

        <!-- Filters & Actions -->
        <div class="p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">

            <!-- Search -->
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">🔍</span>
              <input
                v-model="filter"
                type="text"
                placeholder="Keress a termékek között"
                class="pl-10 pr-4 py-2 w-full md:w-64"
              />
            </div>

            <!-- Category Filter -->
            <select v-model="categoryFilter" class="px-3 py-2">
              <option value="">Minden kategória</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>

            <!-- Status Filter -->
            <div class="flex overflow-hidden">
              <button
                class="px-3 py-2"
                :class="{
                  'bg-yellow-100 text-green-700': activeFilter==='all',
                  'bg-white text-gray-700': activeFilter!=='all'
                }"
                @click="activeFilter='all'"
              >Minden</button>
              <button
                class="px-3 py-2"
                :class="{
                  'bg-yellow-100 text-green-700': activeFilter==='active',
                  'bg-white text-gray-700': activeFilter!=='active'
                }"
                @click="activeFilter='active'"
              >Aktív</button>
              <button
                class="px-3 py-2"
                :class="{
                  'bg-yellow-100 text-green-700': activeFilter==='inactive',
                  'bg-white text-gray-700': activeFilter!=='inactive'
                }"
                @click="activeFilter='inactive'"
              >Inaktív</button>
            </div>

          </div>

          <!-- Add New Button -->
          <button
            @click="openForm()"
            class="bg-green-600 text-white px-4 py-2 hover:bg-green-700 flex items-center"
          >
            <span class="mr-1">+</span>
            Új elem hozzáadása
          </button>
        </div>

        <!-- Products Table -->
        <div class="overflow-x-auto">
          <div v-if="loading" class="text-center py-8">
            Betöltés...
          </div>
          <template v-else>
            <table class="min-w-full">
              <thead class="bg-yellow-50 border-b">
                <tr>
                  <th
                    @click="handleSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer"
                  >
                    Termék neve {{ getSortIcon('name') }}
                  </th>
                  <th
                    @click="handleSort('category')"
                    class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer"
                  >
                    Kategória {{ getSortIcon('category') }}
                  </th>
                  <th
                    @click="handleSort('price')"
                    class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer"
                  >
                    Ár (Ft) {{ getSortIcon('price') }}
                  </th>
                  <th
                    @click="handleSort('stock')"
                    class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer"
                  >
                    Mennyiség {{ getSortIcon('stock') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Kép
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Státusz
                  </th>
                  <th class="px-6 py-4 text-right text-xs font-medium text-green-700 uppercase tracking-wider">
                    Műveletek
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in items" :key="item._id" class="hover:bg-yellow-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ item.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-green-700">
                      {{ item.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                    {{ item.price.toLocaleString() }} Ft
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium"
                      :class="{
                        'bg-red-100 text-red-800': item.stock < 10,
                        'bg-yellow-100 text-green-800': item.stock >= 10 && item.stock < 20,
                        'bg-green-100 text-green-800': item.stock >= 20
                      }"
                    >
                      {{ item.stock }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img :src="item.imageUrl" :alt="item.name" class="h-12 w-12 object-cover" loading="lazy"/>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': item.isActive,
                        'bg-red-100 text-red-800': !item.isActive
                      }"
                    >
                      {{ item.isActive ? 'Aktív' : 'Inaktív' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="openForm(item)" class="text-green-600 hover:text-green-900 mr-3">
                      Szerkesztés
                    </button>
                    <button @click="deleteItem(item._id)" class="text-red-600 hover:text-red-900">
                      Törlés
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!items.length && !loading" class="text-center py-8 text-gray-500">
              Nem találhatók ilyen elemek
            </div>
          </template>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[currentPage === 1 ? 'opacity-50 cursor-not-allowed' : '', 'px-3 py-1 border']"
          >
            Előző
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="['px-3 py-1 border', currentPage === page ? 'bg-yellow-100 text-green-700' : '']"
          >
            {{ page }}
          </button>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : '', 'px-3 py-1 border']"
          >
            Következő
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white shadow-xl w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-green-700">
            {{ form._id ? 'Elem szerkesztése' : 'Új elem hozzáadása' }}
          </h2>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">✖</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Termék neve</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Kategória</label>
            <input
              v-model="form.category"
              type="text"
              list="categories"
              class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <datalist id="categories">
              <option v-for="cat in categories" :key="cat" :value="cat" />
            </datalist>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Ár (Ft)</label>
            <input
              v-model.number="form.price"
              type="number"
              class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Mennyiség</label>
            <input
              v-model.number="form.stock"
              type="number"
              class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
          />

          <div class="col-span-2">
            <label class="block mb-2 text-sm font-medium text-gray-700">Kép URL</label>
            <div class="flex">
              <input
                v-model="form.imageUrl"
                type="text"
                readonly
                class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="URL feltöltése vagy kép beillesztése"
              />
              <button
                type="button"
                @click="triggerFileInput"
                class="bg-yellow-100 border border-gray-300 border-l-0 px-3 flex items-center text-gray-600 hover:bg-yellow-200"
              >
                📷
              </button>
            </div>
          </div>

          <div v-if="form.imageUrl" class="col-span-2 mt-2">
            <p class="text-sm font-medium text-gray-700 mb-2">Előnézet</p>
            <img :src="form.imageUrl" alt="Preview" class="h-32 object-cover" />
          </div>

          <div class="col-span-2">
            <label class="block mb-2 text-sm font-medium text-gray-700">Leírás</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div class="col-span-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="form.isActive"
                type="checkbox"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span class="text-sm text-gray-700">
                A termék aktív és látható az oldalon
              </span>
            </label>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t flex justify-end space-x-3">
          <button
            @click="showModal = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Mégsem
          </button>
          <button
            @click="saveItem"
            class="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            :disabled="!form.name || (form.price || 0) <= 0"
          >
            {{ form._id ? 'Elem frissítése' : 'Elem hozzáadása' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

