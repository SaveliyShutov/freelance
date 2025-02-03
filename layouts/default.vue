<template>
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <v-container>
      <nav class="h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">Freelance</NuxtLink>
        <div class="flex gap-6">
          <NuxtLink to="/work" class="text-gray-600 hover:text-gray-900">Работа</NuxtLink>
          <NuxtLink to="/employer" class="text-gray-600 hover:text-gray-900">Разместить обявление</NuxtLink>
          <NuxtLink to="/requests" class="text-gray-600 hover:text-gray-900">Заявки</NuxtLink>
          <NuxtLink to="/sign" class="text-gray-600 hover:text-gray-900">Войти</NuxtLink>
          <NuxtLink to="/profile/id" class="text-gray-600 hover:text-gray-900">Профиль</NuxtLink>
        </div>
      </nav>
    </v-container>
  </header>

  <div class="bg-gray-100 pb-20">
    <slot />
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white pt-5">
    <v-container>
      <v-row class="py-12">
        <v-col cols="12" md="4">
          <h4 class="text-lg font-semibold mb-4">Contact</h4>
          <p>Email: contact@example.com</p>
          <p>Phone: (555) 123-4567</p>
        </v-col>
        <v-col cols="12" md="4">
          <h4 class="text-lg font-semibold mb-4">Services</h4>
          <ul>
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Consulting</li>
          </ul>
        </v-col>
        <v-col cols="12" md="4">
          <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
          <div class="flex gap-4">
            <a href="#" class="hover:text-indigo-400">Twitter</a>
            <a href="#" class="hover:text-indigo-400">LinkedIn</a>
            <a href="#" class="hover:text-indigo-400">GitHub</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>