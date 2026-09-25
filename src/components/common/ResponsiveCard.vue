<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  title: string;
  breakpoint?: 'lg' | 'xl';
}>(), {
  breakpoint: 'lg'
});

defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const responsiveClasses = computed(() => {
  const map = {
    lg: {
      wrapper: 'lg:bg-transparent lg:relative lg:inset-auto lg:translate-y-0 lg:h-full z-50',
      header: 'lg:hidden'
    },
    xl: {
      wrapper: 'xl:bg-transparent xl:relative xl:inset-auto xl:translate-y-0 xl:h-full z-60',
      header: 'xl:hidden'
    }
  };

  return map[props.breakpoint];
});
</script>

<template>
  <div
      :class="[
      'bg-white transition-transform duration-300 ease-in-out  flex flex-col print:hidden',
      'fixed inset-0 flex-1',
      isOpen ? 'translate-y-0' : 'translate-y-full',
      responsiveClasses.wrapper
    ]"
  >
    <!-- Mobile Header -->
    <div :class="[responsiveClasses.header, 'flex justify-between items-center p-2 border-b border-gray-200']">
      <div class="flex items-center gap-2 text-indigo-600 font-header tracking-widest uppercase text-sm">
        <slot name="icon"></slot>
        <span>{{ title }}</span>
      </div>
      <button @click="$emit('update:isOpen', false)" class="text-2xl leading-none text-gray-500 p-2">
        &times;
      </button>
    </div>

    <!-- Content Area -->
    <div class="overflow-y-auto">
      <slot />
    </div>
  </div>
</template>