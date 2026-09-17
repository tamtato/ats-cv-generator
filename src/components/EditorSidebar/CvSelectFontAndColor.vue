<script setup lang="ts">
import {useCvStore} from "../../stores/cvStore.ts";

const cvStore = useCvStore();

const atsSafeFonts = [
  // Modern & Friendly (Google Fonts)
  { label: 'Roboto', value: '"Roboto", sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Inter', value: '"Inter", sans-serif' },
  { label: 'Lato', value: '"Lato", sans-serif' },
  { label: 'Montserrat', value: '"Montserrat", sans-serif' },

  // Friendly System Fonts
  { label: 'Trebuchet MS', value: '"Trebuchet MS", "Lucida Grande", sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Segoe UI', value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },

  // The Classic ATS Safes
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Calibri', value: 'Calibri, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' }
];
</script>

<template>
  <div class="border-b pb-6 flex flex-col gap-3">
    <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Document Settings</h3>
    <div>
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
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-600 mb-1">Theme Color</label>
      <input type="color" v-model="cvStore.cvData.selectedColor" data-testid="colorPicker" class="w-full h-10 p-1 border rounded cursor-pointer" />
    </div>
  </div>
</template>