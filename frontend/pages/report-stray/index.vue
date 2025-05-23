<template>
  <div class="min-h-screen flex flex-col items-center bg-[#FFE86B]">
    <h1 class="text-3xl font-bold mb-8 text-black mt-32 title-animate">
      {{ $t('report.title') }}
    </h1>

    <div
      v-if="submitSuccess"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 message-animate"
    >
      <p class="font-bold">{{ $t('report.success.heading') }}</p>
      <p>{{ $t('report.success.body') }}</p>
    </div>

    <div
      v-if="submitError"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 message-animate"
    >
      <p class="font-bold">{{ $t('report.error.heading') }}</p>
      <p>{{ errorMessage }}</p>
    </div>

    <div
      v-if="isSubmitting"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 flex justify-center"
    >
      <Loader />
    </div>

    <form
      v-if="!submitSuccess && !isSubmitting"
      class="w-full max-w-[400px] md:max-w-[700px] mb-32 form-animate"
      @submit.prevent="submitReport"
    >
      <div class="mb-4">
        <label for="name" class="block md:text-xl text-base font-bold mb-2">
          {{ $t('report.form.name.label') }}
        </label>
        <input
          id="name"
          type="text"
          v-model="formData.name"
          required
          class="appearance-none w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label for="phone" class="block md:text-xl text-base font-bold mb-2">
            {{ $t('report.form.phone.label') }}
          </label>
          <input
            id="phone"
            type="tel"
            v-model="formData.phone"
            required
            class="appearance-none w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="email" class="block md:text-xl text-base font-bold mb-2">
            {{ $t('report.form.email.label') }}
          </label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            class="appearance-none w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label
            for="dog-city"
            class="block md:text-xl text-base font-bold mb-2"
          >
            {{ $t('report.form.dogCity.label') }}
          </label>
          <select
            id="dog-city"
            v-model="formData.dogCity"
            required
            class="appearance-none w-full py-2 px-3 text-black bg-white focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>{{ $t('report.form.ChooseACity.label') }}</option>
            <option v-for="city in dogCities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>

        <div class="w-full md:w-1/2 px-3">
          <label
            for="dog-picture"
            class="block md:text-xl text-base font-bold mb-2"
          >
            {{ $t('report.form.dogPicture.label') }}
          </label>
          <div class="flex items-center space-x-4">
            <label
              class="relative inline-block cursor-pointer border border-black text-[14px] font-bold py-2 px-4 w-36 text-center text-black
                    overflow-hidden transition-colors duration-300 ease-in-out
                    before:absolute before:inset-0 before:bg-[#213D12] before:scale-x-0 before:origin-left
                    hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                     z-10 hover:text-white"
            >
              <span class="relative z-10">{{ $t('report.form.dogPicture.upload') }}</span>
              <input
                id="dog-picture"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileUpload"
              />
            </label>
            <span class="text-sm font-bold">
              {{ fileName || $t('report.form.dogPicture.hint') }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="imagePreview" class="w-full px-3 mt-4">
        <img
          :src="imagePreview"
          alt="Dog picture preview"
          class="max-w-full h-auto max-h-[200px] object-contain"
        />
      </div>

      <div class="mb-4">
        <label
          for="reporter-city"
          class="block md:text-xl text-base font-bold mb-2"
        >
          {{ $t('report.form.reporterCity.label') }}
        </label>
        <input
          id="reporter-city"
          type="text"
          v-model="formData.reporterCity"
          required
          class="appearance-none w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-6">
        <label
          for="comments"
          class="block md:text-xl text-base font-bold mb-2"
        >
          {{ $t('report.form.comments.label') }}
        </label>
        <textarea
          id="comments"
          v-model="formData.comments"
          :maxlength="100"
          rows="4"
            class="appearance-none w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline resize-none"
        ></textarea>
        <div class="text-right text-sm text-gray-600 mt-1">
          {{ formData.comments.length }} / 100
        </div>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="relative inline-block border border-black border-4 text-[14px] font-bold py-2 px-4 w-36 text-black
              overflow-hidden transition-colors duration-300 ease-in-out
              before:absolute before:inset-0 before:bg-[#213D12] before:scale-x-0 before:origin-left
              hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
              z-10 hover:text-white"
      >
        <span class="relative z-10">{{ isSubmitting
          ? $t('report.form.submit.loading')
          : $t('report.form.submit.default') }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Loader from '~/components/Loader.vue'

interface ReportForm {
  name: string
  phone: string
  email: string
  dogCity: string
  reporterCity: string
  comments: string
}

const dogCities = [
  'Báránd',
  'Bihardancsháza',
  'Biharnagybajom',
  'Hosszúhát',
  'Komádi',
  'Körösszakál',
  'Körösszegapáti',
  'Magyarhomorog',
  'Mezőpeterd',
  'Mezősas',
  'Nádudvar',
  'Nagyrábé',
  'Püspökladány',
  'Sáp',
  'Sárrétudvari',
  'Szerep',
  'Tetétlen',
  'Zsáka'
]

const formData = reactive<ReportForm>({
  name: '',
  phone: '',
  email: '',
  dogCity: '',
  reporterCity: '',
  comments: ''
})

const dogPicture = ref<File | null>(null)
const fileName = ref('')
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)
const errorMessage = ref('')
const imagePreview = ref('')

const config = useRuntimeConfig()
const apiBase = config.public.apiBase || 'http://localhost:5000'

function handleFileUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  const file = files[0]
  if (file.size > 32 * 1024 * 1024) {
    alert('File is too large. Maximum 32 MB.')
    return
  }
  dogPicture.value = file
  fileName.value = file.name

  imagePreview.value = URL.createObjectURL(file)
}

onUnmounted(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
})

async function submitReport() {
  try {
    isSubmitting.value = true
    const data = new FormData()
    data.append('name', formData.name)
    data.append('phone', formData.phone)
    data.append('email', formData.email ?? '')
    data.append('dogCity', formData.dogCity)
    data.append('reporterCity', formData.reporterCity)
    data.append('comments', formData.comments ?? '')
    if (dogPicture.value) {
      data.append('dogPicture', dogPicture.value, dogPicture.value.name)
    }

    const res = await fetch(`${apiBase}/api/reports`, {
      method: 'POST',
      body: data
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.message || 'Failed to submit report')
    }
    submitSuccess.value = true
    Object.assign(formData, {
      name: '',
      phone: '',
      email: '',
      dogCity: '',
      reporterCity: '',
      comments: ''
    })
    dogPicture.value = null
    fileName.value = ''
  } catch (err: any) {
    submitError.value = true
    errorMessage.value = err.message || 'Unknown error'
    console.error('Error submitting report:', err)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          titleObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  const messageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          messageObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  const formObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          formObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )
  document.querySelectorAll('.title-animate').forEach((title) => {
    titleObserver.observe(title)
  })


  document.querySelectorAll('.message-animate').forEach((message) => {
    messageObserver.observe(message)
  })


  document.querySelectorAll('.form-animate').forEach((form) => {
    formObserver.observe(form)
  })
})
</script>

<style scoped>
.title-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.message-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.form-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.animate-slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>
