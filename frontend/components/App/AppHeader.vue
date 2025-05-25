<template>
  <nav class="bg-[#FDF6E9] py-4 z-[100]">
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
            <li v-for="item in navItems" :key="item.titleKey" class="relative group">
              <!------------------------------------- MAIN NAV ITEMS ------------------------------------>
              <template v-if="!item.children">
                <NuxtLink 
                  :to="localePath(item.path)"
                  class="text-black hover:text-gray-600"
                  :class="{ '!font-bold underline': $route.path === localePath(item.path) }"
                >
                  {{ t(item.titleKey) }}
                  <span v-if="item.titleKey === 'navigation.supportUs'" class="ml-1"></span>
                </NuxtLink>
              </template>

              <!------------------------------------- ABOUT US DROPDOWN ------------------------------------>
              <template v-else>
                <button class="text-black hover:text-gray-600 inline-flex items-center z-50">
                  {{ t(item.titleKey) }}
                  <span class="ml-1 transform transition-transform duration-300 group-hover:rotate-90">›</span>
                </button>
                <div class="absolute left-0 w-full h-6 bg-transparent"></div>
                <transition name="fade">
                  <div class="absolute left-0 mt-2 w-48 bg-white shadow-lg -md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-[101]">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.path"
                      :to="localePath(child.path)"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      :class="{ '!font-bold underline': $route.path === localePath(child.path) }"
                    >
                      {{ t(child.titleKey) }}
                    </NuxtLink>
                  </div>
                </transition>
              </template>
            </li>
          </ul>
        </div>

        <!------------------------------------- LANGUAGE SELECTOR FOR DESKTOP ------------------------------------>
        <div class="hidden lg:block relative group">
          <button class="p-2 flex items-center">
            <svg width="40" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M29 5.684v17.053h-4.353L24.65 27l-7.25-4.263h-5.8V5.684H29ZM17.4 0v4.263h-7.25v13.642l-5.8 3.41.003-4.262H0V0h17.4Zm3.752 9.947h-1.695l-3.217 8.527h1.529l.89-2.443h3.266l.897 2.443h1.62l-3.29-8.527Zm-.86 1.426c.132.432.272.862.421 1.288l.064.18.73 2.022H19.07l.731-2.021a23.12 23.12 0 0 0 .491-1.469ZM7.954 2.301h-1.45v.71H2.88v1.421h5.413c-.087 1.21-.4 2.3-.94 3.277A7.012 7.012 0 0 1 6.14 5.058l-.014-.064-1.418.298.106.434A8.395 8.395 0 0 0 6.483 8.93c-.855.905-2.08 1.539-3.7 1.9l-.06.014.314 1.387.432-.102c1.69-.43 3.038-1.156 4.027-2.18.694.586 1.553 1.14 2.579 1.665l.075.038v-1.618a10.905 10.905 0 0 1-1.775-1.22c.8-1.273 1.254-2.713 1.365-4.309l.005-.073h.405v-1.42H7.954V2.3Z" fill="#000"/></svg>
            <span class="ml-1 transform transition-transform duration-300 group-hover:rotate-90">›</span>
          </button>
          <div class="absolute right-0 w-full h-6 bg-transparent pointer-events-auto"></div>
          <transition name="fade">
            <div
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg -md z-[101] opacity-0 group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
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
          </transition>
        </div>

        <!------------------------------------- LANGUAGE SELECTOR FOR PHONES ------------------------------------>
        <div class="flex items-center gap-4 lg:hidden">
          <div class="relative">
            <button @click="toggleDropdown('lang')" class="p-2">
              <svg width="35" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M29 5.684v17.053h-4.353L24.65 27l-7.25-4.263h-5.8V5.684H29ZM17.4 0v4.263h-7.25v13.642l-5.8 3.41.003-4.262H0V0h17.4Zm3.752 9.947h-1.695l-3.217 8.527h1.529l.89-2.443h3.266l.897 2.443h1.62l-3.29-8.527Zm-.86 1.426c.132.432.272.862.421 1.288l.064.18.73 2.022H19.07l.731-2.021a23.12 23.12 0 0 0 .491-1.469ZM7.954 2.301h-1.45v.71H2.88v1.421h5.413c-.087 1.21-.4 2.3-.94 3.277A7.012 7.012 0 0 1 6.14 5.058l-.014-.064-1.418.298.106.434A8.395 8.395 0 0 0 6.483 8.93c-.855.905-2.08 1.539-3.7 1.9l-.06.014.314 1.387.432-.102c1.69-.43 3.038-1.156 4.027-2.18.694.586 1.553 1.14 2.579 1.665l.075.038v-1.618a10.905 10.905 0 0 1-1.775-1.22c.8-1.273 1.254-2.713 1.365-4.309l.005-.073h.405v-1.42H7.954V2.3Z" fill="#000"/></svg>
            </button>
            <transition name="fade">
              <div
                v-show="activeDropdown === 'lang'"
                class="absolute right-0 mt-2 w-48 bg-white shadow-lg -md z-[101]"
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
            </transition>
          </div>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2">
            <svg width="45" height="45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.125 30.75v-3.417h30.75v3.417H5.125Zm0-8.542v-3.416h30.75v3.416H5.125Zm0-8.541V10.25h30.75v3.417H5.125Z" fill="#1D1B20"/></svg>
          </button>
        </div>
      </div>

      <!------------------------------------- PHONE NAV MENU ------------------------------------>
      <transition name="slide-fade">
        <div 
          v-show="isMobileMenuOpen"
          class="fixed inset-0 bg-white z-[101] lg:hidden"
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
              <li v-for="item in navItems" :key="item.titleKey">
                <template v-if="!item.children">
                  <NuxtLink 
                    :to="localePath(item.path)"
                    class="block py-2 text-black hover:text-gray-600"
                    :class="{ '!font-bold underline': $route.path === localePath(item.path) }"
                    @click="isMobileMenuOpen = false"
                  >
                    {{ t(item.titleKey) }}
                  </NuxtLink>
                </template>

                <template v-else>
                  <div>
                    <button
                      @click="toggleMobileDropdown(item.titleKey)"
                      class="w-full py-2 text-black hover:text-gray-600 flex justify-between items-center"
                    >
                      {{ t(item.titleKey) }}
                      <span
                        class="transform transition-transform duration-300"
                        :class="{ 'rotate-90': activeMobileDropdown === item.titleKey }"
                      >
                        ›
                      </span>
                    </button>
                    <transition name="expand">
                      <div
                        v-show="activeMobileDropdown === item.titleKey"
                        class="pl-4 space-y-2 overflow-hidden"
                      >
                        <NuxtLink
                          v-for="child in item.children"
                          :key="child.path"
                          :to="localePath(child.path)"
                          class="block py-2 text-gray-700 hover:text-gray-900"
                          :class="{ '!font-bold underline': $route.path === localePath(child.path) }"
                          @click="isMobileMenuOpen = false"
                        >
                          {{ t(child.titleKey) }}
                        </NuxtLink>
                      </div>
                    </transition>
                  </div>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSwitchLocalePath, useRouter, useLocalePath } from '#imports';

const { t } = useI18n({
  useScope: 'local'
})

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

<i18n lang="json">
{
  "en": {
    "navigation": {
      "ourDogs": "Our dogs",
      "upAdoption": "Up for adoption",
      "allAnimals": "All animals",
      "supportUs": "Support us",
      "aboutUs": "About us",
      "blog": "Blog",
      "reportStray": "Report a stray"
    }
  },
  "hu": {
    "navigation": {
      "ourDogs": "Kutyák",
      "upAdoption": "Örökbefogadhatóak",
      "allAnimals": "Összes kutya",
      "supportUs": "Támogatás",
      "aboutUs": "Rólunk",
      "blog": "Blog",
      "reportStray": "Kóborló jelentése"
    }
  },
  "de": {
    "navigation": {
      "ourDogs": "Unsere Hunde",
      "upAdoption": "Zur Adoption",
      "allAnimals": "Alle Tiere",
      "supportUs": "Unterstützen Sie uns",
      "aboutUs": "Über uns",
      "blog": "Blog",
      "reportStray": "Streuner melden"
    }
  }
}
</i18n>
