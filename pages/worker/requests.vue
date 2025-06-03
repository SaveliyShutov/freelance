<script setup>
import sadPicture from "~/assets/mansad.png";

definePageMeta({
  middleware: ["worker"],
});

let router = useRouter()

const orderStore = useOrder();

await orderStore.getWorkerApplicationsWithOrders();
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8">Мои заявки</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="space-y-8">
          <div class="space-y-6">
            <div v-if="orderStore.my_applications.length > 0" v-for="application in orderStore.my_applications"
              :key="application._id" class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
              <ApplicationCard @click="router.push(`/order/${application.order._id}`)" :application="application" />
            </div>
            <div v-else class="flex flex-col justify-center items-center text-center">
              <p>У вас нет заявок</p>
              <button @click="router.push('/worker')"
                class="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
                Найти работу!
              </button>
              <img :src="sadPicture" class="mt-2 w-64 h-64" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
