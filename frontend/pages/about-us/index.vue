<template>
 <section class="bg-[#FFE86B] py-12 px-4 md:py-20 md:px-0 section-animate">
    <div
      class=" mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div class="flex-shrink-0 md:w-1/2 align-start image-animate">
        <img
          src="/img/dogbg.png"
          alt="dog picture"
          class="w-auto h-[500px] max-h-96 object-cover drop-shadow-[20px_20px_0_rgba(255,255,255,1)]"
        />
      </div>

      <div
        class="flex-1 flex flex-col md:items-start md:text-left space-y-4 content-animate"
      >
        <h1 class="text-2xl sm:text-3xl md:text-[40px] font-bold text-center text-[#3D4836]">
          {{ $t('about.title') }}
        </h1>
        <p class="text-sm sm:text-base md:text-[16px] max-w-[600px] text-gray-800 pt-8">
          {{ $t('about.description') }}
        </p>
        <p class="text-lg">
          {{ $t('about.oldWebsite') }} <a :href="$t('about.oldWebsiteName')" class="font-bold text-lg hover:underline">{{ $t('about.oldWebsiteName') }}</a>
        </p>
        <div class="">
          <div class="flex flex-row items-center gap-4 sm:gap-8">
        <nuxt-link to="/support">
          <button class="relative text-white font-bold text-sm w-40 md:w-52 py-3 overflow-hidden 
            bg-[#3D6625] transition-colors duration-300 ease-in-out
            before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
            hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
            before:z-0 z-10">
            <span class="relative z-10">{{ $t('about.supportButton') }}</span>
          </button>
        </nuxt-link>
                  <a
            href="mailto:volunteer@example.com?subject=Volunteer%20Application&body=Hi,%0A%0AI would love to volunteer! Here's a little about me:%0A- Name:%0A- Age:%0A- Availability:%0A- Relevant experience or interests:%0A%0ALooking forward to hearing from you!%0A%0ABest regards,%0A[Your Name]"
            class="inline-block"
          >
            <button class="relative text-white font-bold text-sm w-40 md:w-52 py-3 overflow-hidden 
              bg-[#3D6625] transition-colors duration-300 ease-in-out
              before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
              hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
              before:z-0 z-10">
              <span class="relative z-10">{{ $t('about.volunteerButton') }}</span>
            </button>
          </a>

      </div>
        </div>
        
      </div>
    </div>
  </section>

  <section class="bg-white py-12 px-4 md:py-20 md:px-8 section-animate">
    <div class="max-w-6xl mx-auto flex flex-col items-center space-y-8">
      <div class="flex flex-col sm:flex-row items-center gap-6 quote-animate">
        <img
          src="/img/black-dog.png"
          alt="Quote icon"
          class="w-24 sm:w-32 md:w-40"
        />
        <h2 class="text-lg sm:text-xl md:text-2xl text-gray-800 text-center sm:text-left">
          {{ $t('about.quote.line1') }}
          <span class="text-[#3D6625] font-bold">
            {{ $t('about.quote.line2') }}
          </span>.
          <br />
          {{ $t('about.quote.line3') }}
        </h2>
      </div>
    </div>
  </section>
    <div class="w-full py-16 px-4 md:px-8 bg-[#FFF9D6] section-animate">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-[#3D4836] mb-8">{{ $t('about.story.title') }}</h2>
            <div class="flex flex-col md:flex-row gap-8 items-start story-section">
                <div class="hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="512" fill="none" class="line-animation">
                        <path fill="#3D4836" d="M3 0H0v512h3z" class="line-path"/>
                    </svg>
                </div>
                <div class="flex-1 story-content-animate">
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p1') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p2') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p3') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p4') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p5') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p6') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p7') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p8') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p9') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p10') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p11') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4 opacity-100">
                        {{ $t('about.story.paragraphs.p12') }}
                    </p>
                    <nuxt-link to="/blog">
                    <button class="relative inline-block bg-[#3D6625] text-white font-semibold text-sm sm:text-base px-6 py-3
                          overflow-hidden transition-colors duration-300 ease-in-out
                          before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
                          hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                          before:z-0 z-10 mt-10">
                      <span class="relative z-10">{{ $t('about.readBlog') }}</span>
                    </button>
                  </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lineHeight = ref(0)
const maxHeight = 512 

const handleScroll = () => {
  const storySection = document.querySelector('.story-section')
  if (!storySection) return

  const rect = storySection.getBoundingClientRect()
  const windowHeight = window.innerHeight
  

  const scrollProgress = Math.min(
    Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)),
    1
  )
  
  
  lineHeight.value = scrollProgress * maxHeight
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() 

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

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          imageObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  const quoteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up')
          quoteObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  document.querySelectorAll('.section-animate').forEach((section) => {
    sectionObserver.observe(section)
  })

  document.querySelectorAll('.content-animate').forEach((content) => {
    contentObserver.observe(content)
  })

  document.querySelectorAll('.image-animate').forEach((image) => {
    imageObserver.observe(image)
  })

  document.querySelectorAll('.quote-animate').forEach((quote) => {
    quoteObserver.observe(quote)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

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

.image-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.quote-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.story-content-animate {
  transform: translateY(20px);
  transition: transform 0.5s ease-out;
}

.story-content-animate p {
  opacity: 1;
  color: #374151;
}

.animate-slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.line-animation {
  height: 512px;
}

.line-path {
  transform-origin: top;
  transition: transform 0.1s ease-out;
  transform: scaleY(v-bind(lineHeight / maxHeight));
}
</style>