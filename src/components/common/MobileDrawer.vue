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
    <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-white">
      <h3 class="text-indigo-600 font-header tracking-widest uppercase">
        {{ title }}
      </h3>
      <button
          @click="$emit('close')"
          class="text-3xl leading-none text-gray-500 p-2 hover:text-indigo-600 transition-colors"
      >
        &times;
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 bg-white">
      <slot />
    </div>
  </div>
</template>