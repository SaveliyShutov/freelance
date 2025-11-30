<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const router = useRouter()
const config = useRuntimeConfig()

function goBack() {
  router.back()
}

function contactSupport() {
  const tgId = config.public.telegramSupportId || ''
  window.open(`https://t.me/${tgId}`, '_blank')
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-message">{{ error.statusMessage || error.message }}</p>
      <div class="buttons">
        <button class="btn-back" @click="goBack">Назад</button>
        <button class="btn-support" @click="contactSupport">Связаться с поддержкой</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Цвет фона проекта — замени под свой */
  background-color: #f5f5f5;
  color: #333;
}

.error-container {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-code {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #e53e3e;
  /* красный оттенок для ошибки */
}

.error-message {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.buttons button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.btn-back {
  background-color: #4a5568;
  /* серо-синий */
  color: white;
}

.btn-back:hover {
  background-color: #2d3748;
}

.btn-support {
  background-color: #3182ce;
  /* синий */
  color: white;
}

.btn-support:hover {
  background-color: #2b6cb0;
}
</style>
