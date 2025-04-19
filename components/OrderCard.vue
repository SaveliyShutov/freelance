<script setup>
const { order } = defineProps(["order"]);
const emit = defineEmits(["acceptApplication", "declineApplication"])
const orderStore = useOrder();

async function accept(application_id) {
  emit("acceptApplication", application_id)
}

async function decline(application_id) {
  let res = await orderStore.declineApplication(application_id);
  if (res?.data.value) {
    console.log(res.data.value);
  }
}
</script>
<template>
  <v-row>
    <v-col cols="12" md="8">
      <div class="mb-3">
        <h3 class="text-xl font-semibold text-gray-900">{{ order.title }}</h3>
        <p class="text-lg text-indigo-600">{{ order.employer_name }}</p>
      </div>

      <div class="flex items-center gap-2 mb-2">
        <i class="mdi mdi-map-marker text-indigo-600"></i>
        <span>{{ order.address }}</span>
      </div>

      <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
        <div class="flex items-center gap-2">
          <i class="mdi mdi-clock-time-three text-indigo-600"></i>
          <span>{{ order.hours }}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="mdi mdi-calendar-range text-indigo-600"></i>
          <span> {{ order.date }}</span>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="4" class="flex flex-col justify-between">
      <div class="text-right mb-4">
        <p class="text-2xl font-bold">{{ order.budget }} ₽</p>
      </div>
    </v-col>
    <v-col>
      <p class="text-xl font-bold text-gray-900">Заявки</p>
      <div
        v-if="order.applications.length"
        v-for="application in order.applications"
        :key="application.id"
        class="bg-gray-50 p-4 rounded-lg"
      >
        <v-row>
          <v-col cols="12" md="6">
            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div
                class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center"
              >
                <span class="text-xl font-semibold text-indigo-600">
                  {{ application.initials.charAt(0) }}
                </span>
              </div>
              <!-- Name and Rating -->
              <div>
                <p class="font-bold text-gray-900">{{ application.initials }}</p>
                <p class="font-regular text-gray-700">{{ application.letter }}</p>
                <!-- <StarsRating rating="2.2" /> -->
              </div>
            </div>
          </v-col>
          <v-col
            v-if="application?.status == 'в расмотрении'"
            cols="12"
            md="6"
            class="flex items-center justify-end gap-2"
          >
            <button
              @click="accept(application._id)"
              class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold"
            >
              Принять
            </button>
            <button
              @click="decline(application._id)"
              class="text-black border px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-bold"
            >
              Отказать
            </button>
          </v-col>
          <v-col
            v-if="application?.status == 'одобрено'"
            cols="12"
            md="6"
            class="flex items-center font-bold justify-end gap-2 text-green-500"
          >
            {{ application.status }}
          </v-col>
          <v-col
            v-if="application?.status == 'отказано'"
            cols="12"
            md="6"
            class="flex items-center font-bold justify-end gap-2 text-red-500"
          >
            {{ application.status }}
          </v-col>
        </v-row>
      </div>
      <div v-else>Нет заявок</div>
    </v-col>
  </v-row>
</template>
