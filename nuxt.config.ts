import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },

  build: {
    transpile: ['vuetify'],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@zadigetvoltaire/nuxt-gtm',
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
  ],

  runtimeConfig: {
    ycAccessKeyId: process.env.YC_KEY_ID,
    ycSecretAccessKKey: process.env.YC_SECRET,
    public: {
      GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
      gtm: {
        id: process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-XXXXXXX',
        enabled: true,
        debug: true,
        enableRouterSync: true,
      },
      YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
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
  },

  compatibilityDate: '2025-01-30'
})