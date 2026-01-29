<script setup>
const route = useRoute()
const userStore = useAuth()
const currentRole = ref(userStore.currentRole)

useSeoMeta({
  title: 'Профиль ',
  description: 'Управляйте вашим профилем: переключайтесь между ролями исполнителя и заказчика, редактируйте личные данные и настройки.',
  ogTitle: 'Профиль ',
  ogDescription: 'Управляйте вашим профилем: переключайтесь между ролями исполнителя и заказчика, редактируйте личные данные и настройки.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-profile.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  /*
  link: [
    { rel: 'canonical', href: `https://nirby.ru${route.path}` }
  ],
  htmlAttrs: { lang: 'ru' }
  */
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="bg-gray-200 rounded-lg p-1 inline-flex w-110">
          <button :class="[
            'px-3 pr-4 py-2 rounded-md text-lg font-medium transition-all duration-200',
            currentRole === 'worker'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]" @click="currentRole = 'worker'">
            Исполнитель
          </button>
          <button :class="[
            'px-5 py-2 rounded-md text-lg font-medium transition-all duration-200',
            currentRole === 'employer'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900',
          ]" @click="currentRole = 'employer'">
            Заказчик
          </button>
        </div>
        <ProfileWorker v-if="currentRole === 'worker'" />
        <ProfileEmployer v-if="currentRole === 'employer'" />
      </v-col>
    </v-row>


  </v-container>
</template>