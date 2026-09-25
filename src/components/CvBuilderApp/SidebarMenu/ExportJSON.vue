<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useCvStore } from "../../../stores/cvStore.ts";
import Button from "../../common/Button.vue";

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
</script>

<template>
  <Button
      data-testid="exportJson-button"
      @click="exportData"
      variant="secondary"
      text="Export JSON"
      icon="material-symbols-light:file-export-outline"
  />
</template>