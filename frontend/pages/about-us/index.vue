<template>
 <!-- WHO WE ARE -->
 <section class="bg-[#FFE86B] py-12 px-4 md:py-20 md:px-8">
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
    >
      <!-- IMAGE (left) -->
      <div class="flex-shrink-0 w-full md:w-1/2">
        <img
          src="/img/dogbg.png"
          alt="dog picture"
          class="w-full h-auto max-h-96 object-cover drop-shadow-[20px_20px_0_rgba(255,255,255,1)] rounded"
        />
      </div>

      <!-- TEXT (right) -->
      <div
        class="flex-1 flex flex-col md:items-start text-center md:text-left space-y-8"
      >
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D4836]">
          {{ $t('about.title') }}
        </h1>
        <p class="text-sm sm:text-base md:text-lg max-w-prose text-gray-800">
          {{ $t('about.description') }}
        </p>
        <div class="w-full flex justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-48 sm:w-64"
            viewBox="0 0 715 205"
            fill="none"
          >
            <path
              stroke="#fff"
              stroke-dasharray="8 16 24 32"
              stroke-width="4"
              d="M2 1c60.563 104.16 430.401 67.29 526.065 50.797 187.203-32.275 249.377 112.37 223.251 151.879"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- QUOTE -->
  <section class="bg-white py-12 px-4 md:py-20 md:px-8">
    <div class="max-w-6xl mx-auto flex flex-col items-center space-y-8">
      <div class="flex flex-col sm:flex-row items-center gap-6">
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
    <div class="w-full py-16 px-4 md:px-8 bg-[#FFF9D6]">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-[#3D4836] mb-8">{{ $t('about.story.title') }}</h2>
            <div class="flex flex-col md:flex-row gap-8 items-start">
                <div class="hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="512" fill="none"><path fill="#3D4836" d="M3 0H0v512h3z"/></svg>
                </div>
                <div class="flex-1">
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p1') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p2') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p3') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p4') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p5') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p6') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p7') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p8') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p9') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p10') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p11') }}
                    </p>
                    <p class="text-base md:text-[14px] text-gray-700 leading-relaxed max-w-[1100px] mb-4">
                        {{ $t('about.story.paragraphs.p12') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>