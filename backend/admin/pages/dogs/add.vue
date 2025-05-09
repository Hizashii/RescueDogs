<template>
  <div class="min-h-screen flex justify-center bg-gray-100 p-4">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <form @submit.prevent="submitDog" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Name</label>
            <input v-model="name" type="text" required
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0]"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Status</label>
            <select v-model="status" required
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select status</option>
              <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Breed</label>
            <input v-model="breed" type="text" placeholder="e.g., Labrador"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0]"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Size</label>
            <select v-model="size"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select size</option>
              <option v-for="sz in sizes" :key="sz">{{ sz }}</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Image</label>
            <input type="file" @change="handleFileUpload" accept="image/*"
              class="w-full"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Location</label>
            <select v-model="location" required
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select city</option>
              <option v-for="c in dogCities" :key="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Age</label>
            <select v-model="age"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select age</option>
              <option v-for="a in ages" :key="a">{{ a }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Gender</label>
            <select v-model="gender"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select gender</option>
              <option v-for="g in genders" :key="g">{{ g }}</option>
            </select>
          </div>
        </div>

        <div class="lg:col-span-2">
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="description" rows="3" required
            class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0]"></textarea>
        </div>

        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-medium mb-1">Fur Length</label>
            <select v-model="furLength"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select fur length</option>
              <option v-for="f in furLengths" :key="f">{{ f }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Vaccination & Chips</label>
            <select v-model="vaccination"
              class="w-full border rounded p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select option</option>
              <option v-for="v in vaccinationOptions" :key="v">{{ v }}</option>
            </select>
          </div>
        </div>

        <div class="lg:col-span-2">
          <label class="block font-medium mb-2">Extra Tags</label>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label v-for="tag in extraTags" :key="tag" class="flex items-center">
              <input type="checkbox" :value="tag" v-model="selectedTags"
                class="h-5 w-5 text-[#1446A0] border-gray-300 rounded"/>
              <span class="ml-2">{{ tag }}</span>
            </label>
          </div>
        </div>

        <div class="lg:col-span-2 flex justify-end">
          <button type="submit"
            :disabled="isSubmitting"
            class="bg-[#1446A0] text-white font-bold py-2 px-6 rounded hover:bg-[#0d3580]">
            {{ isSubmitting ? 'Submitting…' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'

const api = useApi()
const router = useRouter()

const dogCities = [
  'Báránd','Bihardancsháza','Biharnagybajom','Hosszúhát','Komádi',
  'Körösszakál','Körösszegapáti','Magyarhomorog','Mezőpeterd','Mezősas',
  'Nádudvar','Nagyrábé','Püspökladány','Sáp','Sárrétudvari','Szerep',
  'Tetétlen','Zsáka'
]
const statuses = [
  'Up for adoption','In quarantine','Adopted',
  'Claimed by original owner','Housed by another shelter','Deceased'
]
const sizes = [
  'small','bigger small','smaller mid','mid',
  'bigger mid','smaller big','big'
]
const ages = ['Puppy','Young','Adult','Old']
const genders = ['Male','Female']
const furLengths = ['Short','Mid','Long']
const vaccinationOptions = ['Chipped and vaccinated','In process']
const extraTags = [
  'Good with people/kids/cats/dogs','Really friendly','Shy','Curious',
  'Afraid of people','Afraid of other dogs','Agressive with people',
  'Came from the streets','Heartworm positive'
]

const name = ref('')
const description = ref('')
const imageFile = ref<File|null>(null)
const location = ref('')
const status = ref('')
const breed = ref('')
const size = ref('')
const age = ref('')
const gender = ref('')
const furLength = ref('')
const vaccination = ref('')
const selectedTags = ref<string[]>([])

const isSubmitting = ref(false)
const error = ref(false)
const success = ref(false)
const errorMessage = ref('')

function handleFileUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  imageFile.value = files?.[0] ?? null
}

async function submitDog() {
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
  formData.append('location', location.value)
  formData.append('status', status.value)
  formData.append('breed', breed.value)
  formData.append('size', size.value)
  formData.append('age', age.value)
  formData.append('gender', gender.value)
  formData.append('furLength', furLength.value)
  formData.append('vaccination', vaccination.value)
  selectedTags.value.forEach(tag => formData.append('extraTags', tag))

  try {
    await api('/api/dogs/upload', {
      method: 'POST',
      body: formData
    })

    success.value = true
    setTimeout(() => {
      name.value = ''
      description.value = ''
      imageFile.value = null
      location.value = ''
      status.value = ''
      breed.value = ''
      size.value = ''
      age.value = ''
      gender.value = ''
      furLength.value = ''
      vaccination.value = ''
      selectedTags.value = []

      const fileInput = document.getElementById('dogImage') as HTMLInputElement|null
      if (fileInput) fileInput.value = ''

      router.push('/dogs')
    }, 1500)
  } catch (err: any) {
    console.error('Error submitting dog:', err)
    errorMessage.value = err?.data?.message || 'Failed to add dog. Please try again.'
    error.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>
