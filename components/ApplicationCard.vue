<script setup lang="ts">
const { application } = defineProps(["application"]);

function getStatusClass(status: 'в расмотрении' | 'одобрено' | 'отклонен'): string {
  const classes: Record<typeof status, string> = {
    'в расмотрении': 'bg-yellow-100 text-yellow-800',
    'одобрено': 'bg-green-100 text-green-800',
    'отклонен': 'bg-red-100 text-red-800',
  };

  return classes[status];
}

function getHourWord(n: number) {
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'часов';
  }

  if (lastDigit === 1) return 'час';
  if (lastDigit >= 2 && lastDigit <= 4) return 'часа';
  return 'часов';
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="8">
      <div class="mb-3">
        <h3 class="text-xl font-semibold text-gray-900">{{ application.order.title }}</h3>
        <p class="text-lg text-indigo-600">{{ application.order.employer_name }}</p>
      </div>

      <div class="flex items-center gap-2 mb-2">
        <i class="mdi mdi-map-marker text-indigo-600"></i>
        <span>{{ application.order.address }}</span>
      </div>

      <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
        <div class="flex items-center gap-2">
          <i class="mdi mdi-clock-time-three text-indigo-600"></i>
          <span>{{ application.order.hours }} {{ getHourWord(application.order.hours) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="mdi mdi-calendar-range text-indigo-600"></i>
          <span>{{ new Date(application.order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
          }}</span>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="4" class="flex flex-col justify-between">
      <div class="text-right mb-4">
        <p class="text-2xl font-bold">{{ application.order.budget }}₽</p>
      </div>
    </v-col>

    <v-col>
      <p class="text-xl font-bold text-gray-900">Заявка</p>
      <div class="bg-gray-50 p-4 rounded-lg">
        <v-row>
          <v-col cols="12" md="6">
            <div class="flex items-center gap-4">

              <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-xl font-semibold text-indigo-600">
                  {{ application.initials[0] }}
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ application.initials }}</p>
                <p class="text-sm text-gray-600">Телефон: {{ application.phone }}</p>
              </div>
            </div>
          </v-col>
          <!-- <v-col cols="12" md="6" class="flex items-center justify-end gap-2">
            <span :class="getStatusClass(application.status)" class="px-3 py-1 rounded-full text-sm">
              {{ application.status }}
            </span>
          </v-col> -->
        </v-row>
        <div class="mt-4">
          <p class="text-sm text-gray-700">
            <span class="font-medium">Сопроводительное письмо:</span>
            {{ application.letter }}
          </p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
