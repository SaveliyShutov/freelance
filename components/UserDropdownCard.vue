<script setup>
const isOpen = ref(false)
const currentRole = ref('client')
const userStore = useAuth()
const toggleRole = () => {
    currentRole.value = currentRole.value === 'client' ? 'freelancer' : 'client'
    isOpen.value = false
}

const logout = () => {
    isOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest('.relative')) {
            isOpen.value = false
        }
    }

    document.addEventListener('click', handleClickOutside)

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
})
</script>
<template>
    <v-row>
        <v-col cols="12" md="20">
            <div class="relative">
                <button @click="isOpen = !isOpen"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
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
                            <p class="text-x -mt-1"><b>
                                {{ userStore.user?.role }}
                            </b></p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-gray-600" :class="{ 'rotate-180': isOpen }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                <div v-show="isOpen"
                    class="absolute mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <NuxtLink @click="toggleRole" to="/worker" class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <span class="mdi mdi-account text-indigo-600"></span>
                        Профиль
                    </NuxtLink>

                    <button @click="toggleRole"
                        class="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <span class="mdi mdi-swap-horizontal text-indigo-600"></span>
                        <!-- Сменить роль на {{ currentRole === {{ userStore.user.role }} ? 'Employer' : 'Worker' }} -->
                        Сменить роль на {{ currentRole === 'worker' ? 'Worker' : 'Employer' }}
                    </button>
                    <button @click="logout"
                        class="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Log Out
                    </button>
                </div>
            </div>
        </v-col>
    </v-row>
</template>