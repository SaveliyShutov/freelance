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
})

const currentOrders = computed(() => {
  return activeTab.value === 'orders' ? allOrders.value : allVacancies.value
})
</script>


<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="flex flex-col md:flex-row align-center justify-between">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <h1 class="text-4xl font-bold text-gray-900 my-4 md:my-8">Вся работа</h1>
          <div class="flex gap-2 mt-2 md:mt-0">
            <button :class="[
              'px-4 py-1 rounded-full text-sm font-semibold',
              activeTab === 'orders'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]" @click="activeTab = 'orders'">
              Заказы
            </button>
            <button :class="[
              'px-4 py-1 rounded-full text-sm font-semibold',
              activeTab === 'vacancies'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]" @click="activeTab = 'vacancies'">
              Вакансии
            </button>
          </div>
        </div>

        <button @click="router.push('/employer/create-order')"
          class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
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
              <WorkCard @click="router.push(`/order/${order._id}`)" :order="order" />
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