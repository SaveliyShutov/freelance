<script setup lang="ts">
</script>
<template>
  <v-container class="min-h-screen flex justify-center py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="flex flex-col justify-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">Добавить аккаунт заказчика
              </h2>
              <p class="text-center">для создания подработок вам необходимо создать аккаунт заказчика
              </p>
            </div>
            <WorkerAddEmployerForm />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
