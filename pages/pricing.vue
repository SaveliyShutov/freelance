<script setup>
const activeTab = ref('quick');
const quantity = ref(1);
const boostEnabled = ref(true);

useSeoMeta({
  title: 'Покупка бустов ',
  description: 'Приобретайте бусты для продвижения ваших объявлений на платформе Nirby: быстрая покупка или выгодные пакеты кредитов.',
  ogTitle: 'Покупка бустов ',
  ogDescription: 'Приобретайте бусты для продвижения ваших объявлений на платформе Nirby: быстрая покупка или выгодные пакеты кредитов.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-home.jpg',
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
    <v-row class="mb-8 flex justify-center">
      <v-col cols="12" md="8" lg="6">
        <div class="bg-white rounded-xl">

          <div class="flex justify-center">
            <div class="inline-flex bg-white md:p-1.5 rounded-2xl">
              <button
                :class="['px-6 py-3 rounded-xl text-sm font-semibold', activeTab === 'quick' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                @click="activeTab = 'quick'">
                Быстрая покупка
                <span class="ml-2 inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">до
                  -10%</span>
              </button>

              <button
                :class="['px-6 py-3 rounded-xl text-sm font-semibold ml-2', activeTab === 'packages' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                @click="activeTab = 'packages'">
                Пакеты кредитов
                <span class="ml-2 inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">до
                  -30%</span>
              </button>
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <div class="inline-block bg-purple-50 text-purple-700 text-sm font-medium rounded-full px-3 py-1">
              1 буст = 1 продвижение объявления
            </div>
          </div>

          <div>
            <div v-if="activeTab === 'quick'" class="space-y-4 mt-4">
              <div class="bg-white md:p-6 rounded-xl md:mb-0">
                <QuickBuySlider v-model:quantity="quantity" />
              </div>

              <div class="bg-white md:p-6 rounded-xl md:mt-0 md:pt-0">
                <BoostOption />
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'packages'">
            <div class="bg-white md:p-6 rounded-xl">
              <CreditPackages />
            </div>
            <div class="bg-white md:p-6 rounded-xl md:mt-0 md:pt-0">
              <BoostOption />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
