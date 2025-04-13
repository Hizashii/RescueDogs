<template>
  <Loader v-if="isLoading" />
  <AppHeader />
  <slot />
  <AppFooter />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useHead, useLocalePath } from '#imports'
import { useLoader } from '~/composables/useLoader'
import useNavigation from '~/composables/useNavigation'

const isLoading = useLoader()

const route = useRoute()
const { navItems } = useNavigation()
const localePath = useLocalePath()

const pageTitle = computed(() => {
  const navItem = navItems.find(item => localePath(item.path) === route.path)
  return navItem ? navItem.title : ''
})

useHead({
  title: pageTitle.value,
  titleTemplate: (title?: string): string | null => {
    if (
      route.path === '/' ||
      route.path === '/hu' ||
      route.path === '/de' ||
      route.path === '/en-GB'
    ) {
      return 'Mancsmento'
    }
    return title ? `${title} — Mancsmento` : 'Mancsmento'
  }
})
</script>

<style scoped>
</style>
