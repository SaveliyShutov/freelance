<script setup lang="ts">
import { toast } from "vue3-toastify"
import { useField, useForm } from 'vee-validate'
import type { Application } from '~/types/application.interface'

const userStore = useAuth()
const orderStore = useOrder()
const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: 'Оставьте заявку ',
  description: 'Заполните форму отклика на заказ на Nirby. Укажите телефон, ФИО и сопроводительное письмо.',
  ogTitle: 'Оставьте заявку ',
  ogDescription: 'Заполните форму отклика на заказ на Nirby. Укажите телефон, ФИО и сопроводительное письмо.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-application.jpg',
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

const { meta, handleSubmit, handleReset, validate } = useForm<{
  phone: string,
  initials: string,
  letter: string,
}>({
  initialValues: {
    phone: '',
    initials: '',
    letter: '',
  },
  validationSchema: {
    phone(value: string) {
      if (value?.length === 0) return 'введите номер'
      if (!/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g.test(value))
        return 'неправильно ведено'
      return true
    },
    initials(value: string) {
      if (value?.length === 0) return 'напишите ФИО (или название организации)'
      if (value?.length > 500) return 'слишком длинное фио (или название организации)'
      return true
    },
    letter(value: string) {
      if (value?.length > 1500) return 'слишком много символов'
      return true
    },
  },
})

const phone = useField<string>('phone')
const initials = useField<string>('initials')
const letter = useField<string>('letter')

const loading = ref(false)
const show_password = ref(false)

onMounted(() => {
  if (userStore.user?.worker_phone && userStore.user?.worker_name && userStore.user.worker_surname) {
    phone.value.value = userStore.user?.worker_phone
    initials.value.value = userStore.user?.worker_name + ' ' + userStore.user.worker_surname
  }
})

const submit = handleSubmit(async values => {
  loading.value = true
  let toSend: Application;

  phone.value.value = phone.value.value.trim()
  initials.value.value = initials.value.value.trim()
  letter.value.value = letter.value.value.trim()

  if (userStore.currentRole == 'worker') {
    if (route.params.id) {
      if (userStore.user?._id) {
        toSend = { ...values, worker: userStore.user?._id, order: route.params.id.toString() }
        const res = await orderStore.createApplication(toSend)
        if (res?.status?.value == "success") {
          await orderStore.getWorkerApplicationsWithOrders()
          toast("Отклик успешно отправлен, результат будет виден в моих заявках", {
            type: "success",
            autoClose: 2000,
            onClose: () => {
              router.push(`/worker`);
            },
          });
        } else {
          console.log(res?.status)
        }

      } else {
        userStore.checkAuth()
      }
    }
  } else if (userStore.currentRole == 'employer') {
    toast("Смените роль на исполнителя", {
      type: "error",
      autoClose: 2000,
    });
    loading.value = false
  }
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="3" class="my-8">
        <BackButton />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Оставьте заявку</h1>

          <v-form class="mt-6 w-100" @submit="submit">
            <v-row>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <v-text-field v-model="phone.value.value" base-color="#9e9e9e" color="primary" required type="phone"
                  placeholder="89226252872" :error-messages="phone.errors.value" variant="outlined" density="compact"
                  class="w-100" />
              </v-col>

              <v-col class="-mt-6 md:-mt-0" cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                <v-text-field v-model="initials.value.value" base-color="#9e9e9e" color="primary" required type="phone"
                  placeholder="Иванов Иван Иванович" :error-messages="initials.errors.value" variant="outlined"
                  density="compact" class="w-100" />
              </v-col>
              <v-col class="-mt-6 md:-mt-0" cols="12">
                <label class="block text-sm font-medium text-gray-700 mb-1">Отклик на заказ</label>
                <v-textarea v-model="letter.value.value" color="primary" base-color="#9e9e9e"
                  :error-messages="letter.errors.value" type="letter"
                  placeholder="Здравствуйте, с радостью готов выполнить ваш заказ." variant="outlined" density="compact"
                  class="w-100" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
                  Отправить
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>