<template>
  <nav class="bg-[#FDF6E9] py-4">
    <div class="w-full px-4">
      <!------------------------------------- MAIN NAV BAR FOR PHONE AND DESKTOP ------------------------------------>
      <div class="flex items-center justify-between">
        <!------------------------------------- LOGO ------------------------------------>
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/img/logo.png" alt="Mancsmento" class="h-14 w-auto">
        </NuxtLink>

        <!------------------------------ DESKTOP MENU ------------------------------------>
        <div class="hidden lg:flex flex-1 justify-center items-center">
          <ul class="flex items-center space-x-6">
            <li v-for="item in navItems" :key="item.title">
              <!------------------------------------- MAIN NAV ITEMS ------------------------------------>
              <template v-if="!item.children">
                <NuxtLink 
                  :to="localePath(item.path)"
                  class="text-black hover:text-gray-600"
                  :class="{ '!font-bold underline': $route.path === localePath(item.path) }"
                >
                  {{ item.title }}
                  <span v-if="item.title === 'Support us'" class="ml-1"></span>
                </NuxtLink>
              </template>

              <!------------------------------------- ABOUT US DROPDOWN ------------------------------------>
              <template v-else>
                <div class="relative group">
                  <button class="text-black hover:text-gray-600 inline-flex items-center">
                    {{ item.title }}
                    <span class="ml-1">›</span>
                  </button>
                  <div class="absolute left-0 w-full h-2 bg-transparent"></div>
                  <div class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.path"
                      :to="localePath(child.path)"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      :class="{ '!font-bold underline': $route.path === localePath(child.path) }"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </div>

        <!------------------------------------- LANGUAGE SELECTOR FOR DESKTOP ------------------------------------>
        <div class="hidden lg:block relative group">
          <button class="p-2">
            <img src="/img/lang.png" alt="Language" class="h-8 w-8">
          </button>
          <div class="absolute right-0 w-full h-2 bg-transparent"></div>
          <div
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 hidden group-hover:block"
          >
            <button
              v-for="(flag, locale) in locales"
              :key="locale"
              @click="switchLocale(locale)"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {{ localeNames[locale] }}
            </button>
          </div>
        </div>

        <!------------------------------------- LANGUAGE SELECTOR FOR PHONES ------------------------------------>
        <div class="flex items-center gap-4 lg:hidden">
          <div class="relative">
            <button @click="toggleDropdown('lang')" class="p-2">
              <img src="/img/lang.png" alt="Language" class="h-8 w-auto">
            </button>
            <div
              v-show="activeDropdown === 'lang'"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
            >
              <button
                v-for="(flag, locale) in locales"
                :key="locale"
                @click="switchLocale(locale)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {{ localeNames[locale] }}
              </button>
            </div>
          </div>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen">
            <img src="/img/burger.png" alt="Menu" class="h-8 w-8">
          </button>
        </div>
      </div>

      <!------------------------------------- PHONE NAV MENU ------------------------------------>
      <div 
        v-show="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-50 lg:hidden"
      >
        <div class="p-4">
          
          <div class="flex justify-between items-center mb-8">
            <NuxtLink to="/" class="flex-shrink-0">
              <img src="/img/logo.png" alt="Mancsmento" class="h-14 w-auto">
            </NuxtLink>
            <button @click="isMobileMenuOpen = false" class="p-2">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <!------------------------------------- PHONE NAV ITEMS ------------------------------------>
          <ul class="space-y-4">
            <li v-for="item in navItems" :key="item.title">
              <template v-if="!item.children">
                <NuxtLink 
                  :to="localePath(item.path)"
                  class="block py-2 text-black hover:text-gray-600"
                  :class="{ '!font-bold underline': $route.path === localePath(item.path) }"
                  @click="isMobileMenuOpen = false"
                >
                  {{ item.title }}
                </NuxtLink>
              </template>

              <template v-else>
                <div>
                  <button
                    @click="toggleMobileDropdown(item.title)"
                    class="w-full py-2 text-black hover:text-gray-600 flex justify-between items-center"
                  >
                    {{ item.title }}
                    <span>›</span>
                  </button>
                  <div v-show="activeMobileDropdown === item.title" class="pl-4 space-y-2">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.path"
                      :to="localePath(child.path)"
                      class="block py-2 text-gray-700 hover:text-gray-900"
                      :class="{ '!font-bold underline': $route.path === localePath(child.path) }"
                      @click="isMobileMenuOpen = false"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useSwitchLocalePath, useRouter, useLocalePath } from '#imports';

const activeDropdown = ref<string | null>(null);
const isMobileMenuOpen = ref(false);
const activeMobileDropdown = ref<string | null>(null);
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const router = useRouter();
const { navItems } = useNavigation();

const locales = {
  'hu': '🇭🇺',
  'en-GB': '🇬🇧',
  'de': '🇩🇪'
};

const localeNames = {
  'hu': 'Magyar',
  'en-GB': 'English',
  'de': 'Deutsch'
};

const switchLocale = async (locale: 'hu' | 'de' | 'en-GB') => {
  const newPath = switchLocalePath(locale);
  if (newPath) {
    await router.push(newPath);
    activeDropdown.value = null;
  }
};

const switchLocaleAndCloseMobile = async (locale: string) => {
  await switchLocale(locale as 'hu' | 'de' | 'en-GB');
  isMobileMenuOpen.value = false;
};

const toggleDropdown = (dropdown: string) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
};

const toggleMobileDropdown = (dropdown: string) => {
  activeMobileDropdown.value = activeMobileDropdown.value === dropdown ? null : dropdown;
};


watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>