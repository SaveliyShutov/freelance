<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const auth = (typeof useAuth !== "undefined") ? useAuth() : undefined;

const totalSteps = 2;
const currentStep = ref(1);
const loading = ref(false);
const show_password = ref(false);

// показывать ошибки только после попытки перейти на следующий шаг
const triedNext = ref(false);

// схемы валидации по шагам (как просил)
const stepSchemas = [
  // Шаг 1: ФИО + телефон
  yup.object({
    worker_name: yup.string().required("Введите имя").min(2, "Слишком короткое имя").max(22, "Слишком длинное имя"),
    worker_surname: yup.string().required("Введите фамилию").min(2, "Слишком короткая фамилия").max(22, "Слишком длинная фамилия"),
    worker_phone: yup.string()
      .required("Введите номер")
      .matches(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, "Неправильно введено"),
  }),
  // Шаг 2: email + пароль + согласие
  yup.object({
    email: yup.string().required("Введите почту").email("Неправильно введено"),
    password: yup.string().required("Введите пароль").min(8, "Минимум 8 символов").max(30, "Слишком длинный пароль"),
    agreePolicy: yup.boolean().oneOf([true], "Необходимо согласиться с условиями"),
  }),
];

const validationSchema = computed(() => stepSchemas[currentStep.value - 1]);

// useForm с реактивной схемой
const { handleSubmit, validate } = useForm({
  validationSchema,
  initialValues: {
    worker_name: "",
    worker_surname: "",
    worker_phone: "",
    email: "",
    password: "",
    agreePolicy: false,
  },
});

// useField — деструктурируем value/error/meta чтобы TS не выжигал глаза
const { value: worker_name, errorMessage: worker_name_error, meta: worker_name_meta } = useField<string>("worker_name");
const { value: worker_surname, errorMessage: worker_surname_error, meta: worker_surname_meta } = useField<string>("worker_surname");
const { value: worker_phone, errorMessage: worker_phone_error, meta: worker_phone_meta } = useField<string>("worker_phone");
const { value: email, errorMessage: email_error, meta: email_meta } = useField<string>("email");
const { value: password, errorMessage: password_error, meta: password_meta } = useField<string>("password");

// новая галочка согласия
const { value: agreePolicy, errorMessage: agreePolicy_error, meta: agreePolicy_meta } = useField<boolean>("agreePolicy");

// прогресс (строка для style width)
const progressPercent = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100 + "%");

// навигация
const goNext = async () => {
  triedNext.value = true;

  // валидируем по текущей схеме (reactive validationSchema используется внутри useForm)
  const result = await validate();
  if (!result.valid) return;

  // если валидно — сбрасываем флаг (чтобы на следующем шаге ошибки не светились сразу)
  triedNext.value = false;

  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    submit();
  }
};

const emit = defineEmits<{
  (e: 'reset-role'): void;
}>();

const goBack = () => {
  // сброс триггера ошибок при возврате
  triedNext.value = false;
  if (currentStep.value > 1) currentStep.value--;
  else emit('reset-role');
};

// submit
const submit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const roleCookie = useCookie('currentRole');
    roleCookie.value = 'worker';
    localStorage.setItem('currentRole', 'worker');

    if (auth?.registration) {
      const res = await auth.registration(values);
      if (res?.status?.value === 'success') {
        router.push('/worker');
      }
    } else {
      // мок если нет useAuth
      console.info('auth.registration not available — mocked success', values);
      alert('Регистрация (мок) успешна');
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>


<template>
  <div class="max-w-xl mx-auto p-6 md:p-10 rounded-2xl space-y-8">
    <!-- Stepper / progress -->
    <div class="relative mb-8 w-full">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full h-1 bg-gray-300"></div>
      </div>
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="h-1 bg-[var(--primary-500)]" :style="{ width: progressPercent }"></div>
      </div>
      <div class="relative flex justify-between w-full">
        <div v-for="index in totalSteps" :key="index" class="flex flex-col items-center" style="width: 2.5rem">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-10"
            :class="index <= currentStep ? 'bg-[var(--primary-500)]' : 'bg-gray-300'">
            {{ index }}
          </div>
        </div>
      </div>
    </div>

    <!-- Шаг 1: ФИО + телефон -->
    <div v-if="currentStep === 1">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Представьтесь</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Расскажите, как к вам обращаться</p>

      <v-text-field base-color="#9e9e9e" color="primary" label="Имя" placeholder="Иван" v-model="worker_name"
        :error-messages="(worker_name_meta.touched || triedNext) && worker_name_error ? [worker_name_error] : []"
        variant="outlined" density="compact" class="w-100 mb-3" autocomplete="name" />

      <v-text-field base-color="#9e9e9e" color="primary" label="Фамилия" placeholder="Иванов" v-model="worker_surname"
        :error-messages="(worker_surname_meta.touched || triedNext) && worker_surname_error ? [worker_surname_error] : []"
        variant="outlined" density="compact" class="w-100 mb-3" autocomplete="family-name" />

      <v-text-field base-color="#9e9e9e" color="primary" label="Телефон" placeholder="89226252872"
        v-model="worker_phone"
        :error-messages="(worker_phone_meta.touched || triedNext) && worker_phone_error ? [worker_phone_error] : []"
        variant="outlined" density="compact" class="w-100 mb-3" autocomplete="tel" />
    </div>

    <!-- Шаг 2: Email + пароль -->
    <div v-else-if="currentStep === 2">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Данные для входа</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Укажите email и придумайте пароль</p>

      <v-text-field base-color="#9e9e9e" color="primary" label="Email" placeholder="vasya@ya.ru" v-model="email"
        :error-messages="(email_meta.touched || triedNext) && email_error ? [email_error] : []" variant="outlined"
        density="compact" class="w-100 mb-3" autocomplete="email" />

      <v-text-field base-color="#9e9e9e" color="primary" label="Пароль" v-model="password"
        :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
        :error-messages="(password_meta.touched || triedNext) && password_error ? [password_error] : []"
        variant="outlined" density="compact" class="w-100 mb-3" autocomplete="new-password" />

      <!-- Чекбокс согласия -->
      <v-checkbox v-model="agreePolicy" color="primary"
        :error-messages="(triedNext && !agreePolicy) ? ['Необходимо согласиться с условиями'] : []" hide-details="auto"
        density="compact" class="mt-3 w-full">
        <template #label>
          <span class="text-xs sm:text-sm text-gray-700 leading-snug block">
            Я ознакомлен(а) с
            <a href="/docs/privacy-policy.docx" target="_blank" class="text-primary hover:underline break-words">
              Политикой обработки персональных данных
            </a>
            и даю
            <a href="/docs/agreement.docx" target="_blank" class="text-primary hover:underline break-words">
              Согласие на обработку
            </a>
          </span>
        </template>
      </v-checkbox>
    </div>

    <!-- Навигация -->
    <div class="flex justify-between mt-6">
      <button @click="goBack"
        class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
        Назад
      </button>
      <button @click="goNext"
        class="px-6 py-2 rounded-lg bg-[var(--primary-500)] text-white font-medium hover:bg-[var(--primary-600)]"
        :disabled="loading">
        {{ currentStep < totalSteps ? 'Далее' : 'Завершить' }} </button>
    </div>
  </div>
</template>

<style scoped>
.v-form {
  width: 100%;
}
</style>
