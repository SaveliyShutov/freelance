<script setup lang="ts">
const { order } = defineProps(['order'])

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

function getEndTime(start: string, duration: number): string {
  const [h, m] = start.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(h, m, 0, 0);
  startDate.setHours(startDate.getHours() + duration);

  const hours = String(startDate.getHours()).padStart(2, '0');
  const minutes = String(startDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
</script>
<template>
  <v-row>
    <v-col cols="12" md="8">
      <div class="mb-3">
        <h3 class="text-xl font-bold text-gray-900">{{ order.title }}</h3>
        <p class="text-lg text-indigo-600">{{ order.employer_name }}</p>
      </div>

      <div class="flex items-center gap-2 mb-2">
        <i class="mdi mdi-map-marker text-indigo-600"></i>
        <span>{{ order.address }}</span>
      </div>

      <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
        <div class="flex items-center gap-2">
          <i class="mdi mdi-calendar-range text-indigo-600"></i>
          <span v-if="order.startTime != '0'" class="font-semibold">
            {{ new Date(order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' }) }}
            с {{ order.startTime }} до {{ getEndTime(order.startTime, order.hours) }}
          </span>
          <span v-else class="font-semibold">{{ new Date(order.date).toLocaleDateString('ru-RU',
            { day: '2-digit', month: 'long' }) }}</span>
        </div>

        <div class="flex items-center gap-2" v-if="order.paymentType === 'shift'">
          <i class="mdi mdi-timer-sand text-indigo-600"></i>
          <span>Смена: {{ order.hours }} {{ getHourWord(order.hours) }}</span>
        </div>

        <div class="flex items-center gap-2" v-else>
          <i class="mdi mdi-clock-outline text-indigo-600"></i>
          <span>{{ order.hours }} {{ getHourWord(order.hours) }}</span>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="4" class="flex flex-col justify-between">
      <div class="text-right mb-4 space-y-1">
        <template v-if="order.paymentType === 'hourly'">
          <p class="text-sm text-gray-500">Оплата за час:</p>
          <p class="text-lg font-semibold text-indigo-700">
            {{ Math.round(order.budget / order.hours) }}₽
          </p>
          <p class="text-sm text-gray-500">Итоговая сумма:</p>
          <p class="text-2xl font-bold">{{ order.budget.toLocaleString('ru-RU') }}₽</p>
        </template>

        <template v-else>
          <p class="text-sm text-gray-500">Оплата за смену:</p>
          <p class="text-2xl font-bold">{{ order.budget.toLocaleString('ru-RU') }}₽</p>
        </template>
      </div>

      <div class="text-right">
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
          Откликнуться
        </button>
      </div>
    </v-col>
  </v-row>
</template>