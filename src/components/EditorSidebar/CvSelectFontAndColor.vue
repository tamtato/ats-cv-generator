<script setup lang="ts">
import {useCvStore} from "../../stores/cvStore.ts";

const cvStore = useCvStore();

const atsSafeFonts = [
  { label: 'Inter', value: '"Inter", sans-serif' },
  { label: 'Lato', value: '"Lato", sans-serif' },
  { label: 'Montserrat', value: '"Montserrat", sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Roboto', value: '"Roboto", sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, sans-serif' },
  { label: 'Calibri', value: 'Calibri, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
];
</script>

<template>
      <label class="block text-xs font-medium text-gray-600 mb-1">Font Family (ATS Safe)</label>
      <select
          data-testid="fontSelect"
          v-model="cvStore.cvData.selectedFont"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option
            v-for="font in atsSafeFonts"
            :key="font.value"
            :value="font.value"
        >
          {{ font.label }}
        </option>
      </select>


      <label class="block text-xs font-medium text-gray-600 mb-1">Theme Color</label>
      <input type="color" v-model="cvStore.cvData.selectedColor" data-testid="colorPicker" class="w-full h-10 p-1 border rounded cursor-pointer" />


</template>