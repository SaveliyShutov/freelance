<script setup>
import { computed } from 'vue';

const props = defineProps({
  quantity: { type: Number, required: true },
  boostEnabled: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(['update:quantity', 'purchase']);

const basePrice = 100;

function onRangeChange(e) {
  const v = Number(e.target.value);
  emit('update:quantity', v);
}

const discount = computed(() => {
  if (props.quantity >= 10) return 0.10;
  if (props.quantity >= 5) return 0.05;
  return 0;
});

const subtotal = computed(() => props.quantity * basePrice);
const discountAmount = computed(() => Math.round(subtotal.value * discount.value));
const boostCost = computed(() => props.boostEnabled ? props.quantity * 50 : 0);
const total = computed(() => subtotal.value - discountAmount.value + boostCost.value);
const discountPercent = computed(() => Math.round(discount.value * 100));
</script>

<template>
  <div class="bg-white p-4 md:p-6 rounded-xl shadow md:shadow-lg border border-gray-100 relative overflow-hidden">
    <div class="relative">
      <div class="mb-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="text-sm font-medium text-gray-600">Количество</div>
            <div class="flex items-baseline gap-3 mt-1">
              <span class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{{ props.quantity }}</span>
              <span class="text-sm md:text-sm text-gray-500">
                {{ props.quantity === 1 ? 'буст' : props.quantity < 5 ? 'буста' : 'бустов' }} </span>
            </div>
          </div>

          <div class="w-full md:w-2/3 mt-3 md:mt-0">
            <div class="py-1">
              <input aria-label="Количество объявлений" class="slider w-full" type="range" :min="1" :max="10" :step="1"
                :value="props.quantity" @input="onRangeChange" />
            </div>
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 rounded-xl p-4 mb-4">
        <div class="flex justify-between items-center text-sm mb-2">
          <span class="text-gray-600">{{ props.quantity }} × {{ basePrice }} ₽</span>
          <span class="text-gray-900 font-medium">{{ subtotal }} ₽</span>
        </div>

        <div v-if="discount > 0" class="flex justify-between items-center text-sm text-emerald-600 mb-2">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l1.176 3.588L17 7l-3 2.25L14.352 13 12 11l-2.352 2L9 9.25 6 7l3.824-1.412L12 2z" />
            </svg>
            <span class="font-medium">Скидка {{ discountPercent }}%</span>
          </div>
          <div class="font-medium">−{{ discountAmount }} ₽</div>
        </div>

        <div class="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span class="font-medium text-gray-900">Итого</span>
          <span class="text-2xl font-bold text-gray-900">{{ total }} ₽</span>
        </div>
      </div>

      <button @click="$emit('purchase')"
        class="w-full h-12 md:h-14 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow transition-colors">
        Найти работников!
      </button>

      <p v-if="discount > 0" class="text-center text-sm font-bold text-emerald-600 mt-3">
        Вы экономите {{ discountAmount }} ₽ благодаря скидке!
      </p>
    </div>
  </div>
</template>

<style>
.num-enter-from {
  transform: scale(.98);
  opacity: 0;
}

.num-enter-to {
  transform: scale(1);
  opacity: 1;
  transition: all .18s ease;
}

.num-leave-from {
  opacity: 1;
}

.num-leave-to {
  opacity: 0;
  transition: all .12s ease;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(to right, #6366f1, #a855f7);
  outline: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

/* трек */
.slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 9999px;
  background: #e5e7eb;
}
.slider::-moz-range-track {
  height: 6px;
  border-radius: 9999px;
  background: #e5e7eb;
}

/* полоса до текущего значения */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6366f1;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: grab;
  transition: background 0.3s ease;
  margin-top: -8px; /* выравнивание */
}
.slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6366f1;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: grab;
  transition: background 0.3s ease;
}

.slider:active::-webkit-slider-thumb {
  cursor: grabbing;
  background: #4f46e5;
}
.slider:active::-moz-range-thumb {
  cursor: grabbing;
  background: #4f46e5;
}

</style>
