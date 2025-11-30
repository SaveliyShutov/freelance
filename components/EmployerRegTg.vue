<script lang="ts" setup>
</script>
<template>
  <div class="max-w-xl mx-auto p-6 md:p-10 rounded-2xl space-y-6 bg-neutral-50">
    <div class="text-center">
      <h1 class="text-2xl md:text-3xl font-semibold text-neutral-900">
        Регистрация как заказчик
      </h1>
      <p class="mt-2 text-sm md:text-base text-neutral-700 max-w-prose mx-auto">
        Хотите разместить задание и найти исполнителей на платформе <span class="font-medium">nirby.ru</span>?
        Напишите в поддержку — поможем с регистрацией и дальнейшими шагами.
      </p>
    </div>

    <div class="flex items-center justify-center">
      <a
:href="`https://t.me/Pl_y_er?text=${encodeURIComponent('Хотим зарегистрироваться как заказчик на платформе nirby.ru. Какие дальнейшие шаги?')}`"
        target="_blank" rel="noopener noreferrer" aria-label="Обратиться в поддержку в Telegram"
        class="inline-flex border items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-[var(--primary-600)] hover:bg-gray-100 transition-colors text-decoration-none">
        <svg
class="w-5 h-5 text-[var(--primary-500)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.75 3.25L2.75 10.25C2.02 10.58 2.02 11.63 2.75 11.96L7.5 13.83L9.29 20.19C9.56 21.14 10.75 21.43 11.32 20.66L14.25 16.25L19.75 18.66C20.6 18.99 21.37 18.3 20.99 17.52L21.75 3.25Z" />
        </svg>

        <span class="text-sm md:text-base font-medium text-gray-700">
          Обратиться в поддержку
        </span>
      </a>
    </div>

    <div class="text-center text-xs md:text-sm text-neutral-500 leading-snug">
      Нажимая кнопку, вы соглашаетесь с
      <a href="/docs/privacy-policy.docx" target="_blank" class="text-primary hover:underline break-words">
        Политикой обработки персональных данных
      </a>
      и
      <a href="/docs/agreement.docx" target="_blank" class="text-primary hover:underline break-words">
        Соглашением на обработку персональных данных
      </a>.
    </div>
  </div>
</template>

<style></style>