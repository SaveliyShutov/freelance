<template>
    <v-container>
      <v-row v-if="userData">
        <v-col cols="12" class="text-center mb-6">
          <v-avatar size="150" color="grey-lighten-2" class="elevation-3">
            <v-img :src="userData.avatar" alt="Company logo"></v-img>
          </v-avatar>
          <h2 class="text-indigo-600 mt-4">Employer Profile</h2>
        </v-col>
  
        <v-col cols="12" class="mb-6">
          <v-card class="pa-4">
            <div class="d-flex justify-space-between align-center mb-3">
              <h3 class="text-indigo-600">About Company</h3>
              <v-btn v-if="!editingAbout" variant="plain" class="text-indigo-800" @click="editingAbout = true">Edit</v-btn>
              <div v-else>
                <v-btn text color="grey" class="mr-2" @click="cancelEdit('about')">Cancel</v-btn>
                <v-btn color="indigo" @click="saveEdit('about')">Save</v-btn>
              </div>
            </div>
            <p v-if="!editingAbout" class="text-body-1">{{ userData.about }}</p>
            <v-textarea
              v-else
              v-model="editData.about"
              color="indigo"
              variant="outlined"
            ></v-textarea>
          </v-card>
        </v-col>
  
        <v-col cols="12">
          <v-card class="pa-4">
            <div class="mb-4" v-for="(value, key) in editableFields" :key="key">
              <div class="d-flex justify-space-between align-center mb-2">
                <h3 class="text-subtitle-1">{{ fieldLabels[key] }}</h3>
                <v-btn v-if="!editingFields[key]" variant="plain" class="text-indigo-800" @click="startEdit(key)">Edit</v-btn>
                <div v-else>
                  <v-btn text color="grey" class="mr-2" @click="cancelEdit(key)">Cancel</v-btn>
                  <v-btn color="indigo" @click="saveEdit(key)">Save</v-btn>
                </div>
              </div>
              <v-text-field
                :model-value="editingFields[key] ? editData[key] : userData[key]"
                @update:model-value="val => editData[key] = val"
                :readonly="!editingFields[key]"
                color="indigo"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </div>
          </v-card>
        </v-col>
  
        <v-col cols="12" class="mb-6">
          <v-card>
            <v-card-title class="text-indigo-600">Completed Projects</v-card-title>
            <v-list>
              <v-list-item v-for="project in userData.completedProjects" :key="project.id" class="mb-2">
                <v-list-item-title class="font-weight-medium">{{ project.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <p class="text-indigo-600">Please register to access employer profile features</p>
          <v-btn color="indigo" to="/reg">
            Register Now
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const userData = ref(null)
  const currentPassword = ref('')
  const newPassword = ref('')
  const editingAbout = ref(false)
  const editingFields = ref({})
  const editData = ref({})
  
  const fieldLabels = {
    companyName: 'Company Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    city: 'City'
  }
  
  const editableFields = {
    companyName: '',
    email: '',
    phone: '',
    password: '',
    city: '',
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
      companyName: 'Example Corp',
      email: 'company@example.com',
      phone: '+1 987 654 3210',
      city: 'San Francisco',
      password: 'Qwerty123',
      avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      about: 'Leading technology company specializing in innovative software solutions. We focus on creating cutting-edge applications that help businesses grow and succeed in the digital age. Our team of experts is dedicated to delivering high-quality results for our clients.',
      completedProjects: [
        {
          id: 1,
          title: 'Company Website Redesign',
          description: 'Complete overhaul of corporate website'
        },
        {
          id: 2,
          title: 'Mobile App Development',
          description: 'Development of company mobile application'
        }
      ]
    }
  
    // Initialize editData with current values
    editData.value = { ...userData.value }
  })
  </script>