<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { Order } from '~/types/order.interface'

let orderStore = useOrder()
let auth = useAuth()

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
  location: string,
  description: string,
  budget: number,
  date: string,
  hours: number,

}>({
  initialValues: {
    title: '',
    type: '',
    location: '',
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
    location(value: string) {
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
let location = useField<string>('location')
let budget = useField<number>('budget')
let date = useField<string>('date')
let hours = useField<number>('hours')
let description = useField<string>('description')

let loading = ref(false)
let show_password = ref(false)

const submit = handleSubmit(async values => {
  // loading.value = true
  // let toSend:Order;
  // if (auth.user?.employer) {
  //   // toSend = { ...values, _id: auth.user?.employer }
  //   toSend = { ...values, _id: '67d6d0f2d4dfc351e71a557c' }
  //   await orderStore.createOrder(toSend)

  // } else {
  //   auth.checkAuth()
  // }

  loading.value = false
})
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
          <v-form class="mt-6 w-100" @submit="submit">
            <v-text-field :error-messages="title.errors.value" type="title" variant="outlined"
              v-model="title.value.value" label="Введите название работы"></v-text-field>

            <v-combobox :error-messages="type.errors.value" type="type" label="Вид работы" variant="outlined"
              :items="jobTypes" v-model="type.value.value"></v-combobox>

            <v-textarea :error-messages="description.errors.value" type="description" variant="outlined"
              v-model="description.value.value" label="Введите описание работы"></v-textarea>

            <div class="w-100 flex justify-between">
              <v-text-field :error-messages="location.errors.value" class="mr-2 w-50"
                label="Место работы, адрес (Пермь, ул. Ленина 45)" v-model="location.value.value" type="location"
                variant="outlined" density="compact" />

              <v-text-field :error-messages="budget.errors.value" class="ml-2 w-50" label="Бюджет"
                v-model="budget.value.value" type="budget" variant="outlined" density="compact" />
            </div>
            <div class="w-100 flex justify-between">
              <v-text-field :error-messages="date.errors.value" class="mr-2 w-50" label="Дата начала работ"
                v-model="date.value.value" type="date" variant="outlined" density="compact" />

              <v-text-field :error-messages="hours.errors.value" class="ml-2 w-50" label="Время работы сколько по часам"
                v-model="hours.value.value" type="hours" variant="outlined" density="compact" />
            </div>

            <v-col cols="12" class="text-right">
              <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
                Разместить
              </v-btn>
            </v-col>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>