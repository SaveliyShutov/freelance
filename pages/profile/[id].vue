<script setup>
const userstore = useAuth();
const { id } = useRoute().params;
const router = useRouter();
</script>
<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" md="4" class="mb-6">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="p-8 text-center">
            <div class="mx-auto w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-600/10 mb-6">
              <!-- <img src="assets\maaaks.png" alt="" class="w-full h-full" /> -->
            </div>
            <div class="flex flex-col items-center">
              <h1 class="text-2xl font-bold text-gray-800">{{ userstore.user.name }} {{ userstore.user.surname }}</h1>
              <StarsRating/>
            </div>

          </div>
        </div>
      </v-col>

      <v-col cols="12" md="8">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="space-y-8">
            <!-- About Section -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="mdi mdi-account text-indigo-600 mr-2"></i>
                О мне
              </h2>
              <p class="text-gray-600 leading-relaxed ml-2">
                {{ userstore.user.info }}
              </p>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="mdi mdi-card-account-details text-indigo-600 mr-2"></i>
                Контактная информация
              </h2>
              <div class="space-y-3 ml-2">
                <div class="flex items-center text-gray-600">
                  <i class="mdi mdi-email text-indigo-600 mr-3"></i>
                  <a href="mailto:sarah.j@example.com" class="hover:text-indigo-600 transition-colors">
                    sarah.j@example.com
                  </a>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="mdi mdi-phone text-indigo-600 mr-3"></i>
                  <span>{{ userstore.user.phone }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="mdi mdi-map-marker text-indigo-600 mr-3"></i>
                  <span>{{ userstore.user.geo }}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="mdi mdi-briefcase text-indigo-600 mr-2"></i>
                Выполненные заказы
              </h2>
              <div v-for="review in userstore.user.orders" :key="review._id" class="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <WorkHistoryCard @click="router.push(`/order/${review._id}`)" :review="review"/>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>