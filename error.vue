<script setup lang="ts">
import { toRef, computed } from 'vue'
import { useRuntimeConfig, clearError } from '#app'
import type { NuxtError } from '#app'

const props = defineProps<{ error?: NuxtError | null }>()

const error = toRef(props, 'error')

const statusCode = computed(() => error.value?.statusCode ?? 'Ошибка')
const message = computed(
  () => error.value?.statusMessage ?? error.value?.message ?? 'Произошла непредвиденная ошибка.'
)
const stack = computed(() => error.value?.stack ?? '')
const router = useRouter()
const config = useRuntimeConfig()

function goBack() {
  if (!import.meta.client) return
  try {
    if (window.history.length > 1) router.back()
    else router.push('/')
  } catch {
    router.push('/')
  }
}

function contactSupport() {
  if (!import.meta.client) return
  const tgId = (config.public && (config.public as any).telegramSupportId) || ''
  const url = tgId ? `https://t.me/${tgId}` : 'https://t.me'
  window.open(url, '_blank', 'noopener,noreferrer')
}

function goHome() {
  try {
    clearError({ redirect: '/' })
  } catch {
    if (import.meta.client) router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <svg class="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M11.001 3h2v12h-2zM11 18h2v2h-2z" fill="currentColor" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1" class="text-red-100" />
          </svg>
        </div>

        <div class="flex-1">
          <h1 class="text-4xl font-semibold text-red-600 leading-tight">
            {{ statusCode }}
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            {{ message }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
class="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Вернуться назад"
              @click="goBack">
              Назад
            </button>

            <button
class="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Связаться с поддержкой"
              @click="contactSupport">
              Связаться с поддержкой
            </button>

            <button
class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm border"
              aria-label="На главную"
              @click="goHome">
              На главную
            </button>
          </div>
        </div>
      </div>

      <p v-if="stack" class="mt-6 text-xs text-gray-400 break-words">
        <strong class="text-gray-500">Stack:</strong>
        <span class="block mt-1">{{ stack }}</span>
      </p>
    </div>
  </div>
</template>
