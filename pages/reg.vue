<script setup lang="ts">
import { toast } from "vue3-toastify"
const currentRole = ref('worker')

</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="flex flex-col justify-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 text-center">Создать аккаунт {{ currentRole == 'worker' ?
                'исполнителя' : 'заказчика' }}
              </h2>
            </div>
            <div class="flex flex-row justify-center">
              <img src="assets\workerImage.png" v-if="currentRole == 'worker'" class="w-44 h-44"/>
              <img src="assets\employerImage.png" v-if="currentRole == 'employer'" class="w-40 h-40 ml-12 mb-3"/>
            </div>
            <div class="flex justify-center">
              <div class="bg-gray-200 rounded-lg p-1 inline-flex">
                <button @click="currentRole = 'worker'" :class="[
                  'px-4 py-2 rounded-md text-lg font-medium transition-all duration-200',
                  currentRole === 'worker'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                ]">
                  исполнителя
                </button>
                <button @click="currentRole = 'employer'" :class="[
                  'px-4 py-2 rounded-md text-lg font-medium transition-all duration-200',
                  currentRole === 'employer'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                ]">
                  заказчика
                </button>
              </div>
            </div>
          </div>
          <WorkerRegForm v-if="currentRole == 'worker'" />
          <EmployerRegForm v-if="currentRole == 'employer'" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>