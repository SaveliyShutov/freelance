<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['purchase']);

const packages = reactive([
  {
    credits: 10,
    price: 900,
    originalPrice: 1000,
    discount: 10,
    color: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-200',
    popular: false
  },
  {
    credits: 25,
    price: 2000,
    originalPrice: 2500,
    discount: 20,
    color: 'from-indigo-500 to-purple-500',
    shadowColor: 'shadow-indigo-200',
    popular: true
  },
  {
    credits: 50,
    price: 3500,
    originalPrice: 5000,
    discount: 30,
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-200',
    popular: false
  }
]);

function onBuy(pkg) {
  emit('purchase', pkg);
}
</script>

<template>
  <div class="bg-white p-2 md:p-6 rounded-xl md:shadow-lg md:border md:border-gray-100 space-y-5">
    <div class="flex items-start gap-3">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Пакеты бустов</h2>
        <p class="text-sm text-gray-500">Выгодно для массового размещения</p>
      </div>
    </div>

    <p class="text-sm text-gray-600 mb-1">
      1 буст = 1 объявление. Используйте когда угодно.
    </p>

    <div class="space-y-4">
      <div
        v-for="pkg in packages"
        :key="pkg.credits"
        class="relative rounded-2xl border p-4 md:p-5 transition-all duration-200"
        :class="pkg.popular ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50' : 'border-gray-100 bg-white hover:border-gray-200'"
      >
        <div v-if="pkg.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-0.5 rounded-full text-xs">
          Популярный
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-4 min-w-0">

            <div class="min-w-0">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-gray-900">{{ pkg.credits }}</span>
                <span class="text-gray-500">бустов</span>
              </div>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="text-lg font-semibold text-gray-900">{{ pkg.price }} ₽</span>
                <span class="text-sm text-gray-400 line-through">{{ pkg.originalPrice }} ₽</span>
                <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">−{{ pkg.discount }}%</span>
              </div>
            </div>
          </div>

          <div class="flex-shrink-0 w-full sm:w-auto">
            <button
              @click="onBuy(pkg)"
              :class="[
                'h-11 px-5 rounded-lg font-medium text-sm w-full sm:w-auto mt-2 sm:mt-0',
                pkg.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'border border-gray-200 hover:bg-gray-50 text-gray-900'
              ]"
              aria-label="Купить пакет"
            >
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 text-center text-sm text-emerald-700">
      💡 Экономия до <span class="font-bold">30%</span> по сравнению с отдельными объявлениями!
    </div>
  </div>
</template>

<style>
</style>
