<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const orderStore = useOrder()
const auth = useAuth()
const router = useRouter()


useSeoMeta({
  title: 'Создание объявления ',
  description: 'Создайте новое объявление о подработке, укажите название работы, описание, место, дату и бюджет.',
  ogTitle: 'Создание объявления ',
  ogDescription: 'Создайте новое объявление о подработке, укажите название работы, описание, место, дату и бюджет.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-create-order.jpg',
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

definePageMeta({
  middleware: ["employer"],
})

const jobTypes = [
  'Доставка',
  'Переводчик',
  'Репетитор',
  'Кейтеринг',
  'Грузчик',
  'Сиделка',
  'Охрана',
  'Чистка крыши',
  'Другое'
]

const { meta, handleSubmit, handleReset, validate } = useForm<{
  title: string,
  type: string,
  address: string,
  description: string,
  budget: number,
  date: string,
  hours: number,

}>({
  initialValues: {
    title: '',
    type: '',
    address: '',
    description: '',
    date: '',
    hours: 0,
  },
  validationSchema: {
    title(value: string) {
      if (value?.length === 0) return 'введите название работы'
      if (value?.length < 2) return 'слишком короткое название'
      if (value?.length > 500) return 'слишком длинное название'

      return true
    },
    type(value: string) {
      if (value?.length === 0) return 'выбирете тип работы'
      return true
    },
    address(value: string) {
      if (value?.length === 0) return 'введите адрес'
      if (value?.length < 2) return 'слишком короткий адрес'
      if (value?.length > 500) return 'слишком длинный адрес'
      return true
    },
    date(value: string) {
      if (value?.length === 0) return 'введите дату'
      return true
    },
    description(value: string) {
      if (value?.length === 0) return 'введите описание'
      if (value?.length < 2) return 'слишком короткое описание'
      if (value?.length > 5000) return 'слишком длинное описание'
      return true
    },
    hours(value: number) {
      if (!value) return 'введите колличество часов'
      return true
    },
  },
})

const title = useField<string>('title')
const type = useField<string>('type')
const address = useField<string>('address')
const budget = useField<number>('budget')
const date = useField<string>('date')
const hours = useField<number>('hours')
const description = useField<string>('description')

const loading = ref(false)
const show_password = ref(false)
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900 my-8 m  b-8">Создание объявления</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <v-form class="mt-6 w-100">
            <label class="block text-sm font-medium text-gray-700 mb-1">Введите название работы</label>
            <v-text-field v-model="title.value.value" base-color="#9e9e9e" color="primary"
              :error-messages="title.errors.value" type="title" variant="outlined" />

            <label class="block text-sm font-medium text-gray-700 mb-1">Вид деятельности</label>
            <v-combobox v-model="type.value.value" base-color="#9e9e9e" color="primary"
              :error-messages="type.errors.value" type="type" variant="outlined" :items="jobTypes" />

            <label class="block text-sm font-medium text-gray-700 mb-1">Введите описание работы</label>
            <v-textarea v-model="description.value.value" base-color="#9e9e9e" color="primary"
              :error-messages="description.errors.value" type="description" variant="outlined" />

            <div class="w-100 flex justify-between">
              <div class="w-50 mr-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Введите место работы, адрес</label>
                <v-text-field v-model="address.value.value" base-color="#9e9e9e" color="primary"
                  :error-messages="address.errors.value" class="w-100" placeholder="Пермь, ул. Ленина 45" type="address"
                  variant="outlined" density="compact" />
              </div>
              <div class="w-50 ml-2">
                <label class="block t ext-sm font-medium text-gray-700 mb-1">Сколько заплатите?</label>
                <v-text-field v-model="budget.value.value" base-color="#9e9e9e" color="primary"
                  :error-messages="budget.errors.value" class="w-100" label="Бюджет" type="budget" variant="outlined"
                  density="compact" />
              </div>
            </div>
            <div class="w-100 flex justify-between">
              <div class="w-50 mr-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата начала работ</label>
                <v-text-field v-model="date.value.value" base-color="#9e9e9e" color="primary"
                  :error-messages="date.errors.value" class="w-100" type="date" variant="outlined" density="compact" />
              </div>

              <div class="w-50 ml-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Время выполнения (в часах)</label>
                <v-text-field v-model="hours.value.value" base-color="#9e9e9e" color="primary"
                  :error-messages="hours.errors.value" class="w-100" type="hours" variant="outlined"
                  density="compact" />
              </div>
            </div>

            <v-col cols="12" class="text-right">
              <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading"
                @click="router.push('/reg')">
                Разместить
              </v-btn>
            </v-col>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>