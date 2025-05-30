<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { Order } from '~/types/order.interface'

let orderStore = useOrder()
let auth = useAuth()
let router = useRouter()

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

let title = useField<string>('title')
let type = useField<string>('type')
let address = useField<string>('address')
let budget = useField<number>('budget')
let date = useField<string>('date')
let hours = useField<number>('hours')
let description = useField<string>('description')

let loading = ref(false)
let show_password = ref(false)
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
            <v-text-field base-color="#9e9e9e" color="primary" :error-messages="title.errors.value" type="title"
              variant="outlined" v-model="title.value.value"></v-text-field>

            <label class="block text-sm font-medium text-gray-700 mb-1">Вид деятельности</label>
            <v-combobox base-color="#9e9e9e" color="primary" :error-messages="type.errors.value" type="type"
              variant="outlined" :items="jobTypes" v-model="type.value.value"></v-combobox>

            <label class="block text-sm font-medium text-gray-700 mb-1">Введите описание работы</label>
            <v-textarea base-color="#9e9e9e" color="primary" :error-messages="description.errors.value"
              type="description" variant="outlined" v-model="description.value.value"></v-textarea>

            <div class="w-100 flex justify-between">
              <div class="w-50 mr-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Введите место работы, адрес</label>
                <v-text-field base-color="#9e9e9e" color="primary" :error-messages="address.errors.value" class="w-100"
                  placeholder="Пермь, ул. Ленина 45" v-model="address.value.value" type="address" variant="outlined"
                  density="compact" />
              </div>
              <div class="w-50 ml-2">
                <label class="block t ext-sm font-medium text-gray-700 mb-1">Сколько заплатите?</label>
                <v-text-field base-color="#9e9e9e" color="primary" :error-messages="budget.errors.value" class="w-100"
                  label="Бюджет" v-model="budget.value.value" type="budget" variant="outlined" density="compact" />
              </div>
            </div>
            <div class="w-100 flex justify-between">
              <div class="w-50 mr-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата начала работ</label>
                <v-text-field base-color="#9e9e9e" color="primary" :error-messages="date.errors.value" class="w-100"
                  v-model="date.value.value" type="date" variant="outlined" density="compact" />
              </div>

              <div class="w-50 ml-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Время выполнения (в часах)</label>
                <v-text-field base-color="#9e9e9e" color="primary" :error-messages="hours.errors.value" class="w-100"
                  v-model="hours.value.value" type="hours" variant="outlined" density="compact" />
              </div>
            </div>

            <v-col cols="12" class="text-right">
              <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading" @click = "router.push('/reg')">
                Разместить
              </v-btn>
            </v-col>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>