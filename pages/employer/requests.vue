<script setup lang="ts">
import sadPicture from "~/assets/mansad.png";

const router = useRouter()

definePageMeta({
  middleware: ["employer"],
});

const orderStore = useOrder();
await orderStore.getOrdersWithApplications();

async function acceptApplication(application_id: string) {
  let res = await orderStore.acceptApplication(application_id);
  if (res.data.value) {
    await orderStore.getOrdersWithApplications()
  }
}

async function declineApplication(application_id: string) {
  let res = await orderStore.declineApplication(application_id);
  if (res.data.value) {
    await orderStore.getOrdersWithApplications()
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 md:my-8 mb-4 md:mb-8">Мои заказы</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="space-y-8">
          <div class="space-y-6">
            <div v-if="orderStore.my_orders_with_applications.length > 0"
              v-for="order in orderStore.my_orders_with_applications" :key="order._id"
              class="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100">
              <OrderCard :order="order" />
            </div>
            <div v-else class="flex flex-col justify-center items-center text-center">
              <p>У вас нет активных заказов</p>
              <button @click="router.push('/employer/create-order')"
                class="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
                Разместить заказ
              </button>
              <img :src="sadPicture" class="mt-2 w-64 h-64" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
