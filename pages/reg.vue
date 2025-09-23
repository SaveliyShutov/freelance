<script setup lang="ts">
import { ref } from "vue";
import workerImage from "~/assets/workerImage.png";
import employerImage from "~/assets/employerImage.png";
import guestImage from "~/assets/guest.png";

const router = useRouter();
const currentRole = ref<string | null>(null);
const formData = ref({});

// роли
const roles = [
  { id: "worker", name: "Исполнитель", image: workerImage, pros: ["может откликаться"], cons: ["не может создавать"] },
  { id: "employer", name: "Заказчик", image: employerImage, pros: ["может создавать"], cons: ["не может откликаться"] },
  { id: "guest", name: "Гость", image: guestImage, pros: ["может просматривать объявления"], cons: ["не может откликаться и создавать"] },
];

const selectRole = (roleId: string) => {
  if (roleId === "guest") {
    router.push("/");
    return;
  }
  currentRole.value = roleId;
};

const updateFormData = (data: any) => {
  formData.value = { ...formData.value, ...data };
};
</script>

<template>
  <v-container class="min-h-full flex justify-center items-center py-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <div class="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-8">

          <!-- Выбор роли -->
          <div v-if="!currentRole">
            <h2 class="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
              Выберите роль для регистрации
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div v-for="role in roles" :key="role.id"
                class="relative border rounded-2xl p-6 flex flex-col cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105">

                <div @click="selectRole(role.id)" class="flex flex-col items-center flex-1">
                  <img :src="role.image" class="w-32 h-32 mb-4 rounded-full object-cover border-2 border-gray-200" />
                  <h3 class="font-semibold text-xl mb-5 text-gray-700">{{ role.name }}</h3>

                  <div class="flex flex-col gap-4 w-full mb-4 flex-1">
                    <!-- Плюсы -->
                    <div class="bg-[var(--primary-200)] rounded-xl p-3">
                      <ul class="space-y-1">
                        <li v-for="pro in role.pros" :key="pro"
                          class="flex items-start text-sm text-[var(--primary-800)]">
                          <span class="mr-2 font-bold">+</span> {{ pro }}
                        </li>
                      </ul>
                    </div>
                    <!-- Минусы -->
                    <div class="bg-[var(--primary-50)] rounded-xl p-3">
                      <ul class="space-y-1">
                        <li v-for="con in role.cons" :key="con"
                          class="flex items-start text-sm text-[var(--primary-600)]">
                          <span class="mr-2 font-bold">−</span> {{ con }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center mt-auto">
                  <button @click="selectRole(role.id)" class="w-32 text-white font-semibold py-2 rounded-xl 
                    bg-[var(--primary-500)] hover:bg-[var(--primary-600)] transition-colors duration-200">
                    Выбор
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Дочерняя форма -->
          <div v-else>
            <p class="text-center text-gray-700 mb-4">
              Роль:
              <span class="font-semibold capitalize">
                {{ currentRole === 'worker' ? 'Исполнитель' : currentRole === 'employer' ? 'Заказчик' : 'Гость' }}
              </span>
            </p>

            <WorkerRegForm v-if="currentRole === 'worker'" @reset-role="currentRole = null" />
            <EmployerRegForm v-else-if="currentRole === 'employer'" @reset-role="currentRole = null"/>
          </div>

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
