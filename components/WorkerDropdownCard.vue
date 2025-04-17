<script setup>
const currentRole = ref('client')
const userStore = useAuth()
let router = useRouter()

const toggleRole = () => {
  currentRole.value = currentRole.value === 'client' ? 'freelancer' : 'client'
}

const logout = () => {
  // Твоя логика выхода
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-menu offset-y transition="slide-y-transition">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text" class="px-1 py-2 d-flex align-center gap-2">
            <v-avatar v-if="userStore.user?.worker_avatar" class="border" :image="userStore.user?.worker_avatar" />
            <v-avatar v-else class="border">{{ userStore.user?.worker_name[0] }}</v-avatar>
            <div class="text-left">
              <p class="text-sm">{{ userStore.user?.worker_name }}</p>
              <p class="text-xs font-bold -mt-1">исполнитель</p>
            </div>
            <v-icon icon="mdi-menu-down" class="text-gray-600" />
          </v-btn>
        </template>

        <v-list class="w-64">
          <v-list-item @click="router.push(`/worker`)">
            <v-list-item-title>
              <v-icon start class="text-indigo-600">mdi-account</v-icon>
              Профиль
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="toggleRole">
            <v-list-item-title>
              <v-icon start class="text-indigo-600">mdi-swap-horizontal</v-icon>
              Сменить роль на {{ currentRole === 'worker' ? 'Worker' : 'Employer' }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-title class="text-red-600">
              <v-icon start class="text-red-600">mdi-logout</v-icon>
              Выйти
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
