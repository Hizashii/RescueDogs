module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
        './error.vue',
        './content/**/*.{md,yml,json,yaml,toml,csv}',
        './composables/**/*.{js,ts}',
        './utils/**/*.{js,ts}',
    ],
    plugins: [require('@tailwindcss/typography')],
    theme: {
        container: {
            padding: '1rem',
        },
        extend: {
            colors: {
                'custom-primary': '#000000',
                'logo-yellow': '#FFD700',
                'cards-yellow':   '#FFE65E',
                'light-yellow':   '#FFFADF',
                'quote-yellow':   '#FFE86B',
                'primary-green':  '#3D6625',
            },
            screens: {
                lg: '800px',
            },
        },
    },
    safelist: [
        'custom-primary',
    ],
  };