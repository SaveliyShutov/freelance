<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import _ from 'lodash'

let auth = useAuth()

const { meta, handleSubmit, handleReset, validate } = useForm<{
  worker_name: string,
  worker_surname: string,
  email: string,
  worker_phone: string,
  password: string,
}>({
  initialValues: {
    worker_phone: '',
    worker_name: '',
    worker_surname: '',
    email: '',
    password: '',
  },
  validationSchema: {
    worker_name(value: string) {
      if (value?.length === 0) return 'введите имя'
      if (value?.length < 2) return 'слишком короткое имя'
      if (value?.length > 22) return 'слишком длинное имя'

      return true
    },
    worker_surname(value: string) {
      if (value?.length === 0) return 'введите фамилию'
      if (value?.length < 2) return 'слишком короткое фамилия'
      if (value?.length > 22) return 'слишком длинное фамилия'

      return true
    },
    email(value: string) {
      if (value?.length === 0) return 'введите почту'
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
        return 'неправильно ведено'

      return true
    },
    worker_phone(value: string) {
      if (value?.length === 0) return 'введите номер'
      if (!/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g.test(value))
        return 'неправильно ведено'

      return true
    },
    password(value: string) {
      if (value?.length === 0) return 'введите пароль'
      if (value?.length < 8) return 'минимум 8 символов'
      if (value?.length > 30) return 'слишком длинный пароль'

      return true
    },
  },
})

let worker_name = useField<string>('worker_name')
let worker_phone = useField<string>('worker_phone')
let worker_surname = useField<string>('worker_surname')
let email = useField<string>('email')
let password = useField<string>('password')

let loading = ref(false)
let show_password = ref(false)

const submit = handleSubmit(async values => {
  localStorage.setItem('role', 'worker')
  loading.value = true

  let toSend = { ...values }
  await auth.registration(toSend)

  loading.value = false
})
</script>
<template>
  <v-form class="mt-6 w-100" @submit="submit">
    <v-text-field required label="Имя" type="worker_name" placeholder="Иван" v-model="worker_name.value.value"
      :error-messages="worker_name.errors.value" variant="outlined" density="compact" class="w-100" />

    <v-text-field required label="Фамилия" type="worker_surname" placeholder="Иванов" v-model="worker_surname.value.value"
      :error-messages="worker_surname.errors.value" variant="outlined" density="compact" class="w-100" />

    <v-text-field required label="Телефон" type="worker_phone" placeholder="89226252872" v-model="worker_phone.value.value"
      :error-messages="worker_phone.errors.value" variant="outlined" density="compact" class="w-100" />

    <v-text-field required label="Email" type="email" placeholder="vasya@ya.ru" v-model="email.value.value"
      :error-messages="email.errors.value" variant="outlined" density="compact" class="w-100 mt-1" />

    <v-text-field required label="Пароль" v-model="password.value.value"
      :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
      :error-messages="password.errorMessage.value" variant="outlined" density="compact" class="w-100 mt-1" />

    <div class="flex flex-col justify-center">
      <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
        Зарегистрироваться
      </v-btn>
      <p class="mt-2 text-center text-sm text-gray-600">
        или
        <NuxtLink to="/sign" class="font-medium text-indigo-600 hover:text-indigo-500">
          войти в аккаунт
        </NuxtLink>
      </p>
    </div>
  </v-form>
</template>