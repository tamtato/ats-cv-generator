<script setup lang="ts">
import {computed, ref} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {Icon} from '@iconify/vue';

export interface SelectOption {
  label: string;
  value: string | number;
}

const props = withDefaults(defineProps<{
  label?: string;
  modelValue: string | number;
  options: (string | number)[] | SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}>(), {
  label: '',
  placeholder: 'Select an option',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'object' && opt !== null && 'value' in opt) {
      return {label: opt.label ?? String(opt.value), value: opt.value};
    }
    return {label: String(opt), value: opt};
  });
});

const selectedOption = computed(() => {
  return normalizedOptions.value.find((opt) => opt.value === props.modelValue);
});

const computedTestId = computed(() => {
  return props.label.toLowerCase().replace(/\s+/g, '-') + '-select';
});

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const handleSelect = (option: SelectOption) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};
</script>

<template>
  <div ref="dropdownRef" class="w-full relative">
    <label
        v-if="label"
        :class="[
        'block text-xs uppercase font-header mb-1 pl-2 tracking-widest transition-colors select-none',
        disabled ? 'text-gray-400' : 'text-gray-600'
      ]"
    >
      {{ label }}
    </label>

    <!-- Trigger Button -->
    <button
        type="button"
        :data-testid="computedTestId"
        :disabled="disabled"
        @click="toggleDropdown"
        :class="[
        'w-full p-2 h-10.5 border text-sm text-left flex items-center justify-between transition-colors bg-white',
        'focus:outline-none focus:border-indigo-600 hover:border-indigo-600',
        isOpen ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-300',
        disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'
      ]"
    >
      <span :class="!selectedOption ? 'text-gray-400' : 'text-gray-800'">
        {{ selectedOption?.label || placeholder }}
      </span>

      <Icon
          icon="material-symbols-light:keyboard-arrow-down"
          :class="[
          'w-6 h-6 shrink-0 text-gray-600 transition-transform duration-200',
          isOpen && 'rotate-180 text-indigo-600'
        ]"
      />
    </button>

    <!-- Dropdown Menu -->
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <ul
          v-if="isOpen"
          class="absolute left-0 right-0 z-40 mt-1 max-h-60 overflow-y-auto bg-white shadow-lg text-sm focus:outline-none divide-y divide-gray-100"
      >
        <li
            v-for="opt in normalizedOptions"
            :key="opt.value"
            :data-testid="`${computedTestId}-option-${opt.value}`"
            @click="handleSelect(opt)"
            :class="[
            'px-3 py-2 cursor-pointer transition-colors flex items-center justify-between select-none',
            opt.value === modelValue
              ? 'bg-indigo-600 text-white font-medium'
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
          ]"
        >
          <span>{{ opt.label }}</span>

        </li>
      </ul>
    </transition>
  </div>
</template>