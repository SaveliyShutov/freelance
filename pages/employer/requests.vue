<script setup lang="ts">
definePageMeta({
  middleware: ["employer"],
});

const orderStore = useOrder();

let orders = ref();

let { my_orders_with_applications } = storeToRefs(orderStore);

await orderStore.getOrdersWithApplications();

if (my_orders_with_applications?.value) {
  orders.value = my_orders_with_applications.value;
}

async function acceptApplication(application_id: string) {
  let res = await orderStore.acceptApplication(application_id);
  if (res.data.value) {
    console.log(res.data.value);
  }
}

async function declineApplication(application_id: string) {
  let res = await orderStore.declineApplication(application_id);
  if (res.data.value) {
    console.log(res.data.value);
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8">Мои заказы</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="space-y-8">
          <div class="space-y-6">
            <div
              v-for="order in orders"
              :key="order.id"
              class="bg-white p-10 rounded-xl shadow-lg border border-gray-100"
            >
              <OrderCard
                @acceptApplication="acceptApplication"
                @declineApplication="declineApplication"
                :order="order"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
