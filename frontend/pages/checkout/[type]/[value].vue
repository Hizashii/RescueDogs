<template>
  <div class="max-w-5xl mx-auto py-16 bg-white">
    <h1 class="text-3xl font-bold mb-12 text-center">
      {{ supportType === 'donation'
          ? 'Thank you for your donation'
          : 'Thank you for your purchase' }}
    </h1>

    <!-- 1) Support type + amount/item selector -->
    <div class="bg-yellow-200 p-6 rounded-lg mb-12 flex flex-col md:flex-row items-center gap-4">
      <div>
        <label class="font-semibold mr-2">I want to:</label>
        <select v-model="supportType" class="p-2 bg-white border border-black rounded">
          <option value="donation">Donate</option>
          <option value="item">Buy an item</option>
        </select>
      </div>

      <!-- Donation options -->
      <div v-if="supportType === 'donation'">
        <label class="font-semibold mr-2">Amount:</label>
        <select v-model="supportValue" class="p-2 bg-white border border-black rounded">
          <option
            v-for="amt in donationOptions"
            :key="amt"
            :value="amt"
          >
            {{ amt.toLocaleString() }} Ft
          </option>
          <option value="custom">Custom…</option>
        </select>
        <input
          v-if="supportValue === 'custom'"
          v-model.number="customAmount"
          type="number"
          placeholder="Enter Ft"
          class="p-2 ml-2 w-24 bg-white border border-black rounded"
        />
      </div>

      <!-- Item options -->
      <div v-else>
        <label class="font-semibold mr-2">Item:</label>
        <select v-model="supportValue" class="p-2 bg-white border border-black rounded">
          <option
            v-for="item in itemOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }} — {{ item.priceFt.toLocaleString() }} Ft
          </option>
        </select>
      </div>
    </div>

    <!-- 2) Full checkout form + summary -->
    <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row gap-8">
      <!-- Left column -->
      <div class="flex-1 space-y-8">
        <!-- Contact info -->
        <div>
          <h2 class="font-semibold mb-2">Contact info</h2>
          <input
            v-model="contact.email"
            type="email"
            placeholder="Email *"
            required
            class="w-full p-2 bg-yellow-50 border border-black"
          />
          <input
            v-model="contact.phone"
            type="tel"
            placeholder="Phone number"
            class="w-full p-2 mt-2 bg-yellow-50 border border-black"
          />
        </div>

        <!-- Shipping (items only) -->
        <div v-if="supportType === 'item'">
          <h2 class="font-semibold mb-2">Shipping</h2>
          <input
            v-model="shipping.fullName"
            placeholder="Full Name *"
            required
            class="w-full p-2 bg-yellow-50 border border-black"
          />
          <div class="flex gap-4 mt-2">
            <input
              v-model="shipping.city"
              placeholder="City *"
              required
              class="flex-1 p-2 bg-yellow-50 border border-black"
            />
            <input
              v-model="shipping.postal"
              placeholder="Postal code *"
              required
              class="w-32 p-2 bg-yellow-50 border border-black"
            />
          </div>
          <input
            v-model="shipping.address"
            placeholder="Address *"
            required
            class="w-full p-2 mt-2 bg-yellow-50 border border-black"
          />
        </div>

        <!-- Payment -->
        <div>
          <h2 class="font-semibold mb-2">Payment</h2>
          <input
            v-model="payment.cardholder"
            placeholder="Cardholder Name *"
            required
            class="w-full p-2 bg-yellow-50 border border-black"
          />
          <div class="grid grid-cols-3 gap-4 mt-2">
            <input
              v-model="payment.cardNumber"
              placeholder="Card number *"
              required
              class="col-span-2 p-2 bg-yellow-50 border border-black"
            />
            <input
              v-model="payment.cvc"
              placeholder="CVC *"
              required
              class="p-2 bg-yellow-50 border border-black"
            />
          </div>
          <input
            v-model="payment.expiry"
            placeholder="Expiration date *"
            required
            class="w-full p-2 mt-2 bg-yellow-50 border border-black"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-4 bg-yellow-500 text-black font-bold py-2 px-6"
        >
          {{ loading
            ? 'Processing…'
            : (supportType === 'donation' ? 'Donate' : 'Place order')
          }}
        </button>
        <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
      </div>

      <!-- Right column: summary -->
      <div class="flex-1 border-l-2 border-dashed border-yellow-300 pl-8">
        <div v-if="supportType === 'item'" class="space-y-4">
          <img
            :src="selectedItem.imageUrl"
            alt=""
            class="w-full h-48 object-cover"
          />
          <h3 class="font-semibold">{{ selectedItem.name }}</h3>
          <p class="text-sm text-gray-600">* shipping fee included</p>
          <p class="text-2xl font-bold">
            {{ selectedItem.priceFt.toLocaleString() }} Ft
          </p>
        </div>
        <div v-else class="space-y-4">
          <p class="text-2xl font-bold">
            {{ checkoutValue.toLocaleString() }} Ft
          </p>
          <label class="block">
            <span class="font-semibold">Other amount</span>
            <input
              v-model.number="customAmount"
              type="number"
              placeholder="Enter amount"
              class="w-full p-2 mt-1 bg-yellow-50 border border-black"
            />
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

/** 1) Picker state **/
const supportType = ref<'donation'|'item'>('donation')
const supportValue = ref<number|string>(2000)
const customAmount = ref<number|null>(null)

/** 2) Options **/
const donationOptions = [2000, 3000, 5000, 10000, 20000]
const itemOptions = [
  { id: 'bandana', name: 'Mancsmento bandana', priceFt: 2500, imageUrl: '/img/bandana.png' },
  { id: 'collar',  name: 'Stylish Collar',      priceFt: 3500, imageUrl: '/img/collar.png' },
  { id: 'toy',     name: 'Squeaky Toy',         priceFt: 1500, imageUrl: '/img/toy.png' },
]
import { useRoute } from 'vue-router'

const route = useRoute()
const { type, value } = route.params as { type: 'donation' | 'item'; value: string }

/** 3) Derive actual amount & selected item **/
const checkoutValue = computed<number>(() => {
  if (supportType.value === 'donation') {
    if (supportValue.value === 'custom' && customAmount.value) {
      return customAmount.value
    }
    return typeof supportValue.value === 'number'
      ? supportValue.value
      : Number(supportValue.value)
  } else {
    return Number(supportValue.value)
  }
})

const selectedItem = computed(() => {
  return (
    itemOptions.find((i) => i.id === supportValue.value) ||
    itemOptions[0]
  )
})

/** 4) Form state **/
const contact = reactive({ email: '', phone: '' })
const shipping = reactive({ fullName: '', city: '', postal: '', address: '' })
const payment  = reactive({ cardholder: '', cardNumber: '', cvc: '', expiry: '' })
const loading  = ref(false)
const error    = ref('')

/** 5) Submit handler **/
async function handleSubmit() {
  loading.value = true
  error.value = ''

  try {
    const body: any = {
      email: contact.email,
      phone: contact.phone,
    }
    let endpoint = ''

    if (supportType.value === 'item') {
      endpoint = '/api/payments/create-item-session'
      body.itemId = supportValue.value
      body.shipping = { ...shipping }
    } else {
      endpoint = '/api/payments/create-donation-session'
      body.amountFt = checkoutValue.value
    }

    const { sessionUrl } = await $fetch<{ sessionUrl: string }>(endpoint, {
      method: 'POST',
      body,
    })

    window.location.href = sessionUrl
  } catch (e: any) {
    error.value = e.message || 'Failed to initiate payment.'
    loading.value = false
  }
}
</script>

<style scoped>
</style>
