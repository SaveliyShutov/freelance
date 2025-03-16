<script setup>
const userStore = useAuth()

</script>
<template>
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/employer" class="text-2xl font-bold text-indigo-600">Freelance</NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/employer/work" class="text-gray-600 hover:text-gray-900">Работа</NuxtLink>
          <NuxtLink to="/employer/create-order" class="text-gray-600 hover:text-gray-900">Разместить обявление
          </NuxtLink>
          <NuxtLink to="/employer/requests" class="text-gray-600 hover:text-gray-900">Мои заказы</NuxtLink>
          <div class="flex align-center justify-between">
            <div class="" v-if="userStore.employer?.avatar">
              <v-avatar class="border" :image="userStore.employer?.avatar"></v-avatar>
            </div>
            <div class="" v-else>
              <v-avatar class="border">{{ userStore.employer?.name[0] }}</v-avatar>
            </div>
            <div class="mx-2">
              <p class="text-sm">
                {{ userStore.employer?.name }}
              </p>
              <p class="text-xs">
                заказчик
              </p>
            </div>
          </div>
        </div>
      </nav>
    </v-container>
  </header>

  <div class="bg-gray-50 min-h-screen">
    <slot />
  </div>

  <Footer />
</template>