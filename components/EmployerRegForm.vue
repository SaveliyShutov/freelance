<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { useField, useForm } from "vee-validate";

const props = defineProps<{ localStep: number }>()
const emit = defineEmits<{
  (e: "update:data", data: any): void;
  (e: "set-steps", steps: number): void;
  (e: "next-step"): void;
}>()

const totalSteps = 3
const loading = ref(false)
const selectedType = ref<'organization' | 'self-employed' | 'individual' | null>(null);
const show_password = ref(false);

// при выборе типа — сразу передаем в родителя и переходим на следующий шаг
const selectType = (type: 'organization' | 'self-employed' | 'individual') => {
  selectedType.value = type
  emit('update:data', { type })
  emit('next-step') // родитель сам увеличивает шаг
}

const { handleSubmit } = useForm({
  initialValues: {
    company_name: "",
    shortDescription: "",
    description: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
})

const company_name = useField<string>("company_name")
const shortDescription = useField<string>("shortDescription")
const description = useField<string>("description")
const first_name = useField<string>("first_name")
const last_name = useField<string>("last_name")
const email = useField<string>("email")
const password = useField<string>("password")

onMounted(() => emit("set-steps", totalSteps))

const submitFromChild = handleSubmit(async (values) => {
  loading.value = true
  // регистрация реализуется в родителе
})

defineExpose({ submitFromChild, selectedType })
</script>

<template>
  <div class="max-w-xl mx-auto mt-6">
    <!-- Шаг 1: выбор типа аккаунта -->
    <div v-if="props.localStep === 1">
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

    <!-- Шаг 2: представление компании / лица -->
    <v-form v-else-if="props.localStep === 2" class="mt-6 w-100">
      <div v-if="selectedType === 'organization'">
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Информация о компании</h2>
        <p class="text-sm text-gray-500 mb-4 text-center">Укажите название, короткое описание и полное описание компании
        </p>

        <v-text-field base-color="#9e9e9e" color="primary" label="Название компании" placeholder="ООО ТУР"
          v-model="company_name.value.value" variant="outlined" density="compact" class="w-100 mb-3" />
        <v-text-field base-color="#9e9e9e" color="primary" label="Короткое описание (необязательно)"
          v-model="shortDescription.value.value" variant="outlined" density="compact" class="w-100 mb-3" />
        <v-textarea base-color="#9e9e9e" color="primary" label="Описание компании (необязательно)"
          v-model="description.value.value" variant="outlined" density="compact" class="w-100 mb-3" />
      </div>


      <div v-else>
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Представьтесь</h2>
        <p class="text-sm text-gray-500 mb-4 text-center">Расскажите, как к вам обращаться</p>
        <v-text-field base-color="#9e9e9e" color="primary" required label="Имя" placeholder="Иван"
          v-model="first_name.value.value" variant="outlined" density="compact" class="w-100 mb-3"
          autocomplete="name" />
        <v-text-field base-color="#9e9e9e" color="primary" required label="Фамилия" placeholder="Иванов"
          v-model="last_name.value.value" variant="outlined" density="compact" class="w-100 mb-3"
          autocomplete="family-name" />
      </div>
    </v-form>

    <!-- Шаг 3: данные для входа -->
    <v-form v-else-if="props.localStep === 3" class="mt-6 w-100">
      <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Данные для входа</h2>
      <p class="text-sm text-gray-500 mb-4 text-center">Укажите email и придумайте пароль</p>
      <v-text-field base-color="#9e9e9e" color="primary" required label="Email" placeholder="ivan@example.com"
        v-model="email.value.value" variant="outlined" density="compact" class="w-100 mb-3" autocomplete="email" />
      <v-text-field base-color="#9e9e9e" color="primary" required label="Пароль" v-model="password.value.value"
        :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
        variant="outlined" density="compact" class="w-100 mb-3" autocomplete="new-password" />
    </v-form>

  </div>
</template>
