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

// const employerInfo = {
//   name: order.value?.employer_name ?? 'ООО «ПрофСтройСервисПермь»"',
//   inn: '12345678905901234567',
//   ogrn: '1215900001234',
//   phone: '+7 (342) 288-78-19',
//   email: 'info@company.ru',
//   description: 'ООО «ПрофСтройСервисПермь» — компания с 10-летним опытом в сфере строительных и ремонтных работ. Мы предоставляем временную занятость для специалистов и студентов, а также гарантируем честные условия, своевременную оплату и надёжных заказчиков.',
//   rating: 4.3
// }

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
            <div class="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              <div class="flex items-center gap-2">
                <i class="mdi mdi-clock-time-three text-indigo-600"></i>
                <p class="font-semibold">{{ order.hours }} {{ getHourWord(order.hours) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <i class="mdi mdi-calendar-range text-indigo-600"></i>
                <span v-if="order.startTime != '0'" class="font-semibold">
                  {{ new Date(order.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' }) }}
                  с {{ order.startTime }} до {{ getEndTime(order.startTime, order.hours) }}
                </span>
                <span v-else class="font-semibold">{{ new Date(order.date).toLocaleDateString('ru-RU',
                  { day: '2-digit', month: 'long' }) }}</span>
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
