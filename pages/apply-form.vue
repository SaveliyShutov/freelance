<script setup>
const userStore = useAuth()

let phone = ref()
let fullName = ref()

if(userStore.user._id){
  phone.value = userStore.user.phone
  fullName.value = userStore.user.name + ` ` + userStore.user.surname
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="3" class="my-8">
        <BackButton />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Оставьте заявку</h1>

          <form>
            <v-row>
              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input v-model="phone" id="phone" name="phone" type="phone" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]"
                  placeholder="Телефон" />
              </v-col>

              <v-col cols="12" md="6">
                <label class="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                <input  v-model="fullName"  required placeholder="Иванов Иван Иванович"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]" />
              </v-col>
              <v-col cols="12">
                <label class="block text-sm font-medium text-gray-700 mb-1">Отклик на заказ</label>
                <textarea required rows="4" placeholder="Здравствуйте, с радостью готов выполнить ваш заказ. "
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#473CD2] focus:border-[#473CD2]"></textarea>
              </v-col>
              <v-col cols="12" class="text-right">
                <button
                  type="submit"
                  class="px-8 py-2 bg-[#473CD2] text-white rounded-md hover:bg-[#3730A3] transition-colors duration-200"
                >
                  Отправить
                </button>
              </v-col>
            </v-row>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>