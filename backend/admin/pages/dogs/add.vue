<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Add New Dog
        </h2>
        <form @submit.prevent="submitDog" enctype="multipart/form-data">
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-200 mb-2" for="dogName">
              Name
            </label>
            <input
              id="dogName"
              v-model="name"
              type="text"
              placeholder="Enter dog's name"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-200 mb-2" for="dogDescription">
              Description
            </label>
            <textarea
              id="dogDescription"
              v-model="description"
              placeholder="Enter dog's description"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-200 mb-2" for="dogImage">
              Image
            </label>
            <input
              id="dogImage"
              type="file"
              @change="handleFileUpload"
              accept="image/png, image/jpeg"
              class="w-full text-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const name = ref('')
  const description = ref('')
  const imageFile = ref<File | null>(null)
  const router = useRouter()
  
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      imageFile.value = target.files[0]
    }
  }
  
  const submitDog = async () => {
    if (!imageFile.value) return
  
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('image', imageFile.value)
  
    try {
      // Use the correct backend URL (e.g., port 5000)
      axios.post('http://localhost:5000/api/dogs/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

      alert('Dog added successfully!')
      router.push('/index')
    } catch (error) {
      console.error(error)
      alert('Failed to add dog.')
    }
  }
  </script>
  
  <style scoped>
  /* All styling is done via Tailwind classes */
  </style>
  