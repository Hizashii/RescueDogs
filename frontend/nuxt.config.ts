// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: "2025-04-03",
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],
  i18n: { 
    bundle: {
      optimizeTranslationDirective: false, 
    },
    lazy: true,
    langDir: "../locales",
    strategy: "prefix_except_default",
    defaultLocale: "en-GB",
    locales: [
      { code: "hu", iso: "hu-HU", file: "hu.json"},
      { code: "de", iso: "de-DE", file: "de.json"},
      { code: "en-GB", iso: "en-GB", file: "en.json" },
    ],
  },
  runtimeConfig: {
    public: {
      i18n: {
      
      }
    }
  }
})