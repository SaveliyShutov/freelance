<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 }
});
const emit = defineEmits(['update:modelValue', 'buy', 'skip']);

const localOpen = ref(props.modelValue);
watch(() => props.modelValue, v => (localOpen.value = v));
watch(localOpen, v => emit('update:modelValue', v));

const selectedQty = ref(props.quantity);
const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth < 600;
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

function onBuy() {
  emit('buy', { quantity: selectedQty.value });
  localOpen.value = false;
}

function onSkip() {
  emit('skip');
  localOpen.value = false;
}
</script>

<template>
  <v-dialog
    v-model="localOpen"
    :fullscreen="isMobile"
    :max-width="isMobile ? '100%' : '640'"
    persistent
    scrim="rgba(0, 0, 0, 0.5)"
  >
    <div
      :class="[
        'bg-white overflow-hidden flex flex-col',
        isMobile ? 'h-screen w-full' : 'max-h-[90vh] rounded-2xl border border-gray-100 shadow-lg w-full max-w-md'
      ]"
      role="dialog"
      aria-modal="true"
    >
      <div class="px-6 py-4">
        <div class="flex items-start sm:items-center gap-3">
          <div class="flex-1">
            <div class="text-md md:text-lg font-semibold text-gray-900">
              Поднять объявление с помощью Boost
            </div>
            <div v-if="!isMobile" class="text-xs text-gray-500 mt-0.5">
              Выделите объявление и получите отклики быстрее
            </div>
          </div>
          <div
v-if="!isMobile"
            class="ml-4 inline-flex items-center rounded-full px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium">
            1 буст = 1 продвижение
          </div>
        </div>
      </div>

      <div class="px-6 pb-4 overflow-auto flex-1">
        <div class="mb-4">
          <BoostOption />
        </div>
      </div>

      <div class="px-6 pb-6 pt-0 flex flex-col sm:flex-row sm:justify-end gap-3">
        <button
          class="h-11 px-5 rounded-lg font-medium text-sm w-full sm:w-auto
                 border border-gray-200 text-gray-700
                 hover:bg-gray-50 hover:text-gray-900
                 transition"
          @click="onSkip"
        >
          Разместить без Boost
        </button>

        <button
          class="h-11 px-6 rounded-lg font-semibold text-sm w-full sm:w-auto
                 bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                 shadow-md hover:shadow-lg
                 transition-transform active:scale-95"
          @click="onBuy"
        >
          Купить Boost
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
@media (max-width: 600px) {
  :deep(.v-overlay__content) {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
}

@media (min-width: 601px) {
  :deep(.v-overlay__content) {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
</style>