<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ImageTitle from '~/components/ImageTitle.vue'
import useCharityApi from '~/composables/useCharityApi'
import type { CharityItem } from '~/types/CharityItem'

// i18n + router
const { t } = useI18n()
const router = useRouter()

// Donation tiers (unchanged)
const tiers = ref([
  { amount: '2000 Ft',  description: t('support.tiers.0.description') },
  { amount: '3000 Ft',  description: t('support.tiers.1.description') },
  { amount: '5000 Ft',  description: t('support.tiers.2.description') },
  { amount: '10 000 Ft',description: t('support.tiers.3.description') },
  { amount: '20 000 Ft',description: t('support.tiers.4.description') },
  { amount: t('support.tiers.5.amount'), description: '' },
])

// API
const { fetchAll } = useCharityApi()
const rawItems = ref<CharityItem[]>([])
const activeItems = computed(() =>
  rawItems.value.filter(i => i.isActive)
)
onMounted(async () => {
  try {
    rawItems.value = await fetchAll()
  } catch {
    rawItems.value = []
  }
})
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
  <ImageTitle
    :title="t('support.pageTitle')"
    image="/img/dog-placeholder.png"
    :overlayOpacity="0.5"
  />

  <!-- Donation Tiers -->
  <section class="bg-[#FFFADF] py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
        {{ t('support.intro.line1') }}<br class="hidden md:block"/>
        {{ t('support.intro.line2') }}
      </h2>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 space-y-4 pr-0 md:pr-8 
                   md:border-r-2 md:border-dashed md:border-[#3D4836]">
          <p class="font-semibold">{{ t('support.body.p1') }}</p>
          <p class="font-light">{{ t('support.body.p2') }}</p>
          <p class="font-light">{{ t('support.body.p3') }}</p>
          <p class="font-medium">{{ t('support.body.p4') }}</p>
        </div>
        <div class="w-full md:w-1/2 space-y-4">
          <div
            v-for="(tier, i) in tiers"
            :key="i"
            class="bg-[#FFE65E] rounded-lg p-6 flex items-center justify-between"
          >
            <div>
              <h3 class="text-2xl font-bold">{{ tier.amount }}</h3>
              <p class="text-sm">{{ tier.description }}</p>
            </div>
            <button
              class="bg-white text-black font-semibold py-2 px-4 rounded"
              @click="goToDonation(parseFt(tier.amount))"
            >
              {{ t('support') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Charity Items -->
<section class="bg-[#FFFADF] py-12">
  <div class="container mx-auto px-4">
    <h2
      class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start"
    >
      {{ t('support.charity.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div
        v-for="item in activeItems"
        :key="item._id"
        class="bg-[#FFE65E] p-4 rounded flex flex-col items-center"
      >
        <img
          :src="item.imageUrl"
          :alt="item.name"
          class="h-40 w-full object-cover mb-2 rounded"
          loading="lazy"
        />
        <h3 class="font-semibold text-[#3D4836]">{{ item.name }}</h3>
        <p class="font-semibold text-[#3D4836]">
          {{ item.price.toLocaleString() }} Ft
        </p>
        <p class="font-light text-center mb-4">{{ item.description }}</p>
        <button
          class="bg-white text-black w-[115px] h-[30px] rounded text-[13px] hover:bg-gray-100"
          @click="goToItem(item._id)"
        >
          {{ t('support.charity.button') }}
        </button>
      </div>
    </div>

    <div v-if="activeItems.length === 0" class="text-center py-8 text-gray-500">
      {{ t('support.charity.empty') }}
    </div>
  </div>
</section>


  <!-- Other Support Information (unchanged) -->
  <div class="flex flex-col md:flex-row items-center justify-start md:h-[500px] h-auto pb-8 md:pb-0">
    <img
      src="/img/doggo.png"
      alt="Dog icon"
      class="w-auto md:h-[500px] h-[300px] object-contain"
    />
    <div class="hidden md:block ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="500" fill="none">
        <path
          stroke="gold"
          stroke-dasharray="10 10"
          stroke-width="5"
          d="M3 0v500"
        />
      </svg>
    </div>
    <div class="flex flex-col items-center md:items-start justify-center md:ml-8 px-4 md:px-0">
      <h1 class="text-xl md:text-[32px] font-bold py-4 text-center md:text-left">
        {{ t('support.other.titleLine1') }}<br />
        {{ t('support.other.titleLine2') }}
      </h1>
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Paypal:</span><br />
        info.mancsmento@gmail.com
      </p>
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Bank donation:</span><br />
        Mancsmentő Állatvédő Egyesület<br />
        Számlaszám: 50436604-10003671<br />
        IBAN: HU42504366041000367100000000<br />
        SWIFT: MKKBHUHB
      </p>
    </div>
  </div>
</template>
