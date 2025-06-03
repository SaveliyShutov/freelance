<script setup>
import { Transition } from 'vue'
const userStore = useAuth()
const orderStore = useOrder()

await orderStore.getOrdersWithApplications();

const fileInput = ref(null)
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
  editData.value[field] = userStore.user[field]
}

const cancelEdit = (field) => {
  if (field === 'about') {
    editingAbout.value = false
    editData.value.about = userStore.user.employer_description
  } else {
    editingFields.value[field] = false
    editData.value[field] = userStore.user[field]
  }
}

const saveEdit = (field) => {
  if (field === 'about') {
    userStore.user.employer_description = editData.value.about
    editingAbout.value = false
  } else {
    userStore.user[field] = editData.value[field]
    editingFields.value[field] = false
  }
  // Тут обычно отправляем данные на сервер
}

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('Максимальный размер файла - 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      userStore.user.employer_avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const changePassword = async () => {
  console.log('Changing password...')
}
</script>
<template>
  <v-container class="px-0 px-sm-4">
    <div class="bg-indigo-600 border-2 text-center rounded-md border-indigo-600 mb-6 py-3">
      <p class="text-white font-bold">Профиль заказчика</p>
    </div>

    <v-row v-if="userStore.user" class="flex-wrap">
      <v-col cols="12" sm="12" md="4" lg="4" class="order-1 md:order-none">
        <v-card class="pa-4 mb-4 shadow-lg border border-gray-100">
          <div class="flex flex-col items-center">
            <v-avatar size="120"
              class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-6xl cursor-pointer"
              @click="triggerFileInput">
              <v-img v-if="userStore.user.employer_avatar" :src="userStore.user.employer_avatar"></v-img>
              <span v-else>{{ getInitial(userStore.user.employer_name) }}</span>
              <div class="edit-overlay">
                <v-icon size="30" color="white">mdi-pencil</v-icon>
              </div>
            </v-avatar>
            <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload">

            <div class="mt-3 text-center">
              <p class="text-lg font-medium">{{ userStore.user.employer_name }}</p>
              <p class="text-gray-600">{{ userStore.user.employer_address }}</p>
            </div>

            <div class="flex justify-center my-2">
              <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                {{ n <= userStore.user.employer_rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
            </div>
          </div>
        </v-card>

        <v-card class="pa-4 mb-4 shadow-lg border border-gray-100">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-indigo-600 font-bold">Обо мне</h3>
            <button v-if="!editingAbout" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
              @click="() => { editingAbout = true; editData.about = userStore.user.employer_description }">Изменить</button>
            <div v-else class="flex">
              <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('about')">Отмена</button>
              <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('about')">Сохранить</button>
            </div>
          </div>
          <p v-if="!editingAbout" class="text-body-1">{{ userStore.user.employer_description }}</p>
          <v-textarea v-else v-model="editData.about" @keyup.enter="saveEdit('about')" color="indigo" variant="outlined"
            rows="3" no-resize @keydown.enter.prevent></v-textarea>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4" class="order-2 md:order-none">
        <v-card class="pa-4 mb-4 shadow-lg border border-gray-100">

          <!-- Имя -->
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Имя пользователя</h3>
              <button v-if="!editingFields.name" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
                @click="startEdit('name')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('name')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('name')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.name">
              <v-text-field :model-value="editData.name" @update:model-value="val => editData.name = val"
                @keyup.enter="saveEdit('name')" color="indigo" variant="outlined" density="comfortable" class="mt-1"
                hide-details>
              </v-text-field>
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.employer_name }}
            </div>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Email</h3>
              <button v-if="!editingFields.email" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
                @click="startEdit('email')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('email')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('email')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.email">
              <v-text-field :model-value="editData.email" @update:model-value="val => editData.email = val"
                @keyup.enter="saveEdit('email')" color="indigo" variant="outlined" density="comfortable" class="mt-1"
                hide-details>
              </v-text-field>
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.email }}
            </div>
          </div>

          <!-- Телефон -->
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Номер телефона</h3>
              <button v-if="!editingFields.phone" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
                @click="startEdit('phone')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('phone')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('phone')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.phone">
              <v-text-field :model-value="editData.phone" @update:model-value="val => editData.phone = val"
                @keyup.enter="saveEdit('phone')" color="indigo" variant="outlined" density="comfortable" class="mt-1"
                hide-details>
              </v-text-field>
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.worker_phone }}
            </div>
          </div>

          <!-- Пароль -->
          <!-- <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Пароль</h3>
                            <button v-if="!editingFields.password" variant="plain"
                                class="!text-indigo-600 hover:!text-blue-800"
                                @click="startEdit('password')">Изменить</button>
                            <div v-else class="flex">
                                <button class="!text-red-400 hover:!text-red-600 mr-2"
                                    @click="cancelEdit('password')">Отмена</button>
                                <button class="!text-blue-400 hover:!text-blue-600"
                                    @click="saveEdit('password')">Сохранить</button>
                            </div>
                        </div>
                        <div v-if="editingFields.password">
                            <v-text-field :model-value="editData.password"
                                @update:model-value="val => editData.password = val" @keyup.enter="saveEdit('password')"
                                color="indigo" variant="outlined" density="comfortable" class="mt-1" :type="'text'"
                                hide-details>
                            </v-text-field>
                        </div>
                        <div v-else class="py-2 mb-3">
                            {{ '*'.repeat(userStore.user. ? userStore.user.password.length : 8) }}
                        </div>
                    </div> -->

          <!-- Локация -->
          <div>
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Ваша локация</h3>
              <button v-if="!editingFields.location" variant="plain" class="!text-indigo-600 hover:!text-blue-800"
                @click="startEdit('location')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('location')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('location')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.location">
              <v-text-field :model-value="editData.location" @update:model-value="val => editData.location = val"
                @keyup.enter="saveEdit('location')" color="indigo" variant="outlined" density="comfortable" class="mt-1"
                hide-details>
              </v-text-field>
            </div>
            <div v-else class="py-2 mb-3">
              <div v-if="userStore.user.employer_address">
                {{ userStore.user.employer_address }}
              </div>
              <div v-else>
                пусто
              </div>
            </div>
          </div>

        </v-card>
      </v-col>


      <v-col cols="12" sm="12" md="4" lg="4" class="order-3 md:order-none">
        <v-card class="pa-4 mb-4 shadow-lg border border-gray-100">
          <v-card-title class="text-indigo-600 text-h6 font-weight-bold">Размещенные заказы</v-card-title>
          <v-list>
            <v-list-item v-if="orderStore.my_orders_with_applications.length > 0" v-for="order in orderStore.my_orders_with_applications" :key="order._id" class="mb-2">
              <v-list-item-title class="font-weight-medium">{{ order.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.description }}</v-list-item-subtitle>
            </v-list-item>
            <p v-else>
            пусто, создайте еще заказы
            </p>
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