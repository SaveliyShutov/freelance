<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const orderStore = useOrder()

let order = ref()
let res = await orderStore.getById(route.params.id.toString())

if (res) {
  order.value = res.data.value
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="my-8">
        <BackButton />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <v-col cols="12" class="flex justify-between">
            <p class="text-4xl font-bold text-gray-900">{{ order.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ order.budget }} ₽ / {{ order.hours }} часов</p>
          </v-col>
          <v-col cols="12">
            <p>{{ order.description }}</p>
          </v-col>
          <v-col cols="12">
            <div class="flex flex-row justify-between">
              <div class="flex items-center gap-2 mb-2">
                <i class="mdi mdi-map-marker text-indigo-600"></i>
                <p class="font-semibold">{{ order.address }}</p>
              </div>
              <ApplyButton />
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
              <div class="flex items-center gap-2">
                <i class="mdi mdi-clock-time-three text-indigo-600"></i>
                <p class="font-semibold">{{ order.hours }} часов</p>
              </div>
              <div class="flex items-center gap-2">
                <i class="mdi mdi-calendar-range text-indigo-600"></i>
                <p class="font-semibold"> {{ order.date }}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <!-- <ShortProfileCard @click="router.push('/profile/1')" :profile="order.employer_id" /> -->
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>