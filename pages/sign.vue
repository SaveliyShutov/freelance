<script setup lang="ts">
import { useField, useForm } from "vee-validate";

useSeoMeta({
  title: 'Вход ',
  description: 'Войдите в свой аккаунт Nirby, чтобы управлять заказами или заявками, или создайте новый аккаунт для начала работы.',
  ogTitle: 'Вход ',
  ogDescription: 'Войдите в свой аккаунт Nirby, чтобы управлять заказами или заявками, или создайте новый аккаунт для начала работы.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-home.jpg',
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
const router = useRouter();
const auth = useAuth();

const { currentRole } = storeToRefs(auth);

const { meta, handleSubmit, handleReset } = useForm({
  validationSchema: {
    password(value: string) {
      if (value?.length >= 8) return true;
      return "нужно 8 символов";
    },
    email(value: string) {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return true;
      return "неправильный формат email";
    },
  },
});

const email = useField("email");
const password = useField("password");
const show_password = ref(false);

const loading = ref(false);

const login = handleSubmit(async (values) => {
  loading.value = true;

  const res = await auth.login(values.email, values.password);

  if (auth.user?.employer_name) {
    const roleCookie = useCookie('currentRole')
    roleCookie.value = 'employer'

    localStorage.setItem("currentRole", "employer");
    currentRole.value = 'employer'
  } else {
    const roleCookie = useCookie('currentRole')
    roleCookie.value = 'worker'

    localStorage.setItem("currentRole", "worker");
    currentRole.value = 'worker'
  }

  if (res?.status?.value == "success") {
    if (localStorage.getItem("currentRole")) {
      router.push(`/${localStorage.getItem("currentRole")}`);
    }
  }
  loading.value = false;
});
</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="space-y-8 p-10 rounded-xl shadow-lg border-2 border-zinc-300/25 backdrop-blur-xs">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 text-center">Войти</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              или
              <NuxtLink to="/reg" class="font-medium text-indigo-600 hover:text-indigo-500">
                создать новый акканут
              </NuxtLink>
            </p>
          </div>
          <v-form class="mt-6 w-100" @submit.prevent="login">
            <v-text-field v-model="email.value.value" base-color="#9e9e9e" color="primary" type="email"
              placeholder="vasya@ya.ru" :error-messages="email.errors.value" variant="outlined" density="compact"
              class="w-100 mt-1" autocomplete="email" />

            <v-text-field v-model="password.value.value" base-color="#9e9e9e" color="primary" label="Пароль"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" :type="show_password ? 'text' : 'password'"
              :error-messages="password.errorMessage.value" variant="outlined" density="compact" class="w-100 mt-1"
              autocomplete="current-password" @click:append-inner="show_password = !show_password" />

            <div class="flex justify-center">
              <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
                Войти
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
