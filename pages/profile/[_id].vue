<script setup>
const route = useRoute()
const userType = ref('worker')

onMounted(() => {
  // Here you can fetch user type based on the route ID
  console.log('Profile ID:', route.params.id)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="ml-4">
          <v-btn-toggle v-model="userType" mandatory color="indigo">
            <v-btn value="worker" color="indigo-800">Работник</v-btn>
            <v-btn value="employer" color="indigo-800">Заказчик</v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>

    <ProfileWorker v-if="userType === 'worker'" />
    <ProfileEmployer v-if="userType === 'employer'" />
  </v-container>
</template>