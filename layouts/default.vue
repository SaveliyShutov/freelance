<script setup>
let drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar color="white" elevation="0">
      <v-container class="px-4">
        <div class="d-flex align-center justify-space-between w-100">
          <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 text-decoration-none">
            Freelance
          </NuxtLink>

          <!-- Desktop and Tablet Navigation -->
          <div class="d-none d-sm-flex gap-6">
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
          </div>

          <!-- Mobile Navigation Button (xs only) -->
          <v-app-bar-nav-icon
            class="d-sm-none"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer (xs) -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      class="d-sm-none mobile-drawer"
    >
      <v-list>
        <v-list-item
          to="/work"
          class="text-gray-600"
        >
          Работа
        </v-list-item>
        <v-list-item
          to="/create-order"
          class="text-gray-600"
        >
          Разместить обявление
        </v-list-item>
        <v-list-item
          to="/requests"
          class="text-gray-600"
        >
          Мои заказы | Заявки
        </v-list-item>
        <v-list-item
          to="/sign"
          class="text-gray-600"
        >
          Войти
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-gray-50">
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>