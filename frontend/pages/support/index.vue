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
  { amount: t('support.tiers.5.amount'), description: '' }
])

// Static charity items (later replace idx with real _id from backend)
const charityItems = ref([
  { img: '/img/charity-item.png', alt: t('support.charity.itemAlt', { number: 1 }), name: t('support.charity.items.1.name'), price: '2000', desc: t('support.charity.items.1.desc') },
  { img: '/img/charity-item.png', alt: t('support.charity.itemAlt', { number: 2 }), name: t('support.charity.items.2.name'), price: '3000', desc: t('support.charity.items.2.desc') },
  { img: '/img/charity-item.png', alt: t('support.charity.itemAlt', { number: 3 }), name: t('support.charity.items.3.name'), price: '5000', desc: t('support.charity.items.3.desc') },
  { img: '/img/charity-item.png', alt: t('support.charity.itemAlt', { number: 4 }), name: t('support.charity.items.4.name'), price: '10000', desc: t('support.charity.items.4.desc') }
])

function goToDonation(amount: string) {
  const ft = parseInt(amount.replace(/\D/g, ''), 10)
  router.push(`/checkout/donation/${ft}`)        
}

function goToItem(idx: number) {
  router.push(`/checkout/item/${idx + 1}`)        
}
</script>
<template>
  <ImageTitle
    :title="t('support.pageTitle')"
    image="/img/dog-placeholder.png"
    :overlayOpacity="0.5"
  />
  <!-- Donation Tiers -->
  <section class="bg-[#FFFADF] py-8">
    <div class="container mx-auto px-4">
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-6 text-center md:text-start">
        {{ t('support.intro.line1') }}<br class="hidden md:block" />
        {{ t('support.intro.line2') }}
      </h2>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1 space-y-4">
          <p class="font-semibold">{{ t('support.body.p1') }}</p>
          <p class="font-light">{{ t('support.body.p2') }}</p>
          <p class="font-light">{{ t('support.body.p3') }}</p>
          <p class="font-medium">{{ t('support.body.p4') }}</p>
        </div>

        <div class="flex-1 space-y-4">
          <Ticket
            v-for="(tier, i) in tiers"
            :key="i"
            :Amount="tier.amount"
            :Description="tier.description"
          >
            <template #actions>
              <button
                class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]"
                @click="goToDonation(tier.amount)"
              >
                {{ tier.amount }}
              </button>
            </template>
          </Ticket>
        </div>
      </div>
    </div>
  </section>

  <div class="h-auto md:h-[400px] w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-6 md:py-0">
    <div class="hidden md:block mt-[-400px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="105" fill="none">
      </svg>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-0">
      <img src="/img/black-dog.png" alt="Quote icon" class="w-20 md:w-64 h-auto">
      <div class="flex flex-col gap-2 md:gap-4">
        <h2 class="text-sm md:text-[20px] text-center md:text-start">
          {{ $t('support.tax.line1') }}
        </h2>
        <h2 class="text-sm md:text-[20px] text-center md:text-start">
          {{ $t('support.tax.line2') }}
          <span class="font-bold text-[#3D6625]">{{ $t('support.tax.number') }}</span>
        </h2>
      </div>
    </div>

    <div class="hidden md:block mt-[400px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="105" fill="none">
      </svg>
    </div>
  </div>

<!-- Charity Items -->
<section class="bg-[#FFFADF] py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
        {{ t('support.charity.title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(item, idx) in charityItems"
          :key="idx"
          class="bg-[#FFE65E] p-4 rounded flex flex-col items-center"
        >
          <img :src="item.img" :alt="item.alt" class="h-40 object-cover mb-2 rounded" />
          <h3 class="font-semibold text-[#3D4836]">{{ item.name }}</h3>
          <p class="font-semibold text-[#3D4836]">{{ item.price }} Ft</p>
          <p class="font-light text-center mb-4">{{ item.desc }}</p>
          <button
            class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px] rounded"
            @click="goToItem(idx)"
          >
            {{ t('support.charity.button') }}
          </button>
        </div>
      </div>
    </div>
  </section>
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
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Paypal:</span><br>
        info.mancsmento@gmail.com
      </p>
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Bank donation:</span><br>
        Mancsmentő Állatvédő Egyesület<br>
        Számlaszám: 50436604-10003671<br>
        IBAN: HU42504366041000367100000000<br>
        SWIFT: MKKBHUHB
      </p>
    </div>
  </div>
</template>