<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200">
      <h2 class="text-3xl font-bold text-center mb-6 text-[#1446A0]">
        Add New Dog
      </h2>
      
      <!-- Error Alert -->
      <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p class="font-bold">Error</p>
        <p>{{ errorMessage }}</p>
      </div>
      
      <!-- Success Alert -->
      <div v-if="success" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p class="font-bold">Success!</p>
        <p>Dog added successfully.</p>
      </div>
      
      <form @submit.prevent="submitDog" enctype="multipart/form-data">
        <!-- Basic Fields -->
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogName">Name</label>
          <input
            id="dogName"
            v-model="name"
            type="text"
            required
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogDescription">Description</label>
          <textarea
            id="dogDescription"
            v-model="description"
            required
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogImage">Image</label>
          <input
            id="dogImage"
            type="file"
            @change="handleFileUpload"
            accept="image/png, image/jpeg"
            required
            class="w-full text-black p-2 border border-gray-300 rounded"
          />
        </div>

        <!-- Filter Fields -->
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogLocation">Location</label>
          <input
            id="dogLocation"
            v-model="location"
            type="text"
            placeholder="City, State, etc."
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogBreed">Breed</label>
          <input
            id="dogBreed"
            v-model="breed"
            type="text"
            placeholder="e.g., Labrador Retriever"
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogSize">Size</label>
          <select 
            v-model="size" 
            id="dogSize" 
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent bg-white text-black"
          >
            <option value="">Any</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogAge">Age</label>
          <select 
            v-model="age" 
            id="dogAge" 
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent bg-white text-black"
          >
            <option value="">Any</option>
            <option value="puppy">Puppy</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-medium text-black" for="dogGender">Gender</label>
          <select 
            v-model="gender" 
            id="dogGender" 
            class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1446A0] focus:border-transparent bg-white text-black"
          >
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="mb-6">
          <span class="block mb-2 font-medium text-black">Good With</span>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                value="children" 
                v-model="goodWith" 
                class="h-5 w-5 text-[#1446A0] border-gray-300 rounded"
              />
              <span class="ml-2 text-black">Children</span>
            </label>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                value="dogs" 
                v-model="goodWith" 
                class="h-5 w-5 text-[#1446A0] border-gray-300 rounded"
              />
              <span class="ml-2 text-black">Other Dogs</span>
            </label>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                value="cats" 
                v-model="goodWith" 
                class="h-5 w-5 text-[#1446A0] border-gray-300 rounded"
              />
              <span class="ml-2 text-black">Cats</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-[#1446A0] hover:bg-[#0d3580] text-white font-bold py-3 px-4 rounded transition duration-200 ease-in-out"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Form data
const name = ref('')
const description = ref('')
const imageFile = ref<File | null>(null)
const location = ref('')
const breed = ref('')
const size = ref('')
const age = ref('')
const gender = ref('')
const goodWith = ref<string[]>([])

// Form state
const isSubmitting = ref(false)
const error = ref(false)
const success = ref(false)
const errorMessage = ref('')

// Backend URL - HARDCODED to your backend
const BACKEND_URL = 'http://localhost:3000'

const router = useRouter()

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0]
  }
}

const submitDog = async () => {
  if (!imageFile.value) {
    error.value = true
    errorMessage.value = 'Please select an image file'
    return
  }

  isSubmitting.value = true
  error.value = false
  success.value = false
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('image', imageFile.value)

  // Append filter fields
  formData.append('location', location.value)
  formData.append('breed', breed.value)
  formData.append('size', size.value)
  formData.append('age', age.value)
  formData.append('gender', gender.value)
  
  // For "goodWith", append each value separately
  goodWith.value.forEach(val => formData.append('goodWith', val))

  try {
    // Get authentication token from localStorage
    const token = localStorage.getItem('adminToken')
    
    // Log the exact URL we're using
    const url = `${BACKEND_URL}/dogs`
    console.log('Submitting to backend URL:', url)
    
    // Make the API call with the absolute URL to the backend
    const response = await axios.post(url, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        // Include auth token if available
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
    
    console.log('Response from backend:', response.data)
    
    // Show success message
    success.value = true
    
    // Reset form after success
    setTimeout(() => {
      name.value = ''
      description.value = ''
      imageFile.value = null
      location.value = ''
      breed.value = ''
      size.value = ''
      age.value = ''
      gender.value = ''
      goodWith.value = []
      
      // Reset file input
      const fileInput = document.getElementById('dogImage') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
      
      // Navigate after a brief delay - use absolute path not relative
      router.push('/dogs')
    }, 2000)
    
  } catch (err: any) {
    console.error('Error submitting dog:', err)
    
    // Handle different error types
    if (err.code === 'ERR_NETWORK') {
      errorMessage.value = `Cannot connect to ${BACKEND_URL}. Make sure your backend server is running.`
    } else if (err.response?.status === 401) {
      errorMessage.value = 'Authentication required. Please log in again.'
    } else if (err.response?.status === 404) {
      errorMessage.value = `API endpoint not found at ${BACKEND_URL}/dogs/upload`
    } else {
      errorMessage.value = err.response?.data?.message || 'Failed to add dog. Please try again.'
    }
    
    error.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>