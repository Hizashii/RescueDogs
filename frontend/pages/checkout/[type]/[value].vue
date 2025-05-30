<template>
  <ImageTitle
    :title="t('checkout.thankYou')"
    image="/img/dog-placeholder.png"
    :overlayOpacity="0.5"
  />
  <div class="flex justify-center items-center bg-[#FFD700]">
    <div class="max-w-5xl mx-auto py-8 md:py-16 bg-white px-4 md:px-10 w-full">
      
      <div class="md:block hidden h-1 bg-[#FFD700] my-4"></div>
      <h1 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center md:text-start text-[#3D4836]">
        {{ supportType === 'donation'
            ? t('checkout.thxDonation')
            : t('checkout.thxPurchase') }}
      </h1>

      <!-- 1) Support type + amount/item selector -->
      <div class="bg-yellow-200 p-4 md:p-6 mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-4">
        <div>
          <label class="font-semibold mr-2 text-sm">{{ t('checkout.iWant') }}</label>
          <select v-model="supportType" class="p-1 md:p-2 bg-white border border-black text-sm">
            <option value="donation">{{ t('checkout.donate') }}</option>
            <option value="item">{{ t('checkout.buyItem') }}</option>
          </select>
        </div>

        <!-- Donation options -->
        <div v-if="supportType === 'donation'" class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div class="w-full md:w-auto">
            <label class="font-semibold mr-2 text-sm">{{ t('checkout.amount') }}</label>
            <select v-model="selectedDonationAmount" class="p-1 md:p-2 bg-white border border-black text-sm w-full">
              <option
                v-for="amt in donationOptions"
                :key="amt"
                :value="amt"
              >
                {{ amt.toLocaleString() }} Ft
              </option>
              <option value="custom">{{ t('checkout.custom') }}</option>
            </select>
          </div>
          <div v-if="selectedDonationAmount === 'custom'" class="w-full md:w-auto">
            <input
              v-model.number="customAmount"
              type="number"
              min="100"
              :placeholder="$t('checkout.enterFt')"
              class="p-1 md:p-2 w-full bg-white border border-black text-sm"
            />
          </div>
        </div>

        <!-- Item options -->
        <div v-else-if="supportType === 'item'" class="w-full md:w-auto">
          <label class="font-semibold mr-2 text-sm">{{ t('checkout.item') }}</label>
          <select 
            v-model="selectedItemId" 
            class="p-1 md:p-2 bg-white border border-black text-sm w-full" 
            :disabled="loadingItems || charityItems.length === 0"
          >
            <option value="" disabled>
              {{ loadingItems ? 'Loading items...' : 'Select an item' }}
            </option>
            <option v-if="!loadingItems && charityItems.length === 0" value="" disabled>
              No items available
            </option>
            <option
              v-for="item in charityItems"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }} — {{ item.price?.toLocaleString() }} Ft
            </option>
          </select>
        </div>
      </div>

      <!-- 2) Full checkout form + summary -->
      <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row gap-8 md:gap-8">
        <!-- Left column -->
        <div class="flex-1 space-y-6 md:space-y-8">
          <!-- Contact info -->
          <div class="space-y-3">
            <h2 class="font-semibold mb-2 text-base">{{ t('checkout.contactInfo') }}</h2>
            <input
              v-model="contact.email"
              type="email"
              placeholder="Email *"
              required
              class="w-full p-2 bg-yellow-50 border border-black text-sm"
            />
            <input
              v-model="contact.phone"
              type="tel"
              :placeholder="$t('checkout.phoneNumber')"
              class="w-full p-2 bg-yellow-50 border border-black text-sm"
            />
          </div>

          <!-- Shipping (items only) -->
          <div v-if="supportType === 'item'" class="space-y-3">
            <h2 class="font-semibold mb-2 text-base">{{ t('checkout.shipping') }}</h2>
            <input
              v-model="shipping.fullName"
              :placeholder="$t('checkout.fullName')"
              required
              class="w-full p-2 bg-yellow-50 border border-black text-sm"
            />

            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                v-model="shipping.city"
                :placeholder="$t('checkout.city')"
                required
                class="flex-1 p-2 bg-yellow-50 border border-black text-sm"
              />
              <input
                v-model="shipping.postal"
                :placeholder="$t('checkout.postal')"
                required
                class="w-full sm:w-32 p-2 bg-yellow-50 border border-black text-sm"
              />
            </div>
            <input
              v-model="shipping.address"
              :placeholder="$t('checkout.adress')"
              required
              class="w-full p-2 bg-yellow-50 border border-black text-sm"
            />
          </div>

          <!-- Payment -->
          <div class="space-y-3">
            <h2 class="font-semibold mb-2 text-base">{{ t('checkout.payment') }}</h2>
            <p class="text-sm text-gray-600">{{ $t('checkout.stripeNote') }}</p>
          </div>

          <button
            type="submit"
            :disabled="!canSubmit || loading"
            class="mt-4 bg-[#FFE65E] text-[#3D4836] font-bold py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm w-full"
          >
            {{ loading
              ? t('checkout.processing')
              : (supportType === 'donation' ? t('checkout.donatebtn') : t('checkout.placeOrderBtn'))
            }}
          </button>
          <p v-if="error" class="text-red-600 mt-2 text-sm">{{ error }}</p>
        </div>

        <!-- Right column: summary -->
        <div class="flex-1 md:border-l-2 border-dashed border-yellow-300 md:pl-8 pt-8 md:pt-0 border-t-2 md:border-t-0">
          <div v-if="supportType === 'item' && selectedItem" class="space-y-4">
            <img
              :src="selectedItem.imageUrl"
              :alt="selectedItem.name || 'Charity item image'"
              class="w-full h-40 object-cover"
            />
            <h3 class="font-semibold text-base">{{ selectedItem.name }}</h3>
            <p class="text-sm text-gray-600">{{ selectedItem.description }}</p>
            <p class="text-sm text-gray-600">{{ t('checkout.shipFee') }}</p>
            <p class="text-xl font-bold">
              {{ selectedItem.price?.toLocaleString() }} Ft
            </p>
          </div>
          <div v-else-if="supportType === 'donation'" class="space-y-4">
            <div class="text-center p-4 ">
              <h3 class="font-semibold mb-2 text-base">{{ t('checkout.donationSummary') }}</h3>
              <p class="text-xl font-bold text-black-500">
                {{ finalDonationAmount.toLocaleString() }} Ft
              </p>
            </div>
          </div>
          <div v-else-if="loadingItems">
            <p class="text-sm">Loading item details…</p>
          </div>
          <div v-else>
            <p class="text-sm">Select an item to see details.</p>
          </div>
        </div>
      </form>
      <div class="md:block hidden h-1 bg-[#FFD700] my-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useDogApi from '@/composables/useDogApi'

