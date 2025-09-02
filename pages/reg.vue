<script setup lang="ts">
import { ref } from "vue";
import workerImage from "~/assets/workerImage.png";
import employerImage from "~/assets/employerImage.png";

const currentRole = ref("worker");
</script>

<template>
  <v-container class="min-h-screen flex justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-6 md:p-10 ma-5 mb-15 rounded-xl shadow-lg border border-gray-100">
          <div class="flex flex-col justify-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 text-center">
                Создать аккаунт
                {{ currentRole == "worker" ? "исполнителя" : "заказчика" }}
              </h2>
            </div>
            <ClientOnly>
              <div class="flex flex-row justify-center">
                <img v-if="currentRole === 'worker'" :src="workerImage" class="w-28 h-28" />
                <img v-if="currentRole === 'employer'" :src="employerImage" class="w-28 h-28 ml-10" />
              </div>
            </ClientOnly>
            <p class="text-center mt-2 text-green-600">
              + {{ currentRole == "worker" ? "может откликаться на подработки" : "может создавать подработки" }}
            </p>
            <p class="text-center mb-2  text-red-600">
              - {{ currentRole == "worker" ? "не может создавать подработки" : "не может откликаться на подработки" }}
            </p>
            <div class="flex justify-center">
              <div class="bg-gray-200 rounded-lg p-1 inline-flex">
                <button @click="currentRole = 'worker'" :class="[
                  'px-4 py-2 rounded-md text-lg font-medium transition-all duration-200',
                  currentRole === 'worker'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                ]">
                  исполнителя
                </button>
                <button @click="currentRole = 'employer'" :class="[
                  'px-4 py-2 rounded-md text-lg font-medium transition-all duration-200',
                  currentRole === 'employer'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                ]">
                  заказчика
                </button>
              </div>
            </div>
          </div>

          <WorkerRegForm v-if="currentRole === 'worker'" />
          <EmployerRegForm v-if="currentRole === 'employer'" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
