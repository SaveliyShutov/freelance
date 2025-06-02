<script setup>
import { Transition } from 'vue'
const userStore = useAuth()

const fileInput = ref(null)
const userData = ref(null)
const editingAbout = ref(false)
const editingFields = ref({})
const editData = ref({})

const fieldLabels = {
    name: 'Имя пользователя',
    email: 'Email',
    phone: 'Номер телефона',
    password: 'Пароль',
    location: 'Ваша локация'
}

const editableFields = {
    name: '',
    location: '',
    email: '',
    phone: '',
    password: ''
}
const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
};

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

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Валидация размера (макс. 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Максимальный размер файла - 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            userData.value.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const changePassword = async () => {
    // Implement password change logic here
    console.log('Changing password...')
}
onMounted(() => {
    userData.value = {
        // name: userStore.user.worker_name ,
        // email: userStore.user.email,
        // rating: userStore.user.worker_rating,
        // phone: userStore.user.worker_phone,
        // location: userStore.user.worker_address,
        // password: userStore.user.worker_rating,
        // avatar: userStore.user.worker_avatar,
        // about: userStore.user.worker_description ,
        name: 'Иван Громов',
        email: 'john@example.com',
        rating: 4,
        phone: '+79024549166',
        location: 'с.Россия, г.Пермь',
        password: 'Qwerty123',
        avatar: '',
        about: 'Здесь вы можете что-нибудь написать, чтобы зарекомендовать себя.:)',
        completedWorks: [
            {
                id: 1,
                title: 'Помощь с покупкой продуктов',
                description: 'None'
            },
            {
                id: 2,
                title: 'Переноска грузов',
                description: 'Помочь разгрузить фуру'
            }
        ]
    }

    // Initialize editData with current values
    editData.value = { ...userData.value }
})
</script>
<template>
    <v-container class="px-0 px-sm-4">
        <div class="border-2 text-center rounded-md border-indigo-400 mb-6 py-3">
            <p class="text-indigo-600 font-bold">Профиль заказчика</p>
        </div>

        <v-row v-if="userData" class="flex-wrap">
            <v-col cols="12" sm="12" md="4" lg="4" class="order-1 md:order-none">
                <v-card class="pa-4 mb-4">
                    <div class="flex flex-col items-center">
                        <v-avatar size="120"
                            class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-6xl cursor-pointer"
                            @click="triggerFileInput">
                            <v-img v-if="userData.avatar" :src="userData.avatar"></v-img>
                            <span v-else>{{ getInitial(userData.name) }}</span>
                            <div class="edit-overlay">
                                <v-icon size="30" color="white">mdi-pencil</v-icon>
                            </div>
                        </v-avatar>
                        <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload">

                        <div class="mt-3 text-center">
                            <p class="text-lg font-medium">{{ userData.name }}</p>
                            <p class="text-gray-600">{{ userData.location }}</p>
                        </div>

                        <div class="flex justify-center my-2">
                            <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                                {{ n <= userData.rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
                        </div>
                    </div>
                </v-card>
                <v-card class="pa-4">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-indigo-600">Обо мне</h3>
                        <button v-if="!editingAbout" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
                            @click="editingAbout = true">Изменить</button>
                        <div v-else class="flex">
                            <button class="!text-red-400 hover:!text-red-600 mr-2"
                                @click="cancelEdit('about')">Отмена</button>
                            <button class="!text-blue-400 hover:!text-blue-600"
                                @click="saveEdit('about')">Сохранить</button>
                        </div>
                    </div>
                    <p v-if="!editingAbout" class="text-body-1">{{ userData.about }}</p>
                    <v-textarea v-else v-model="editData.about" @keyup.enter="saveEdit('about')" color="indigo"
                        variant="outlined" rows="3" no-resize @keydown.enter.prevent></v-textarea>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" class="order-2 md:order-none">
                <v-card class="pa-4 h-full">
                    <div v-for="(value, key) in editableFields" :key="key" class="mb-4 last:mb-0">
                        <div class="flex justify-between items-center">
                            <h3 class="text-subtitle-1 text-indigo-600">{{ fieldLabels[key] }}</h3>
                            <button v-if="!editingFields[key]" variant="plain"
                                class="!text-indigo-600 hover:!text-blue-800" @click="startEdit(key)">Изменить</button>
                            <div v-else class="flex">
                                <button class="!text-red-400 hover:!text-red-600 mr-2"
                                    @click="cancelEdit(key)">Отмена</button>
                                <button class="!text-blue-400 hover:!text-blue-600"
                                    @click="saveEdit(key)">Сохранить</button>
                            </div>
                        </div>
                        <div v-if="editingFields[key]">
                            <v-text-field :model-value="editData[key]" @update:model-value="val => editData[key] = val"
                                @keyup.enter="saveEdit(key)" color="indigo" variant="outlined" density="comfortable"
                                class="mt-1" :type="key === 'password' ? 'text' : 'text'" hide-details>
                            </v-text-field>
                        </div>
                        <div v-else class="py-2 mb-3">
                            <template v-if="key === 'password'">
                                {{ '*'.repeat(userData[key] ? userData[key].length : 8) }}
                            </template>
                            <template v-else>
                                {{ userData[key] }}
                            </template>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" class="order-3 md:order-none">
                <v-card class="">
                    <v-card-title class="text-indigo-600">Выполненные заказы</v-card-title>
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
                <p class="text-indigo-600 mb-4">Пожалуйста, зарегистрируйтесь, чтобы получить доступ к профилю</p>
                <v-btn color="indigo" to="/reg" size="large" class="mb-4">
                    Регистрация
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-container {
    max-width: 100%;
}

@media (min-width: 600px) {
    .v-container {
        max-width: 95%;
    }
}

@media (min-width: 960px) {
    .v-container {
        max-width: 90%;
    }
}

@media (min-width: 1264px) {
    .v-container {
        max-width: 1185px;
    }
}
.edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(79, 70, 229, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
}

.v-avatar:hover .edit-overlay {
    opacity: 1;
}
@media (max-width: 959px) {
    .v-col {
        padding: 8px;
    }

    .v-card {
        margin-bottom: 16px;
    }
}
.v-list-item-title {
    white-space: normal;
}
</style>