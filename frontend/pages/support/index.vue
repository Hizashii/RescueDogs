<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ImageTitle from '~/components/ImageTitle.vue'

const { t } = useI18n()
const router = useRouter()

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
  <ImageTitle
    :title="t('support.pageTitle')"
    image="/img/dog-placeholder.png"
    :overlayOpacity="0.5"
  />

 <!-- Donation Tiers -->
<section class="bg-[#FFFADF] py-12 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Title -->
    <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
      {{ t('support.intro.line1') }}<br class="hidden md:block"/>
      {{ t('support.intro.line2') }}
    </h2>

    <!-- Two-column layout: left text, right tiers -->
    <div class="flex flex-col md:flex-row gap-8">
      
      <!-- Left explanatory text with dashed right border on md+ -->
      <div
        class="w-full md:w-1/2 space-y-4 pr-0 md:pr-8 
               md:border-r-2 md:border-dashed md:border-[#3D4836]"
      >
        <p class="font-semibold">{{ t('support.body.p1') }}</p>
        <p class="font-light">{{ t('support.body.p2') }}</p>
        <p class="font-light">{{ t('support.body.p3') }}</p>
        <p class="font-medium">{{ t('support.body.p4') }}</p>
      </div>

      <!-- Right: stacked tier cards -->
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
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
        {{ t('support.charity.title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in charityItems"
          :key="item.id"
          class="bg-[#FFE65E] p-4 rounded flex flex-col items-center"
        >
          <img :src="item.img" alt="" class="h-40 object-cover mb-2 rounded" />
          <h3 class="font-semibold text-[#3D4836]">{{ item.name }}</h3>
          <p class="font-semibold text-[#3D4836]">{{ item.price }} Ft</p>
          <p class="font-light text-center mb-4">{{ item.desc }}</p>
          <button
            class="bg-white text-black w-[115px] h-[30px] rounded text-[13px]"
            @click="goToItem(item.id)"
          >
            {{ t('support.charity.button') }}
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- Other Support Methods -->
  <div
    class="flex flex-col md:flex-row items-center justify-start md:h-[500px] bg-[#FFFADF] py-8"
  >
    <img
      src="/img/doggo.png"
      alt="Dog icon"
      class="w-auto md:h-[500px] h-[300px] object-contain"
    />
    <div class="mt-4 md:mt-0 md:ml-8 px-4">
      <h1 class="text-xl md:text-[32px] font-bold">
        {{ t('support.other.titleLine1') }}<br />
        {{ t('support.other.titleLine2') }}
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

<style scoped>
/* Tailwind utility classes handle styling */
</style>
