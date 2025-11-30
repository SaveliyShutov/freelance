import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },

  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    }],
    "@pinia/nuxt",
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/eslint'
  ],

  runtimeConfig: {
    site: {
      url: 'https://nirby.ru',
      name: 'Nirby - работа рядом'
    },
    public: {
      telegramSupportId: process.env.TELEGRAM_SUPPORT_ID,
      YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },

  vite: {
    css: {
      devSourcemap: false
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  
  robots: {
    groups: [
      { 
        userAgent: '*', 
        allow: '/'
      },
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: [
    { src: '~/plugins/yandex-metrika.client.ts', mode: 'client' },
  ],

  devServer: {
    port: 3011,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  compatibilityDate: '2025-01-30'
})