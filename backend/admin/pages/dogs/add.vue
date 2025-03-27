<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200">
      <h2 class="text-3xl font-bold text-center mb-6 text-[#1446A0]">
        Add New Dog
      </h2>
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

        <!-- New Filter Fields -->
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
import { useRuntimeConfig } from '#app'

const name = ref('')
const description = ref('')
const imageFile = ref<File | null>(null)

// New fields
const location = ref('')
const breed = ref('')
const size = ref('')
const age = ref('')
const gender = ref('')
const goodWith = ref<string[]>([])

const router = useRouter()
const config = useRuntimeConfig()

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

  // Append new fields
  formData.append('location', location.value)
  formData.append('breed', breed.value)
  formData.append('size', size.value)
  formData.append('age', age.value)
  formData.append('gender', gender.value)
  // For "goodWith", we join array or handle it in your backend
  goodWith.value.forEach((val) => formData.append('goodWith', val))

  try {
    await axios.post(`${config.public.apiBase}/api/dogs/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    alert('Dog added successfully!')
    router.push('/dogs')
  } catch (error) {
    console.error(error)
    alert('Failed to add dog.')
  }
}
</script>