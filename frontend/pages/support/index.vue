<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ImageTitle from '~/components/ImageTitle.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// Initialize i18n
const { t } = useI18n()

interface CharityItem {
  _id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

const router = useRouter()

// Live list from backend
const items = ref<CharityItem[]>([])

onMounted(async () => {
  const data = await $fetch<CharityItem[]>('/api/charity-items')
  items.value = data
})
// Donation tiers
const tiers = ref([
  { amount: '2000 Ft', description: t('support.tiers.0.description') },
  { amount: '3000 Ft', description: t('support.tiers.1.description') },
  { amount: '5000 Ft', description: t('support.tiers.2.description') },
  { amount: '10 000 Ft', description: t('support.tiers.3.description') },
  { amount: '20 000 Ft', description: t('support.tiers.4.description') },
  { amount: t('support.tiers.5.amount'), description: '' },
])

// Charity items
const charityItems = ref([
  { id: 'bandana',      img: '/img/charity-item.png', name: t('support.charity.items.1.name'), price: '2000', desc: t('support.charity.items.1.desc') },
  { id: 'collar',       img: '/img/charity-item.png', name: t('support.charity.items.2.name'), price: '3000', desc: t('support.charity.items.2.desc') },
  { id: 'vaccine',      img: '/img/charity-item.png', name: t('support.charity.items.3.name'), price: '5000', desc: t('support.charity.items.3.desc') },
  { id: 'two-vaccines', img: '/img/charity-item.png', name: t('support.charity.items.4.name'), price: '10000', desc: t('support.charity.items.4.desc') },
])

function parseFt(amount: string): number {
  return parseInt(amount.replace(/\D+/g, ''), 10) || 0
}

function goToDonation(amountFt: number) {
  router.push(`/checkout/donation/${amountFt}`)
}

function goToItem(itemId: string) {
  router.push(`/checkout/item/${itemId}`)
}
</script>

<template>
  <!-- Header -->
  <ImageTitle
    :title="t('support.pageTitle')"
    image="/img/dog-placeholder.png"
    :overlayOpacity="0.5"
  />

  <!-- Donation Tiers -->
  <section class="bg-[#FFFADF]">
    <div class="container mx-auto px-4 py-6 md:py-12">
      <h2 class="text-center md:text-start text-xl md:text-4xl font-semibold text-[#3D4836] mb-12">
        {{ t('support.intro.line1') }}<br class="hidden md:block" />
        {{ t('support.intro.line2') }}
      </h2>

      <div class="flex flex-col md:flex-row gap-12">
        <div class="flex-1 space-y-4">
          <p class="font-semibold text-sm md:text-[16px]">{{ t('support.body.p1') }}</p>
          <p class="font-light    text-sm md:text-[16px]">{{ t('support.body.p2') }}</p>
          <p class="font-light    text-sm md:text-[16px]">{{ t('support.body.p3') }}</p>
          <p class="font-medium   text-sm md:text-[16px]">{{ t('support.body.p4') }}</p>
        </div>

        <div class="flex-1 flex flex-col gap-4">
          <Ticket
            v-for="(tier, i) in tiers"
            :key="i"
            :Amount="tier.amount"
            :Description="tier.description"
          >
            <template #actions>
              <button
                class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]"
              >
                {{ tier.amount }}
              </button>
            </template>
          </Ticket>
        </div>
      </div>
    </div>
  </section>
  <!-- Charity Items -->
  <section class="bg-[#FFFADF] py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
        {{ t('support.charity.title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in charityItems"
          :key="item.price"
          class="bg-[#FFE65E] p-4 rounded flex flex-col items-center"
        >
          <img :src="item.price" :alt="item.name" class="h-40 object-cover mb-2 rounded" />
          <h3 class="font-semibold text-sm md:text-[17px] text-[#3D4836]">{{ item.name }}</h3>
          <p class="font-semibold text-sm md:text-[17px] text-[#3D4836]">{{ item.price }} Ft</p>
          <p class="font-light text-xs md:text-[12px] text-center mb-4">{{ item.price }}</p>
          <button
            class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px] rounded"
          >
            {{ t('support.charity.button') }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Other Support Information (hard-coded PayPal & Bank) -->
  <div class="flex flex-col md:flex-row items-center justify-start md:h-[500px] h-auto pb-8 md:pb-0">
    <img src="/img/doggo.png" alt="Dog icon" class="w-auto md:h-[500px] h-[300px] object-contain">
    <div class="hidden md:block ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="500" fill="none">
        <path stroke="gold" stroke-dasharray="10 10" stroke-width="5" d="M3 0v500"/>
      </svg>
    </div>
    <div class="flex flex-col items-center md:items-start justify-center md:ml-8 px-4 md:px-0">
      <h1 class="text-xl md:text-[32px] font-bold py-4 text-center md:text-left">
        {{ $t('support.other.titleLine1') }}<br>
        {{ $t('support.other.titleLine2') }}
      </h1>

      <p class="text-sm md:text-[20px] text-[#3D6625] py-4">
        <span class="font-semibold">Paypal:</span><br />
        info.mancsmento@gmail.com
      </p>
      <p class="text-sm md:text-[20px] text-[#3D6625]">
        <span class="font-semibold">Bank donation:</span><br />
        Mancsmentő Állatvédő Egyesület<br />
        Számlaszám: 50436604-10003671<br />
        IBAN: HU42504366041000367100000000<br />
        SWIFT: MKKBHUHB
      </p>
    </div>
  </div>
</template>
