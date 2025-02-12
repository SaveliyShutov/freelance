<script setup>
let userStore = useAuth()
</script>
<template>
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/worker" class="text-2xl font-bold text-indigo-600">Freelance</NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/worker/work" class="text-gray-600 hover:text-gray-900">Работа</NuxtLink>
          <NuxtLink to="/create-order" class="text-gray-600 hover:text-gray-900">Разместить обявление</NuxtLink>
          <NuxtLink to="/worker/requests" class="text-gray-600 hover:text-gray-900">Мои заявки</NuxtLink>
          <div class="flex align-center justify-between">
            <div class="" v-if="userStore.user?.avatars[0]">
              <v-avatar class="border" :image="userStore.user?.avatars[0]"></v-avatar>
            </div>
            <div class="" v-else>
              <v-avatar class="border">{{ userStore.user?.name[0] }}{{ userStore.user?.surname[0] }}</v-avatar>
            </div>
            <div class="mx-2">
              <p class="text-sm">
                {{ userStore.user?.name }}
              </p>
              <p class="text-xs">
                {{ userStore.user?.role }}
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