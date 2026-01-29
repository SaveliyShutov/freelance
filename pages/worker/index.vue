<script setup>
import sadPicture from "~/assets/mansad.png";
import { toast } from "vue3-toastify";

useSeoMeta({
  title: 'Вся работа ',
  description: 'Просматривайте все доступные заказы и вакансии. Размещайте новые заказы или откликайтесь на подработки.',
  ogTitle: 'Вся работа ',
  ogDescription: 'Просматривайте все доступные заказы и вакансии. Размещайте новые заказы или откликайтесь на подработки.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-all-jobs.jpg',
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

definePageMeta({
  middleware: ["worker"],
})

const router = useRouter()
const orderStore = useOrder()
const userStore = useAuth()

const activeTab = ref('orders')

const allOrders = ref([])
const allVacancies = ref([])

await orderStore.getAll().then(res => {
  allOrders.value = [
    ...(res?.data?.value?.futureAndToday || []),
    ...(res?.data?.value?.yesterday || [])
  ]
  allVacancies.value = res.data?.value?.vacancies || []

  if (allOrders.value.length === 0 && allVacancies.value.length > 0) {
    activeTab.value = 'vacancies'
  } else {
    activeTab.value = 'orders'
  }
})

const currentOrders = computed(() => {
  return activeTab.value === 'orders' ? allOrders.value : allVacancies.value
})

const tabs = computed(() => {
  if (allOrders.value.length === 0 && allVacancies.value.length > 0) {
    return ['vacancies', 'orders']
  }
  return ['orders', 'vacancies']
})

function workerCreateOrder() {
  if (userStore.currentRole === 'worker') {
    toast("Зарегистрируйтесь как заказчик или смените роль", {
      type: "error",
      autoClose: 2000,
    })
  }
}
</script>

<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="flex flex-col md:flex-row align-center justify-between">
        <div class="flex flex-row gap-2 items-center">
          <h1 class="text-4xl font-bold text-gray-900 my-4 md:mt-8">Вся работа</h1>
          <v-btn density="compact" icon="mdi-plus" color="primary" class="!mt-1 !flex sm:!hidden"
            @click="workerCreateOrder()" />
        </div>

        <div class="flex justify-center md:justify-start gap-2 mb-2 md:my-0">
          <button v-for="tab in tabs" :key="tab" :class="[
            'px-4 py-1 rounded-full text-sm font-semibold',
            activeTab === tab
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]" @click="activeTab = tab">
            {{ tab === 'orders' ? 'Подработка' : 'Вакансии' }}
          </button>
        </div>

        <button
          class="hidden md:flex bg-indigo-600 text-white md:px-6 md:py-2  rounded-md hover:bg-indigo-700 transition-colors font-bold"
          @click="workerCreateOrder()">
          Разместить заказ
        </button>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="bg-white md:p-10 rounded-xl md:shadow-lg md:border md:border-gray-100">
          <div class="space-y-6">
            <div v-for="order in currentOrders" v-if="currentOrders.length > 0" :key="order._id"
              class="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <WorkCard :order="order" />
            </div>

            <div v-else class="flex flex-col justify-center items-center text-center">
              <p>Нет {{ activeTab === 'orders' ? 'заказов' : 'вакансий' }}. Будьте первым!</p>
              <img :src="sadPicture" class="mt-2 w-64 h-64">
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
