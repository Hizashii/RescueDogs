// nuxt.config.ts
export default defineNuxtConfig({
  // Nuxt devtools or other settings
  compatibilityDate: '2025-03-27',
  devtools: { enabled: false },

  // Keep your modules array to enable Tailwind
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // Add your runtimeConfig
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:5000'
    }
  }
})