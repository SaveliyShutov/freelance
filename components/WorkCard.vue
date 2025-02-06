<script setup lang="ts">
const { job } = defineProps(['job'])
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

      <div class="text-right">
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Откликнуться
        </button>
      </div>
    </v-col>
  </v-row>
</template>