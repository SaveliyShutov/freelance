<script setup>
const email = ref('')
const password = ref('')
const phone = ref('')
const isSignUp = ref(false)

const router = useRoute()

const handleSubmit = () => {
  // Handle form submission here
  console.log('Form submitted:', {
    email: email.value,
    password: password.value,
    type: isSignUp.value ? 'signup' : 'signin'
  })
}
</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Войти
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              или
              <NuxtLink to="/reg" class="font-medium text-indigo-600 hover:text-indigo-500">
                создать новый акканут'
              </NuxtLink>
            </p>
          </div>
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Электроная почта</label>
                <input id="email-address" name="email" type="email" required v-model="email"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Электроная почта" />
              </div>
              <div v-if="!isSignUp">
                <label for="phone" class="sr-only">Телефон</label>
                <input id="phone" name="phone" type="phone" required v-model="phone"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Телефон" />
              </div>
              <div>
                <label for="password" class="sr-only">Пароль</label>
                <input id="password" name="password" type="password" required v-model="password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Пароль" />
              </div>
            </div>

            <div>
              <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Войти
              </button>
            </div>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>