<script setup>
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
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8">Мои заказы</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="space-y-8">
            <div class="space-y-6">
              <div v-for="job in jobs" :key="job.id" class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <OrderCard :job="job" />
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>