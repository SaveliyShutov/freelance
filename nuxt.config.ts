import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devServer: {
    port: 3011,
  },


  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
  },

  css: ['~/assets/css/main.css'],

  modules: [(_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  }, ['@nuxtjs/google-fonts', {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  }], "@pinia/nuxt", '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/eslint', '@nuxtjs/seo', 'nuxt-og-image'],

  plugins: [
    { src: '~/plugins/yandex-metrika.client.ts', mode: 'client' },
  ],

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

  runtimeConfig: {
    public: {
      siteName: 'Nirby — работа рядом',
      telegramSupportId: process.env.TELEGRAM_SUPPORT_ID,
      YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
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

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'Nirby — работа рядом',
    description: 'Лучший сервис поиска подработки рядом',
    defaultLocale: 'ru'
  },

  sitemap: {
    include: ['/**'],
    exclude: ['/admin/**', '/secret'],
    defaults: {
      changefreq: 'daily',
      priority: 0.7
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        {
          name: 'description',
          content: 'Nirby — удобный сервис поиска работы рядом с домом. Свежее обновление вакансий в вашем городе, быстрый отклик и удобные фильтры.'
        },
        { property: 'og:site_name', content: 'Nirby' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Nirby — поиск работы рядом с вами' },
        { property: 'og:description', content: 'Смотрите свежие вакансии в вашем городе и находите работу без лишней траты времени.' },
        // { property: 'og:image', content: 'https://nirby.ru/og-default.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nirby — поиск работы рядом' },
        { name: 'twitter:description', content: 'Смотрите свежие вакансии в вашем городе и находите работу без лишней траты времени.' },
        // { name: 'twitter:image', content: 'https://nirby.ru/og-default.png' }
      ],
      titleTemplate: '%s | Nirby',
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