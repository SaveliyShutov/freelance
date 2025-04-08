<script setup>
let userStore = useAuth()
</script>
<template>
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/worker" class="text-2xl font-bold text-indigo-600"> Nirby - работа рядом</NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/worker/work" class="text-gray-600 hover:text-indigo-600">Работа</NuxtLink>
          <NuxtLink to="/create-order" class="text-gray-600 hover:text-indigo-600">Разместить обявление</NuxtLink>
          <NuxtLink to="/worker/requests" class="text-gray-600 hover:text-indigo-600">Мои заявки</NuxtLink>
          <UserDropdownCard/>
        </div>
      </nav>
    </v-container>
  </header>

  <div class="bg-gray-50 min-h-screen">
    <slot />
  </div>

  <Footer />
</template>