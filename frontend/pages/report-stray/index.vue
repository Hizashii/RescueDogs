<template>
  <div class="min-h-screen flex flex-col items-center bg-[#FFE86B]">
    <h1 class="text-3xl font-bold mb-8 text-black mt-32">
      {{ $t('report.title') }}
    </h1>

    <!-- Success message -->
    <div
      v-if="submitSuccess"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
    >
      <p class="font-bold">{{ $t('report.success.heading') }}</p>
      <p>{{ $t('report.success.body') }}</p>
    </div>

    <!-- Error message -->
    <div
      v-if="submitError"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      <p class="font-bold">{{ $t('report.error.heading') }}</p>
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Loading indicator -->
    <div
      v-if="isSubmitting"
      class="w-full max-w-[400px] md:max-w-[700px] mb-8 flex justify-center"
    >
      <Loader />
    </div>

    <form
      v-if="!submitSuccess && !isSubmitting"
      class="w-full max-w-[400px] md:max-w-[700px] mb-32"
      @submit.prevent="submitReport"
    >
      <!-- Name -->
      <div class="mb-4">
        <label for="name" class="block md:text-xl text-base font-bold mb-2">
          {{ $t('report.form.name.label') }}
        </label>
        <input
          id="name"
          type="text"
          v-model="formData.name"
          required
          class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <!-- Phone & Email -->
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
            class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
            class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <!-- Dog city & Picture -->
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label for="dog-city" class="block md:text-xl text-base font-bold mb-2">
            {{ $t('report.form.dogCity.label') }}
          </label>
          <input
            id="dog-city"
            type="text"
            v-model="formData.dogCity"
            required
            class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label for="dog-picture" class="block md:text-xl text-base font-bold mb-2">
            {{ $t('report.form.dogPicture.label') }}
          </label>
          <div class="flex items-center space-x-4">
            <label
              class="cursor-pointer border border-black text-[14px] font-bold py-2 px-4 w-36 text-center text-black"
            >
              {{ $t('report.form.dogPicture.upload') }}
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

      <!-- Reporter city -->
      <div class="mb-4">
        <label for="reporter-city" class="block md:text-xl text-base font-bold mb-2">
          {{ $t('report.form.reporterCity.label') }}
        </label>
        <input
          id="reporter-city"
          type="text"
          v-model="formData.reporterCity"
          required
          class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <!-- Comments -->
      <div class="mb-6">
        <label for="comments" class="block md:text-xl text-base font-bold mb-2">
          {{ $t('report.form.comments.label') }}
        </label>
        <textarea
          id="comments"
          v-model="formData.comments"
          class="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="border border-black border-4 text-[14px] font-bold py-2 px-4 w-36 text-black"
      >
        {{ isSubmitting ? $t('report.form.submit.loading') : $t('report.form.submit.default') }}
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

const formData = reactive<ReportForm>({
  name: '',
  phone: '',
  email: '',
  dogCity: '',
  reporterCity: '',
  comments: ''
})

const dogPicture = ref<File | null>(null)
const fileName   = ref('')
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError   = ref(false)
const errorMessage  = ref('')

const config  = useRuntimeConfig()
const apiBase = config.public.apiBase || 'http://localhost:5000'

function handleFileUpload (e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  const file = files[0]
  if (file.size > 32 * 1024 * 1024) {
    alert('File is too large. Maximum 32 MB.')
    return
  }
  dogPicture.value = file
  fileName.value   = file.name
}

async function submitReport () {
  isSubmitting.value = true
  submitError.value  = false

  /* build FormData */
  const data = new FormData()
  data.append('name', formData.name)
  data.append('phone', formData.phone)
  data.append('email', formData.email ?? '')
  data.append('dogCity', formData.dogCity)
  data.append('reporterCity', formData.reporterCity)
  data.append('comments', formData.comments ?? '')
  if (dogPicture.value) data.append('dogPicture', dogPicture.value)

  try {
    const res = await fetch(`${apiBase}/api/reports`, {
      method: 'POST',
      body: data
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.message || 'Failed to submit report')
    }
    submitSuccess.value = true
    /* reset */
    Object.assign(formData, {
      name: '',
      phone: '',
      email: '',
      dogCity: '',
      reporterCity: '',
      comments: ''
    })
    dogPicture.value = null
    fileName.value   = ''
  } catch (err: any) {
    submitError.value = true
    errorMessage.value = err.message || 'Unknown error'
    console.error('Error submitting report:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>