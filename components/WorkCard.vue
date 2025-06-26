<script setup lang="ts">
import type { Order } from '~/types/order.interface'
const props = defineProps<{ order: Order }>()

function getHourWord(n: number): string {
  const lastDigit = n % 10
  const lastTwoDigits = n % 100
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'часов'
  if (lastDigit === 1) return 'час'
  if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
  return 'часов'
}

function getEndTime(start: string, duration: number): string {
  const [h, m] = start.split(':').map(s => parseInt(s, 10))
  const totalMinutes = h * 60 + m + duration * 60
  const minutesInDay = 24 * 60
  const wrapped = totalMinutes % minutesInDay
  const endH = Math.floor(wrapped / 60)
  const endM = wrapped % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

function getEndDate(startDate: Date, start: string, duration: number): string {
  const [h, m] = start.split(':').map(s => parseInt(s, 10))
  const totalMinutes = h * 60 + m + duration * 60
  const daysToAdd = Math.floor(totalMinutes / (24 * 60))
  const endDate = new Date(startDate)
  if (daysToAdd > 0) {
    endDate.setDate(endDate.getDate() + daysToAdd)
  }
  return endDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
}

const startDate = computed(() =>
  new Date(props.order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
)

const endDate = computed(() =>
  getEndDate(props.order.date, props.order.startTime, props.order.hours)
)

const endTime = computed(() =>
  getEndTime(props.order.startTime, props.order.hours)
)
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

      <div class="flex flex-col mb-3">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-calendar-range text-indigo-600"></i>
            <span v-if="order.startTime !== '0'" class="font-semibold">
              <template v-if="endDate !== startDate">
                {{ startDate }} - {{ endDate }}
              </template>
              <template v-else>
                {{ startDate }}
              </template>
            </span>
            <span v-else class="font-semibold">{{ startDate }}</span>
          </div>
          <div v-if="order.startTime !== '0'" class="flex flex-row items-center gap-2">
            <i class="mdi mdi-clock-outline text-indigo-600"></i>
            <span class="font-semibold">
              {{ order.startTime }} - {{ endTime }}
            </span>
            <div class="flex items-center gap-2" v-if="order.paymentType === 'shift'">
              <span>(Смена: {{ order.hours }} {{ getHourWord(order.hours) }})</span>
            </div>

            <div class="flex items-center gap-2" v-else>
              <span>({{ order.hours }} {{ getHourWord(order.hours) }})</span>
            </div>
          </div>
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
