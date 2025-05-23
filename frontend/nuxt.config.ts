import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-03',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],

  i18n: {
    bundle: { optimizeTranslationDirective: false },
    lazy: true,
    langDir: '../locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en-GB',
    locales: [
      { code: 'hu', iso: 'hu-HU', file: 'hu.json' },
      { code: 'de', iso: 'de-DE', file: 'de.json' },
      { code: 'en-GB', iso: 'en-GB', file: 'en.json' }
    ]
  },

  nitro: {
    devProxy: {
      '/api/**':      'https://rescuedogs-1.onrender.com',
      '/uploads/**':  'https://rescuedogs-1.onrender.com'
    },
    prerender: {
      failOnError: false
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  }
})
