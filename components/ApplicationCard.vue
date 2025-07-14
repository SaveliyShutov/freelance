<script setup lang="ts">
const { application } = defineProps(["application"]);

// function getStatusClass(status: 'в расмотрении' | 'одобрено' | 'отклонен'): string {
//   const classes: Record<typeof status, string> = {
//     'в расмотрении': 'bg-yellow-100 text-yellow-800',
//     'одобрено': 'bg-green-100 text-green-800',
//     'отклонен': 'bg-red-100 text-red-800',
//   };

//   return classes[status];
// }

// Проверяем, указана ли дата
const hasDate = computed(() => application.order.date !== null && application.order.date !== undefined)
// Проверяем, есть ли время старта
const hasStartTime = computed(() => typeof application.order.startTime === 'string' && application.order.startTime !== '0')

// Лексика часов
function getHourWord(n: number): string {
  const lastDigit = n % 10
  const lastTwoDigits = n % 100
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'часов'
  if (lastDigit === 1) return 'час'
  if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
  return 'часов'
}

// Вычисляем окончание времени
function getEndTime(start: string, duration: number): string {
  const [h, m] = start.split(':').map(s => parseInt(s, 10))
  const totalMinutes = h * 60 + m + duration * 60
  const wrapped = totalMinutes % (24 * 60)
  const endH = Math.floor(wrapped / 60)
  const endM = wrapped % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

// Вычисляем окончание даты
function getEndDate(startDate: Date, start: string, duration: number): string {
  const [h, m] = start.split(':').map(s => parseInt(s, 10))
  const totalMinutes = h * 60 + m + duration * 60
  const daysToAdd = Math.floor(totalMinutes / (24 * 60))
  const endDate = new Date(startDate)
  if (daysToAdd > 0) endDate.setDate(endDate.getDate() + daysToAdd)
  return endDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
}

// Форматирование дат и времени
const startDate = computed(() => hasDate.value
  ? new Date(application.order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
  : '')

const endDate = computed(() => {
  if (!hasDate.value || !hasStartTime.value) return ''
  return getEndDate(new Date(application.order.date), application.order.startTime! as string, application.order.hours)
})

const endTime = computed(() => {
  if (!hasDate.value || !hasStartTime.value) return ''
  return getEndTime(application.order.startTime! as string, application.order.hours)
})

// Прочие данные
const hasImages = computed(() => Array.isArray(application.order.images) && application.order.images.length > 0)
</script>

<template>
  <v-row>
    <v-col v-if="application?.order" cols="12">
      <v-row class="flex flex-col md:flex-row">
        <v-col cols="12" md="8">
          <!-- Заголовок -->
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ application.order.title }}</h3>
          <!-- Заказчик -->
          <p class="text-lg text-indigo-600 mb-2">{{ application.order.employer_name }}</p>

          <!-- Адрес -->
          <div v-if="application.order.address" class="flex items-center gap-2 mb-2">
            <i class="mdi mdi-map-marker text-indigo-600"></i>
            <span>{{ application.order.address }}</span>
          </div>

          <!-- Дата, время и продолжительность -->
          <div class="flex flex-col mb-3">
            <div v-if="hasDate" class="flex flex-col gap-1">
              <!-- Диапазон или одиночная дата -->
              <div class="flex items-center gap-2">
                <i class="mdi mdi-calendar-range text-indigo-600"></i>
                <span class="font-semibold">
                  <template v-if="endDate !== startDate">
                    {{ startDate }} - {{ endDate }}
                  </template>
                  <template v-else>
                    {{ startDate }}
                  </template>
                </span>
              </div>
              <!-- Время с расчётом окончания и часов -->
              <div v-if="hasStartTime" class="flex items-center gap-2">
                <i class="mdi mdi-clock-outline text-indigo-600"></i>
                <span class="font-semibold">
                  {{ application.order.startTime }} - {{ endTime }}
                </span>
                <span>( {{ application.order.hours }} {{ getHourWord(application.order.hours) }} )</span>
              </div>
            </div>
            <!-- Если даты нет, показываем только часы/смену -->
            <div v-else class="flex items-center gap-2">
              <i class="mdi mdi-clock-outline text-indigo-600"></i>
              <span class="font-semibold">
                <template v-if="application.order.paymentType === 'hourly'">
                  {{ application.order.hours }} {{ getHourWord(application.order.hours) }}
                </template>
                <template v-else>
                  Смена {{ application.order.hours }} {{ getHourWord(application.order.hours) }}
                </template>
              </span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="flex flex-col justify-between">
          <div class="text-right mb-4 space-y-1">
            <template v-if="application.order.paymentType === 'hourly'">
              <p class="text-sm text-gray-500">Оплата за час:</p>
              <p class="text-lg font-semibold text-indigo-700">
                {{ Math.round(application.order.budget / application.order.hours) }}₽
              </p>
              <p class="text-sm text-gray-500">Итоговая сумма:</p>
              <p class="text-2xl font-bold">
                {{ application.order.budget.toLocaleString('ru-RU') }}₽
              </p>
            </template>
            <template v-else>
              <p class="text-sm text-gray-500">Оплата за смену:</p>
              <p class="text-2xl font-bold">
                {{ application.order.budget.toLocaleString('ru-RU') }}₽
              </p>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else cols="12" class="w-full text-center text-gray-500 py-6 bg-gray-100 rounded-lg">
      Заказ был удален
    </v-col>

    <v-col cols="12">
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
