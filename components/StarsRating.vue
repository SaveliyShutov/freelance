<script setup>
const userstore = useAuth();
</script>
<template>
    <div class="flex items-center justify-center mt-3 bg-amber-50 px-3 py-1 rounded-full max-w-fit">
        <i class="mdi mdi-star text-amber-600 mr-1"></i>
        <span class="text-amber-700 font-medium">{{ userstore?.user?.rating }}/5</span>
    </div>
</template>