// backend/admin/nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  nitro: {
    devProxy: { '/api/**': 'http://localhost:5000' }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000'
    }
  },

  compatibilityDate: '2025-04-17'
})