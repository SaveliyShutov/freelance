<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";

const router = useRouter();
const auth = useAuth();

let { currentRole } = storeToRefs(auth);

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
let show_password = ref(false);

let loading = ref(false);

const login = handleSubmit(async (values) => {
  loading.value = true;

  let res = await auth.login(values.email, values.password);
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

  loading.value = false;
  if (res?.status?.value == "success") {
    if (localStorage.getItem("currentRole")) {
      toast("Вы вошли в аккаунт!", {
        type: "success",
        autoClose: 100,
        onClose: () => {
          router.push(`/${localStorage.getItem("currentRole")}/work`);
        },
      });
    }
  }
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
            <v-text-field label="Email" type="email" placeholder="vasya@ya.ru" v-model="email.value.value"
              :error-messages="email.errors.value" variant="outlined" density="compact" class="w-100 mt-1"
              autocomplete="email" />

            <v-text-field label="Пароль" v-model="password.value.value"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
              :error-messages="password.errorMessage.value" variant="outlined" density="compact" class="w-100 mt-1"
              autocomplete="current-password" />

            <div>
              <button type="submit" :disabled="!meta.valid" :loading="loading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Войти
              </button>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
