<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import _ from "lodash";
import { toast } from "vue3-toastify";
const router = useRouter();

let auth = useAuth();

const { meta, handleSubmit, handleReset, validate } = useForm<{
  employer_name: string;
  employer_shortDescription: string;
  employer_description: string;
}>({
  initialValues: {
    employer_name: "",
    employer_description: '',
    employer_shortDescription: '',
  },
  validationSchema: {
    employer_name(value: string) {
      if (value?.length === 0) return "введите имя";
      if (value?.length < 2) return "слишком короткое имя";
      if (value?.length > 22) return "слишком длинное имя";

      return true;
    },
    employer_description(value: string) {
      if (value?.length === 0) return "введите описание";
      if (value?.length < 2) return "слишком короткое описание";
      if (value?.length > 1000) return "слишком длинное описание";

      return true;
    },
    employer_shortDescription(value: string) {
      if (value?.length === 0) return "введите короткое описание";
      if (value?.length < 2) return "слишком коротко";
      if (value?.length > 500) return "слишком длинное";

      return true;
    },
  },
});

let employer_name = useField<string>("employer_name");
let employer_shortDescription = useField<string>("employer_shortDescription");
let employer_description = useField<string>("employer_description");

let show_password = ref(false);
let loading = ref(false);

const submit = handleSubmit(async (values) => {
  loading.value = true;

  let toSend = { ...values };
  if (auth.user?._id) {
    let res = await auth.updateUser(toSend, auth.user?._id);
    if (res.status.value) {
      localStorage.setItem("currentRole", "employer");
      toast("Вы успешно зарегестрировались как исполнитель!", {
        type: "success",
        autoClose: 200,
        onClose: () => {
          auth.currentRole = "employer";
          router.push(`/employer/work`);
        },
      });
    } else {
      toast("Ошибка при регистрации", {
        type: "error",
        autoClose: 200,
      });
    }
  }
  loading.value = false;
});
</script>
<template>
  <v-form class="mt-6 w-100" @submit="submit">
    <v-text-field
      required
      label="Названии компании"
      type="name"
      placeholder="ООО ТУР"
      v-model="employer_name.value.value"
      :error-messages="employer_name.errors.value"
      variant="outlined"
      density="compact"
      class="w-100"
    />

    <v-text-field
      label="Короткое описание компании (необязательно)"
      v-model="employer_shortDescription.value.value"
      type="shortDescription"
      variant="outlined"
      density="compact"
      class="w-100"
    />

    <v-textarea
      label="О компании (необязательно)"
      v-model="employer_description.value.value"
      type="description"
      placeholder=""
      variant="outlined"
      density="compact"
      class="w-100"
    />

    <div class="flex flex-col justify-center">
      <v-btn color="#4f46e5" type="submit" :disabled="!meta.valid" :loading="loading">
        Зарегистрироваться
      </v-btn>
    </div>
  </v-form>
</template>
