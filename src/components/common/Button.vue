<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from "@iconify/vue";

const props = withDefaults(defineProps<{
  variant: 'primary' | 'secondary' | 'text' ;
  color?: 'primary' | 'red';
  text?: string;
  icon?: string;
  active?: boolean;
}>(), {
  variant: 'primary',
  color: 'primary',
  text: '',
  icon: '',
  active: false
});

const colorStyles = computed(() => {
  const styles = {
    primary: {
      primary: 'bg-gray-800 text-white hover:bg-indigo-600',
      secondary: 'border border-gray-800 text-gray-800 hover:text-indigo-600 hover:border-indigo-600',
      text: 'px-0 py-2 text-gray-800 hover:text-indigo-600 w-fit',
      active: 'text-indigo-600 border-indigo-600'
    },
    red: {
      primary: 'bg-red-600 text-white hover:bg-red-700',
      secondary: 'border border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 hover:text-red-700',
      text: 'px-0 py-2 text-red-600 hover:text-red-700 w-fit',
      active: 'text-red-700 border-red-700'
    }
  };

  return styles[props.color];
});
</script>

<template>
  <button
      :class="[
      'flex items-center font-header uppercase gap-2 text-sm transition-colors cursor-pointer tracking-widest print:hidden',
      colorStyles[variant],
      ['primary', 'secondary'].includes(variant) && 'justify-center p-3',
      ['secondary', 'text', 'dotted'].includes(variant) && active && colorStyles.active
    ]"
  >
    <slot name="icon" />
    <Icon v-if="icon" :icon="icon" class="w-6 h-6 shrink-0" />
    <span v-if="text">{{ text }}</span>
  </button>
</template>