<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const orderStore = useOrder()
const userStore = useAuth()

let order = ref()
let res = await orderStore.getById(route.params.id.toString())

if (res) {
  order.value = res.data.value
}

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
  new Date(order.value.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
)

const endDate = computed(() =>
  getEndDate(order.value.date, order.value.startTime, order.value.hours)
)

const endTime = computed(() =>
  getEndTime(order.value.startTime, order.value.hours)
)
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
        <div class="bg-white p-3 md:p-10 rounded-xl shadow-lg border border-gray-100">
          <v-col cols="12" class="flex flex-col md:flex-row justify-between">
            <p class="text-2xl md:text-4xl font-bold text-gray-900">{{ order.title }}</p>

            <!-- Оплата -->
            <div class="text-right">
              <template v-if="order.paymentType === 'hourly'">
                <p class="text-xl font-medium text-gray-700">{{ order.hours }} ч × {{ Math.round(order.budget /
                  order.hours) }} ₽/ч</p>
                <p class="text-2xl md:text-3xl font-bold text-gray-900">{{ order.budget.toLocaleString('ru-RU') }} ₽</p>
              </template>
              <template v-else>
                <p class="text-lg font-medium text-gray-700">Смена: {{ order.hours }} ч</p>
                <p class="text-2xl md:text-3xl font-bold text-gray-900">{{ order.budget.toLocaleString('ru-RU') }} ₽</p>
              </template>
            </div>
          </v-col>

          <v-col cols="12" class="mb-4">
            <p>{{ order.description }}</p>
          </v-col>

          <v-col cols="12">
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

            <div class="flex flex-col md:flex-row justify-between">
              <div class="flex items-center gap-2 mb-8">
                <i class="mdi mdi-map-marker text-indigo-600"></i>
                <p class="font-semibold">{{ order.address }}</p>
              </div>

              <div v-if="userStore.currentRole === 'worker' || userStore.user?.worker_name">
                <button @click="router.push(`/apply/${order._id}`)"
                  class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
                  Откликнуться
                </button>
              </div>
              <div v-else>
                <button @click="router.push(`/employer/sign-worker`)"
                  class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
                  Откликнуться
                </button>
              </div>
            </div>
          </v-col>

          <!-- Блок "О компании" -->
          <!-- <v-col cols="12">
            <div class="mt-6 border-t pt-6">
              <p class="text-xl font-bold mb-4 text-gray-900">О компании</p>
              <div class="grid md:grid-cols-2 gap-y-4 text-gray-700 mb-4">
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-domain text-indigo-600"></i>
                  <span class="font-semibold">Наименование:</span>
                  <span>{{ employerInfo.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-card-account-details text-indigo-600"></i>
                  <span class="font-semibold">ИНН:</span>
                  <span>{{ employerInfo.inn }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-certificate text-indigo-600"></i>
                  <span class="font-semibold">ОГРН:</span>
                  <span>{{ employerInfo.ogrn }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-phone text-indigo-600"></i>
                  <span class="font-semibold">Телефон:</span>
                  <span>{{ employerInfo.phone }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-email text-indigo-600"></i>
                  <span class="font-semibold">Email:</span>
                  <span>{{ employerInfo.email }}</span>
                </div>
              </div>

              <p class="text-gray-700 mb-4">{{ employerInfo.description }}</p>

              <div class="flex items-center gap-2">
                <i class="mdi mdi-star text-yellow-500" v-for="i in Math.floor(employerInfo.rating)" :key="i"></i>
                <i class="mdi mdi-star-half-full text-yellow-500" v-if="employerInfo.rating % 1 >= 0.5"></i>
                <i class="mdi mdi-star-outline text-gray-400" v-for="i in 5 - Math.ceil(employerInfo.rating)" :key="'empty' + i"></i>
                <span class="ml-2 font-semibold text-gray-700">{{ employerInfo.rating.toFixed(1) }} / 5.0</span>
              </div>
            </div>
          </v-col> -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
