<template>
    <div class="flex flex-row gap-5 h-[100px] w-[400px] bg-[#FFE65E] items-center justify-start container gap-5">
        <h2 class="text-[18px] font-bold min-w-[80px] max-w-[80px]">{{ Amount }}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="117" fill="none"><path stroke="#FFFADF" stroke-dasharray="8.17 8.17" stroke-width="4.086" d="M2.207 0v116.17"/></svg>
        <div class="flex flex-col gap-2">
           <h2 class="text-[11px] font-normal">{{ Description }}</h2>
           <button class="bg-white text-black h-[25px] w-[100px]">Support</button>
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