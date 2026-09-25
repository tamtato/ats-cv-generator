<script setup lang="ts">
import { Icon } from "@iconify/vue";

const {
  variant = 'primary',
  text = '',
  icon = '',
  active = false
} = defineProps<{
  variant?: 'primary' | 'secondary' | 'text';
  text?: string;
  icon?: string;
  active?: boolean;
}>();
</script>
<template>
  <button
      :class="[
       'w-full flex items-center font-header uppercase gap-2 text-sm  transition-colors cursor-pointer tracking-widest print:hidden',
       variant === 'primary' && 'bg-gray-800 text-white hover:bg-indigo-600',
       variant === 'secondary' && 'border border-gray-800 text-gray-800 hover:text-indigo-600 hover:border-indigo-600 ',
       variant === 'text' && 'px-0 py-2 text-sm text-gray-800 hover:text-indigo-600',
       ['secondary', 'text'].includes(variant) && active && 'text-indigo-600',
       ['primary', 'secondary'].includes(variant) && 'justify-center p-3'
    ]"
  >
    <slot name="icon" />
    <Icon v-if="icon" :icon="icon" class="w-6 h-6" />
    {{text}}
  </button>
</template>