<script setup lang="ts">
import { toast } from "vue3-toastify"

const router = useRouter()
const route = useRoute()
const orderStore = useOrder()
const userStore = useAuth()

useSeoMeta({
  title: 'Детали заказа ',
  description: 'Подробная информация о заказе: описание, адрес, дата и условия оплаты. Откликайтесь или делитесь ссылкой на объявление.',
  ogTitle: 'Детали заказа ',
  ogDescription: 'Подробная информация о заказе: описание, адрес, дата и условия оплаты. Откликайтесь или делитесь ссылкой на объявление.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-order-detail.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  /*
  link: [
    { rel: 'canonical', href: `https://nirby.ru${route.path}` }
  ],
  htmlAttrs: { lang: 'ru' }
  */
})

const order = ref()
const res = await orderStore.getById(route.params.id.toString())

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

function copyLink() {
  const resolved = router.resolve({
    name: route.name,
    params: route.params,
    query: route.query,
  })

  const url = window.location.origin + resolved.href

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


            <div class="text-right">
              <template v-if="order.paymentType === 'hourly'">
                <p class="text-xl font-medium text-gray-700">{{ order.hours }} ч × {{ Math.round(order.budget /
                  order.hours) }} ₽/ч</p>
                <p class="text-2xl md:text-3xl font-bold text-gray-900">{{ order.budget.toLocaleString('ru-RU') }} ₽</p>
              </template>
              <template v-else-if="order.paymentType === 'deal'">
                <p class="text-lg font-medium text-gray-700">Сдельная оплата</p>
                <p class="text-2xl md:text-3xl font-bold text-gray-900">{{ order.budget.toLocaleString('ru-RU') }} ₽</p>
              </template>
              <template v-else>
                <p class="text-lg font-medium text-gray-700">Смена: {{ order.hours }} ч</p>
                <p class="text-2xl md:text-3xl font-bold text-gray-900">{{ order.budget.toLocaleString('ru-RU') }} ₽</p>
              </template>
            </div>
          </v-col>

          <v-col cols="12" class="mb-4">
            <ClientOnly>
              <p v-html="order.description" />
            </ClientOnly>
          </v-col>

          <v-col cols="12">
            <div class="flex flex-col mb-3">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <i class="mdi mdi-calendar-range text-indigo-600" />
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
                  <i class="mdi mdi-clock-outline text-indigo-600" />
                  <span class="font-semibold">
                    {{ order.startTime }} - {{ endTime }}
                  </span>
                  <div v-if="order.paymentType === 'shift'" class="flex items-center gap-2">
                    <span>(Смена: {{ order.hours }} {{ getHourWord(order.hours) }})</span>
                  </div>

                  <div v-else class="flex items-center gap-2">
                    <span>({{ order.hours }} {{ getHourWord(order.hours) }})</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between">
              <div class="flex items-center gap-2 mb-8">
                <i class="mdi mdi-map-marker text-indigo-600" />
                <p class="font-semibold">{{ order.address }}</p>
              </div>

              <div v-if="userStore.currentRole === 'worker' || userStore.user?.worker_name"
                class="flex items-center gap-2">
                <button
                  class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold h-10"
                  @click="!userStore.user ? router.push('/reg') : router.push(`/apply/${order._id}`)">
                  Откликнуться
                </button>

                <button
                  class="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                  @click="copyLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92" />
                  </svg>
                </button>
              </div>

              <div v-else class="flex items-center gap-2">
                <button
                  class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold h-10"
                  @click="!userStore.user ? router.push('/reg') : router.push(`/employer/sign-worker`)">
                  Откликнуться
                </button>

                <button
                  class="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                  @click="copyLink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92" />
                  </svg>
                </button>
              </div>
            </div>
          </v-col>


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
