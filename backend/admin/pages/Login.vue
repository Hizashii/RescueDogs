<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { login, isAuthenticated, loading, error } = useAuth()
const email = ref('')
const password = ref('')

if (isAuthenticated.value) {
  navigateTo('/')
}

async function onSubmit() {
  const success = await login(email.value, password.value)
  if (success) {
    await navigateTo('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center text-green-700">
        Admin Login
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div v-if="error" class="p-3 bg-red-100 text-red-700">
          {{ error }}
        </div>

        <div>
          <label class="block mb-1 text-green-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label class="block mb-1 text-green-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-700 text-white py-2 hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          {{ loading ? 'Logging in…' : 'Log In' }}
        </button>
      </form>
    </div>
  </div>
</template>
