<template>
    <button
      class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]"
      @click="goToCheckout"
    >
      <slot>{{ label }}</slot>
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { useRouter } from 'vue-router'
  

  const props = defineProps<{
    amountFt?: number
    itemId?: string
    label?: string
  }>()
  
  const router = useRouter()
  function goToCheckout() {
    if (props.itemId) {
      router.push(`/checkout/item/${props.itemId}`)
    } else if (props.amountFt) {
      router.push(`/checkout/donation/${props.amountFt}`)
    } else {
      console.warn('SupportButton missing itemId or amountFt')
    }
  }
  </script>
  