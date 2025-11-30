<script setup>
definePageMeta({
  middleware: ["guest"],
});
const currentRole = ref("employer");

const orders = ref([
  {
    title: "Уборка снега",
    description: "цувцуацацуа",
    applications: [
      {
        phone: "89226949791",
        letter: "Здравствуйте, когда можно выйти на работу",
        initials: "Шутов Савелий",
        worker: "67f351f3261ca26a80d7ae03",
        order: "67f5108d3044831bd18c914c",
      },
    ],
    employer_id: "67f351f3261ca26a80d7ae03",
    employer_name: "asdasd",
    date: "2025-04-27",
    address: "Пермь ул пушкина д21",
    budget: "5000",
    hours: "8",
  },
]);
</script>
<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" class="mb-8">
        <div class="flex items-center gap-4">
          <div class="bg-gray-200 rounded-lg p-1 inline-flex">
            <button
:class="[
              'px-4 py-2 rounded-md text-xl font-medium transition-all duration-200',
              currentRole === 'employer'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]" @click="currentRole = 'employer'">
              Мои Подработки (заказчик)
            </button>
            <button
:class="[
              'px-4 py-2 rounded-md text-xl font-medium transition-all duration-200',
              currentRole === 'worker'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]" @click="currentRole = 'worker'">
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
                <div
v-for="order in orders" :key="order.id"
                  class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                  <OrderCard :order="order" />
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
                <div
v-for="job in jobs" :key="job.id"
                  class="bg-white p-10 rounded-xl shadow-lg border border-gray-100"/>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
