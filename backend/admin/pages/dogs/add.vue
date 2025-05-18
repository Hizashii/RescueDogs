<template>
  <div class="min-h-screen flex justify-center bg-[#F8F6ED] p-4">
    <div class="bg-white shadow-lg  p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-4 text-[#3D4836]">
        {{ isEditMode ? 'Edit Dog' : 'Add New Dog' }}
      </h1>

      <form @submit.prevent="submitDog" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Name</label>
            <input v-model="name" type="text" required
                   class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Status</label>
            <select v-model="status" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select status</option>
              <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Breed</label>
            <input v-model="breed" type="text" placeholder="e.g., Labrador"
                   class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Size</label>
            <select v-model="size"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select size</option>
              <option v-for="sz in sizes" :key="sz">{{ sz }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Image</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Location</label>
            <select v-model="location" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select city</option>
              <option v-for="c in dogCities" :key="c">{{ c }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Age</label>
            <select v-model="age"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select age</option>
              <option v-for="a in ages" :key="a">{{ a }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Gender</label>
            <select v-model="gender"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select gender</option>
              <option v-for="g in genders" :key="g">{{ g }}</option>
            </select>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="description" rows="3" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]"></textarea>
        </div>
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-medium mb-1">Fur Length</label>
            <select v-model="furLength"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select fur length</option>
              <option v-for="f in furLengths" :key="f">{{ f }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Vaccination & Chips</label>
            <select v-model="vaccination"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Select option</option>
              <option v-for="v in vaccinationOptions" :key="v">{{ v }}</option>
            </select>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-2">Good With</label>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label v-for="tag in extraTags" :key="tag" class="flex items-center">
              <input type="checkbox" :value="tag" v-model="selectedTags"
                     class="h-5 w-5 text-[#1446A0] border-gray-300"/>
              <span class="ml-2">{{ tag }}</span>
            </label>
          </div>
        </div>
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block font-medium mb-1">Came In</label>
            <input type="date" v-model="cameIn" class="w-full border p-2"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Went Out</label>
            <input type="date" v-model="wentOut" class="w-full border p-2"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Looking for Owner</label>
            <input type="date" v-model="lookingForOwner" class="w-full border p-2"/>
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">Adapted</label>
            <input type="date" v-model="adapted" class="w-full border p-2"/>
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">Relation to People</label>
            <input type="text" v-model="relationToPeople"
                   class="w-full border p-2" placeholder="e.g., Friendly"/>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-1">More Info</label>
          <textarea v-model="moreInfo" rows="3"
                    class="w-full border p-2"></textarea>
        </div>
        <div class="lg:col-span-2 flex justify-end">
          <button type="submit"
                  :disabled="isSubmitting"
                  class="bg-[#3D6625] text-white font-bold py-2 px-6 hover:bg-[#213D12]">
            {{ isSubmitting
                ? (isEditMode ? 'Saving…' : 'Submitting…')
                : (isEditMode ? 'Save Changes' : 'Submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'
const isAdmin = useCookie('isAdmin').value
if (!isAdmin) {
  navigateTo('/login')
}
const api = useApi()
const route = useRoute()
const router = useRouter()

const editId     = computed(() => (route.query.id as string) || '')
const isEditMode = computed(() => !!editId.value)

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
const sizes    = [
  'small','bigger small','smaller mid','mid',
  'bigger mid','smaller big','big'
]
const ages     = ['Puppy','Young','Adult','Old']
const genders  = ['Male','Female']
const furLengths         = ['Short','Mid','Long']
const vaccinationOptions = ['Chipped and vaccinated','In process']
const extraTags          = [
  'Good with people','Good with kids', 'Good with cats', 'Good with dogs','Really friendly','Shy','Curious',
  'Afraid of people','Afraid of other dogs','Agressive with people',
  'Came from the streets','Heartworm positive'
]

const name             = ref('')
const status           = ref('')
const breed            = ref('')
const size             = ref('')
const age              = ref('')
const gender           = ref('')
const furLength        = ref('')
const vaccination      = ref('')
const location         = ref('')
const description      = ref('')
const imageFile        = ref<File|null>(null)
const selectedTags     = ref<string[]>([])

const cameIn           = ref('')
const wentOut          = ref('')
const lookingForOwner  = ref('')
const adapted          = ref('')
const relationToPeople = ref('')
const moreInfo         = ref('')

const isSubmitting = ref(false)


function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (file) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const maxSize = 200;
        const width = img.width;
        const height = img.height;
        const scale = Math.min(maxSize / width, maxSize / height);
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              imageFile.value = new File([blob], file.name, { type: 'image/jpeg' });
            }
          },
          'image/jpeg',
          0.8
        );
      }
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  }
}

onMounted(async () => {
  if (!isEditMode.value) return

  try {
    const dog = await api(`/api/dogs/${editId.value}`)
    const dogData = dog as any
    name.value        = dogData.name
    status.value      = dogData.status
    breed.value       = dogData.breed
    size.value        = dogData.size
    age.value         = dogData.age
    gender.value      = dogData.gender
    furLength.value   = dogData.furLength
    vaccination.value = dogData.vaccination
    location.value    = dogData.location
    description.value = dogData.description
    selectedTags.value= dogData.goodWith || []
    cameIn.value            = dogData.cameIn
    wentOut.value           = dogData.wentOut
    lookingForOwner.value   = dogData.lookingForOwner
    adapted.value           = dogData.adapted
    relationToPeople.value  = dogData.relationToPeople
    moreInfo.value          = dogData.moreInfo
  } catch (err) {
    console.error('Failed to load dog:', err)
  }
})

async function submitDog() {
  isSubmitting.value = true
  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('status', status.value)
  formData.append('breed', breed.value)
  formData.append('size', size.value)
  formData.append('age', age.value)
  formData.append('gender', gender.value)
  formData.append('furLength', furLength.value)
  formData.append('vaccination', vaccination.value)
  formData.append('location', location.value)
  formData.append('description', description.value)
  if (imageFile.value) formData.append('image', imageFile.value)
  selectedTags.value.forEach(tag => formData.append('goodWith', tag))

  formData.append('cameIn', cameIn.value)
  formData.append('wentOut', wentOut.value)
  formData.append('lookingForOwner', lookingForOwner.value)
  formData.append('adapted', adapted.value)
  formData.append('relationToPeople', relationToPeople.value)
  formData.append('moreInfo', moreInfo.value)

try {
  if (isEditMode.value) {
    await api(`/api/dogs/${editId.value}`, { method: 'PUT', body: formData })
    window.alert('Changes saved successfully!')
  } else {
    await api('/api/dogs/upload', { method: 'POST', body: formData })
    window.alert('Dog created successfully!')
  }
  await router.push('/')
} catch (err) {
}
}
</script>