interface CharityItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  category: string;
  stock: number;
}

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { fetchCharityItems, processItemPurchase, processDonation } = useDogApi()

const supportType = ref<'donation'|'item'>('donation')
const selectedDonationAmount = ref<number | 'custom'>(2000)
const customAmount = ref<number | null>(null)
const selectedItemId = ref<string>('')

const charityItems = ref<CharityItem[]>([])
const loadingItems = ref(true)
const loading = ref(false)
const error = ref('')

const donationOptions = [1000, 2000, 3000, 5000, 10000, 20000]

const contact = reactive({ 
  email: '', 
  phone: '' 
})

const shipping = reactive({ 
  fullName: '', 
  city: '', 
  postal: '', 
  address: '' 
})

const selectedItem = computed((): CharityItem | null => {
  if (!selectedItemId.value) return null
  return charityItems.value.find(item => item._id === selectedItemId.value) || null
})

const finalDonationAmount = computed((): number => {
  if (supportType.value !== 'donation') return 0
  
  if (selectedDonationAmount.value === 'custom') {
    return customAmount.value || 0
  }
  
  return typeof selectedDonationAmount.value === 'number' 
    ? selectedDonationAmount.value 
    : 0
})

const canSubmit = computed((): boolean => {
  if (!contact.email) return false
  
  if (supportType.value === 'donation') {
    return finalDonationAmount.value > 0
  } else {
    return !!(
      selectedItemId.value && 
      selectedItem.value &&
      shipping.fullName &&
      shipping.city &&
      shipping.postal &&
      shipping.address
    )
  }
})

const initializeFromRoute = () => {
  const routeType = route.params.type as string
  const routeValue = route.params.value as string
  
  if (routeType === 'donation' || routeType === 'item') {
    supportType.value = routeType
  }
  
  if (routeValue) {
    if (supportType.value === 'donation') {
      const amount = parseInt(routeValue)
      if (!isNaN(amount) && donationOptions.includes(amount)) {
        selectedDonationAmount.value = amount
      } else {
        selectedDonationAmount.value = 'custom'
        customAmount.value = amount
      }
    } else if (supportType.value === 'item') {
      selectedItemId.value = routeValue
    }
  }
}

watch(supportType, (newType) => {
  error.value = ''
  
  if (newType === 'donation') {
    selectedDonationAmount.value = 2000
    customAmount.value = null
    selectedItemId.value = ''
  } else {
    selectedDonationAmount.value = 2000
    customAmount.value = null
    if (charityItems.value.length > 0 && !selectedItemId.value) {
      selectedItemId.value = charityItems.value[0]._id
    }
  }
})

watch(selectedDonationAmount, (newValue) => {
  if (newValue !== 'custom') {
    customAmount.value = null
  }
})

const handleSubmit = async () => {
  if (!canSubmit.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    let result: { success: boolean, message: string, sessionUrl?: string }

    if (supportType.value === 'donation') {
      const amount = finalDonationAmount.value
      if (amount <= 0) {
        throw new Error('Donation amount must be greater than zero')
      }
      
      console.log('Processing donation:', amount)
      result = await processDonation(amount)
    } else {
      if (!selectedItemId.value || !selectedItem.value) {
        throw new Error('No item selected')
      }
      
      console.log('Processing item purchase:', selectedItemId.value)
      result = await processItemPurchase(selectedItemId.value)
    }

    if (result.success && result.sessionUrl) {
      console.log('Redirecting to:', result.sessionUrl)
      window.location.href = result.sessionUrl
    } else {
      throw new Error(result.message || 'Payment processing failed')
    }

  } catch (err) {
    console.error('Payment submission error:', err)
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
    loading.value = false
  }
}

onMounted(async () => {
  try {
    initializeFromRoute()
    
    loadingItems.value = true
    charityItems.value = await fetchCharityItems()
    
    if (supportType.value === 'item') {
      if (selectedItemId.value) {
        const itemExists = charityItems.value.some(item => item._id === selectedItemId.value)
        if (!itemExists) {
          console.warn('Item from route not found:', selectedItemId.value)
          selectedItemId.value = charityItems.value.length > 0 ? charityItems.value[0]._id : ''
        }
      } else if (charityItems.value.length > 0) {
        selectedItemId.value = charityItems.value[0]._id
      }
    }
    
  } catch (err) {
    console.error('Failed to fetch charity items:', err)
    error.value = 'Failed to load items. Please refresh the page.'
  } finally {
    loadingItems.value = false
  }
})
</script>

<style scoped>
</style>