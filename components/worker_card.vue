<script setup>
const props = defineProps({
  user: {
    name: String,
    robux: Number,
    info: String,
  }
})
</script>
<template>
  <div class="border-2 border-zinc-300/25 backdrop-blur-xs rounded-3xl h-36 w-96 bg-blur-lg justify-center align-center m-2 p-2">
    <p class="flex p-2">{{ props.user.name }}</p>
    <p class="flex p-2">{{ props.user.info }}</p>
    <p class="flex p-2">{{ props.user.robux }}</p>
  </div>
</template>