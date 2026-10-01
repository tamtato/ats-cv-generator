<script setup lang="ts">
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  label?: string;
  modelValue: string;
  testId?: string;
}>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const computedTestId = computed(() => {
  return props.testId || (props.label ? props.label.toLowerCase().replace(/\s+/g, '-') + '-color' : 'color-picker');
});

const handleTextInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.trim();
  if (val && !val.startsWith('#')) {
    val = `#${val}`;
  }
  emit('update:modelValue', val.toUpperCase());
};

const handleColorPick = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value.toUpperCase());
};
</script>

<template>
  <div class="w-full">
    <label
        v-if="label"
        class="block text-xs text-gray-600 uppercase font-header mb-1 pl-2 tracking-widest transition-colors"
    >
      {{ label }}
    </label>

    <div
        class="h-10.5 flex items-center justify-between p-2 border border-gray-300 bg-white transition-colors hover:border-indigo-600">
      <div class="relative w-6 h-6 shrink-0 mr-3">
        <div
            class="w-full h-full"
            :style="{ backgroundColor: modelValue || '#000000' }"
        ></div>
        <input
            type="color"
            :value="modelValue?.startsWith('#') && modelValue.length === 7 ? modelValue : '#000000'"
            @input="handleColorPick"
            class="absolute inset-0 w-full h-full opacity-0"
        />
      </div>
      <input
          type="text"
          :data-testid="computedTestId"
          :value="modelValue"
          maxlength="7"
          placeholder="#000000"
          @input="handleTextInput"
          class="w-full font-mono text-sm tracking-widest uppercase bg-transparent text-gray-800 focus:outline-none"
      />


    </div>
  </div>
</template>