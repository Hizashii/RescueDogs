<template>
    <div class="flex flex-row gap-3 md:gap-5 h-[80px] md:h-[100px] w-full md:w-[400px] bg-[#FFE65E] items-center justify-start container gap-3 md:gap-5">
        <h2 class="text-base md:text-[18px] font-bold min-w-[60px] md:min-w-[80px] max-w-[60px] md:max-w-[80px]">{{ Amount }}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="80" fill="none" class="md:hidden"><path stroke="#FFFADF" stroke-dasharray="8.17 8.17" stroke-width="4.086" d="M1.207 0v80"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="117" fill="none" class="hidden md:block"><path stroke="#FFFADF" stroke-dasharray="8.17 8.17" stroke-width="4.086" d="M2.207 0v116.17"/></svg>
        <div class="flex flex-col gap-1 md:gap-2">
           <h2 class="text-xs md:text-[11px] font-normal">{{ Description }}</h2>
           <button class="bg-white text-black h-[20px] md:h-[25px] w-[80px] md:w-[100px] text-xs md:text-sm">Support</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    Amount: string;
    Description: string;
}>(), {
    Amount: '',
    Description: ''
});
</script>