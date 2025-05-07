<script setup>
let drawer = ref(false)
let router = useRouter()
</script>

<template>
  <v-app class="min-h-screen">
    <v-app-bar color="white" elevation="0">
      <v-container class="px-4">
        <v-row class="d-flex align-center">
          <v-col @click="router.push(`/`)" class="hidden lg:flex text-2xl" cols="5">
            <div class="d-flex gap-1"><a class="font-bold text-indigo-600 text-decoration-none h-[35px]">Nirby</a><a
                class="font-bold text-indigo-600 text-decoration-none h-[35px]"> - работа рядом</a></div>
          </v-col>
          <v-col @click="router.push(`/`)" class="lg:hidden flex ml-3 flex-col" md:cols="6">
            <a class="text-2xl font-bold text-indigo-600 text-decoration-none h-[20px] leading-2">Nirby</a>
            <p class="text-m font-bold text-indigo-600 text-decoration-none h-[20px] leading-3 mt-3">работа рядом</p>
          </v-col>

          <!-- Desktop and Tablet Navigation -->
          <v-col class="hidden md:flex gap-3 justify-end text-xs lg:text-sm xl:text-base" cols="7">
            <NuxtLink to="/work" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Работа
            </NuxtLink>
            <NuxtLink to="/create-order" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Разместить обявление
            </NuxtLink>
            <NuxtLink to="/requests" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Мои заказы | заявки
            </NuxtLink>
            <NuxtLink to="/sign" class="text-gray-600 hover:text-indigo-600 text-decoration-none">
              Войти
            </NuxtLink>
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
        <v-list>
          <v-list-item to="/work" class="text-gray-600">
            Работа
          </v-list-item>
          <v-list-item to="/create-order" class="text-gray-600">
            Разместить обявление
          </v-list-item>
          <v-list-item to="/requests" class="text-gray-600">
            Мои заказы | Заявки
          </v-list-item>
          <v-list-item to="/sign" class="text-gray-600">
            Войти
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-main class="bg-gray-50 pb-28 md:pb-20">
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>