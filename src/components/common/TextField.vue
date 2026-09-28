<!-- components/common/TextField.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  label?: string;
  modelValue: string | number | boolean;
  isTextarea?: boolean;
  placeholder?: string;
  type?: string;
  rows?: string;
  disabled?: boolean;
}>(), {
  isTextarea: false,
  placeholder: '',
  type: 'text',
  rows: '4',
  label: '',
  disabled: false
});

defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const testId = computed(() => {
  return props.label.toLowerCase().replace(/\s+/g, '-') + '-text-field';
});
</script>

<template>
  <!-- 1. CHECKBOX VARIANT -->
  <label
      v-if="type === 'checkbox'"
      :class="[
        'flex items-center gap-2 text-xs uppercase font-header tracking-widest cursor-pointer select-none py-2',
        disabled ? ' text-gray-400' : 'text-gray-600'
      ]"
  >
    <input
        type="checkbox"
        :data-testid="testId"
        :checked="Boolean(modelValue)"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        @blur="$emit('blur', $event)"
        class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer accent-indigo-600"
    />
    <span v-if="label">{{ label }}</span>
  </label>

  <!-- 2. TEXTAREA & STANDARD INPUT VARIANTS -->
  <div v-else class="w-full">
    <label
        v-if="label"
        :class="[
        'block text-xs uppercase font-header mb-1 pl-2 tracking-widest',
        disabled ? ' text-gray-400' : 'text-gray-600'
      ]"
    >
      {{ label }}
    </label>

    <!-- TEXTAREA -->
    <textarea
        v-if="isTextarea"
        :data-testid="testId"
        :value="modelValue as string | number"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @blur="$emit('blur', $event)"
        :class="[
        'resize-none w-full p-2 border border-gray-300 text-sm focus:outline-none transition-colors',
        disabled ? ' text-gray-400 bg-gray-50 opacity-60' : 'focus:text-indigo-600'
      ]"
    ></textarea>

    <!-- STANDARD INPUT -->
    <input
        v-else
        :type="type"
        :data-testid="testId"
        :value="modelValue as string | number"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        :class="[
        'w-full p-2 h-10.5 border border-gray-300 text-sm focus:outline-none transition-colors',
        disabled ? ' text-gray-400 bg-gray-50 opacity-60' : 'focus:text-indigo-600'
      ]"
    />
  </div>
</template>