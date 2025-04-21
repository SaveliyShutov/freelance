<script setup lang="ts">

const currentRole = ref('worker')

</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="flex flex-col justify-center">
            <div>
              <h2 class="text-4xl font-bold text-gray-900 text-center">Создать аккаунт заказчика
              </h2>
            </div>
            <EmployerRegForm />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>