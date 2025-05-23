<template>
    <div class="bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat md:h-screen h-[60vh] w-full">
        <div class="flex flex-col items-center justify-center md:h-full h-full">
            <img src="/img/logo_white.png" alt="Mancsmento logo" class="md:w-24 w-16 h-auto">
            <h1 class="md:text-6xl text-3xl font-bold text-white md:pt-4 pt-2">{{ $t('home.title') }}</h1>
            <h1 class="md:text-4xl text-sm text-white md:pt-5 pt-2 text-center">{{ $t('home.subtitle') }}</h1>
            <div class="flex flex-wrap justify-center md:gap-16 gap-4 md:pt-24 pt-8">
              <nuxt-link to="/up-for-adoption">
              <button
                class="relative inline-block bg-white text-black font-bold text-sm md:w-52 md:min-h-14 w-40 min-h-10
                      overflow-hidden transition-colors duration-300 ease-in-out
                      before:absolute before:inset-0 before:bg-[#FFD700] before:scale-x-0 before:origin-left
                      hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                      hover:text-[#3D4836] z-10"
                      
              >
                <span class="relative z-10">{{ $t('home.adoptButton') }}</span>
              </button>
            </nuxt-link>

                <nuxt-link to="/report-stray">
                    <button class="relative inline-block bg-white text-black font-bold text-sm md:w-52 md:min-h-14 w-40 min-h-10
                      overflow-hidden transition-colors duration-300 ease-in-out
                      before:absolute before:inset-0 before:bg-[#FFD700] before:scale-x-0 before:origin-left
                      hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                      hover:text-[#3D4836] z-10">
           <span class="relative z-10">{{ $t('home.reportButton') }}</span></button>
                </nuxt-link>
            </div>
        </div>
    </div>

<section class="bg-[#FFE65E] px-4 py-16 section-animate">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 -mt-12 md:-mt-24">

      <div ref="reportCard" class="flex flex-col items-center opacity-0 justify-between bg-white p-6 min-h-[420px] shadow-dropdown card-animate">
        <div class="flex flex-col items-center">
          <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
            <circle cx="53" cy="53" r="51.5" fill="#3D6625" stroke="#3D6625" stroke-width="3"/>
            <path d="M67.1818 35C63.14 35 60.6818 35.7631 59.2636 36.4106C57.4436 35.5319 55.3636 35 53 35C50.6364 35 48.5564 35.5319 46.7364 36.4106C45.3182 35.7631 42.86 35 38.8182 35C31.7273 35 27 53.5 27 58.125C27 60.0444 30.12 61.8019 34.4218 62.5187C35.9345 67.6987 43.0727 71.6531 51.8182 72V62.1025C50.4236 61.2469 48.2727 59.6975 48.2727 58.125C48.2727 55.8125 53 55.8125 53 55.8125C53 55.8125 57.7273 55.8125 57.7273 58.125C57.7273 59.6975 55.5764 61.2469 54.1818 62.1025V72C62.9273 71.6531 70.0655 67.6987 71.5782 62.5187C75.88 61.8019 79 60.0444 79 58.125C79 53.5 74.2727 35 67.1818 35ZM34.4455 57.8244C33.2636 57.5469 32.3418 57.2231 31.7273 56.9688C32.3182 50.5631 36.9273 40.55 38.9364 39.625C40.2127 39.625 41.1818 39.7638 42.0564 39.8794C37.0927 45.2213 35.1309 53.5925 34.4455 57.8244ZM45.9091 53.5C45.2822 53.5 44.681 53.2564 44.2377 52.8227C43.7945 52.389 43.5455 51.8008 43.5455 51.1875C43.5455 49.9387 44.6091 48.875 45.9091 48.875C46.536 48.875 47.1372 49.1186 47.5804 49.5523C48.0237 49.986 48.2727 50.5742 48.2727 51.1875C48.2727 52.4825 47.2091 53.5 45.9091 53.5ZM60.0909 53.5C59.464 53.5 58.8628 53.2564 58.4196 52.8227C57.9763 52.389 57.7273 51.8008 57.7273 51.1875C57.7273 49.9387 58.7909 48.875 60.0909 48.875C60.7178 48.875 61.319 49.1186 61.7623 49.5523C62.2055 49.986 62.4545 50.5742 62.4545 51.1875C62.4545 52.4825 61.3909 53.5 60.0909 53.5ZM71.5545 57.8244C70.8691 53.5925 68.9073 45.2213 63.9436 39.8794C64.8182 39.7638 65.7873 39.625 67.0636 39.625C69.0727 40.55 73.6818 50.5631 74.2727 56.9688C73.6818 57.2231 72.76 57.5469 71.5545 57.8244Z" fill="white"/>
          </svg>
          <h1 class="text-2xl text-center font-medium mb-4">{{ $t('home.reportCard.title') }}</h1>
          <p class="text-sm mb-6 text-center max-w-[230px]">{{ $t('home.reportCard.description') }}</p>
        </div>
        <nuxt-link to="/report-stray">
          <button class="relative text-white font-bold text-sm w-40 md:w-52 py-3 overflow-hidden 
               bg-[#3D6625] transition-colors duration-300 ease-in-out
               before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
               hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
               before:z-0 z-10">
            <span class="relative z-10">{{ $t('home.reportCard.button') }}</span>
          </button>
        </nuxt-link>
      </div>

      <div ref="adoptCard" class="flex flex-col items-center opacity-0 justify-between bg-white p-6 min-h-[420px] shadow-dropdown card-animate">
        <div class="flex flex-col items-center">
          <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
            <circle cx="53" cy="53" r="51.5" fill="#3D6625" stroke="#3D6625" stroke-width="3"/>
            <path d="M43.9188 28.8754C47.0163 28.4292 50.2975 31.8154 51.2425 36.4879C52.1875 41.1342 50.4812 45.2817 47.3837 45.7542C44.3125 46.2267 41.005 42.8404 40.0337 38.1679C39.0625 33.5217 40.8212 29.3742 43.9188 28.8754ZM62.6875 28.8754C65.8112 29.3742 67.5437 33.5217 66.625 38.1679C65.6275 42.8404 62.3462 46.2267 59.2487 45.7542C56.125 45.2817 54.4187 41.1342 55.39 36.4879C56.335 31.8154 59.6162 28.4292 62.6875 28.8754ZM29.875 40.9504C32.8675 39.6642 36.9362 42.0004 39.0625 46.0692C41.0575 50.2167 40.375 54.5742 37.4087 55.8604C34.4425 57.1467 30.4 54.8367 28.3262 50.7154C26.2525 46.5942 26.9875 42.2104 29.875 40.9504ZM77.125 40.9504C80.0125 42.2104 80.7475 46.5942 78.6737 50.7154C76.6 54.8367 72.5575 57.1467 69.5912 55.8604C66.625 54.5742 65.9425 50.2167 67.9375 46.0692C70.0637 42.0004 74.1325 39.6642 77.125 40.9504ZM72.7412 69.2479C72.8462 71.7154 70.9563 74.4454 68.6987 75.4692C64 77.6217 58.435 73.1592 53.2113 73.1592C47.9875 73.1592 42.37 77.8054 37.75 75.4692C35.125 74.1829 33.3137 70.7704 33.655 67.9354C34.1275 64.0242 38.8262 61.9242 41.6087 59.0629C45.31 55.3617 47.935 48.4054 53.2113 48.4054C58.4613 48.4054 61.2437 55.2567 64.7875 59.0629C67.7012 62.2654 72.5575 64.9692 72.7412 69.2479Z" fill="white"/>
          </svg>
          <h1 class="text-2xl font-medium mb-4">{{ $t('home.adoptCard.title') }}</h1>
          <p class="text-sm mb-6 text-center max-w-[230px]">{{ $t('home.adoptCard.description') }}</p>
        </div>
        <nuxt-link to="/report-stray">
          <button class="relative text-white font-bold text-sm w-40 md:w-52 py-3 overflow-hidden 
               bg-[#3D6625] transition-colors duration-300 ease-in-out
               before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
               hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
               before:z-0 z-10">
            <span class="relative z-10">{{ $t('home.adoptCard.button') }}</span>
          </button>
        </nuxt-link>
      </div>

      <div ref="donateCard" class="flex flex-col items-center opacity-0 justify-between bg-white p-6 min-h-[420px] shadow-dropdown card-animate">
        <div class="flex flex-col items-center">
          <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
            <circle cx="53" cy="53" r="51.5" fill="#3D6625" stroke="#3D6625" stroke-width="3"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M53.5018 25.0769L54.8751 24.0747C54.7186 23.8525 54.5124 23.6714 54.2736 23.5465C54.0348 23.4216 53.7702 23.3564 53.5018 23.3564C53.2334 23.3564 52.9688 23.4216 52.73 23.5465C52.4912 23.6714 52.285 23.8525 52.1286 24.0747L53.5018 25.0769ZM53.5018 25.0769L52.1286 24.0747L52.1213 24.0821L52.1031 24.1044L52.0448 24.1935C51.7023 24.6832 51.3671 25.1782 51.0394 25.6782C50.2163 26.9283 49.4244 28.1994 48.6645 29.4903C47.7693 30.987 46.9617 32.5363 46.2458 34.1301C45.6047 35.5963 45.0437 37.2146 45.0437 38.5769C45.0437 40.919 45.9179 43.1796 47.4952 44.8536C49.0724 46.5276 51.2361 47.489 53.5018 47.489C55.7675 47.489 57.9276 46.5314 59.5085 44.8536C61.0894 43.1758 61.9599 40.919 61.9599 38.5806C61.9599 37.2146 61.399 35.5963 60.7579 34.1264C60.0419 32.5326 59.2343 30.9833 58.3392 29.4866C57.2768 27.6816 56.1492 25.9173 54.9589 24.1972L54.9006 24.1044L54.8824 24.0821L54.8787 24.0784L53.5018 25.0806V25.0769ZM28.0036 42.3295V59.8717C28.0041 61.8404 28.7719 63.7284 30.1382 65.1203L38.1191 73.2529V75.3204H50.2599V64.6526C50.2601 63.5704 50.0511 62.4987 49.6449 61.4988C49.2386 60.4989 48.6431 59.5903 47.8922 58.825L42.6542 53.4873L42.6396 53.4725C42.0627 52.9835 41.323 52.7402 40.5745 52.7931C39.8259 52.846 39.1262 53.191 38.6211 53.7565C38.116 54.3219 37.8444 55.064 37.8629 55.8284C37.8813 56.5928 38.1884 57.3205 38.7202 57.8599L42.0714 61.2748C42.2453 61.446 42.3841 61.6508 42.4795 61.8772C42.575 62.1036 42.6252 62.3472 42.6273 62.5936C42.6294 62.84 42.5833 63.0844 42.4917 63.3125C42.4002 63.5406 42.2649 63.7478 42.0939 63.9221C41.9229 64.0963 41.7196 64.2341 41.4957 64.3274C41.2719 64.4208 41.0321 64.4677 40.7902 64.4656C40.5484 64.4634 40.3094 64.4122 40.0872 64.315C39.865 64.2177 39.664 64.0763 39.496 63.8991L36.1448 60.4842C34.9257 59.2405 34.2367 57.5572 34.2271 55.7994C34.2176 54.0415 34.8883 52.3506 36.0939 51.0932V42.3258C36.0939 41.2321 35.6675 40.1832 34.9085 39.4098C34.1496 38.6365 33.1202 38.202 32.0469 38.202C30.9736 38.202 29.9443 38.6365 29.1853 39.4098C28.4264 40.1832 28 41.2321 28 42.3258L28.0036 42.3295ZM79 59.8717V42.3295C79 41.2358 78.5736 40.1869 77.8147 39.4135C77.0557 38.6402 76.0264 38.2057 74.9531 38.2057C73.8798 38.2057 72.8504 38.6402 72.0915 39.4135C71.3325 40.1869 70.9062 41.2358 70.9062 42.3295V51.0932C72.1139 52.3509 72.786 54.0434 72.7765 55.8031C72.7669 57.5628 72.0765 59.2476 70.8552 60.4916L67.504 63.9028C67.1605 64.2408 66.7004 64.4279 66.2229 64.4237C65.7453 64.4194 65.2885 64.2243 64.9508 63.8802C64.6132 63.5361 64.4216 63.0706 64.4175 62.584C64.4133 62.0973 64.5969 61.6285 64.9286 61.2785L68.2798 57.8636C68.8209 57.3259 69.1358 56.5951 69.158 55.8253C69.1803 55.0555 68.9082 54.307 68.3992 53.7378C67.8902 53.1685 67.1841 52.8231 66.4299 52.7743C65.6757 52.7255 64.9323 52.9771 64.3568 53.4762L64.3422 53.4911L59.1114 58.8213C58.3601 59.5871 57.7643 60.4962 57.3581 61.4968C56.9518 62.4974 56.743 63.5697 56.7437 64.6526V75.3204H68.8809V73.2566L76.8618 65.1203C77.539 64.4314 78.0764 63.6133 78.4433 62.7127C78.8101 61.8122 78.9993 60.8468 79 59.8717Z" fill="white"/>
          </svg>
          <h1 class="text-2xl font-medium mb-4">{{ $t('home.donateCard.title') }}</h1>
          <p class="text-sm mb-6 text-center max-w-[230px]">{{ $t('home.donateCard.description') }}</p>
        </div>
        <nuxt-link to="/support">
          <button class="relative text-white font-bold text-sm w-40 md:w-52 py-3 overflow-hidden 
               bg-[#3D6625] transition-colors duration-300 ease-in-out
               before:absolute before:inset-0 before:bg-[#213714] before:scale-x-0 before:origin-left
               hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
               before:z-0 z-10">
            <span class="relative z-10">{{ $t('home.donateCard.button') }}</span>
          </button>
        </nuxt-link>
      </div>

     

    </div>
  </div>
</section>
<section class="bg-[#FFFADF] section-animate flex justify-between items-center">
  <div class=" flex flex-col md:flex-row items-center justify-center content-center md:items-start gap-8 md:gap-5">
    
    <div class="flex-shrink-0">
      <img
        src="/img/intro-dog.png"
        alt="Dog icon"
        class="w-full max-w-full md:max-w-md lg:max-w-lg object-contain"
      />
    </div>
    <div class="hidden md:block"><svg width="6" height="625" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 0v655" stroke="gold" stroke-width="5" stroke-dasharray="10 10"/></svg></div>

    <div
      class="flex-1 flex flex-col text-left space-y-6 min-h-28 my-auto max-w-[700px] gap-6 mx-5"
    >
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
        {{ $t('home.intro.title.part1') }}
        <span class="text-[#3D4836]"> {{ $t('home.intro.title.part2') }} </span>
      </h2>
      <p class="text-base sm:text-lg md:text-xl max-w-prose">
        {{ $t('home.intro.description') }}
      </p>
      <nuxt-link to="/about-us">
        <p class="text-base sm:text-lg md:text-xl underline font-light hover:text-[#3D4836]"> {{ $t('home.intro.readMore') }}</p>
      </nuxt-link>
      
      <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <nuxt-link to="/support">
          <button class="relative inline-block bg-[#FFD700] text-black font-bold text-sm sm:text-base px-6 py-3
                overflow-hidden transition-colors duration-300 ease-in-out
                before:absolute before:inset-0 before:bg-[#3D6625] before:scale-x-0 before:origin-left
                hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                hover:text-white z-10">
            <span class="relative z-10">{{ $t('home.intro.supportButton') }}</span>
          </button>
        </nuxt-link>
        <a
            href="mailto:info@mancsmento.hu?subject=Volunteer%20Application&body=Hi,%0A%0AI would love to volunteer! Here's a little about me:%0A- Name:%0A- Age:%0A- Availability:%0A- Relevant experience or interests:%0A%0ALooking forward to hearing from you!%0A%0ABest regards,%0A[Your Name]"
            class="inline-block"
          >
            <button class="relative inline-block bg-[#FFD700] text-black font-bold text-sm sm:text-base px-6 py-3
                  overflow-hidden transition-colors duration-300 ease-in-out
                  before:absolute before:inset-0 before:bg-[#3D6625] before:scale-x-0 before:origin-left
                  hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out
                  hover:text-white z-10">
              <span class="relative z-10">{{ $t('home.intro.volunteerButton') }}</span>
            </button>
          </a>
      </div>
    </div>

  </div>
</section>


<section class="bg-white pb-64 pt-40 section-animate">
  <div class="max-w-6xl mx-auto px-4 flex flex-col items-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-[#3D4836] text-center mb-16 ">
      {{ $t('home.stats.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 w-full">
      
      <div class="flex flex-col items-center">
        <img src="/img/dog-stats-icon.png" alt="dog icon" class="w-16 h-16 md:w-20 md:h-20 mb-4 pl-4" />
        <h3 class="text-2xl sm:text-3xl md:text-5xl font-bold text-[#3D6625] mt-4">4699</h3>
        <p class="text-sm sm:text-base md:text-lg font-semibold text-center mt-2">
          {{ $t('home.stats.totalDogs') }}
        </p>
      </div>

      <div class="flex flex-col items-center">
        <div class="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.8333 10.0003C31.7667 9.43367 35.9333 13.7337 37.1334 19.667C38.3333 25.567 36.1667 30.8337 32.2333 31.4337C28.3333 32.0337 24.1333 27.7337 22.9 21.8003C21.6667 15.9003 23.9 10.6337 27.8333 10.0003ZM51.6667 10.0003C55.6334 10.6337 57.8334 15.9003 56.6667 21.8003C55.4 27.7337 51.2333 32.0337 47.3 31.4337C43.3333 30.8337 41.1667 25.567 42.4 19.667C43.6 13.7337 47.7667 9.43367 51.6667 10.0003ZM10 25.3337C13.8 23.7003 18.9667 26.667 21.6667 31.8337C24.2 37.1003 23.3333 42.6337 19.5667 44.267C15.8 45.9003 10.6667 42.967 8.03335 37.7337C5.40001 32.5003 6.33335 26.9337 10 25.3337ZM70 25.3337C73.6667 26.9337 74.6 32.5003 71.9667 37.7337C69.3334 42.967 64.2 45.9003 60.4333 44.267C56.6667 42.6337 55.8 37.1003 58.3334 31.8337C61.0333 26.667 66.2 23.7003 70 25.3337ZM64.4333 61.267C64.5667 64.4003 62.1667 67.867 59.3 69.167C53.3334 71.9003 46.2667 66.2337 39.6334 66.2337C33 66.2337 25.8667 72.1337 20 69.167C16.6667 67.5337 14.3667 63.2003 14.8 59.6003C15.4 54.6337 21.3667 51.967 24.9 48.3337C29.6 43.6337 32.9333 34.8003 39.6334 34.8003C46.3 34.8003 49.8333 43.5003 54.3333 48.3337C58.0333 52.4003 64.2 55.8337 64.4333 61.267Z" fill="#FFD700"/>
          </svg>
        </div>
        <h3 class="text-2xl sm:text-3xl md:text-5xl font-bold text-[#3D6625] mt-4">2699</h3>
        <p class="text-sm sm:text-base md:text-lg font-semibold text-center mt-2">
          {{ $t('home.stats.adoptableDogs') }}
        </p>
      </div>

      <div class="flex flex-col items-center">
        <div class="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
          <img src="/img/trophy-stats-icon.png" alt="trophy icon" class="w-full h-full object-contain">
        </div>
        <h3 class="text-2xl sm:text-3xl md:text-5xl font-bold text-[#3D6625] mt-4">999</h3>
        <p class="text-sm sm:text-base md:text-lg font-semibold text-center mt-2">
          {{ $t('home.stats.adoptedDogs') }}
        </p>
      </div>

    </div>
  </div>
</section>


    <section class="bg-[#FFE86B] h-[400px] w-full flex flex-row items-center md:justify-around justify-between gap-4 md:gap-8 py-8 md:py-0 section-animate">
        <div class="md:hidden block mt-[-450px]"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>
        <div class="hidden md:block mt-[-400px] z-[1000px]"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-0 relative z-10">
            <img src="/img/black-dog.png" alt="Quote icon" class="w-32 md:w-64 h-auto">
            <h2 class="text-lg md:text-[24px] text-center md:text-start">{{ $t('home.quote.part1') }} <span class="text-[#3D6625] font-bold">{{ $t('home.quote.part2') }}</span>.<br>{{ $t('home.quote.part3') }}</h2>
        </div>
        <div class="hidden md:block mt-[400px]"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>
        <div class="md:hidden block mt-[450px]"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>
    </section>

<section class="w-full bg-white flex flex-col items-center justify-center py-16 md:py-0 h-auto md:h-screen gap-10 section-animate">
  <h2 class="text-2xl md:text-[32px] font-semibold text-center md:text-start w-[90%] md:w-[1000px]">
    {{ $t('home.news.title.part1') }} <br><span class="text-logo-yellow font-bold">{{ $t('home.news.title.part2') }}</span>
  </h2>

  <div v-if="loading" class="text-gray-500">Loading posts…</div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 w-[90%] md:w-auto">
    <div
      v-for="post in posts"
      :key="post._id"
      class="flex flex-col gap-4 w-full max-w-[200px] mx-auto p-4 border hover:shadow"
    >
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title || 'Blog post image'"
        class="aspect-square w-full object-cover"
      />
      <div
        v-else
        class="aspect-square w-full bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center"
      >
        No Image Available
      </div>

      <h3 class="text-base md:text-[16px] font-semibold text-start">
        {{ post.title }}
      </h3>
      <nuxt-link
        :to="`/blog/${post._id}`"
        class="text-blue-600 hover:underline font-medium text-sm md:text-[13px]"
      >
        {{ $t('home.news.readMore') }} →
      </nuxt-link>
    </div>
  </div>

  <nuxt-link to="/blog" class="font-semibold underline text-[24px]">
    {{ $t('home.news.seeMore') }}
  </nuxt-link>
</section>
<section class="bg-[#FAF8ED] py-16 px-4 md:px-0 section-animate">
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row items-stretch justify-between gap-8">
      
      <div class="w-full md:w-1/2 flex flex-col justify-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold text-[#3D4836] uppercase tracking-wide">
          {{ $t('home.location.title') }}
        </h2>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-[#3D6625]">
              {{ $t('home.location.openingHoursLabel') }}:
            </p>
            <p class="font-normal text-[#3D6625] mt-1">
              {{ $t('home.location.openingHours') }}
            </p>
          </div>
          <div>
            <p class="font-semibold text-[#3D6625]">
              {{ $t('home.location.addressLabel') }}:
            </p>
            <p class="font-normal text-[#3D6625] mt-1">
              {{ $t('home.location.address') }}
            </p>
          </div>
          <div>
            <p class="font-semibold text-[#3D6625]">
              {{ $t('home.location.contactLabel') }}:
            </p>
            <p class="font-normal text-[#3D6625] mt-1">
              {{ $t('home.location.phone') }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2">
        <div class="relative w-full aspect-[4/3] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2709.4730821709195!2d21.133788776207794!3d47.226891471157586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4746e7e7274d56f1%3A0x53424dcd350fdf03!2sSzerep%2C%20Kem%C3%A9nyi%20%C3%BAt%2013%2C%204163%20Hungary!5e0!3m2!1sen!2sdk!4v1746647443179!5m2!1sen!2sdk"
            class="absolute inset-0 w-full h-full border-0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  </div>
</section>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchBlogs } from '@/utils/api'

const posts = ref<any[]>([])
const loading = ref(true)

const reportCard = ref<HTMLElement | null>(null)
const adoptCard = ref<HTMLElement | null>(null)
const donateCard = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    const all = await fetchBlogs()
    posts.value = all.slice(0, 4)
  } catch (e) {
    console.error('could not load blog previews', e)
  } finally {
    loading.value = false
  }

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slide-up')
            if (entry.target instanceof HTMLElement) {
              entry.target.style.opacity = '1'
            }
          }, index * 150)
          cardObserver.unobserve(entry.target)
        }
      })
    },
    {
      
      rootMargin: '0px 0px -15% 0px'
    }
  )

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

  
  if (reportCard.value) cardObserver.observe(reportCard.value)
  if (adoptCard.value) cardObserver.observe(adoptCard.value)
  if (donateCard.value) cardObserver.observe(donateCard.value)

  document.querySelectorAll('.section-animate').forEach((section) => {
    sectionObserver.observe(section)
  })
})
</script>

<style scoped>
.section-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.animate-slide-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.card-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
