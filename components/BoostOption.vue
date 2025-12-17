<script setup>
</script>

<template>
  <div class="rounded-3xl p-4 md:p-6 border-2 cursor-pointer select-none transition-all duration-300
           bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg hover:shadow-xl" role="button"
    aria-label="Открыть подробности Boost">
    <div class="flex items-start gap-3 md:gap-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-2 gap-2">
          <div class="flex items-center gap-3">
            <h3 class="text-base md:text-lg font-semibold text-gray-900 m-0">Boost</h3>

            <span class="text-xs md:text-sm font-medium rounded-full bg-purple-200 text-purple-700 px-3 py-1">
              Рекомендуем
            </span>
          </div>
        </div>

        <p class="text-gray-700 text-sm mb-3 md:mb-4 leading-relaxed">
          Boost — это платное продвижение, которое повышает видимость объявления и позволяет быстрее получать отклики.
        </p>

        <div>
          <ul class="space-y-3 mb-3 text-sm text-gray-700">
            <li class="p-3 rounded-xl bg-white/70 border border-purple-200">
              <div class="font-semibold text-gray-900">
                Ваш заказ отправится в чат с более чем 700 активными исполнителями
              </div>
              <div class="text-xs text-gray-600 mt-0.5">
                Мгновенный показ живой аудитории специалистов, готовых взять задачу.
              </div>
            </li>

            <li class="p-3 rounded-xl bg-white/70 border border-purple-200">
              <div class="font-semibold text-gray-900">
                Гарантированные отклики в течение часа
              </div>
              <div class="text-xs text-gray-600 mt-0.5">
                Первые релевантные ответы вы получите в течение 60 минут.
              </div>
            </li>

            <li class="p-3 rounded-xl bg-white/70 border border-purple-200">
              <div class="font-semibold text-gray-900">
                Заказ выделяется и закрепляется в топе
              </div>
              <div class="text-xs text-gray-600 mt-0.5">
                Максимальная видимость и приоритет над обычными заказами.
              </div>
            </li>
          </ul>
        </div>
        <div class="mt-3 md:mt-4 flex items-center justify-between gap-3">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Небольшие дополнительные правки, чтобы компонент выглядел аккуратно везде */
h3 {
  line-height: 1;
}

p {
  margin: 0;
}

/* Сделаем, чтобы при фокусе было видно, без стандартного синего квадрата */
div[role="button"]:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  border-color: rgba(124, 58, 237, 0.3);
}
</style>
