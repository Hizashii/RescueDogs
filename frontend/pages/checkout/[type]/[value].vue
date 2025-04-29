<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <p v-if="loading" class="text-lg">Redirecting to payment...</p>
      <p v-else class="text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route   = useRoute()
const loading = ref(true)
const error   = ref('')

onMounted(async () => {
  try {
    const { type, value } = route.params as { type: string; value: string }

    let endpoint: string
    const body: Record<string, any> = {}

    if (type === 'donation') {
      endpoint = '/api/payments/create-donation-session'
      body.amountFt = Number(value)
    }
    else if (type === 'item') {
      endpoint = '/api/payments/create-item-session'
      body.itemId = value
    }
    else {
      throw new Error('Invalid checkout type')
    }

    const { sessionUrl } = await $fetch<{ sessionUrl: string }>(
      endpoint,
      { method: 'POST', body }
    )

    window.location.href = sessionUrl
  }
  catch (err: any) {
    error.value = err?.message || 'Failed to initiate payment.'
    loading.value = false
  }
})
</script>

<style scoped>
</style>
