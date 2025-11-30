<script setup lang="ts">
const userStore = useAuth();
const router = useRouter();

async function logOut() {
  const res = await userStore.logout();
  if (res.status.value == "success") {
    router.push("/");
  }
}

function changeRole() {
  userStore.currentRole = "worker";

  const roleCookie = useCookie('currentRole')
  roleCookie.value = 'worker'

  localStorage.setItem("currentRole", "worker");
  router.push("/worker");
}
</script>

<template>
  <v-row>
    <v-col class="hidden md:flex px-0 md:px-10 align-center justify-between">
      <v-menu>
        <template #activator="{ props }">
          <v-btn density="compact" class="mx-2" icon="mdi mdi-account" color="#4a5565" variant="text" v-bind="props" />
        </template>
        <v-list>
          <div v-if="userStore.user" class="z-10 bg-white divide-y divide-gray-200 rounded-lg w-44">
            <div
class="cursor-pointer px-4 py-3 text-sm text-gray-900"
              @click="router.push(`/profile/${userStore.user._id}`)">
              <div class="font-medium">{{ userStore.user?.employer_name }}</div>
              <div class="truncate">Заказчик</div>
            </div>
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink
v-if="!userStore.user?.worker_name" to="/employer/sign-worker"
                class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none">
                Войти как исполнитель
              </NuxtLink>
              <NuxtLink
v-else class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none"
                @click="changeRole()">
                Войти как исполнитель
              </NuxtLink>
            </ul>
            <div class="py-2 hover:text-red-300 cursor-pointer" @click="logOut()">
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
