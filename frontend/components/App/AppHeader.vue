<template>
    <h3>logo placeholder</h3>
<nav>
    <ul>
        <div class="flex gap-2">
            <button @click="switchLocale('hu')">🇭🇺</button>
            <button @click="switchLocale('en-GB')">🇬🇧</button>
            <button @click="switchLocale('de')">🇩🇪</button>
        </div>

        <li v-for="item in navItems" :key="item.title">
            <NuxtLink :to="localePath(item.path)">{{ item.title }}</NuxtLink>
        </li>
    </ul>
</nav>
</template>
<script setup lang="ts">
import { useSwitchLocalePath, useRouter, useLocalePath } from '#imports';

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const router = useRouter();
const { navItems } = useNavigation();

const switchLocale = async (locale) => {
  const newPath = switchLocalePath(locale);
  newPath && await router.push(newPath);
};

</script>