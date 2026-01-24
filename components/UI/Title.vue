<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  h1?: boolean
  h2?: boolean
  h3?: boolean
}>()

const tag = computed(() => {
  if (props.h1) return 'h1'
  if (props.h2) return 'h2'
  if (props.h3) return 'h3'
  return 'h2'
})

const mod = computed(() => {
  if (props.h1) return 'ui-title--h1'
  if (props.h2) return 'ui-title--h2'
  return 'ui-title--h3'
})
</script>

<template>
  <component :is="tag" :class="['ui-title', mod]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
$lg: 1024px;
$md: 768px;
$sm: 432px;

.ui-title {
  margin: 0;
  font-family: Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  line-height: 1.1;

  &--h1 {
    font-weight: 800;
    font-size: 2.25rem;
    margin: 1rem 0;

    @media (max-width: $lg) {
      font-size: 2.125rem;
      margin-top: 1.5rem;
    }

    @media (max-width: $md) {
      font-size: 2rem;
      margin-top: 1.25rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: $sm) {
      font-size: 1.75rem;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  &--h2 {
    font-weight: 700;
    font-size: 1.875rem;
    margin: 0.75rem 0;

    @media (max-width: $lg) {
      font-size: 1.75rem;
      margin-top: 1.25rem;
    }

    @media (max-width: $md) {
      font-size: 1.5rem;
      margin-top: 1rem;
    }

    @media (max-width: $sm) {
      font-size: 1.25rem;
      margin-top: 0.75rem;
    }
  }

  &--h3 {
    font-weight: 600;
    font-size: 1.25rem;
    margin: 0.5rem 0;
    color: var(--neutral-800);

    @media (max-width: $lg) {
      font-size: 1.1875rem;
    }

    @media (max-width: $md) {
      font-size: 1.125rem;
    }

    @media (max-width: $sm) {
      font-size: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
