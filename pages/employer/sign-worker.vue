<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

useSeoMeta({
  title: 'Добавить аккаунт исполнителя ',
  description: 'Создайте аккаунт исполнителя на Nirby для откликов на вакансии и выполнения подработок в вашем городе.',
  ogTitle: 'Добавить аккаунт исполнителя ',
  ogDescription: 'Создайте аккаунт исполнителя на Nirby для откликов на вакансии и выполнения подработок в вашем городе.',
  ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-add-worker.jpg',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="flex flex-col justify-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">Добавить аккаунт исполнителя
              </h2>
              <p class="text-center">для выполнения подработок, или отклика на вакансии вам необходимо создать аккаунт
                исполнителя
              </p>
            </div>
            <EmployerAddWorkerForm />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>