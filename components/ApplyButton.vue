<script setup lang="ts">
const router = useRouter()
</script>
<template>
  <button @click="router.push('/apply-form')"
    class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold">
    Откликнуться
  </button>
</template>