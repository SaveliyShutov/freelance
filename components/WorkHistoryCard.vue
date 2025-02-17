<script setup>
    const { review } = defineProps(['review'])
    const userstore = useAuth();
</script>
<template>
    <div class="space-y-4">
        <div>
            <div class="font-semibold text-gray-800">{{ review.title }}</div>
            <div class="text-indigo-600/80">{{ review.organization }}</div>
            <div class="text-sm text-gray-600">{{ review.date }}</div>
            <div class="flex items-center">
                <h3 class="mt-2 text-gray-600">
                    Оценка работы:
                </h3>
                <StarsRating rating={{ review.rating }} class="mx-2" />
            </div>
            <p class="mt-2 text-gray-600">
                Отзыв: {{ review.description }}
            </p>
        </div>
    </div>
</template>