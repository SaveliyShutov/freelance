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
                    <p class="text-xs">
                        {{ userStore.user?.role }}
                    </p>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4 text-gray-600" :class="{ 'rotate-180': isOpen }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        <div v-show="isOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
            <a href="worker/profile"
                class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 text-[#473CD2]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Профиль
            </a>

            <button @click="toggleRole"
                class="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 text-[#473CD2]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                Сменить роль на {{ currentRole === 'client' ? 'Freelancer' : 'Client' }}
            </button>

            <div class="h-px bg-gray-100 my-2"></div>

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
</template>