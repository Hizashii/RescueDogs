<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6 text-[#3D4836]">Manage Charity Items</h1>
  
      <button
        @click="openForm()"
        class="mb-4 px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]"
      >
        Add New Item
      </button>
  
      <table class="min-w-full bg-white shadow">
        <thead>
          <tr class="bg-[#F8F6ED]">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Price (Ft)</th>
            <th class="px-4 py-2 text-left">Image</th>
            <th class="px-4 py-2 text-left">Active</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item._id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2">{{ item.price }}</td>
            <td class="px-4 py-2">
              <img :src="item.imageUrl" alt="" class="h-12 object-cover" />
            </td>
            <td class="px-4 py-2">{{ item.isActive ? 'Yes' : 'No' }}</td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="openForm(item)"
                class="px-2 py-1 bg-blue-500 text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                class="px-2 py-1 bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white shadow-lg w-96 p-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ form._id ? 'Edit Item' : 'Add Item' }}
          </h2>
  
          <label class="block mb-2">
            <span class="text-gray-700">Name</span>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 block w-full border px-2 py-1"
            />
          </label>
  
          <label class="block mb-2">
            <span class="text-gray-700">Price (Ft)</span>
            <input
              v-model.number="form.price"
              type="number"
              class="mt-1 block w-full border px-2 py-1"
            />
          </label>
  
          <label class="block mb-2">
            <span class="text-gray-700">Image URL</span>
            <input
              v-model="form.imageUrl"
              type="text"
              class="mt-1 block w-full border px-2 py-1"
            />
          </label>
  
          <label class="flex items-center mb-4">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="mr-2"
            />
            <span class="text-gray-700">Active</span>
          </label>
  
          <label class="block mb-4">
            <span class="text-gray-700">Description</span>
            <textarea
              v-model="form.description"
              rows="3"
              class="mt-1 block w-full border px-2 py-1"
            ></textarea>
          </label>
  
          <div class="flex justify-end space-x-2">
            <button
              @click="save()"
              class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
            <button
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  type CharityItem = {
    _id?: string
    name: string
    price: number
    description: string
    imageUrl: string
    isActive: boolean
  }
  
  const items = ref<CharityItem[]>([])
  const showModal = ref(false)
  const form = ref<CharityItem>({
    name: '', price: 0, description: '', imageUrl: '', isActive: true
  })
  const router = useRouter()
  
  async function fetchItems() {
    items.value = await $fetch<CharityItem[]>('/api/admin/charity-items')
  }
  
  function openForm(item?: CharityItem) {
    if (item && item._id) {
      form.value = { ...item }
    } else {
      form.value = { name: '', price: 0, description: '', imageUrl: '', isActive: true }
    }
    showModal.value = true
  }
  
  async function save() {
    if (form.value._id) {
      await $fetch(`/api/admin/charity-items/${form.value._id}`,
        { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/admin/charity-items',
        { method: 'POST', body: form.value })
    }
    showModal.value = false
    await fetchItems()
  }
  
  async function remove(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      await $fetch(`/api/admin/charity-items/${id}`, { method: 'DELETE' })
      await fetchItems()
    }
  }
  
  onMounted(fetchItems)
  </script>
  
  <style scoped>
  /* optional custom styles */
  </style>
  