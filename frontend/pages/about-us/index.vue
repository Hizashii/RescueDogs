<template>
    <!-- TODO: make WHO WE ARE more responsive -->
    <div class="flex flex-col md:flex-row flex-wrap items-center justify-between w-screen h-[520px] bg-[#FFE86B] gap-10">
        <img src="/img/dogbg.png" alt="dog picture" class="w-auto h-[450px] object-cover drop-shadow-[20px_20px_0px_rgba(255,255,255,1)]">
        <div class="w-1/2 h-[400px]">
            <div class="container flex flex-col items-start justify-center gap-5">
                <h1 class="text-[24px] md:text-[40px] text-center md:text-left text-[#3D4836] font-bold ml-[-5]">{{ $t('about.title') }}</h1>
                <p class="text-[10px] md:text-[14px] max-w-[500px] text-start ml-10">{{ $t('about.description') }}</p>
                <div class=""> <svg xmlns="http://www.w3.org/2000/svg" width="715" height="205" fill="none"><path stroke="#fff" stroke-dasharray="8 16 24 32" stroke-width="4" d="M2 1c60.563 104.16 430.401 67.29 526.065 50.797 187.203-32.275 249.377 112.37 223.251 151.879"/></svg></div>
            </div>
        </div>
    </div>

    <div class="bg-white h-[400px] w-full flex flex-row items-center md:justify-around justify-between gap-4 md:gap-8 py-8 md:py-0">

        <div class="md:hidden block mt-[-450px] "><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>
        <div class="hidden md:block mt-[-400px] "><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-0">
            <img src="/img/black-dog.png" alt="Quote icon" class="w-32 md:w-64 h-auto">
            <h2 class="text-lg md:text-[24px] text-center md:text-start">
                {{ $t('about.quote.line1') }} <span class="text-[#3D6625] font-bold">{{ $t('about.quote.line2') }}</span>.<br>
                {{ $t('about.quote.line3') }}
            </h2>
        </div>

        <div class="hidden md:block mt-[400px] z-10"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>
        <div class="md:hidden block mt-[450px] z-10"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>

    </div>

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