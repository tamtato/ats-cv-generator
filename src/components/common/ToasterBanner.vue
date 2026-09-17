<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  text?: string;
  color?: 'blue' | 'red' | 'green' | 'yellow';
  persistent?: boolean;
}>(), {
  color: 'blue',
  persistent: false
});

const emit = defineEmits(['close']);
const isVisible = ref(true);

const handleClose = () => {
  isVisible.value = false;
  emit('close');
};

// Static map ensures Tailwind parses and generates the CSS correctly
const themeClasses = computed(() => {
  const themes = {
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    red: 'bg-red-50 text-red-800 border-red-200',
    green: 'bg-green-50 text-green-800 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };
  return themes[props.color];
});
</script>

<template>
  <div
      v-if="isVisible"
      :class="['p-4 text-sm rounded border relative', themeClasses]"
  >
    <div :class="{ 'pr-6': !persistent }">
      <slot>{{ text }}</slot>
    </div>

    <button
        v-if="!persistent"
        @click="handleClose"
        class="absolute top-2 right-2 opacity-60 hover:opacity-100 transition-opacity font-bold p-1"
        aria-label="Dismiss notice"
    >
      ✕
    </button>
  </div>
</template>