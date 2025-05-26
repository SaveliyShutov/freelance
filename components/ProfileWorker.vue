<script setup>
const userStore = useAuth()
const editingAbout = ref(false)
const editingFields = ref({})
const editData = ref({})
const isEditingAbout = ref(false)
const isEditingName = ref(false)
const isEditingEmail = ref(false)
const isEditingRating = ref(false)

const fieldLabels = {
    name: 'Имя пользователя',
    email: 'Email',
    phone: 'Номер телефона',
    password: 'Пароль',
    city: 'Ваше местоположение'
}

const editableFields = {
    name: '',
    email: '',
    phone: '',
    password: '',
    city: ''
}

const updatePersonalInfo = async () => {
    try {
        // Implement update logic here
        console.log('Updating personal info:', personalForm.value)
        isEditingPersonal.value = false
    } catch (error) {
        console.error('Error updating personal info:', error)
    }
}

const startEdit = (field) => {
    editingFields.value[field] = true
    editData.value[field] = userStore.value[field]
}

const cancelEdit = (field) => {
    if (field === 'about') {
        editingAbout.value = false
        editData.value.about = userStore.value.about
    } else {
        editingFields.value[field] = false
        editData.value[field] = userStore.value[field]
    }
}

const saveEdit = (field) => {
    if (field === 'about') {
        userStore.value.about = editData.value.about
        editingAbout.value = false
    } else {
        userStore.value[field] = editData.value[field]
        editingFields.value[field] = false
    }
    // Here you would typically make an API call to save the changes
}

const changePassword = async () => {
    // Implement password change logic here
    console.log('Changing password...')
}

// Simulated user data fetch - replace with actual API call
onMounted(() => {
    // Temporary mock data
    userStore.value = {
        name: 'Иван Громов',
        email: 'john@example.com',
        phone: '+79024549166',
        city: 'с.Россия, г.Пермь',
        password: 'Qwerty123',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        about: 'Здесь вы можете что-нибудь написать, чтобы зарекомендовать себя.:)',
        completedWorks: [
            {
                id: 1,
                title: 'Website Development',
                description: 'Built a responsive e-commerce website'
            },
            {
                id: 2,
                title: 'Mobile App Design',
                description: 'Created UI/UX design for iOS application'
            }
        ]
    }

    // Initialize editData with current values
    editData.value = { ...userStore.value }
})
</script>

<template>
    <v-container>
        <v-row v-if="userStore" class="w-full bg-white rounded-lg shadow-md">
            <v-col cols="4" class="text-center mb-6">
                <div class="pa-4 w-full bg-white rounded-lg shadow-md">
                    <v-avatar size="150" color="grey-lighten-2" class="elevation-3">
                        <v-img :src="userStore.user.employer_avatar" alt="Profile avatar"></v-img>
                    </v-avatar>
                    <h2 class="text-indigo-600 font-bold mt-4 mb-2">Профиль исполнителя</h2>
                    <div class="pa-4">
                        <div class="d-flex justify-space-between align-center mb-3">
                            <h3 class="text-indigo-600">О себе</h3>
                            <button @click="isEditingAbout = !isEditingAbout" class="text-blue-500 hover:text-blue-600">
                                {{ isEditingAbout ? 'Cancel' : 'Edit' }}
                            </button>
                        </div>
                        <div class="space-y-4">
                            <p>{{ userStore.user.worker_description }}</p>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="4">
                <v-card class="pa-4">
                    <div class="d-flex justify-space-between align-center mb-2">
                        <h3 class="">Имя пользователя</h3>
                        <button @click="isEditingName = !isEditingName" class="text-blue-500 hover:text-blue-600">
                            {{ isEditingName ? 'Cancel' : 'Edit' }}
                        </button>
                    </div>
                    <v-text-field :model-value="userStore.user.worker_name" color="indigo" variant="outlined"
                        density="comfortable"></v-text-field>
                    <div class="d-flex justify-space-between align-center mb-2">
                        <h3 class="">Электронная почта</h3>
                        <button @click="isEditingEmail = !isEditingEmail" class="text-blue-500 hover:text-blue-600">
                            {{ isEditingEmail ? 'Cancel' : 'Edit' }}
                        </button>
                    </div>
                    <v-text-field :model-value="userStore.user.email" color="indigo" variant="outlined"
                        density="comfortable"></v-text-field>
                    <div class="d-flex justify-space-between align-center mb-2">
                        <h3 class="">Рейтинг</h3>
                        <button @click="isEditingRating = !isEditingRating" class="text-blue-500 hover:text-blue-600">
                            {{ isEditingRating ? 'Cancel' : 'Edit' }}
                        </button>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="4" class="mb-6">
                <v-card>
                    <v-card-title class="text-indigo-600">Completed Works</v-card-title>
                    <v-list>
                        <v-list-item v-for="work in userStore.completedWorks" :key="work.id" class="mb-2">
                            <v-list-item-title class="font-weight-medium">{{ work.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ work.description }}</v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" class="text-center">
                <p class="text-indigo-600">Please register to access worker profile features</p>
                <v-btn color="indigo" to="/reg">
                    Register Now
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>