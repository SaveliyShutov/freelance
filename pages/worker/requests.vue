<script setup>
definePageMeta({
  middleware: ["worker"],
});

const orderStore = useOrder();

let applications = ref();

let { my_applications } = storeToRefs(orderStore);

await orderStore.getWorkerApplicationsWithOrders();

if (my_applications?.value) {
  applications.value = my_applications.value;
}
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
              v-for="application in applications"
              :key="application._id"
              class="bg-white p-10 rounded-xl shadow-lg border border-gray-100"
            >
              <!-- {{ application }} -->
              <ApplicationCard :application="application" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
