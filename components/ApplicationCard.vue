<script setup>
const { job } = defineProps(['job'])

const getStatusClass = (status) => {
  const classes = {
    'InProgress': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

</script>
<template>
  <v-row>
    <v-col cols="12" md="8">
      <div class="mb-3">
        <h3 class="text-xl font-semibold text-gray-900">{{ job.title }}</h3>
        <p class="text-lg text-indigo-600">{{ job.organization }}</p>
      </div>

      <div class="flex items-center gap-2 mb-2">
        <i class="mdi mdi-map-marker text-indigo-600"></i>
        <span>{{ job.town }}</span>
      </div>

      <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
        <div class="flex items-center gap-2">
          <i class="mdi mdi-clock-time-three text-indigo-600"></i>
          <span>{{ job.workingHours }}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="mdi mdi-calendar-range text-indigo-600"></i>
          <span> {{ job.postedDate }}</span>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="4" class="flex flex-col justify-between">
      <div class="text-right mb-4">
        <p class="text-2xl font-bold">{{ job.salaryRange }}₽</p>
      </div>
    </v-col>

    <v-col>
      <p class="text-xl font-bold text-gray-900">Заявки</p>
      <div v-for="application in job.applications" :key="application.id" class="bg-gray-50 p-4 rounded-lg">
        <v-row>
          <v-col cols="12" md="6">
            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <img v-if="application.avatar" :src="application.avatar" :alt="application.workerName"
                  class="w-12 h-12 rounded-full object-cover" />
                <span v-else class="text-xl font-semibold text-indigo-600">
                  {{ application.applicantName.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ application.workerName }}</p>
                <StarsRating :rating="application.rating" />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="flex items-center justify-end gap-2">
            <span :class="getStatusClass(application.status)" class="px-3 py-1 rounded-full text-sm">
              {{ application.status }}
            </span>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>