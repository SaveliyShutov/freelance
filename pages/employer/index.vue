<script setup>
import { ref, computed } from 'vue'
import sadPicture from "~/assets/mansad.png"

definePageMeta({
  middleware: ["employer"]
})

const router = useRouter()
const orderStore = useOrder()

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
</script>

<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="flex flex-col md:flex-row align-center justify-between">
        <div class="flex flex-row gap-2 items-center">
          <h1 class="text-4xl font-bold text-gray-900 my-4 md:mt-8">Вся работа</h1>
          <v-btn @click="router.push('/employer/create-order')" density="compact" icon="mdi-plus" color="primary"
            class="!mt-1 !flex sm:!hidden"></v-btn>
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

        <button @click="router.push('/employer/create-order')"
          class="hidden md:flex bg-indigo-600 text-white md:px-6 md:py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Разместить заказ
        </button>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="bg-white md:p-10 rounded-xl md:shadow-lg md:border md:border-gray-100">
          <!-- <v-row class="mb-6">
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
                <select v-model="filters.town"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Все города</option>
                  <option v-for="town in towns" :key="town" :value="town">{{ town }}</option>
                </select>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                <input type="date" v-model="filters.date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Сортировать по</label>
                <select v-model="sortBy"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="date">Дате</option>
                  <option value="price-asc">Цене (по возрастанию)</option>
                  <option value="price-desc">цене (по убыванию)</option>
                </select>
              </div>
            </v-col>
          </v-row> -->
          <div class="space-y-6">
            <div v-if="currentOrders.length > 0" v-for="order in currentOrders" :key="order._id"
              class="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <WorkCard :order="order" />
            </div>

            <div v-else class="flex flex-col justify-center items-center text-center">
              <p>Нет {{ activeTab === 'orders' ? 'заказов' : 'вакансий' }}. Будьте первым!</p>
              <img :src="sadPicture" class="mt-2 w-64 h-64" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>