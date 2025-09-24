<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const totalSteps = 3;
const currentStep = ref(1);
const loading = ref(false);
const show_password = ref(false);

const selectedType = ref<'organization' | 'self-employed' | 'individual' | null>(null);

const emit = defineEmits<{
  (e: "reset-role"): void;
}>();

// флаг, что пользователь на этом шаге нажал "Далее"
const triedNext = ref(false);

// схемы валидации по шагам — теперь используем employer_name и employer_surname
const stepSchemas = [
  yup.object({}), // шаг 1 — выбор типа
  yup.object({
    employer_name: yup.string()
      .required("Введите имя")
      .min(2, "Слишком короткое")
      .max(100, "Слишком длинное"),
    employer_shortDescription: yup.string().max(100, "Максимум 100 символов").nullable(),
    employer_description: yup.string().max(500, "Максимум 500 символов").nullable(),
    employer_surname: yup.string()
      .when([], {
        is: () => selectedType.value !== "organization",
        then: s => s.required("Введите фамилию").min(2, "Слишком короткая фамилия"),
        otherwise: s => s.optional(),
      }),
  }),
  yup.object({
    email: yup.string().required("Введите email").email("Неверный формат"),
    password: yup.string().required("Введите пароль").min(8, "Минимум 8 символов").max(30, "Слишком длинный пароль"),
    agreePolicy: yup.boolean().oneOf([true], "Необходимо согласиться с условиями"),
  }),
];

const validationSchema = computed(() => stepSchemas[currentStep.value - 1]);

const { handleSubmit, validate } = useForm({
  validationSchema,
  initialValues: {
    employer_name: "",
    employer_shortDescription: "",
    employer_description: "",
    employer_surname: "",
    email: "",
    password: "",
    agreePolicy: false,
  },
});

// useField (деструктурируем value в переменные-рефы, чтобы в шаблоне писать просто employer_name и т.д.)
const {
  value: employer_name,
  errorMessage: employer_name_error,
  meta: employer_name_meta
} = useField<string>("employer_name");

const {
  value: employer_shortDescription,
  errorMessage: employer_shortDescription_error,
  meta: employer_shortDescription_meta
} = useField<string>("employer_shortDescription");

const {
  value: employer_description,
  errorMessage: employer_description_error,
  meta: employer_description_meta
} = useField<string>("employer_description");

const {
  value: employer_surname,
  errorMessage: employer_surname_error,
  meta: employer_surname_meta
} = useField<string>("employer_surname");

const {
  value: email,
  errorMessage: email_error,
  meta: email_meta
} = useField<string>("email");

const {
  value: password,
  errorMessage: password_error,
  meta: password_meta
} = useField<string>("password");

// useField для галочки согласия
const {
  value: agreePolicy,
  errorMessage: agreePolicy_error,
  meta: agreePolicy_meta
} = useField<boolean>("agreePolicy");

// выбор типа аккаунта
const selectType = (type: 'organization' | 'self-employed' | 'individual') => {
  selectedType.value = type;
  goNext();
};

const progressPercent = computed(
  () => ((currentStep.value - 1) / (totalSteps - 1)) * 100 + "%"
);

const goNext = async () => {
  triedNext.value = true;
  const result = await validate();
  if (!result.valid) return;
  // сброс флага для следующего шага
  triedNext.value = false;

  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    submit();
  }
};

const goBack = () => {
  triedNext.value = false;
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    emit("reset-role");
  }
};

// регистрация — использую useAuth / useCookie если доступны
const router = useRouter();
const auth = (typeof useAuth !== "undefined") ? useAuth() : undefined;
const useCookieFn = (typeof useCookie !== "undefined") ? useCookie : undefined;

const submit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    if (useCookieFn) {
      const roleCookie = useCookieFn('currentRole');
      roleCookie.value = 'employer';
    }
    localStorage.setItem('currentRole', 'employer');

    if (auth?.registration) {
      const res = await auth.registration(values);
      if (res?.status?.value === 'success') {
        router.push('/worker');
      }
    } else {
      // мок-режим если нет useAuth
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

    <!-- Stepper -->
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

    <!-- Шаг 1: выбор типа аккаунта -->
    <div v-if="currentStep === 1">
      <h2 class="text-xl font-bold mb-4 text-center">Выберите тип аккаунта</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="border p-4 rounded cursor-pointer hover:bg-indigo-50 text-center"
          @click="selectType('organization')">
          Организация (ООО, ИП)
        </div>
        <div class="border p-4 rounded cursor-pointer hover:bg-indigo-50 text-center"
          @click="selectType('self-employed')">
          Самозанятый
        </div>
        <div class="border p-4 rounded cursor-pointer hover:bg-indigo-50 text-center" @click="selectType('individual')">
          Физ. лицо
        </div>
      </div>
    </div>

    <!-- Шаг 2: данные компании или лица -->
    <v-form v-else-if="currentStep === 2" class="mt-6 w-100">
      <div v-if="selectedType === 'organization'">
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Информация о компании</h2>
        <p class="text-sm text-gray-500 mb-4 text-center">Укажите название, короткое описание и полное описание компании
        </p>

        <v-text-field v-model="employer_name"
          :error-messages="(employer_name_meta.touched || triedNext) && employer_name_error ? [employer_name_error] : []"
          label="Название компании" variant="outlined" density="compact" class="w-100 mb-3" />
        <v-text-field v-model="employer_shortDescription"
          :error-messages="(employer_shortDescription_meta.touched || triedNext) && employer_shortDescription_error ? [employer_shortDescription_error] : []"
          label="Короткое описание (необязательно)" variant="outlined" density="compact" class="w-100 mb-3" />
        <v-textarea v-model="employer_description"
          :error-messages="(employer_description_meta.touched || triedNext) && employer_description_error ? [employer_description_error] : []"
          label="Описание компании (необязательно)" variant="outlined" density="compact" class="w-100 mb-3" />
      </div>

      <div v-else>
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Представьтесь</h2>
        <p class="text-sm text-gray-500 mb-4 text-center">Расскажите, как к вам обращаться</p>

        <!-- Имя теперь сохраняется в employer_name -->
        <v-text-field v-model="employer_name"
          :error-messages="(employer_name_meta.touched || triedNext) && employer_name_error ? [employer_name_error] : []"
          label="Имя" variant="outlined" density="compact" class="w-100 mb-3" />
        <!-- Фамилия сохраняется в employer_surname -->
        <v-text-field v-model="employer_surname"
          :error-messages="(employer_surname_meta.touched || triedNext) && employer_surname_error ? [employer_surname_error] : []"
          label="Фамилия" variant="outlined" density="compact" class="w-100 mb-3" />
      </div>
    </v-form>

    <!-- Шаг 3: данные для входа -->
    <!-- Шаг 3: данные для входа -->
    <v-form v-else-if="currentStep === 3" class="mt-6 w-100">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Данные для входа</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Укажите email и придумайте пароль</p>

      <v-text-field v-model="email"
        :error-messages="(email_meta.touched || triedNext) && email_error ? [email_error] : []" label="Email"
        variant="outlined" density="compact" class="w-100 mb-3" />

      <v-text-field v-model="password" :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
        :error-messages="(password_meta.touched || triedNext) && password_error ? [password_error] : []" label="Пароль"
        variant="outlined" density="compact" class="w-100 mb-3" />

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
    </v-form>

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
