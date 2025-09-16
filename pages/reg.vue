<script setup lang="ts">
import { ref, computed } from "vue";
import workerImage from "~/assets/workerImage.png";
import employerImage from "~/assets/employerImage.png";
import guestImage from "~/assets/guest.png";
const currentRole = ref<string | null>(null);

// шаги
const parentStep = ref(1); // текущий шаг родителя (1 — выбор роли, >1 — форма)
const totalSteps = ref(1); // всего шагов (1 + childTotalSteps)
const childStep = ref(1); // шаг внутри дочернего компонента (1..N)
const childTotalSteps = ref(0); // количество шагов дочернего компонента
const router = useRouter();

const workerRef = ref<any>(null);
const employerRef = ref<any>(null);

// данные формы
const formData = ref({});

// роли
const roles = [
  {
    id: "worker",
    name: "Исполнитель",
    image: workerImage,
    pros: ["может откликаться"],
    cons: ["не может создавать"],
  },
  {
    id: "employer",
    name: "Заказчик",
    image: employerImage,
    pros: ["может создавать"],
    cons: ["не может откликаться"],
  },
  {
    id: "guest",
    name: "Гость",
    image: guestImage,
    pros: ["может просматривать объявления"],
    cons: ["не может откликаться и создавать"],
  },
];

const selectRole = (roleId: string) => {
  if (roleId === "guest") {
    router.push("/");
    return;
  }
  currentRole.value = roleId;
  parentStep.value = 2;
  childStep.value = 1;
};


// возврат на выбор роли / шаг назад
const goBack = () => {
  if (childStep.value > 1) {
    childStep.value--; // если внутри дочернего, уменьшаем шаг
  } else if (parentStep.value > 1) {
    parentStep.value--;
    currentRole.value = null;
    childStep.value = 1;
  }
};

const goNext = async () => {
  if (!currentRole.value) return;

  // если мы в дочерней форме
  if (parentStep.value > 1) {

    if (childStep.value < childTotalSteps.value) {
      childStep.value++;
    } else {
      if (currentRole.value === "worker" && workerRef.value?.submitFromChild) {
        try {
          const res = await workerRef.value.submitFromChild();
        } catch (err) {
          console.log(err)
        }
      } else if (currentRole.value === "employer" && employerRef.value?.submitFromChild) {
        try {
          const res = await employerRef.value.submitFromChild();
        } catch (err) {
          console.log(err)
        }
      } else {
        alert("Форма завершена!");
      }
    }
    return;
  }
};

const updateFormData = (data: any) => {
  formData.value = { ...formData.value, ...data };
};

// установка количества шагов дочернего
const setChildSteps = (steps: number) => {
  childTotalSteps.value = steps;
  totalSteps.value = 1 + steps; // 1 шаг родителя + шаги дочернего
};

const overallActive = computed(() => (parentStep.value === 1 ? 1 : 1 + childStep.value)); // 1..totalSteps
const stepsCount = computed(() => Math.max(1, totalSteps.value));
const progressPercent = computed(() => {
  // если всего один шаг — нет прогресса
  if (stepsCount.value <= 1) return "0%";
  const pct = ((overallActive.value - 1) / (stepsCount.value - 1)) * 100;
  return `${Math.max(0, Math.min(100, pct))}%`;
});
</script>

<template>
  <v-container class="min-h-full flex justify-center items-center py-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <div class="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-8">

          <!-- СТЕПЕР (заменён на рабочий) -->
          <div v-if="parentStep > 1" class="relative mb-8 w-full">
            <!-- фон всей линии -->
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full h-1 bg-gray-300"></div>
            </div>

            <!-- активная часть линии -->
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="h-1 bg-indigo-500" :style="{ width: progressPercent }"></div>
            </div>

            <!-- кружки, распределённые по ширине -->
            <div class="relative flex justify-between w-full">
              <div v-for="index in stepsCount" :key="index" class="flex flex-col items-center"
                style="width: 2.5rem; margin-left: calc((100% - 2.5rem) * ((index - 1) / Math.max(1, stepsCount - 1)));">
                <!-- Круг шага -->
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-10"
                  :class="index <= overallActive ? 'bg-indigo-500' : 'bg-gray-300'">
                  {{ index }}
                </div>
              </div>
            </div>
          </div>
          <!-- Шаг 1: Выбор роли -->
          <div v-if="parentStep === 1">
            <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
              Выберите роль для регистрации
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div v-for="role in roles" :key="role.id"
                class="relative border rounded-2xl p-6 flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                @click="selectRole(role.id)">
                <img :src="role.image" class="w-32 h-32 mb-4 rounded-full object-cover border-2 border-gray-200" />

                <h3 class="font-semibold text-xl mb-5 text-gray-700">
                  {{ role.name }}
                </h3>

                <!-- Плюсы и минусы -->
                <div class="flex flex-col gap-4 w-full">
                  <!-- Плюсы -->
                  <div class="bg-green-50 rounded-xl p-3">
                    <ul class="space-y-1">
                      <li v-for="pro in role.pros" :key="pro" class="flex items-start text-sm text-green-700">
                        <span class="mr-2 font-bold">+</span> {{ pro }}
                      </li>
                    </ul>
                  </div>

                  <!-- Минусы -->
                  <div class="bg-red-50 rounded-xl p-3">
                    <ul class="space-y-1">
                      <li v-for="con in role.cons" :key="con" class="flex items-start text-sm text-red-700">
                        <span class="mr-2 font-bold">−</span> {{ con }}
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Шаг 2+: Дочерняя форма -->
          <div v-else>
            <p class="text-center text-gray-700 mb-4">
              Роль:
              <span class="font-semibold capitalize">
                {{ currentRole === 'worker' ? 'Исполнитель' : currentRole === 'employer' ? 'Заказчик' : 'Гость' }}
              </span>
            </p>

            <WorkerRegForm v-if="currentRole === 'worker'" ref="workerRef" :local-step="childStep"
              @update:data="updateFormData" @set-steps="setChildSteps" />
            <EmployerRegForm v-else-if="currentRole === 'employer'" ref="employerRef" :local-step="childStep"
              @update:data="updateFormData" @set-steps="setChildSteps" @next-step="childStep++" />

            <p v-else-if="currentRole === 'guest'" class="text-center text-gray-600 mb-4">
              Вы регистрируетесь как гость. Ограниченные возможности.
            </p>
          </div>

          <!-- Навигация -->
          <v-row v-if="parentStep > 1" class="mt-6" justify="space-between">
            <v-col class="flex">
              <button
                class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="goBack" :disabled="parentStep === 1 && childStep === 1">
                Назад
              </button>
            </v-col>
            <v-col class="flex justify-end">
              <button :disabled="!currentRole"
                class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="goNext">
                {{ childStep < childTotalSteps ? 'Далее' : 'Завершить' }} </button>
            </v-col>
          </v-row>

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
