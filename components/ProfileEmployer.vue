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

const saveEdit = async (field) => {
  try {
    // Создаем объект с измененными данными
    const updateData = {
      [field]: editData.value[field]
    };

    // Для некоторых полей используем другие названия на бэкенде
    const fieldMappings = {
      name: 'employer_name',
      phone: 'employer_contacts',
      about: 'employer_description',
      location: 'employer_address'
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
    <v-row v-if="userStore.user" class="flex-wrap">
      <v-col cols="12" sm="12" md="4" lg="4" class="order-1 md:order-none">
        <div class="pr-4 pl-4 pt-3">
          <div class="flex flex-col items-center">
            <v-avatar
size="120"
              class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-6xl cursor-pointer"
              @click="triggerFileInput">
              <v-img v-if="userStore.user.employer_avatar" :src="userStore.user.employer_avatar" />
              <span v-else>{{ getInitial(userStore.user.employer_name) }}</span>
              <div class="edit-overlay">
                <v-icon size="30" color="white">mdi-pencil</v-icon>
              </div>
            </v-avatar>
            <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload">

            <div class="mt-2 text-center">
              <p class="text-lg font-bold">{{ userStore.user.employer_name }}</p>

              <p class="text-lg font-medium">Заказчик</p>
            </div>

            <div class="flex justify-center my-2">
              <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                {{ n <= userStore.user.employer_rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
            </div>
          </div>
        </div>

        <div class="pa-4 mb-1">
          <div class="flex justify-between items-center">
            <h3 class="text-indigo-700 font-bold text-lg">О заказчике</h3>
            <button
v-if="!editingAbout" variant="plain" class="!text-black hover:!text-blue-800"
              @click="() => { editingAbout = true; editData.about = userStore.user.employer_description }">Изменить</button>
            <div v-else class="flex">
              <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('about')">Отмена</button>
              <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('about')">Сохранить</button>
            </div>
          </div>
          <p v-if="!editingAbout" class="text-body-1">{{ userStore.user.employer_description }}</p>
          <v-textarea
v-else v-model="editData.about" color="indigo" variant="outlined" rows="3" no-resize
            @keyup.enter="saveEdit('about')" @keydown.enter.prevent />
        </div>
        <div class="pa-4 ">


          <div class="mb-2">
            <div class="flex flex-wrap items-center pt-2">
              <h3 class="text-subtitle-1 text-indigo-700 font-weight-bold break-words">
                Имя пользователя
              </h3>
            </div>

            <div class="py-2 border-b-2 border-indigo-500 w-full flex">
              <div v-if="editingFields.name" class="w-full">
                <v-text-field
:model-value="editData.name" color="indigo" variant="outlined" density="comfortable"
                  class="w-full" hide-details auto-grow @update:model-value="val => editData.name = val"
                  @keyup.enter="saveEdit('name')" />
              </div>

              <div v-else class="flex justify-between flex-wrap items-start w-full">
                <p class="break-words max-w-full">
                  {{ userStore.user.employer_name }}
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


          <div class="mb-2">
            <div class="flex flex-wrap items-center pt-2">
              <h3 class="text-subtitle-1 text-indigo-700 font-weight-bold break-words">Email</h3>
            </div>

            <div class="py-2 border-b-2 border-indigo-500 w-full flex">
              <div v-if="editingFields.email" class="w-full">
                <v-text-field
:model-value="editData.email" color="indigo" variant="outlined" density="comfortable"
                  class="w-full" hide-details @update:model-value="val => editData.email = val"
                  @keyup.enter="saveEdit('email')" />
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


          <div class="mb-2">
            <div class="flex flex-wrap items-center pt-2">
              <h3 class="text-subtitle-1 text-indigo-700 font-weight-bold break-words">Номер телефона</h3>
            </div>

            <div class="py-2 border-b-2 border-indigo-500 w-full flex">
              <div v-if="editingFields.phone" class="w-full">
                <v-text-field
:model-value="editData.phone" color="indigo" variant="outlined" density="comfortable"
                  class="w-full" hide-details @update:model-value="val => editData.phone = val"
                  @keyup.enter="saveEdit('phone')" />
              </div>

              <div v-else class="flex justify-between flex-wrap items-start w-full">
                <p class="break-words max-w-full">
                  {{ userStore.user.employer_contacts }}
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


          <div class="mb-2">
            <div class="flex flex-wrap items-center pt-2">
              <h3 class="text-subtitle-1 text-indigo-700 font-weight-bold break-words">Локация</h3>
            </div>

            <div class="py-2 border-b-2 border-indigo-500 w-full flex">
              <div v-if="editingFields.location" class="w-full">
                <v-text-field
:model-value="editData.location" color="indigo" variant="outlined" density="comfortable"
                  class="w-full" hide-details @update:model-value="val => editData.location = val"
                  @keyup.enter="saveEdit('location')" />
              </div>

              <div v-else class="flex justify-between flex-wrap items-start w-full">
                <p v-if="userStore.user.location != null" class="break-words max-w-full">
                  {{ userStore.user.location }}
                </p>
                <p v-else class="break-words max-w-full">
                  Пусто
                </p>
                <button variant="plain" class="!text-black hover:!text-blue-800 ml-2" @click="startEdit('location')">
                  Изменить
                </button>
              </div>

              <div v-if="editingFields.location" class="flex mt-2">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('location')">
                  Отмена
                </button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('location')">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </v-col>


      <v-col cols="12" sm="12" md="8" lg="8" class="order-3 md:order-none">
        <p class="text-4xl font-medium mb-6">{{ userStore.user.employer_name }}</p>
        <div class="pa-4 mb-4 border-2 border-indigo-600 rounded-xl">
          <h3 class="text-indigo-700 font-bold text-3xl">Размещенные подработки</h3>
          <v-list>
            <v-list-item
v-for="order in orderStore.my_orders_with_applications"
              v-if="orderStore.my_orders_with_applications.length > 0" :key="order._id" class="mb-2">
              <v-list-item-title class="font-weight-medium">{{ order.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.description }}</v-list-item-subtitle>
            </v-list-item>
            <p v-else>
              пусто, создайте еще заказы
            </p>
          </v-list>
        </div>
        <div class="pa-4 mb-4 border-2 border-indigo-600 rounded-xl">
          <h3 class="text-indigo-700 font-bold text-3xl">Ваш рейтинг</h3>
          <div class="flex items-center my-2">
            <v-avatar
size="50"
              class="elevation-3 !text-indigo-600 !border-2 !border-indigo-600 text-xl cursor-pointer mr-3">
              <v-img v-if="userStore.user.employer_avatar" :src="userStore.user.employer_avatar" />
              <span v-else>{{ getInitial(userStore.user.employer_name) }}</span>
            </v-avatar>
            <v-icon v-for="n in 5" :key="n" color="amber" size="small">
              {{ n <= userStore.user.employer_rating ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
          </div>
        </div>
        <div class="pa-4 border-2 border-indigo-600 rounded-xl">
          <h3 class="text-indigo-700 font-bold text-3xl mb-4">Контакты</h3>


          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Имя пользователя</h3>
              <button
v-if="!editingFields.name" variant="plain" class="!text-iblack hover:!text-blue-800"
                @click="startEdit('name')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('name')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('name')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.name">
              <v-text-field
:model-value="editData.name" color="indigo" variant="outlined" density="comfortable"
                class="mt-1" hide-details @update:model-value="val => editData.name = val"
                @keyup.enter="saveEdit('name')" />
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.employer_name }}
            </div>
          </div>


          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Email</h3>
              <button
v-if="!editingFields.email" variant="plain" class="!text-black hover:!text-blue-800"
                @click="startEdit('email')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('email')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('email')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.email">
              <v-text-field
:model-value="editData.email" color="indigo" variant="outlined" density="comfortable"
                class="mt-1" hide-details @update:model-value="val => editData.email = val"
                @keyup.enter="saveEdit('email')" />
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.email }}
            </div>
          </div>


          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Номер телефона</h3>
              <button
v-if="!editingFields.phone" variant="plain" class="!text-black hover:!text-blue-800"
                @click="startEdit('phone')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('phone')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('phone')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.phone">
              <v-text-field
:model-value="editData.phone" color="indigo" variant="outlined" density="comfortable"
                class="mt-1" hide-details @update:model-value="val => editData.phone = val"
                @keyup.enter="saveEdit('phone')" />
            </div>
            <div v-else class="py-2 mb-3">
              {{ userStore.user.employer_contacts }}
            </div>
          </div>


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


          <div>
            <div class="flex justify-between items-center">
              <h3 class="text-subtitle-1 text-indigo-600 font-weight-bold">Ваша локация</h3>
              <button
v-if="!editingFields.location" variant="plain" class="!text-black hover:!text-blue-800"
                @click="startEdit('location')">Изменить</button>
              <div v-else class="flex">
                <button class="!text-red-400 hover:!text-red-600 mr-2" @click="cancelEdit('location')">Отмена</button>
                <button class="!text-blue-400 hover:!text-blue-600" @click="saveEdit('location')">Сохранить</button>
              </div>
            </div>
            <div v-if="editingFields.location">
              <v-text-field
:model-value="editData.location" color="indigo" variant="outlined" density="comfortable"
                class="mt-1" hide-details @update:model-value="val => editData.location = val"
                @keyup.enter="saveEdit('location')" />
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