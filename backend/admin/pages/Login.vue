<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

const ADMIN_EMAIL = 'mancsmentoadomany@gmail.com'
const ADMIN_PASS  = 'Kuty4M4ncsM3ntok'

const router = useRouter()
const email    = ref('')
const password = ref('')
const loading  = ref(false)
const error    = ref('')

async function onSubmit() {
  loading.value = true
  error.value   = ''

  if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASS) {
    const c = useCookie('isAdmin', { sameSite: 'lax' })
    c.value = '1'
    await router.push('/')
  } else {
    error.value = 'Invalid email or password'
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 rounded shadow">
      <h1 class="text-2xl font-bold mb-6 text-center text-green-700">
        Admin Login
      </h1>
      <form @submit.prevent="onSubmit">
        <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
        <label class="block mb-1 text-green-700">Email</label>
        <input v-model="email" type="email" required class="w-full border rounded px-3 py-2 mb-4" />
        <label class="block mb-1 text-green-700">Password</label>
        <input v-model="password" type="password" required class="w-full border rounded px-3 py-2 mb-6" />
        <button :disabled="loading"
                class="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600">
          {{ loading ? 'Logging in…' : 'Log In' }}
        </button>
      </form>
    </div>
  </div>
</template>
