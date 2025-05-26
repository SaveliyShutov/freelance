<script setup>
const route = useRoute()
const userStore = useAuth()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="ml-4">
          <v-btn-toggle v-model="userStore.currentRole" mandatory color="indigo">
            <v-btn value="worker" color="indigo-800">Исполнитель</v-btn>
            <v-btn  value="employer" color="indigo-800">Заказчик</v-btn>
          </v-btn-toggle>
        </div>
        <ProfileWorker v-if="userStore.currentRole === 'worker'" />
        <ProfileEmployer v-if="userStore.currentRole === 'employer'" />
      </v-col>
    </v-row>

    
  </v-container>
</template>