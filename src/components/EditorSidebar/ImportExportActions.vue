<script setup lang="ts">

import {useCvStore} from "../../stores/cvStore.ts";

const cvStore = useCvStore();

const exportData = () => {
  const dataStr = JSON.stringify(cvStore.cvData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cv-backup.json';
  a.click();
  URL.revokeObjectURL(url);
};

const importData = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      cvStore.cvData = JSON.parse(e.target?.result as string);
    } catch (err) {
      alert('Invalid JSON file');
    }
  };
  reader.readAsText(file);
  (event.target as HTMLInputElement).value = '';
};
</script>

<template>
  <button
      data-testid="exportJson-button"
      @click="exportData"
      class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition text-sm font-medium"
  >
    Export JSON
  </button>
  <label class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition text-sm font-medium cursor-pointer">
    Import JSON
    <input type="file" data-testid="importJson-button" accept=".json" class="hidden" @change="importData" />
  </label>
</template>