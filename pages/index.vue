<script setup>
const advantages = ref([
  {
    icon: '🚀',
    title: 'Быстрый старт',
    description: 'Зарегистрируйтесь и начните работу уже сейчас!'
  },
  {
    icon: '💎',
    title: 'Качество',
    description: 'Четко указанные комиссии для исполнителей и заказчиков, без скрытых платежей'
  },
  {
    icon: '🛡️',
    title: 'Гарантии',
    description: 'Вы сами выбираете работников для своей задачи!'
  }
])

const reviews = ref([
  {
    id: 1,
    name: 'Анна Петрова',
    position: 'CEO, TechStart',
    rating: 5,
    text: 'Отличная платформа для поиска специалистов. Нашли разработчика за 2 дня!'
  },
  {
    id: 2,
    name: 'Иван Смирнов',
    position: 'Фрилансер',
    rating: 5,
    text: 'Удобный интерфейс и много интересных проектов. Работаю здесь уже год.'
  },
  {
    id: 3,
    name: 'Мария Иванова',
    position: 'Дизайнер',
    rating: 1,
    text: 'Мне не понравилось.'
  }
])

const projects = ref([
  {
    id: 1,
    title: 'Редизайн интернет-магазина',
    description: 'Полное обновление дизайна и функционала крупного интернет-магазина',
    tags: ['UI/UX', 'React', 'Node.js']
  },
  {
    id: 2,
    title: 'Мобильное приложение',
    description: 'Разработка приложения для доставки еды с нуля',
    tags: ['React Native', 'Firebase', 'API']
  },
  {
    id: 3,
    title: 'Корпоративный сайт',
    description: 'Создание современного сайта для строительной компании',
    tags: ['Vue.js', 'Tailwind', 'SEO']
  }
])
console.log(reviews.value[0].id);
</script>


<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section with animated background -->
    <section class="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-32 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10 animate-[spin_60s_linear_infinite]">
        </div>
      </div>
      <v-container class="relative">
        <div class="text-center max-w-4xl mx-auto px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Фриланс биржа
          </h1>
          <p class="text-xl md:text-2xl mb-8 md:mb-12 text-indigo-100">Находите лучших исполнителей для ваших задач
          </p>
          <NuxtLink to="/sign"
            class="group bg-white text-indigo-600 px-6 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:bg-indigo-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2">
            Начать работу
            <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </NuxtLink>
        </div>
      </v-container>
    </section>

    <!-- О проекте with hover effects -->
    <section class="py-16 md:py-24">
      <v-container>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16 px-4">О проекте</h2>
        <v-row>
          <v-col cols="12" md="6" class="px-4">
            <div class="prose lg:prose-lg transform hover:scale-105 transition-transform duration-300">
              <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
                “Мы создаем надежное и эффективное пространство для сотрудничества, где компании и предприниматели могут легко найти исполнителей для реализации оффлайн проектов. Больше нет необходимости искать исполнителей по объявлениям – просто разместите заказ, и местные профессионалы предложат свои услуги. Для исполнителей это – отличная возможность найти интересную работу в своем городе и расширить клиентскую базу.”
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="px-4 mt-8 md:mt-0">
            <div
              class="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-50">
              <ul class="space-y-4 md:space-y-6">
                <li class="flex items-center gap-4 group">
                  <span
                    class="w-10 md:w-12 h-10 md:h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <span class="text-indigo-600 group-hover:text-white transition-colors duration-300">✓</span>
                  </span>
                  <span class="text-base md:text-lg">Быстрый поиск специалистов</span>
                </li>
                <li class="flex items-center gap-4 group">
                  <span
                    class="w-10 md:w-12 h-10 md:h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <span class="text-indigo-600 group-hover:text-white transition-colors duration-300">✓</span>
                  </span>
                  <span class="text-base md:text-lg">Прозрачные комиссии</span>
                </li>
                <li class="flex items-center gap-4 group">
                  <span
                    class="w-10 md:w-12 h-10 md:h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <span class="text-indigo-600 group-hover:text-white transition-colors duration-300">✓</span>
                  </span>
                  <span class="text-base md:text-lg">Простое размещение заказов</span>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Преимущества with card effects -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white">
      <v-container>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16 px-4">Преимущества</h2>
        <v-row>
          <v-col v-for="(advantage, index) in advantages" :key="index" cols="12" sm="6" md="4" class="px-4">
            <div
              class="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-indigo-50 h-full"
              :style="`transition-delay: ${index * 100}ms`">
              <div class="text-4xl md:text-5xl mb-4 md:mb-6">{{ advantage.icon }}</div>
              <h3 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{{ advantage.title }}</h3>
              <p class="text-base md:text-lg text-gray-600">{{ advantage.description }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Отзывы with card rotation -->
    <section class="py-16 md:py-24">
      <v-container>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16 px-4">Отзывы</h2>
        <v-row>
          <v-col v-for="review in reviews" :key="review.id" cols="12" sm="6" md="4" class="px-4">
            <div
              class="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:rotate-1 border border-indigo-50 h-full">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <span class="text-xl md:text-2xl font-semibold text-white">{{ review.name.charAt(0) }}</span>
                </div>
                <div>
                  <h3 class="text-lg md:text-xl font-semibold text-gray-900">{{ review.name }}</h3>
                  <p class="text-sm md:text-base text-indigo-600">{{ review.position }}</p>
                </div>
              </div>
              <p class="text-base md:text-lg text-gray-600 italic">{{ review.text }}</p>
                <div class="flex text-yellow-400 mt-4 md:mt-6 text-xl md:text-2xl">
                  <span v-for="star in review.rating" :key="star" class="transform hover:scale-125 transition-transform">★</span>
                </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Выполненные проекты with hover effects -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white">
      <v-container>
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16 px-4">Выполненные проекты
        </h2>
        <v-row>
          <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" md="4" class="px-4">
            <div
              class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full">
              <div class="p-6 md:p-8">
                <h3
                  class="text-xl md:text-2xl font-semibold mb-3 md:mb-4 group-hover:text-indigo-600 transition-colors">
                  {{ project.title }}</h3>
                <p class="text-base md:text-lg text-gray-600 mb-4 md:mb-6">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in project.tags" :key="tag"
                    class="px-3 py-1.5 bg-indigo-50 text-indigo-800 rounded-full text-sm font-medium group-hover:bg-indigo-100 transition-colors">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Войти в аккаунт with gradient and animation -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10">
      </div>
      <v-container class="relative">
        <div class="text-center max-w-3xl mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Войти в аккаунт</h2>
          <p class="text-xl md:text-2xl mb-8 md:mb-12 text-indigo-100">
            Присоединяйтесь к тысячам профессионалов и заказчиков уже сегодня
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <NuxtLink to="/sign"
              class="group bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-indigo-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              Войти
              <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </NuxtLink>
            <NuxtLink to="/sign"
              class="group bg-indigo-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-indigo-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              Регистрация
              <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </NuxtLink>
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>