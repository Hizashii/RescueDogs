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

  // THE ANIMATION OBSERVERS============================================================================================================
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          sectionObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -15% 0px'
    }
  )

  const contentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          contentObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  const tierObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slide-up')
          }, index * 150)
          tierObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slide-up')
          }, index * 100)
          itemObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )
  // ==============================================================================================================
  document.querySelectorAll('.section-animate').forEach((section) => {
    sectionObserver.observe(section)
  })

  
  document.querySelectorAll('.content-animate').forEach((content) => {
    contentObserver.observe(content)
  })

 
  document.querySelectorAll('.tier-animate').forEach((tier) => {
    tierObserver.observe(tier)
  })


  document.querySelectorAll('.item-animate').forEach((item) => {
    itemObserver.observe(item)
  })
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
  <section class="bg-[#FFFADF] py-12 px-4 section-animate">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start">
        {{ t('support.intro.line1') }}<br class="hidden md:block"/>
        {{ t('support.intro.line2') }}
      </h2>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 space-y-4 pr-0 md:pr-8 
                   md:border-r-2 md:border-dashed md:border-[#3D4836] content-animate">
          <p class="font-semibold">{{ t('support.body.p1') }}</p>
          <p class="font-light">{{ t('support.body.p2') }}</p>
          <p class="font-light">{{ t('support.body.p3') }}</p>
          <p class="font-medium">{{ t('support.body.p4') }}</p>
        </div>
        <div class="w-full md:w-1/2 space-y-4">
          <div
            v-for="(tier, i) in tiers"
            :key="i"
            class="bg-[#FFE65E] p-6 flex items-center justify-between tier-animate"
          >
            <div>
              <h3 class="text-2xl font-bold">{{ tier.amount }}</h3>
              <p class="text-sm">{{ tier.description }}</p>
            </div>
            <button
              class="relative inline-block bg-white text-black font-semibold py-2 px-4
                    overflow-hidden transition-colors duration-300 ease-in-out
                    before:absolute before:inset-0 before:bg-[#213D12] before:scale-x-0 before:origin-left
                    hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                    hover:text-[#ffffff] z-10"
              @click="goToDonation(parseFt(tier.amount))"
            >
              <span class="relative z-10">{{ t('support') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Charity Items -->
  <section class="bg-[#FFFADF] py-12 section-animate">
    <div class="container mx-auto px-4">
      <h2
        class="text-xl md:text-4xl font-semibold text-[#3D4836] mb-8 text-center md:text-start"
      >
        {{ t('support.charity.title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in activeItems"
          :key="item._id"
          class="bg-[#FFE65E] p-4 flex flex-col items-center item-animate"
        >
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="h-40 w-full object-cover mb-2"
            loading="lazy"
          />
          <h3 class="font-semibold text-[#3D4836]">{{ item.name }}</h3>
          <p class="font-semibold text-[#3D4836]">
            {{ item.price.toLocaleString() }} Ft
          </p>
          <p class="font-light text-center mb-4">{{ item.description }}</p>
          <button
            class="relative inline-block bg-white text-black w-[115px] h-[30px] text-[13px]
                  overflow-hidden transition-colors duration-300 ease-in-out
                  before:absolute before:inset-0 before:bg-[#213D12] before:scale-x-0 before:origin-left
                  hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                  hover:text-[#ffffff] z-10"
            @click="goToItem(item._id)"
          >
            <span class="relative z-10">{{ t('support.charity.button') }}</span>
          </button>
        </div>
      </div>

      <div v-if="activeItems.length === 0" class="text-center py-8 text-gray-500">
        {{ t('support.charity.empty') }}
      </div>
    </div>
  </section>

  <div class="flex flex-col md:flex-row items-center justify-start md:h-[500px] h-auto pb-8 md:pb-0 section-animate">
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
        <a href="mailto:info.mancsmento@gmail.com" class="hover:underline">info.mancsmento@gmail.com</a>
        </p>
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Bank donation:</span><br />
        Mancsmentő Állatvédő Egyesület<br />
        Számlaszám: 50436604-10003671<br />
        IBAN: HU42504366041000367100000000<br />
        SWIFT: MKKBHUHB
      </p>
      <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]">
        <span class="font-semibold">Check out our other fundraisers:</span><br />
        <a href="https://adjukossze.hu/adomanygyujtes/mentett-allatainkert-tervezheto-allatorvosi-koltsegek-2752" class="">Adjukossze</a> <br>
        <a href="https://whydonate.com/hu/fundraising/kutyaul-vagyunk-segits-a-mancsmentoknek-kifizetni-az-allatorvost-dog-rescue" class="">Whydonate</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.section-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.content-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.tier-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.item-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.animate-slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>
