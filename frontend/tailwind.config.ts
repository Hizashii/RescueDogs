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
            boxShadow: {
                'dropdown': '0px 4px 4px rgba(0, 0, 0, 0.2)',
              },
            screens: {
                lg: '800px',
            },
            keyframes: {
                pop: {
                  '0%': { transform: 'scale(0.8)', opacity: '0' },
                  '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'scroll-pop': {
                  '0%': { transform: 'scale(0.8)', opacity: '0' },
                  '100%': { transform: 'scale(1)', opacity: '1' },
                }
              },
              animation: {
                pop: 'pop 0.3s ease-out forwards',
                'scroll-pop': 'scroll-pop 0.5s ease-out forwards',
              },
        },
    },
    safelist: [
        'custom-primary',
        'animate-scroll-pop',
    ],
  };