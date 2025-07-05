<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
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

const time = ref();

const { meta, handleSubmit } = useForm<{
  title: string,
  type?: string,
  address: string,
  description?: string,
  date?: string,
  dateType: 'date' | 'by agreement',
  paymentType: 'hourly' | 'shift',
  hours: number,
  budget: number,
  startTime: string,
}>({
  initialValues: {
    title: '',
    address: '',
    dateType: 'date',
    hours: 0,
    budget: 0,
    paymentType: 'hourly',
  },
  validationSchema: {
    title(value: string) {
      if (!value) return 'введите название работы'
      if (value.length < 2) return 'слишком короткое название'
      if (value.length > 150) return 'слишком длинное название'
      return true
    },
    address(value: string) {
      if (!value) return 'введите адрес'
      if (value.length < 2) return 'слишком короткий адрес'
      if (value.length > 250) return 'слишком длинный адрес'
      return true
    },
    description(value: string) {
      if (value && value.length > 10000) return 'слишком длинное описание'
      return true
    },
    budget(value: number) {
      if (!value) return 'введите сумму оплаты'
      if (value <= 10 || value >= 1000000000) return 'введите реальную сумму'
      return true
    },
    paymentType(value: 'hourly' | 'shift', ctx: { form: any }) {
      if (!value) return 'выберите тип оплаты'

      const hours = ctx.form.hours
      if ((value === 'hourly' || value === 'shift') && !hours) {
        return 'укажите количество часов'
      }

      return true
    },
    dateType(value: string) {
      if (!value) return 'выберите тип оплаты'
      return true
    },
  }
})

const startTime = useField<string>('startTime')
const title = useField<string>('title')
const type = useField<string>('type')
const address = useField<string>('address')
const date = useField<string>('date')
const description = useField<string>('description')
const hours = useField<number>('hours')
const paymentType = useField<'hourly' | 'shift'>('paymentType')
const budget = useField<number>('budget')
const dateType = useField<'date' | 'by agreement'>('dateType')

let loading = ref(false)

// Сохранение
const submit = handleSubmit(async values => {
  loading.value = true

  if (auth.user?.employer_name) {
    let finalStartTime = '0';

    if (time.value) {
      const hh = String(time.value.hours).padStart(2, '0');
      const mm = String(time.value.minutes).padStart(2, '0');
      finalStartTime = `${hh}:${mm}`;
    }

    let cleanedDate: any = values.date;
    if (values.dateType === 'date') {
      cleanedDate = new Date(values.date + 'T00:00:00Z')
    } else {
      cleanedDate = null;
    }
    const finalBudget = values.paymentType === 'shift'
      ? values.budget
      : values.budget * values.hours

    const toSend: Order = {
      startTime: finalStartTime,
      title: values.title,
      type: values.type,
      address: values.address,
      description: values.description,
      date: cleanedDate,
      dateType: values.dateType,
      hours: values.hours,
      budget: finalBudget,
      paymentType: values.paymentType,
      employer_id: auth.user._id,
      employer_name: auth.user.employer_name,
      createdAt: new Date(new Date().setHours(0, 0, 0, 0))
    }

    const res = await orderStore.createOrder(toSend)

    if (res.status.value === 'success') {
      await orderStore.getAll()
      // orderStore.orders.unshift(res?.data?.value)
      toast('Объявление размещено', {
        type: 'success',
        autoClose: 2000,
        onClose: () => router.push('/employer')
      })
    } else {
      toast('Ошибка при создании', {
        type: 'error',
        autoClose: 2000,
        onClose: () => window.location.reload()
      })
    }
  }
})

// Дата
const todayStr = new Date().toISOString().split('T')[0]
const maxDateStr = (() => {
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 100)
  return maxDate.toISOString().split('T')[0]
})()

