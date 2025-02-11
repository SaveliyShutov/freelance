<script setup>

const { id } = useRoute().params
</script>
<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" md="4" class="mb-6">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <div class="p-8 text-center">
            <div class="mx-auto w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-600/10 mb-6">
              <img src="https://i.pravatar.cc/300?img=1" alt="Скибиди Диди" class="w-full h-full" />
            </div>
            <div class="flex flex-col items-center">
              <h1 class="text-2xl font-bold text-gray-800">Скибиди Диди</h1>
              <StarsRating rating="2.2" />
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
                В 8 лет я потерялся в Турции. Меня так и не нашли.
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
                  <span>+1 (555) 123-4567</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="mdi mdi-map-marker text-indigo-600 mr-3"></i>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="mdi mdi-briefcase text-indigo-600 mr-2"></i>
                Выполненные заказы
              </h2>
              <div class="space-y-4">
                <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                  <div class="font-semibold text-gray-800">Чистка унитаза</div>
                  <div class="text-indigo-600/80">ООО Ненаеб</div>
                  <div class="text-sm text-gray-600">2020 - Настоящее время</div>
                  <div class="flex items-center">
                    <h3 class="mt-2 text-gray-600">
                      Оценка работы:
                    </h3>
                    <StarsRating rating="4.1" class="mx-2" />
                  </div>
                  <p class="mt-2 text-gray-600">
                    Отзыв: Работа выполняется на ура.
                  </p>
                </div>
                <div class="space-y-4">
                  <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                    <div class="font-semibold text-gray-800">Покупка ээээ хз</div>
                    <div class="text-indigo-600/80">МММ</div>
                    <div class="text-sm text-gray-600">2000</div>
                    <div class="flex justify-start items-center">
                      <h3 class="mt-2 text-gray-600">
                        Оценка работы:
                      </h3>
                      <StarsRating rating="5" class="mx-2" />
                    </div>
                    <p class="mt-2 text-gray-600">
                      Работодатель не оставил отзыв.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>