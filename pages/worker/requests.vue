<script setup>
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
            <div
              v-for="application in orderStore.my_applications"
              :key="application._id"
              class="bg-white p-10 rounded-xl shadow-lg border border-gray-100"
            >
              <ApplicationCard @click="router.push(`/order/${application.order._id}`)" :application="application" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
