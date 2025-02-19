<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import _ from 'lodash'

const auth = useAuth()

const { meta, handleSubmit, handleReset, validate } = useForm<{
  name: string,
  surname: string,
  email: string,
  phone: string,
  password: string,
}>({
  initialValues: {
    phone: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  },
  validationSchema: {
    name(value: string) {
      if (value.length === 0) return 'введите имя'
      if (value.length < 2) return 'слишком короткое имя'
      if (value.length > 22) return 'слишком длинное имя'

      return true
    },
    surname(value: string) {
      if (value.length === 0) return 'введите фамилию'
      if (value.length < 2) return 'слишком короткое фамилия'
      if (value.length > 22) return 'слишком длинное фамилия'

      return true
    },
    email(value: string) {
      if (value.length === 0) return 'введите почту'
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
        return 'неправильно ведено'

      return true
    },
    phone(value: string) {
      if (value.length === 0) return 'введите номер'
      if (!/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g.test(value))
        return 'неправильно ведено'

      return true
    },
    password(value: string) {
      if (value.length === 0) return 'введите пароль'
      if (value.length < 8) return 'минимум 8 символов'
      if (value.length > 30) return 'слишком длинный пароль'

      return true
    },
  },
})

let name = useField<string>('name')
let phone = useField<string>('phone')
let surname = useField<string>('surname')
let email = useField<string>('email')
let password = useField<string>('password')

let role = ref<string>('исполнителя')

let show_password = ref(false)
let loading = ref(false)

const submit = handleSubmit(async values => {
  loading.value = true

  let toSend = { ...values, role: 'worker' }
  await auth.registration(toSend)

  loading.value = false
})
</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 text-center">Создать аккаунт {{ role }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              или
              <NuxtLink to="/sign" class="font-medium text-indigo-600 hover:text-indigo-500">
                войти в аккаунт
              </NuxtLink>
            </p>
          </div>
          <v-form class="mt-6 w-100" @submit="submit">
            <v-text-field label="Имя" type="name" placeholder="Иван" v-model="name.value.value"
              :error-messages="name.errors.value" variant="outlined" density="compact" class="w-100" />

            <v-text-field label="Фамилия" type="surname" placeholder="Иванов" v-model="surname.value.value"
              :error-messages="surname.errors.value" variant="outlined" density="compact" class="w-100" />

            <v-text-field label="Телефон" type="phone" placeholder="89226252872" v-model="phone.value.value"
              :error-messages="phone.errors.value" variant="outlined" density="compact" class="w-100" />

            <v-text-field label="Email" type="email" placeholder="vasya@ya.ru" v-model="email.value.value"
              :error-messages="email.errors.value" variant="outlined" density="compact" class="w-100 mt-1" />

            <v-text-field label="Пароль" v-model="password.value.value"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
              :error-messages="password.errorMessage.value" variant="outlined" density="compact" class="w-100 mt-1" />

            <div>
              <button type="submit" :disabled="!meta.valid" :loading="loading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Зарегистрироваться
              </button>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>