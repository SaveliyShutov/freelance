<script setup lang="ts">
let currentRole = ref("Заказчик");
const userStore = useAuth();
const router = useRouter();
let dialog = ref();
</script>

<template>
  <v-row>
    <v-col class="hidden md:flex px-0 md:px-10 align-center justify-between">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            density="compact"
            class="mx-2"
            icon="mdi mdi-account"
            color="#4a5565"
            variant="text"
            v-bind="props"
          ></v-btn>
        </template>
        <v-list>
          <div class="z-10 bg-white divide-y divide-gray-200 rounded-lg w-44">
            <div class="px-4 py-3 text-sm text-gray-900">
              <div class="font-medium">{{ userStore.user?.worker_name }} {{ userStore.user?.worker_surname }}</div>
              <div class="truncate">исполнитель</div>
            </div>
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink
                to="/"
                class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none"
              >
                Войти как заказчик
              </NuxtLink>
            </ul>
            <div class="py-2 hover:text-red-300 cursor-pointer">
              <p href="#" class="items-center flex px-4 py-2 text-sm text-red-600">
                <v-icon start class="text-red-600">mdi-logout</v-icon>Выйти
              </p>
            </div>
          </div>
        </v-list>
      </v-menu>
      <!-- </div> -->
    </v-col>
  </v-row>
</template>
