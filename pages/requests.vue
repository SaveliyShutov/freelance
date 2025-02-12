<script setup>
const currentRole = ref('employer')

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
    salaryRange: '500',
    applications: [
      {
        id: 1,
        workerName: 'John Doe',
        status: 'Pending',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=c7d2fe&color=4f46e5',
        rating: 4.5
      },
    ]
  }
])
</script>
<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" class="mb-8">
        <div class="flex items-center gap-4">
          <div class="bg-gray-200 rounded-lg p-1 inline-flex">
            <button @click="currentRole = 'employer'" :class="[
              'px-4 py-2 rounded-md text-xl font-medium transition-all duration-200',
              currentRole === 'employer'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]">
              Мои Заказы (заказчик)
            </button>
            <button @click="currentRole = 'worker'" :class="[
              'px-4 py-2 rounded-md text-xl font-medium transition-all duration-200',
              currentRole === 'worker'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]">
              Мои Заявки (исполнитель)
            </button>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="currentRole === 'employer'">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="flex flex-row align-center justify-between">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">Мои заказы</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="space-y-8">
              <div class="space-y-6">
                <div v-for="job in jobs" :key="job.id"
                  class=" bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                  <OrderCard :job="job" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="currentRole === 'worker'">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="flex flex-row align-center justify-between">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">Мои заявки</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="space-y-8">
              <div class="space-y-6">
                <div v-for="job in jobs" :key="job.id" class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                  <ApplicationCard :job="job" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>