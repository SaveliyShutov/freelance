<template>
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">Freelance</NuxtLink>
        <div class="flex gap-6">
          <NuxtLink to="/work" class="text-gray-600 hover:text-gray-900">Работа</NuxtLink>
          <NuxtLink to="/create-order" class="text-gray-600 hover:text-gray-900">Разместить обявление</NuxtLink>
          <NuxtLink to="/requests" class="text-gray-600 hover:text-gray-900">Мои заказы | заявки</NuxtLink>
          <NuxtLink to="/sign" class="text-gray-600 hover:text-gray-900">Войти</NuxtLink>
        </div>
      </nav>
    </v-container>
  </header>

  <div class="bg-gray-50 min-h-screen">
    <slot />
  </div>
  <Footer />
</template>