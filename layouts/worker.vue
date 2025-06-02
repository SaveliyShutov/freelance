<script setup>
const userStore = useAuth()
let drawer = ref(false);
let router = useRouter()

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
  <v-app class="min-h-screen">
    <v-app-bar color="white" elevation="0">
      <v-container class="px-4">
        <v-row class="flex align-center">
          <v-col @click="router.push(`/landing`)" class="hidden md:flex text-2xl cursor-pointer" cols="5">
            <a class="font-bold text-indigo-600 text-decoration-none h-[35px]">Nirby</a><a
              class="font-bold text-indigo-600 text-decoration-none h-[35px]">
              - работа рядом</a>
          </v-col>
          <v-col @click="router.push(`/landing`)" class="md:hidden flex-col cursor-pointer" md:cols="6">
            <a class="text-2xl font-bold text-indigo-600 text-decoration-none h-[20px] leading-2">Nirby</a>
            <p class="text-m font-semibold text-indigo-600 text-decoration-none h-[20px] leading-3">работа рядом</p>
          </v-col>

          <!-- Desktop and Tablet Navigation -->
          <v-col class="hidden md:flex gap-1 lg:gap-2 xl:gap-3 justify-end items-center text-xs lg:text-sm xl:text-base"
            cols="7">
            <NuxtLink to="/worker" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Работа
            </NuxtLink>
            <NuxtLink to="/worker/requests" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Мои заявки
            </NuxtLink>
            <div>
              <WorkerDropdownCard />
            </div>
          </v-col>


          <v-col class="md:hidden flex gap-3 justify-end" cols="4">
            <!-- Mobile Navigation Button (xs only) -->
            <v-app-bar-nav-icon class="md:hidden flex gap-6" @click="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer (xs) -->
    <div v-if="drawer">
      <v-navigation-drawer v-model="drawer" location="right" temporary>
        <v-list class="text-gray-600">
          <v-list-item class="border-b pl-5 pb-4">
            <div class="text-xl font-medium">{{ userStore.user?.worker_name }} {{ userStore.user?.worker_surname }}</div>
            <div class="text-sm">исполнитель</div>
          </v-list-item>
          <v-list-item to="/worker" class="">
            Работа
          </v-list-item>
          <v-list-item to="/worker/requests" class="">
            Мои заявки
          </v-list-item>
          <v-list-item  v-if="!userStore.user?.employer_name" to="/worker/sign-employer"
            class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none">
            Войти как заказчик
          </v-list-item >
          <v-list-item  v-else @click="changeRole()"
            class="block px-4 py-2 text-gray-600 hover:text-indigo-600 text-decoration-none">
            Войти как заказчик
          </v-list-item >
          <v-list-item @click="logOut()" class="items-center flex px-4 py-2 text-red-600">
            <v-icon start class="text-red-600">mdi-logout</v-icon>Выйти
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <div class="bg-gray-50 mt-16 pb-28 md:pb-20">
      <slot />
    </div>

    <Footer />
  </v-app>
</template>