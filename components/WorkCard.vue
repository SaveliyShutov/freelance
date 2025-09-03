<script setup lang="ts">
import { computed } from 'vue'
import type { Order } from '~/types/order.interface'
const props = defineProps<{ order: Order }>()
import { toast } from "vue3-toastify"

let router = useRouter()
let route = useRoute()

// Проверяем, указана ли дата
const hasDate = computed(() => props.order.date !== null && props.order.date !== undefined)
// Проверяем, есть ли время старта
const hasStartTime = computed(() => typeof props.order.startTime === 'string' && props.order.startTime !== '0')

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
  ? new Date(props.order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
  : '')

const endDate = computed(() => {
  if (!hasDate.value || !hasStartTime.value) return ''
  return getEndDate(new Date(props.order.date), props.order.startTime! as string, props.order.hours)
})

const endTime = computed(() => {
  if (!hasDate.value || !hasStartTime.value) return ''
  return getEndTime(props.order.startTime! as string, props.order.hours)
})

// Прочие данные
const hasImages = computed(() => Array.isArray(props.order.images) && props.order.images.length > 0)

function copyLink() {
  const url = window.location.origin + `/order/${props.order._id}`

  navigator.clipboard.writeText(url).then(() => {
    toast.success("Ссылка скопирована!", {
      autoClose: 2000,
    })
  }).catch(() => {
    toast.error("Ошибка при копировании!", {
      autoClose: 2000,
    })
  })
}
</script>

<template>
  <v-row>
    <v-col @click="router.push(`/order/${props.order._id}`)" cols="12" md="8">
      <!-- Заголовок -->
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ props.order.title }}</h3>
      <!-- Заказчик -->
      <p class="text-lg text-indigo-600 mb-2">{{ props.order.employer_name }}</p>

      <!-- Адрес -->
      <div v-if="props.order.address" class="flex items-center gap-2 mb-2">
        <i class="mdi mdi-map-marker text-indigo-600"></i>
        <span>{{ props.order.address }}</span>
      </div>

      <!-- Дата и время или договоренность -->
      <div class="flex flex-col mb-3">
        <div v-if="hasDate" class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-calendar-range text-indigo-600"></i>
            <span v-if="hasStartTime" class="font-semibold">
              <template v-if="endDate !== startDate">
                {{ startDate }} - {{ endDate }}
              </template>
              <template v-else>
                {{ startDate }}
              </template>
            </span>
            <span v-else class="font-semibold">{{ startDate }}</span>
          </div>
          <div v-if="hasStartTime" class="flex items-center gap-2">
            <i class="mdi mdi-clock-outline text-indigo-600"></i>
            <span class="font-semibold">
              {{ props.order.startTime }} - {{ endTime }}
            </span>
            <span>(
              {{ props.order.hours }} {{ getHourWord(props.order.hours) }}
              )</span>
          </div>
        </div>
        <div v-else class="flex items-center gap-2">
          <div v-if="props.order.paymentType === 'hourly'" class="flex items-center gap-2">
            <i class="mdi mdi-clock-outline text-indigo-600"></i>
            <span class="font-semibold">
              {{ props.order.hours }} {{ getHourWord(props.order.hours) }}
            </span>
          </div>
          <div v-else class="flex items-center gap-2">
            <i class="mdi mdi-clock-outline text-indigo-600"></i>
            <span class="font-semibold">
              Смена {{ props.order.hours }} {{ getHourWord(props.order.hours) }}
            </span>
          </div>
        </div>
      </div>
    </v-col>

    <!-- Правая часть: изображения и оплата -->
    <v-col cols="12" md="4" class="flex flex-col justify-between">
      <!-- Изображения -->
      <!-- <div v-if="hasImages" class="mb-4 grid grid-cols-2 gap-2">
        <img v-for="(img, idx) in props.order.images" :key="idx" :src="img.url || img" alt="image"
          class="object-cover rounded-lg h-24 w-full" />
      </div> -->

      <!-- Оплата -->
      <div class="text-right mb-4 space-y-1">
        <template v-if="props.order.paymentType === 'hourly'">
          <p class="text-sm text-gray-500">Оплата за час:</p>
          <p class="text-lg font-semibold text-indigo-700">
            {{ Math.round(props.order.budget / props.order.hours) }}₽
          </p>
          <p class="text-sm text-gray-500">Итоговая сумма:</p>
          <p class="text-2xl font-bold">
            {{ props.order.budget.toLocaleString('ru-RU') }}₽
          </p>
        </template>
        <template v-else>
          <p class="text-sm text-gray-500">Оплата за смену:</p>
          <p class="text-2xl font-bold">
            {{ props.order.budget.toLocaleString('ru-RU') }}₽
          </p>
        </template>
      </div>
      <div class="flex justify-end items-center gap-2">
        <button @click="router.push(`/order/${props.order._id}`)"
          class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold h-10">
          Откликнуться
        </button>

        <button @click.stop="copyLink"
          class="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92" />
          </svg>
        </button>
      </div>
    </v-col>
  </v-row>
</template>
