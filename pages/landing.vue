<script setup lang="ts">
useSeoMeta({
  title: 'Главная ',
  description: 'Найдите подработку без рисков или надёжных исполнителей для ваших задач на платформе Nirby.',
  ogTitle: 'Главная ',
  ogDescription: 'Найдите подработку без рисков или надёжных исполнителей для ваших задач на платформе Nirby.',
  // ogUrl: `https://nirby.ru${route.path}`,
  // ogImage: 'https://nirby.ru/og-home.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  /*
  link: [
    { rel: 'canonical', href: `https://nirby.ru${route.path}` }
  ],
  htmlAttrs: { lang: 'ru' }
  */
})

const currentRole = ref<'worker' | 'employer'>('worker')
const showSwitcher = ref(false)

if (import.meta.client) {
  const onScroll = () => (showSwitcher.value = window.scrollY > 100)
  onMounted(() => window.addEventListener('scroll', onScroll))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
}

const advantages = computed(() =>
  currentRole.value === 'worker'
    ? [
      { icon: '🚀', title: 'Быстрый старт', description: 'Найдите подработки рядом с вами моментально' },
      { icon: '🛡️', title: 'Гарантия оплаты', description: 'Средства защищены до подтверждения' },
      { icon: '💸', title: 'Нулевая комиссия', description: '0% комиссии для исполнителей' }
    ]
    : [
      { icon: '⚡', title: 'Мгновенный поиск', description: 'Отклики исполнителей за минуты' },
      { icon: '🔄', title: 'Постоянный поток', description: 'Автообновление кандидатов' },
      { icon: '📊', title: 'Подробная аналитика', description: 'Отчёты по эффективности задач' }
    ]
)
</script>

<template>
  <div class="bg-white font-sans">
    <Transition name="fade">
      <div v-if="showSwitcher"
        class="fixed top-4 right-4 z-50 flex gap-4 items-center bg-white rounded-xl shadow-lg p-3">
        <div class="flex flex-col items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition"
          :class="{ 'bg-primary text-white': currentRole === 'worker' }" @click="currentRole = 'worker'">
          <span class="text-xl">👷</span>
          <span class="text-xs font-semibold mt-1">Исполнитель</span>
        </div>
        <div class="flex flex-col items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition"
          :class="{ 'bg-primary text-white': currentRole === 'employer' }" @click="currentRole = 'employer'">
          <span class="text-xl">📢</span>
          <span class="text-xs font-semibold mt-1">Заказчик</span>
        </div>
      </div>
    </Transition>

    <section class="text-center bg-gradient-to-br from-indigo-700 to-indigo-900 text-white py-28 px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        {{
          currentRole === 'worker'
            ? 'Ищите подработку без рисков и задержек'
            : 'Находите надёжных исполнителей мгновенно'
        }}
      </h1>
      <p class="mb-6 text-base md:text-xl max-w-2xl mx-auto text-indigo-200">
        {{
          currentRole === 'worker'
            ? 'Работайте без комиссий, с гарантией оплаты и поддержкой 24/7'
            : 'Публикуйте задачи и получайте отклики за считанные минуты'
        }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <NuxtLink to="/reg">
          <button
            class="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
            {{ currentRole === 'worker' ? 'Начать бесплатно' : 'Опубликовать задачу' }}
          </button>
        </NuxtLink>
        <NuxtLink to="/sign">
          <button
            class="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors duration-200">
            Войти
          </button>
        </NuxtLink>
      </div>
    </section>

    <section class="py-20 bg-gray-50 px-4">
      <h2 class="text-3xl md:text-4xl text-center text-primary font-bold mb-8">Преимущества</h2>
      <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="(item, i) in advantages" :key="i"
          class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
          <div class="text-5xl mb-4 text-center">{{ item.icon }}</div>
          <h3 class="text-xl font-semibold mb-2 text-center">{{ item.title }}</h3>
          <p class="text-gray-600 text-center">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="py-20 px-4">
      <h2 class="text-3xl md:text-4xl text-center text-primary font-bold mb-10">Как это работает</h2>
      <div class="max-w-4xl mx-auto space-y-10 sm:space-y-0 sm:flex sm:justify-between">
        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mb-3 shadow-lg">
            1</div>
          <h4 class="font-medium mb-1">Регистрация</h4>
          <p class="text-gray-600 text-sm">Создайте аккаунт за минуту</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mb-3 shadow-lg">
            2</div>
          <h4 class="font-medium mb-1">Поиск</h4>
          <p class="text-gray-600 text-sm">Выберите задание или исполнителя</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mb-3 shadow-lg">
            3</div>
          <h4 class="font-medium mb-1">Оплата</h4>
          <p class="text-gray-600 text-sm">Безопасный расчёт за результат</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-br from-indigo-800 to-indigo-900 text-white text-center px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Готовы начать прямо сейчас?</h2>
      <p class="mb-6">Присоединяйтесь к тысячам {{ currentRole === 'worker' ? 'исполнителей' : 'заказчиков' }} сегодня
      </p>
      <NuxtLink to="/reg">
        <button class="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
          {{ currentRole === 'worker' ? 'Начать бесплатно' : 'Опубликовать задачу' }}
        </button>
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
