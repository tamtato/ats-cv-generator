<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useCvStore } from "../../../stores/cvStore.ts";
import Button from "../../common/Button.vue";


const cvStore = useCvStore();
const fileInput = ref<HTMLInputElement | null>(null);

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

const triggerImport = () => {
  fileInput.value?.click();
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
  <div class="flex items-center gap-6">
    <Button @click="triggerImport">
      <template #icon>
        <Icon icon="material-symbols-light:file-save-outline" class="w-6 h-6" />
      </template>
      Import JSON
    </Button>

    <input
        type="file"
        ref="fileInput"
        data-testid="importJson-input"
        accept=".json"
        class="hidden"
        @change="importData"
    />

    <Button data-testid="exportJson-button" @click="exportData">
      <template #icon>
        <Icon icon="material-symbols-light:file-export-outline" class="w-6 h-6" />
      </template>
      Export JSON
    </Button>
  </div>
</template>