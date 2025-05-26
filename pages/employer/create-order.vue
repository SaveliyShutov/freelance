<script setup lang="ts">
import { toast } from "vue3-toastify"
import { useField, useForm } from 'vee-validate'
import type { Order } from '~/types/order.interface'
import { jobTypes } from '~/utils/jobTypes.js'

let orderStore = useOrder()
let auth = useAuth()
let router = useRouter()

definePageMeta({
  middleware: ["employer"],
})

const { meta, handleSubmit, handleReset, validate } = useForm<{
  title: string,
  type?: string,
  address: string,
  description?: string,
  budget: number,
  date: string,
  hours: number,

}>({
  initialValues: {
    title: '',
    address: '',
    date: '',
    budget: 0,
    hours: 0,
  },
  validationSchema: {
    title(value: string) {
      if (value?.length === 0) return 'введите название работы'
      if (value?.length < 2) return 'слишком короткое название'
      if (value?.length > 150) return 'слишком длинное название'

      return true
    },
    type(value: string) {
      if (value?.length === 0) return 'выбирете тип работы'
      return true
    },
    address(value: string) {
      if (value?.length === 0) return 'введите адрес'
      if (value?.length < 2) return 'слишком короткий адрес'
      if (value?.length > 250) return 'слишком длинный адрес'
      return true
    },
    date(value: string) {
      if (value?.length === 0) return 'введите дату'
      const enteredDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 10);
      maxDate.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

      if (enteredDate < today) return 'Дата не может быть раньше сегодняшнего дня';
      if (enteredDate > maxDate) return 'Дата не может быть позже чем через 10 лет';

      return true
    },
    description(value: string) {
      if (value?.length > 2500) return 'слишком длинное описание'
      return true
    },
    hours(value: number) {
      if (value <= 0) return 'введите реальное кол-во часов'
      if (value >= 1000) return 'введите реальное кол-во часов'
      if (isNaN(Number(value))) return 'должно быть числом без других символов';
      if (!value) return 'введите колличество часов'
      return true
    },
    budget(value: number) {
      if (value >= 1000000000) return 'введите реальную сумму'
      if (value <= 10) return 'введите реальную сумму'
      if (isNaN(Number(value))) return 'должно быть числом без других символов';
      if (!value) return 'введите бюджет'
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

const submit = handleSubmit(async values => {
  loading.value = true
  let toSend: Order;
  if (auth.user?.employer_name) {
    toSend = { ...values, employer_id: auth.user._id, employer_name: auth.user.employer_name }
    let res = await orderStore.createOrder(toSend)
    if (res.status.value == "success") {
      loading.value = false
      toast("Объявление размещено", {
        type: "success",
        autoClose: 2000,
        onClose: () => {
          router.push(`/employer/work`)
        },
      })
    } else {
      toast("Ошибка при создании", {
        type: "error",
        autoClose: 2000,
        onClose: () => {
          window.location.reload()
        },
      })
    }
  }
})

// Получаем сегодняшнюю дату в формате YYYY-MM-DD
const today = new Date()
const todayStr = today.toISOString().split('T')[0]

// Вычисляем дату через 100 лет
const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() + 100)
const maxDateStr = maxDate.toISOString().split('T')[0]

const flatJobList = Array.from(
  new Set(
    jobTypes.flatMap(category =>
      category.subcategories.map(sub => ({
        text: sub,
        value: sub
      }))
    )
  )
)
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="flex flex-row align-center justify-between">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 md:my-8 mb-4 md:mb-8">Создать объявление</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100">
          <v-form class="md:mt-6 w-100" @submit="submit">
            <label class="block text-sm font-medium text-gray-700 mb-1">Введите название работы</label>
            <v-text-field placeholder="Мойка окон" base-color="#9e9e9e" color="primary"
              :error-messages="title.errors.value" type="text" variant="outlined"
              v-model="title.value.value"></v-text-field> 

            <label class="block text-sm font-medium text-gray-700 mb-1">Вид деятельности (напишите или выберите из
              списка)</label>
            <v-autocomplete base-color="#9e9e9e" color="primary" :error-messages="type.errors.value"
              :items="flatJobList" item-title="text" variant="outlined" v-model="type.value.value" item-value="value"
              clearable solo></v-autocomplete>

            <label class="block text-sm font-medium text-gray-700 mb-1">Введите описание работы</label>
            <v-textarea
              placeholder="Нужен специалист для выполнения работы на месте — аккуратно, ответственно и в срок. Оплата по договорённости."
              base-color="#9e9e9e" color="primary" :error-messages="description.errors.value" type="text"
              variant="outlined" v-model="description.value.value"></v-textarea>

            <v-row>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Введите место работы, адрес</label>
                <v-text-field base-color="#9e9e9e" color="primary" :error-messages="address.errors.value" class="w-100"
                  placeholder="Пермь, ул. Ленина 45" v-model="address.value.value" type="text" variant="outlined"
                  density="compact" />
              </v-col>
              <v-col cols="12" md="6" class="-mt-6 md:-mt-0">
                <label class="block text-sm font-medium text-gray-700 mb-1">Сколько заплатите? (в рублях)</label>
                <v-text-field suffix="руб" base-color="#9e9e9e" color="primary" :error-messages="budget.errors.value"
                  class="w-100" v-model="budget.value.value" placeholder="500" type="number" variant="outlined"
                  density="compact" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата начала работ</label>
                <v-text-field :min="todayStr" :max="maxDateStr" base-color="#9e9e9e" color="primary"
                  :error-messages="date.errors.value" class="w-100" v-model="date.value.value" type="date"
                  variant="outlined" density="compact" />
              </v-col>

              <v-col cols="12" md="6" class="-mt-6 md:-mt-0">
                <label class="block text-sm font-medium text-gray-700 mb-1">Время выполнения (в часах)</label>
                <v-text-field suffix="час-ов" base-color="#9e9e9e" color="primary" :error-messages="hours.errors.value"
                  class="w-100" v-model="hours.value.value" type="number" variant="outlined" density="compact" />
              </v-col>
            </v-row>

            <v-col cols="12" class="text-right">
              <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading"
                @click="router.push(`/employer/work`)">
                Разместить
              </v-btn>
            </v-col>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>