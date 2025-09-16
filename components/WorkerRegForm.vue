<script setup lang="ts">
import { useField, useForm } from "vee-validate";

// props от родителя
const props = defineProps<{
  localStep: number; // шаг, которым управляет родитель (1..N)
}>();

// события к родителю
const emit = defineEmits<{
  (e: "update:data", data: any): void;
  (e: "set-steps", steps: number): void;
}>();


// зависимости (auth/router)
const router = useRouter();
const auth = useAuth();

// Конфигурация формы / шагов
const totalSteps = 2; // количество шагов в этой форме (1 = ФИО, 2 = email+пароль)
const loading = ref(false);
const show_password = ref(false);

// useForm + схема валидации
const { validate, handleSubmit } = useForm<{
  worker_name: string;
  worker_surname: string;
  worker_phone: string;
  email: string;
  password: string;
}>({
  initialValues: {
    worker_name: "",
    worker_surname: "",
    worker_phone: "",
    email: "",
    password: "",
  },
  validationSchema: {
    worker_name(value: string) {
      if (!value) return "введите имя";
      if (value.length < 2) return "слишком короткое имя";
      if (value.length > 22) return "слишком длинное имя";
      return true;
    },
    worker_surname(value: string) {
      if (!value) return "введите фамилию";
      if (value.length < 2) return "слишком короткая фамилия";
      if (value.length > 22) return "слишком длинная фамилия";
      return true;
    },
    worker_phone(value: string) {
      if (!value) return "введите номер";
      if (
        !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g.test(
          value
        )
      )
        return "неправильно введено";
      return true;
    },
    email(value: string) {
      if (!value) return "введите почту";
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return "неправильно введено";
      return true;
    },
    password(value: string) {
      if (!value) return "введите пароль";
      if (value.length < 8) return "минимум 8 символов";
      if (value.length > 30) return "слишком длинный пароль";
      return true;
    },
  },
});

// Поля (useField)
const worker_name = useField<string>("worker_name");
const worker_surname = useField<string>("worker_surname");
const worker_phone = useField<string>("worker_phone");
const email = useField<string>("email");
const password = useField<string>("password");

onMounted(() => {
  emit("set-steps", totalSteps);
});

watch(
  () => [
    props.localStep,
    worker_name.value.value,
    worker_surname.value.value,
    worker_phone.value.value,
    email.value.value,
    password.value.value,
  ],
  () => {
    // отправляем значения
    emit("update:data", {
      worker_name: worker_name.value.value,
      worker_surname: worker_surname.value.value,
      worker_phone: worker_phone.value.value,
      email: email.value.value,
      password: password.value.value,
    });
  },
  { immediate: true }
);

const getValues = () => ({
  worker_name: worker_name.value.value,
  worker_surname: worker_surname.value.value,
  worker_phone: worker_phone.value.value,
  email: email.value.value,
  password: password.value.value,
});

const submitFromChild = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const roleCookie = useCookie("currentRole");
    roleCookie.value = "worker";
    localStorage.setItem("currentRole", "worker");

    const res = await auth.registration({ ...values });
    loading.value = false;
    return res;
  } catch (err) {
    loading.value = false;
    throw err;
  }
});

// expose методов, которые родитель может вызвать через ref
defineExpose({
  getValues,
  submitFromChild,
});
</script>


<template>
  <v-form class="mt-6 w-100 max-w-xl mx-auto px-2">
    <!-- Шаг 1 -->
    <div v-if="localStep === 1" class="px-2">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Представьтесь</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Расскажите, как к вам обращаться</p>

      <v-text-field base-color="#9e9e9e" color="primary" required label="Имя" placeholder="Иван"
        v-model="worker_name.value.value" :error-messages="worker_name.errors.value" variant="outlined"
        density="compact" class="w-100 mb-3" autocomplete="name" />

      <v-text-field base-color="#9e9e9e" color="primary" required label="Фамилия" placeholder="Иванов"
        v-model="worker_surname.value.value" :error-messages="worker_surname.errors.value" variant="outlined"
        density="compact" class="w-100 mb-3" autocomplete="family-name" />

      <v-text-field base-color="#9e9e9e" color="primary" required label="Телефон" placeholder="89226252872"
        v-model="worker_phone.value.value" :error-messages="worker_phone.errors.value" variant="outlined"
        density="compact" class="w-100 mb-3" autocomplete="tel" />
    </div>

    <!-- Шаг 2 -->
    <div v-else-if="localStep === 2" class="px-2">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Данные для входа</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Укажите email и придумайте пароль</p>

      <v-text-field base-color="#9e9e9e" color="primary" required label="Email" placeholder="vasya@ya.ru"
        v-model="email.value.value" :error-messages="email.errors.value" variant="outlined" density="compact"
        class="w-100 mb-3" autocomplete="email" />

      <v-text-field base-color="#9e9e9e" color="primary" required label="Пароль" v-model="password.value.value"
        :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
        :error-messages="password.errors.value" variant="outlined" density="compact" class="w-100 mb-3"
        autocomplete="new-password" />
    </div>
  </v-form>
</template>

<style scoped>
.v-form {
  width: 100%;
}
</style>
