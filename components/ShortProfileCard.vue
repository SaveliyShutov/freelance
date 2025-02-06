<script setup>
const { profile } = defineProps(['profile'])
</script>
<template>
  <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div class="min-w-16 min-h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
          <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name"
            class="w-16 h-16 rounded-full" />
          <p v-else class="text-2xl font-semibold text-indigo-600">
            {{ profile.name.charAt(0) }}
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 text-lg">{{ profile.name }}</h3>
          <p class="text-sm text-gray-600">{{ profile.shortDescription }}</p>
          <StarsRating :rating="profile.rating"/>
        </div>
      </div>
    </div>
  </div>
</template>