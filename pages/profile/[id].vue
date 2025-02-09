<script setup>
const { id } = useRoute().params
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="4" class="mb-6">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-8 text-center">
              <div class="mx-auto w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-600/10 mb-6">
                <img src="assets\maaaks.png" alt="Макс Стариков" class="w-full h-full" />
              </div>
              <h1 class="text-2xl font-bold text-gray-800">Макс Стариков</h1>
              <rating />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="space-y-8">
              <!-- About Section -->
              <div>
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i class="mdi mdi-account text-indigo-600 mr-2"></i>
                  О мне
                </h2>
                <p class="text-gray-600 leading-relaxed ml-2">
                  Имею Высшее образование, занимаюсь спортом, готов к большим физцическим нагрузкам.
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
                      Maaaks2003@gmail.com
                    </a>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <i class="mdi mdi-phone text-indigo-600 mr-3"></i>
                    <span>+7(902) 34-586-90</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <i class="mdi mdi-map-marker text-indigo-600 mr-3"></i>
                    <span>г.Москва, район Патрики</span>
                  </div>
                </div>
              </div>
              <!-- <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="mdi mdi-lightning-bolt text-indigo-600 mr-2"></i>
                    Skills
                  </h2>
                  <div class="flex flex-wrap gap-2 ml-2">
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Vue.js
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      React
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Node.js
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      TypeScript
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      AWS
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Docker
                    </span>
                  </div>
                </div> -->
              <div>
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i class="mdi mdi-briefcase text-indigo-600 mr-2"></i>
                  Выполненные заказы
                </h2>
                <div class="space-y-4">
                  <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                    <div class="font-semibold text-gray-800">Погрузка грузовика</div>
                    <div class="text-indigo-600/80">ООО Озон</div>
                    <div class="text-sm text-gray-600">03.07.2023</div>
                    <div class="flex items-center">
                      <h3 class="mt-2 text-gray-600">
                        Оценка работы:
                      </h3>
                      <stars-feedback />
                    </div>
                    <p class="mt-2 text-gray-600">
                      Отзыв: Отлично отработал, претензий нет.
                    </p>
                  </div>
                  <div class="space-y-4">
                    <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                      <div class="font-semibold text-gray-800">Помощь с заполнением бумаг</div>
                      <div class="text-indigo-600/80">Гос. бухгалтерия</div>
                      <div class="text-sm text-gray-600">20.03.2022-22.03.2022</div>
                      <div class="flex items-center">
                        <h3 class="mt-2 text-gray-600">
                          Оценка работы:
                        </h3>
                        <stars-feedback />
                      </div>
                      <p class="mt-2 text-gray-600">
                        <i>Работодатель не оставил отзыв.</i>
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
  </div>
</template>