// Категории
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
const formattedTotalBudget = computed(() => {
  const pType = paymentType.value.value
  if (pType !== 'hourly') return null

  const h = hours.value.value
  const rate = budget.value.value
  const total = Number(h) * Number(rate)

  if (!h || !rate || isNaN(total) || total <= 0) return null
  return total.toLocaleString('ru-RU') + ' ₽'
})
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Название<span class="text-red-500 ml-0.5">
                *</span></label>
            <v-text-field placeholder="Требуются разнорабочие на длительный срок" base-color="#9e9e9e" color="primary"
              type="title" variant="outlined" :error-messages="title.errors.value" v-model="title.value.value" />

            <label class="block text-sm font-medium text-gray-700 mb-1">Тип работы</label>
            <v-autocomplete base-color="#9e9e9e" color="primary" type="title" variant="outlined" :items="flatJobList"
              item-title="text" item-value="value" :error-messages="type.errors.value" v-model="type.value.value"
              clearable solo />

            <label>Описание</label>
            <v-textarea
              placeholder="Нужен специалист для выполнения работы на месте — аккуратно, ответственно и в срок. Оплата по договорённости."
              base-color="#9e9e9e" color="primary" type="title" variant="outlined"
              :error-messages="description.errors.value" v-model="description.value.value" />

            <label class="block text-sm font-medium text-gray-700 mb-1">Адрес <span
                class="text-red-500 ml-0.5">*</span></label>
            <v-text-field placeholder="Пермь, ул. Ленина 45" base-color="#9e9e9e" color="primary" type="title"
              variant="outlined" :error-messages="address.errors.value" v-model="address.value.value" />

            <v-row>
              <v-col cols="12">
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата начала работ <span
                    class="text-red-500 ml-0.5">*</span></label>
                <v-radio-group v-model="dateType.value.value" inline>
                  <v-radio label="Указать дату" value="date" />
                  <v-radio label="Не указывать (для вакансий)" value="by agreement" />
                </v-radio-group>
                <div v-if="dateType.value.value === 'date'">
                  <div class="flex flex-row gap-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Дата старта <span
                          class="text-red-500 ml-0.5">*</span></label>
                      <v-text-field base-color="#9e9e9e" color="primary" variant="outlined" type="date" :min="todayStr"
                        :max="maxDateStr" :error-messages="date.errors.value" v-model="date.value.value" />
                    </div>
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700 mb-1">Время начала работы</label>
                      <VueDatePicker placeholder="00:00" :ui="{
                        input: 'h-14'
                      }" v-model="time" time-picker locale="ru" cancelText="Отмена" selectText="Принять"
                        hide-input-icon />
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <label class="block text-sm font-medium text-gray-700 mt-4 mb-1">Тип оплаты </label>
            <v-radio-group inline v-model="paymentType.value.value" :error-messages="paymentType.errors.value">
              <v-radio label="Почасовая" value="hourly" />
              <v-radio label="Сменная" value="shift" />
            </v-radio-group>

            <v-row v-if="paymentType.value.value === 'hourly'">
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Количество часов<span
                    class="text-red-500 ml-0.5">
                    *</span></label>
                <v-text-field base-color="#9e9e9e" color="primary" variant="outlined" type="number" suffix="ч"
                  v-model="hours.value.value" :error-messages="hours.errors.value" />
              </v-col>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Оплата за час<span
                    class="text-red-500 ml-0.5">
                    *</span></label>
                <v-text-field base-color="#9e9e9e" color="primary" variant="outlined" type="number" suffix="₽"
                  v-model="budget.value.value" :error-messages="budget.errors.value" />
              </v-col>
            </v-row>

            <v-row v-if="paymentType.value.value === 'shift'">
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Длительность смены (часы)<span
                    class="text-red-500 ml-0.5">
                    *</span></label>
                <v-select base-color="#9e9e9e" color="primary" variant="outlined" :items="[6, 8, 12]"
                  v-model="hours.value.value" :error-messages="hours.errors.value" suffix="ч" />
              </v-col>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Оплата за смену<span
                    class="text-red-500 ml-0.5">
                    *</span></label>
                <v-text-field base-color="#9e9e9e" color="primary" variant="outlined" type="number" suffix="₽"
                  v-model="budget.value.value" :error-messages="budget.errors.value" />
              </v-col>
            </v-row>

            <div v-if="formattedTotalBudget"
              class="mt-1 mb-4 flex items-center gap-2 rounded-md bg-indigo-50 p-3 text-indigo-700 border border-indigo-200">
              <span class="text-base font-medium">Итоговая оплата: {{ formattedTotalBudget }}</span>
            </div>

            <v-col cols="12" class="text-right">
              <v-btn type="submit" :disabled="!meta.valid" :loading="loading">Разместить</v-btn>
            </v-col>
            <div class="text-sm text-gray-500 mt-4">
              <span class="text-red-500">*</span> — обязательное поле
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-datepicker-input {
  height: 120px !important;
  font-size: 16px;
  background-color: red !important;
  padding: 10px;
}
</style>
