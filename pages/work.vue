<script setup>
let router = useRouter()

const filters = ref({
  town: '',
  date: ''
})

const sortBy = ref('date')

const towns = ['Пермь']

const jobs = ref([
  {
    id: 1,
    title: 'Уборка снега',
    organization: 'ООО Жек',
    postedDate: '2024-04-05',
    postedTime: '09:30 AM',
    workingHours: '08.00-12.00',
    duration: '6 часов',
    town: 'Пермь, ул. петропавловская д 21',
    description: '',
    salaryRange: '500'
  }
])
</script>

<template>
  <!-- Desktop and Tablet main text and button Create Order -->
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between d-none d-sm-flex">
        <h1 class="text-4xl font-bold text-gray-900 my-8">Вся работа</h1>
        <button @click="router.push('/create-order')" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Разместить заказ
        </button>
      </v-col>
    </v-row>
    <!-- Mobile main text and button Create Order -->
    <v-row>
      <v-col cols="12" class="flex flex-column align-center justify-between d-sm-none py-0">
        <button @click="router.push('/create-order')" class="bg-indigo-600 text-white px-10 py-3 rounded-md hover:bg-indigo-700 transition-colors font-bold mb-4 mt-3">
          Разместить заказ
        </button>
        <p class="text-3xl font-bold text-gray-900">Вся работа</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <!-- Filters and Sorting -->
          <v-row class="mb-6">
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
          </v-row>

          <div class="space-y-6">
            <div v-for="job in jobs" :key="job.id" class="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <WorkCard @click="router.push(`/order/${job.id}`)" :job="job" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>