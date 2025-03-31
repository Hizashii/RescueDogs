<template>
    <AppHeader />
    <slot />
    <AppFooter />
</template>

<script setup lang="ts">


//TAB TITLE
const route = useRoute();
const { navItems } = useNavigation();
const localePath = useLocalePath();

const pageTitle = computed(() => {
  const navItem = navItems.find(item => localePath(item.path) === route.path);
  return navItem ? navItem.title : '';
});

useHead({
  title: pageTitle,
  titleTemplate: (titleChunk: any) => {
    if (route.path === '/' || route.path === '/hu' || route.path === '/de' || route.path === '/en-GB') {
      return 'Mancsmento';
    }
    return titleChunk ? `${titleChunk} — Mancsmento` : 'Mancsmento';
  },
});
//END TAB TITLE
</script>