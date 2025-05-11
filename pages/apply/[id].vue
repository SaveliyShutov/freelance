<script setup lang="ts">
import { toast } from "vue3-toastify"
import { useField, useForm } from 'vee-validate'
import type { Application } from '~/types/application.interface'

const userStore = useAuth()
const orderStore = useOrder()
const route = useRoute()
const router = useRouter()

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

let phone = useField<string>('phone')
let initials = useField<string>('initials')
let letter = useField<string>('letter')

let loading = ref(false)
let show_password = ref(false)

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
        let res = await orderStore.createApplication(toSend)
        if (res?.status?.value == "success") {
          toast("Отклик успешно отправлен, результат будет виден в моих заявках", {
            type: "success",
            autoClose: 1000,
            onClose: () => {
              orderStore.my_applications.push(toSend)
              router.push(`/worker/work`);
            },
          });
        }

      } else {
        userStore.checkAuth()
      }
    }
  } else if (userStore.currentRole == 'employer') {
    toast("Смените роль на исполнителя", {
      type: "error",
      autoClose: 1000,
    });
  }

  loading.value = false
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
                <v-text-field base-color="#9e9e9e" color="primary" required type="phone" placeholder="89226252872"
                  v-model="phone.value.value" :error-messages="phone.errors.value" variant="outlined" density="compact"
                  class="w-100" />
              </v-col>

              <v-col class="-mt-6 md:-mt-0" cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                <v-text-field base-color="#9e9e9e" color="primary" required type="phone"
                  placeholder="Иванов Иван Иванович" v-model="initials.value.value"
                  :error-messages="initials.errors.value" variant="outlined" density="compact" class="w-100" />
              </v-col>
              <v-col class="-mt-6 md:-mt-0" cols="12">
                <label class="block text-sm font-medium text-gray-700 mb-1">Отклик на заказ</label>
                <v-textarea color="primary" base-color="#9e9e9e" v-model="letter.value.value"
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