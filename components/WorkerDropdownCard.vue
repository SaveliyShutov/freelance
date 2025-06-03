<script setup lang="ts">
const userStore = useAuth();
const router = useRouter();
let dialog = ref();

async function logOut() {
  let res = await userStore.logout();
  if (res.status.value == "success") {
    router.push("/");
  }
}

function changeRole() {
  const roleCookie = useCookie('currentRole')
  roleCookie.value = 'employer'
  userStore.currentRole = "employer";
  localStorage.setItem("currentRole", "employer");
  router.push("/employer");
}
</script>

<template>
  <v-row>
    <v-col class="hidden md:flex px-0 md:px-10 align-center justify-between">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn density="compact" class="mx-2" icon="mdi mdi-account" color="#4a5565" variant="text"
            v-bind="props"></v-btn>
        </template>
        <v-list>
          <div class="z-10 bg-white divide-y divide-gray-200 rounded-lg w-44">
            <div @click="router.push(`/profile/${userStore.user?._id}`)" class="cursor-pointer px-4 py-3 text-sm text-gray-900">
              <div class="font-medium">{{ userStore.user?.worker_name }}</div>
              <div class="truncate">Исполнитель</div>
            </div>
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink v-if="!userStore.user?.employer_name" to="/worker/sign-employer"
                class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none">
                Войти как заказчик
              </NuxtLink>
              <NuxtLink v-else @click="changeRole()"
                class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none">
                Войти как заказчик
              </NuxtLink>
            </ul>
            <div @click="logOut()" class="py-2 hover:text-red-300 cursor-pointer">
              <p href="#" class="items-center flex px-4 py-2 text-sm text-red-600">
                <v-icon start class="text-red-600">mdi-logout</v-icon>Выйти
              </p>
            </div>
          </div>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
