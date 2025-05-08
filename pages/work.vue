<script setup>
definePageMeta({
  middleware: ["guest"],
})
let router = useRouter()
let orderStore = useOrder()

await orderStore.getAll()

</script>

<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="flex flex-col md:flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-4 md:my-8">Вся работа</h1>
        <button @click="router.push('/reg')"
          class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Разместить заказ
        </button>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="bg-white md:p-10 rounded-xl md:shadow-lg md:border md:border-gray-100">
          <!-- <v-row class="mb-6">
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
                <select v-model="filters.town"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Все города</option>
                  <option v-for="town in towns" :key="town" :value="town">{{ town }}</option>
                </select>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                <input type="date" v-model="filters.date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Сортировать по</label>
                <select v-model="sortBy"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="date">Дате</option>
                  <option value="price-asc">Цене (по возрастанию)</option>
                  <option value="price-desc">цене (по убыванию)</option>
                </select>
              </div>
            </v-col>
          </v-row> -->

          <div class="space-y-6">
            <div v-for="order in orderStore.orders" :key="order.id"
              class="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <WorkCard @click="router.push(`/reg`)" :order="order" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>