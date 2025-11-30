<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import _ from "lodash";
import { toast } from "vue3-toastify";
const router = useRouter();
const auth = useAuth();

const { meta, handleSubmit, handleReset, validate } = useForm<{
  worker_name: string;
  worker_surname: string;
  worker_phone: string;
}>({
  initialValues: {
    worker_phone: "",
    worker_name: "",
    worker_surname: "",
  },
  validationSchema: {
    worker_name(value: string) {
      if (value?.length === 0) return "введите имя";
      if (value?.length < 2) return "слишком короткое имя";
      if (value?.length > 22) return "слишком длинное имя";

      return true;
    },
    worker_surname(value: string) {
      if (value?.length === 0) return "введите фамилию";
      if (value?.length < 2) return "слишком короткое фамилия";
      if (value?.length > 22) return "слишком длинное фамилия";

      return true;
    },
    worker_phone(value: string) {
      if (value?.length === 0) return "введите номер";
      if (
        !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g.test(
          value
        )
      )
        return "неправильно ведено";

      return true;
    },
  },
});

const worker_name = useField<string>("worker_name");
const worker_phone = useField<string>("worker_phone");
const worker_surname = useField<string>("worker_surname");

const loading = ref(false);

const submit = handleSubmit(async (values) => {
  loading.value = true;

  const toSend = { ...values };
  if (auth.user?._id) {
    const res = await auth.updateUser(toSend, auth.user?._id);
    if (res.status.value) {
      const roleCookie = useCookie('currentRole')
      roleCookie.value = 'worker'
      localStorage.setItem("currentRole", "worker");
      toast("Вы успешно зарегестрировались как испольнитель!", {
        type: "success",
        autoClose: 2000,
        onClose: () => {
          auth.currentRole = "worker";
          router.push(`/worker`);
        },
      });
    } else {
      toast("Ошибка при регистрации, попробуйте еще раз", {
        type: "error",
        autoClose: 2000,
      });
    }
  }
  loading.value = false;
});
</script>
<template>
  <v-form class="mt-6 w-100" @submit="submit">
    <v-text-field
v-model="worker_name.value.value" required label="Имя" type="worker_name" placeholder="Иван"
      :error-messages="worker_name.errors.value" variant="outlined" density="compact" class="w-100" />

    <v-text-field
v-model="worker_surname.value.value" required label="Фамилия" type="worker_surname"
      placeholder="Иванов" :error-messages="worker_surname.errors.value" variant="outlined"
      density="compact" class="w-100" />

    <v-text-field
v-model="worker_phone.value.value" required label="Телефон" type="worker_phone"
      placeholder="89226252872" :error-messages="worker_phone.errors.value" variant="outlined"
      density="compact" class="w-100" />

    <div class="flex flex-col justify-center">
      <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
        Добавить
      </v-btn>
    </div>
  </v-form>
</template>
