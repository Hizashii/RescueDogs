<template>
  <div class="min-h-screen flex justify-center bg-[#F8F6ED] p-4">
    <div class="bg-white shadow-lg  p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-4 text-[#3D4836]">
        {{ isEditMode ? 'Kutya szerkesztése' : 'Új kutya hozzáadása' }}
      </h1>

      <form @submit.prevent="submitDog" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Név</label>
            <input v-model="name" type="text" required
                   class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Státusz</label>
            <select v-model="status" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon státuszt</option>
              <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Fajta</label>
            <input v-model="breed" type="text" placeholder="pl.: Labrador"
                   class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]" />
          </div>
          <div>
            <label class="block font-medium mb-1">Méret</label>
            <select v-model="size"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon méretet</option>
              <option v-for="sz in sizes" :key="sz">{{ sz }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Kép feltöltése</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full"/>
            <p class="text-sm text-gray-500 mt-1">Válasszon képet</p>
          </div>
          <div>
            <label class="block font-medium mb-1">Település</label>
            <select v-model="location" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon települést</option>
              <option v-for="c in dogCities" :key="c">{{ c }}</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium mb-1">Kor</label>
            <select v-model="age"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon kort</option>
              <option v-for="a in ages" :key="a">{{ a }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Nem</label>
            <select v-model="gender"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon nemet</option>
              <option v-for="g in genders" :key="g">{{ g }}</option>
            </select>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-1">Leírás</label>
          <textarea v-model="description" rows="3" required
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0]"></textarea>
        </div>
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-medium mb-1">Szőrhosszúság</label>
            <select v-model="furLength"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon szőrhosszt</option>
              <option v-for="f in furLengths" :key="f">{{ f }}</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Oltások és chip</label>
            <select v-model="vaccination"
                    class="w-full border p-2 focus:ring-2 focus:ring-[#1446A0] bg-white">
              <option disabled value="">Válasszon opciót</option>
              <option v-for="v in vaccinationOptions" :key="v">{{ v }}</option>
            </select>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-2">Opcionális információ</label>
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
            <label class="block font-medium mb-1">Bekerülés</label>
            <input type="date" v-model="cameIn" class="w-full border p-2"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Kikerülés</label>
            <input type="date" v-model="wentOut" class="w-full border p-2"/>
          </div>
          <div>
            <label class="block font-medium mb-1">Gazdit keres</label>
            <input type="date" v-model="lookingForOwner" class="w-full border p-2"/>
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">Örökbefogadva</label>
            <input type="date" v-model="adapted" class="w-full border p-2"/>
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">További információ</label>
            <input type="text" v-model="relationToPeople"
                   class="w-full border p-2" placeholder="pl.: barátságos"/>
          </div>
        </div>
        <div class="lg:col-span-2">
          <label class="block font-medium mb-1">További részletek</label>
          <textarea v-model="moreInfo" rows="3"
                    class="w-full border p-2"></textarea>
        </div>
        <div class="lg:col-span-2 flex justify-end">
          <button type="submit"
                  :disabled="isSubmitting"
                  class="bg-[#3D6625] text-white font-bold py-2 px-6 hover:bg-[#213D12]">
            {{ isSubmitting
                ? (isEditMode ? 'Mentés…' : 'Küldés…')
                : (isEditMode ? 'Változtatások mentése' : 'Beküldés') }}
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
  'Örökbefogadható','Megfigyelés alatt','Örökbefogadott',
  'Eredeti gazdája érte jött','Átvevő szervezethez került','Elhunyt'
]
const sizes    = [
  'kicsi','nagyobb kicsi','kisebb közepes','közepes',
  'nagyobb közepes','kisebb nagy','nagy'
]
const ages     = ['Kölyök','Fiatal','Felnőtt','Idős']
const genders  = ['Hím','Nőstény']
const furLengths         = ['Rövid','Közepes','Hosszú']
const vaccinationOptions = ['Chippelt és oltott','Folyamatban']
const extraTags          = [
  'Emberrel kedves','Szereti a gyerekeket','Szereti a macskákat','Szereti a kutyákat',
  'Nagyon barátságos','Félénk','Kíváncsi','Fél az emberektől','Fél más kutyáktól',
  'Agresszív','Utcáról jött','Szívféreg pozitív'
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
  isSubmitting.value = true;
  let dogData: any = {};
  let imageUrl = null;

  try {
    if (imageFile.value) {
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile.value);

      try {
        const uploadResponse: { path: string } = await api('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        imageUrl = uploadResponse.path;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        isSubmitting.value = false;
        return;
      }
    } else if (isEditMode.value) {
      try {
        const existingDog: any = await api(`/api/dogs/${editId.value}`);
        imageUrl = existingDog.image;
      } catch (fetchError) {
        console.error('Error fetching existing dog data:', fetchError);
        isSubmitting.value = false;
        return;
      }
    }

    dogData = {
      name: name.value,
      status: status.value,
      breed: breed.value,
      size: size.value,
      age: age.value,
      gender: gender.value,
      furLength: furLength.value,
      vaccination: vaccination.value,
      location: location.value,
      description: description.value,
      goodWith: selectedTags.value,
      cameIn: cameIn.value,
      wentOut: wentOut.value,
      lookingForOwner: lookingForOwner.value,
      adapted: adapted.value,
      relationToPeople: relationToPeople.value,
      moreInfo: moreInfo.value,
      image: imageUrl,
    };

    let response;
    if (isEditMode.value) {
      response = await api(`/api/dogs/${editId.value}`, {
        method: 'PUT',
        body: JSON.stringify(dogData),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      response = await api('/api/dogs', {
        method: 'POST',
        body: JSON.stringify(dogData),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Dog saved successfully:', response);
    router.push('/admin/dogs');

  } catch (error) {
    console.error('Submit dog error:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
