<script setup>
import sadPicture from "~/assets/mansad.png";
import { toast } from "vue3-toastify";

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
})

const currentOrders = computed(() => {
  return activeTab.value === 'orders' ? allOrders.value : allVacancies.value
})

function workerCreateOrder() {
  if (userStore.currentRole = 'worker') {
    toast("Зарегистрируйтесь как заказчкик или смените роль", {
      type: "error",
      autoClose: 2000,
      onClose: () => {
      },
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
          <v-btn @click="workerCreateOrder()" density="compact" icon="mdi-plus" color="primary"
            class="!mt-1 !flex sm:!hidden"></v-btn>
        </div>
        <div class="flex justify-center md:justify-start gap-2 mb-2 md:my-0">
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

        <button @click="workerCreateOrder()"
          class="hidden md:flex bg-indigo-600 text-white md:px-6 md:py-2  rounded-md hover:bg-indigo-700 transition-colors font-bold">
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