<script setup lang="ts">
const jobTypes = [
  'Доставка',
  'Переводчик',
  'Репетитор',
  'Кейтеринг',
  'Грузчик',
  'Сиделка',
  'Охрана',
  'Чистка крыши',
  'Другое'
]

const jobType = ref('')
const description = ref('')
const location = ref('')
const budget = ref('')
const deadline = ref('')
const completionTime = ref('')

const submitForm = () => {
  console.log({
    jobType: jobType.value,
    description: description.value,
    location: location.value,
    budget: budget.value,
    deadline: deadline.value,
    completionTime: completionTime.value
  })
}

const authStore = useAuth()

onMounted(() => {
  localStorage.setItem('currentRole', 'worker')
  console.log(localStorage.getItem('currentRole'))
})


</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8 m  b-8">Создание объявления</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-briefcase text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Вид работы</label>
                </div>
                <select v-model="jobType" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]">
                  <option value="" disabled>Выберите вид работы</option>
                  <option v-for="type in jobTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </v-col>

              <v-col cols="12">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-pickaxe text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Введите описание работы</label>
                </div>
                <textarea v-model="description" required rows="4" placeholder="А вот здесь поподробнее"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]"></textarea>
              </v-col>

              <v-col cols="12" md="6">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-map-marker text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Локация</label>
                </div>
                <input type="text" v-model="location" required placeholder="Город, адрес"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]" />
              </v-col>

              <v-col cols="12" md="6">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-cash-multiple text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Бюджет (₽)</label>
                </div>
                <input type="number" v-model="budget" required min="100" step="50" placeholder="А заплатите сколько?"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]" />
              </v-col>

              <v-col cols="12" md="6">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-calendar-range text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Дата выполнения</label>
                </div>
                <input type="date" v-model="deadline" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]" />
              </v-col>

              <v-col cols="12" md="6">
                <div class="flex items-center gap-1">
                  <i class="mdi mdi-timer-sand-full text-indigo-600"></i>
                  <label class="block text-sm font-medium text-gray-700">Время работы</label>
                </div>
                <input type="number" v-model="completionTime" min="1" required placeholder="(в часах)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]" />
              </v-col>

              <v-col cols="12" class="text-right">
                <button type="submit"
                  class="px-8 py-2 bg-[#473CD2] text-white rounded-md hover:bg-[#3730A3] transition-colors duration-200">
                  Разместить
                </button>
              </v-col>
            </v-row>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>