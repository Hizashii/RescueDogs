<template>
    <div class="flex flex-row gap-3 md:gap-5 h-[80px] md:h-[100px] w-full md:w-[400px] bg-[#FFE65E] items-center justify-start container gap-3 md:gap-5">
        <h2 class="text-base md:text-[18px] font-bold min-w-[60px] md:min-w-[80px] max-w-[60px] md:max-w-[80px]">{{ Amount }}</h2>
        
        <svg width="5" height="117" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#FFFADF" stroke-width="4.086" stroke-dasharray="8.17 8.17" d="M2.207.366v116.17"/></svg>
        <div class="flex flex-col gap-1 md:gap-2">
           <h2 class="text-xs md:text-[11px] font-normal">{{ Description }}</h2>
           <button 
             class="bg-white text-black h-[20px] md:h-[25px] w-[80px] md:w-[130px] text-xs md:text-sm"
             @click="$emit('buttonClick', Amount)"
           >{{ buttonText }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    Amount: string;
    Description: string;
    buttonText: string;
}>(), {
    Amount: '',
    Description: '',
    buttonText: 'Button'
});

const emit = defineEmits(['buttonClick']);
</script>