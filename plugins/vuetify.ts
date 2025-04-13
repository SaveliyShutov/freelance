// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VTextField } from 'vuetify/components/VTextField'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#4F46E5',
          }
        },
      },
    },
    defaults: {
      // VTextField : {
      //   style: 'border-color: blue !important;',
      // },
    }
  })
  app.vueApp.use(vuetify)
})