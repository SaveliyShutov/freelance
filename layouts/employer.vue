<script setup>
import UserDropdownCard from '~/components/UserDropdownCard.vue';

const userStore = useAuth()

</script>
<template>
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/employer" class="text-2xl font-bold text-indigo-600"> Nirby - работа рядом</NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/employer/work" class="text-gray-600 hover:text-indigo-600">Работа</NuxtLink>
          <NuxtLink to="/employer/create-order" class="text-gray-600 hover:text-indigo-600">Разместить обявление
          </NuxtLink>
          <NuxtLink to="/employer/requests" class="text-gray-600 hover:text-indigo-600">Мои заказы</NuxtLink>
          <UserDropdownCard class="z-10"/>
        </div>
      </nav>
    </v-container>
  </header>

  <div class="bg-gray-50 min-h-screen">
    <slot />
  </div>

  <Footer />
</template>