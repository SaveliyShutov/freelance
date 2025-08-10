<script setup>
const userStore = useAuth()
const orderStore = useOrder()

await orderStore.getWorkerApplicationsWithOrders();

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
    editData.value.about = userStore.user.worker_description
  } else {
    editingFields.value[field] = false
    editData.value[field] = userStore.user[field]
  }
}

const saveEdit = async (field) => {
  try {
    // Создаем объект с измененными данными
    const updateData = {
      [field]: editData.value[field]
    };

    // Для некоторых полей используем другие названия на бэкенде
    const fieldMappings = {
      name: 'worker_name',
      phone: 'worker_phone',
      about: 'worker_description'
    };

    const backendField = fieldMappings[field];

    // Отправляем изменения на сервер
    const response = await userStore.updateUser(
      { [backendField]: editData.value[field] },
      userStore.user._id
    );

    if (response?.status?.value === 'success') {
      // Обновляем локальные данные
      if (field === 'about') {
        userStore.user.worker_description = editData.value.about;
        editingAbout.value = false;
      } else {
        userStore.user[field] = editData.value[field];
        editingFields.value[field] = false;
      }
    } else {
      throw new Error('Ошибка при обновлении данных');
    }
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    // Можно добавить уведомление пользователю об ошибке
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

// const handleFileUpload = async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     if (file.size > 2 * 1024 * 1024) {
//       alert('Максимальный размер файла - 2MB');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       try {
//         // Отправляем новый аватар на сервер
//         const response = await userStore.updateUser(
//           { worker_avatar: e.target.result },
//           userStore.user._id
//         );

//         if (response?.status?.value === 'success') {
//           userStore.user.worker_avatar = e.target.result;
//         } else {
//           throw new Error('Ошибка при обновлении аватара');
//         }
//       } catch (error) {
//         console.error('Ошибка при загрузке аватара:', error);
//         // Можно добавить уведомление пользователю об ошибке
//       }
//     };
//     reader.readAsDataURL(file);
//   }
// };

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('Максимальный размер файла - 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      userStore.user.worker_avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

</script>
<template>
  <v-container class="px-0 px-sm-4">
    <v-row v-if="userStore.user" class="flex-wrap flex flex-col items-center">
      <v-col cols="12" sm="12" md="4" lg="4" class="">
        <div class="pt-2">
          <div class="flex flex-col items-center">
            <v-avatar size="120"
              class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-6xl cursor-pointer"
              @click="triggerFileInput">
              <v-img v-if="userStore.user.worker_avatar" :src="userStore.user.worker_avatar"></v-img>
              <span v-else>{{ getInitial(userStore.user.worker_name) }}</span>
              <div class="edit-overlay">
                <v-icon size="30" color="white">mdi-pencil</v-icon>
              </div>
            </v-avatar>
            <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload">

            <div class="mt-3 text-center">
              <p class="text-3xl font-bold">{{ userStore.user.worker_name }}</p>
              <p class="text-xl font-medium">Исполнитель</p>
              <!-- <p class="text-gray-600">{{ userStore.user.worker_address }}</p> -->
            </div>

            <div class="flex justify-center my-2">
              <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                {{ n <= userStore.user.worker_rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="userStore.user" class="flex-wrap">
      <v-col cols="12" sm="12" md="12" lg="12" class="">
        <div class="pa-4 border-2 border-indigo-600 rounded-xl">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-indigo-700 font-bold text-3xl">Обо мне</h3>
            <button v-if="!editingAbout" variant="plain" class="!text-black hover:!text-blue-800"
              @click="() => { editingAbout = true; editData.about = userStore.user.worker_description }">Изменить</button>
            <div v-else class="flex">
              <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('about')">Отмена</button>
              <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('about')">Сохранить</button>
            </div>
          </div>
          <div v-if="editingAbout">
            <v-textarea v-model="editData.about" @update:model-value="val => editData.about = val"
              @keyup.enter="saveEdit('about')" color="indigo" variant="outlined" density="comfortable" class="mt-1"
              hide-details>
            </v-textarea>
          </div>
          <p v-else class="break-words whitespace-pre-line">
            {{ userStore.user.worker_description }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="userStore.user" class="flex-wrap">
      <v-col cols="12" sm="12" md="12" lg="12" class="order-2 md:order-none">
        <div class="pa-4 border-2 border-indigo-600 rounded-xl">


          <h3 class="text-indigo-700 font-bold text-3xl border-indigo-600 pb-3">Контактная информация</h3>
            <!-- Имя -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-4 items-center pt-5">
                <h3 class="text-subtitle-1 text-indigo-500 font-weight-bold break-words">
                  Имя пользователя
                </h3>
              </div>

              <div class="py-2 mb-3 border-b-2 border-indigo-500 w-full flex gap-5">
                <div v-if="editingFields.name" class="w-full">
                  <v-text-field :model-value="editData.name" @update:model-value="val => editData.name = val"
                    @keyup.enter="saveEdit('name')" color="indigo" variant="outlined" density="comfortable" class="w-full"
                    hide-details auto-grow></v-text-field>
                </div>

                <div v-else class="flex justify-between flex-wrap items-start w-full">
                  <p class="break-words max-w-full">
                    {{ userStore.user.worker_name }}
                  </p>
                  <button variant="plain" class="!text-black hover:!text-blue-800 ml-2" @click="startEdit('name')">
                    Изменить
                  </button>
                </div>

                <div v-if="editingFields.name" class="flex mt-2">
                  <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('name')">Отмена</button>
                  <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('name')">Сохранить</button>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-4 items-center pt-5">
                <h3 class="text-subtitle-1 text-indigo-500 font-weight-bold break-words">Email</h3>
              </div>

              <div class="py-2 mb-3 border-b-2 border-indigo-500 w-full flex gap-5">
                <div v-if="editingFields.email" class="w-full">
                  <v-text-field :model-value="editData.email" @update:model-value="val => editData.email = val"
                    @keyup.enter="saveEdit('email')" color="indigo" variant="outlined" density="comfortable"
                    class="w-full" hide-details></v-text-field>
                </div>

                <div v-else class="flex justify-between flex-wrap items-start w-full">
                  <p class="break-words max-w-full">
                    {{ userStore.user.email }}
                  </p>
                  <button variant="plain" class="!text-black hover:!text-blue-800 ml-2" @click="startEdit('email')">
                    Изменить
                  </button>
                </div>

                <div v-if="editingFields.email" class="flex mt-2">
                  <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('email')">
                    Отмена
                  </button>
                  <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('email')">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>

            <!-- Телефон -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-4 items-center pt-5">
                <h3 class="text-subtitle-1 text-indigo-500 font-weight-bold break-words">Номер телефона</h3>
              </div>

              <div class="py-2 mb-3 border-b-2 border-indigo-500 w-full flex gap-5">
                <div v-if="editingFields.phone" class="w-full">
                  <v-text-field :model-value="editData.phone" @update:model-value="val => editData.phone = val"
                    @keyup.enter="saveEdit('phone')" color="indigo" variant="outlined" density="comfortable"
                    class="w-full" hide-details></v-text-field>
                </div>

                <div v-else class="flex justify-between flex-wrap items-start w-full">
                  <p class="break-words max-w-full">
                    {{ userStore.user.worker_phone }}
                  </p>
                  <button variant="plain" class="!text-black hover:!text-blue-800 ml-2" @click="startEdit('phone')">
                    Изменить
                  </button>
                </div>

                <div v-if="editingFields.phone" class="flex mt-2">
                  <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('phone')">
                    Отмена
                  </button>
                  <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('phone')">
                    Сохранить
                  </button>
                </div>
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
          <!-- <div>
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
              {{ userStore.user.worker_address }}
            </div>
          </div> -->

        </div>
      </v-col>


      <v-col cols="12" sm="12" md="6" lg="6" class="order-3 md:order-none">
        <div class="pa-4 border-2 border-indigo-600 rounded-xl">
          <h3 class="text-indigo-700 font-bold text-3xl">Ваши заявки</h3>
          <v-list>
            <v-list-item v-for="application in orderStore.my_applications" :key="application._id" class="mb-2 pl-1">
              <v-list-item-title class="font-weight-medium">{{ application.order.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ application.status }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" class="order-3 md:order-none">
        <div class="pa-4 border-2 border-indigo-600 rounded-xl">
          <h3 class="text-indigo-700 font-bold text-3xl">Ваш рейтинг</h3>
          <div class="flex items-center my-2">
            <v-avatar size="50"
              class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-xl cursor-pointer mr-3">
              <v-img v-if="userStore.user.worker_avatar" :src="userStore.user.worker_avatar"></v-img>
              <span v-else>{{ getInitial(userStore.user.worker_name) }}</span>
            </v-avatar>
            <v-icon v-for="n in 5" :key="n" color="amber" size="small">
              {{ n <= userStore.user.worker_rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
          </div>
        </div>
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