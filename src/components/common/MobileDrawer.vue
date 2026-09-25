<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div
      :class="[
        'absolute inset-0 z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out print:hidden',
        isOpen ? 'translate-y-0' : 'translate-y-full'
      ]"
  >
    <div class="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
      <h3 class="text-indigo-600 font-header tracking-widest uppercase text-sm font-bold">
        {{ title }}
      </h3>
      <button
          @click="$emit('close')"
          class="text-3xl leading-none text-gray-500 p-2 hover:text-gray-800 transition-colors"
      >
        &times;
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 bg-white">
      <slot />
    </div>
  </div>
</template>