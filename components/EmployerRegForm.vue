<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import _ from 'lodash'

let auth = useAuth()

const { meta, handleSubmit, handleReset, validate } = useForm<{
  employer_name: string,
  employer_shortDescription: string,
  employer_description: string,
  email: string,
  password: string,
}>({
  initialValues: {
    employer_name: '',
    email: '',
    password: '',
  },
  validationSchema: {
    employer_name(value: string) {
      if (value?.length === 0) return 'введите имя'
      if (value?.length < 2) return 'слишком короткое имя'
      if (value?.length > 22) return 'слишком длинное имя'

      return true
    },
    email(value: string) {
      if (value?.length === 0) return 'введите почту'
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
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

let employer_name = useField<string>('employer_name')
let email = useField<string>('email')
let employer_shortDescription = useField<string>('employer_shortDescription')
let employer_description = useField<string>('employer_description')
let password = useField<string>('password')

let loading = ref(false)
let show_password = ref(false)

const submit = handleSubmit(async values => {
  localStorage.setItem('role', 'employer')
  loading.value = true

  let toSend = { ...values}
  await auth.registration(toSend)

  loading.value = false
})
</script>
<template>
  <v-form class="mt-6 w-100" @submit="submit">
    <v-text-field required label="Названии компании" type="name" placeholder="ООО ТУР" v-model="employer_name.value.value"
      :error-messages="employer_name.errors.value" variant="outlined" density="compact" class="w-100" />

    <v-text-field label="Короткое описание компании (необязательно)" v-model="employer_shortDescription.value.value" type="shortDescription" variant="outlined" density="compact"
      class="w-100" />

    <v-textarea label="О компании (необязательно)" v-model="employer_description.value.value" type="description" placeholder="" variant="outlined" density="compact"
      class="w-100" />

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