<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { useAuth } from '~/composables/useAuth'

const ADMIN_EMAIL = 'mancsmentoadomany@gmail.com'
const ADMIN_PASS = 'Kuty4M4ncsM3ntok'

const router = useRouter()
const { login, isAuthenticated } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const isAdminCookie = useCookie('isAdmin', { sameSite: 'lax' })

async function onSubmit() {
  try {
    loading.value = true
    error.value = ''

    if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASS) {
      isAdminCookie.value = '1'
      localStorage.setItem('isAdmin', '1')
      await login(email.value, password.value)
      if (isAuthenticated.value) {
        await router.push({ name: 'Dashboard' })
      } else {
        error.value = 'Authentication failed'
      }
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (e) {
    console.error('Login error:', e)
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
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
        <input
          v-model="email"
          type="email"
          required
          class="w-full border rounded px-3 py-2 mb-4"
        />

        <label class="block mb-1 text-green-700">Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full border rounded px-3 py-2 mb-6"
        />
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {{ loading ? 'Logging in…' : 'Log In' }}
        </button>
      </form>
    </div>
  </div>
</template>
