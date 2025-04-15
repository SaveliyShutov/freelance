<script setup>
definePageMeta({
  middleware: ["employer"],
})

const orderStore = useOrder()

let orders = ref()

let res = await orderStore.getOrdersWithApplications()
if (res?.data.value) {
  orders.value = res.data.value
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
         
            <div v-for="order in orders" :key="order.id"
              class=" bg-white p-10 rounded-xl shadow-lg border border-gray-100">
              <OrderCard :order="order" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>