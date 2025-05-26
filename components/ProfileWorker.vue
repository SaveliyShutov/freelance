<script setup>
const userData = ref(null)
const editingAbout = ref(false)
const editingFields = ref({})
const editData = ref({})

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

const startEdit = (field) => {
    editingFields.value[field] = true
    editData.value[field] = userData.value[field]
}

const cancelEdit = (field) => {
    if (field === 'about') {
        editingAbout.value = false
        editData.value.about = userData.value.about
    } else {
        editingFields.value[field] = false
        editData.value[field] = userData.value[field]
    }
}

const saveEdit = (field) => {
    if (field === 'about') {
        userData.value.about = editData.value.about
        editingAbout.value = false
    } else {
        userData.value[field] = editData.value[field]
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
    userData.value = {
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
    editData.value = { ...userData.value }
})
</script>

<template>
    <v-container>
        <v-row v-if="userData">
            <v-col cols="4" class="text-center mb-6">
                <v-card class="pa-4">
                    <v-avatar size="150" color="grey-lighten-2" class="elevation-3">
                        <v-img :src="userData.avatar" alt="Profile avatar"></v-img>
                    </v-avatar>
                    <h2 class="text-indigo-600 font-bold mt-4 mb-2">Профиль работника</h2>
                    <v-card class="pa-4">
                        <div class="d-flex justify-space-between align-center mb-3">
                            <h3 class="text-indigo-600">About Me</h3>
                            <v-btn v-if="!editingAbout" variant="plain" class="text-indigo-800"
                                @click="editingAbout = true">Edit</v-btn>
                            <div v-else>
                                <v-btn text color="grey" class="mr-2" @click="cancelEdit('about')">Cancel</v-btn>
                                <v-btn color="indigo" @click="saveEdit('about')">Save</v-btn>
                            </div>
                        </div>
                        <p v-if="!editingAbout" class="text-body-1">{{ userData.about }}</p>
                        <v-textarea v-else v-model="editData.about" color="indigo" variant="outlined"></v-textarea>
                    </v-card>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="pa-4">
                    <div class="mb-4" v-for="(value, key) in editableFields" :key="key">
                        <div class="d-flex justify-space-between align-center mb-2">
                            <h3 class="text-subtitle-1">{{ fieldLabels[key] }}</h3>
                            <v-btn v-if="!editingFields[key]" variant="plain" class="text-indigo-800"
                                @click="startEdit(key)">Edit</v-btn>
                            <div v-else>
                                <v-btn text color="grey" class="mr-2" @click="cancelEdit(key)">Cancel</v-btn>
                                <v-btn color="indigo" @click="saveEdit(key)">Save</v-btn>
                            </div>
                        </div>
                        <v-text-field :model-value="editingFields[key] ? editData[key] : userData[key]"
                            @update:model-value="val => editData[key] = val" :readonly="!editingFields[key]"
                            color="indigo" variant="outlined" density="comfortable"></v-text-field>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="4" class="mb-6">
                <v-card>
                    <v-card-title class="text-indigo-600">Completed Works</v-card-title>
                    <v-list>
                        <v-list-item v-for="work in userData.completedWorks" :key="work.id" class="mb-2">
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
                <v-btn color="indigo" to="/register">
                    Register Now
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>