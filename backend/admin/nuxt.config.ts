export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://rescuedogs-1.onrender.com',
        changeOrigin: true,
        secure: true,
        ws: true
      },
      '/uploads': {
        target: 'https://rescuedogs-1.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://rescuedogs-1.onrender.com'
    }
  },

  ssr: true,

  app: {
    pageTransition:   false,
    layoutTransition: false,
    head: {
      title: 'Admin Dashboard'
    }
  },

  compatibilityDate: '2025-05-19'
})
