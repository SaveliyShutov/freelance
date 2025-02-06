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

// Function to update application status
const updateApplicationStatus = (jobId, applicationId, newStatus) => {
  const job = employerJobs.value.find(j => j.id === jobId)
  if (job) {
    const application = job.applications.find(a => a.id === applicationId)
    if (application) {
      application.status = newStatus
    }
  }
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
              <!-- Name and Rating -->
              <div>
                <p class="font-medium text-gray-900">{{ application.workerName }}</p>
                <div class="flex items-center gap-1 mt-1">
                  <div class="flex">
                    <span v-for="i in 5" :key="i" class="text-lg">
                      <span v-if="i <= application.rating" class="text-yellow-400">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                  <span class="text-sm text-gray-600 ml-1">({{ application.rating }}/5)</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="flex items-center justify-end gap-2">
            <button class="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600">
              Accept
            </button>
            <button class="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600">
              Reject
            </button>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>