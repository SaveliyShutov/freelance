<script setup>
const filters = ref({
  town: '',
  date: ''
})

const sortBy = ref('date')

// Available towns
const towns = ['Пермь']

// Sample job data
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
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8">Вся работа</h1>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Разместить заказ
        </button>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="bg-white p-6 rounded-lg shadow-md">
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
            <div v-for="job in jobs" :key="job.id" class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <v-row>
                <v-col cols="12" md="8">
                  <!-- Job Title and Organization -->
                  <div class="mb-3">
                    <h3 class="text-xl font-semibold text-gray-900">{{ job.title }}</h3>
                    <p class="text-lg text-indigo-600">{{ job.organization }}</p>
                  </div>

                  <!-- Location -->
                  <div class="flex items-center gap-2 mb-2">
                    <i class="mdi mdi-earth text-indigo-600 text-xl"></i>
                    <span>{{ job.town }}</span>
                  </div>

                  <!-- Time and Duration -->
                  <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
                    <div class="flex items-center gap-2">
                      <i class="mdi mdi-clock-outline text-indigo-600 text-xl"></i>
                      <span>{{ job.workingHours }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="mdi mdi-calendar-range text-indigo-600 text-xl"></i>
                      <span> {{ job.postedDate }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4" class="flex flex-col justify-between">
                  <!-- Price -->
                  <div class="text-right mb-4">
                    <p class="text-2xl font-bold">{{ job.salaryRange }}₽</p>
                  </div>

                  <!-- Apply Button -->
                  <div class="text-right">
                    <button
                      class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
                      Откликнуться
                    </button>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>