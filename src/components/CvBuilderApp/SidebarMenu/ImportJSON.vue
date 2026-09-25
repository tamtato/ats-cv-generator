<script setup lang="ts">
import { ref } from 'vue';
import { useCvStore } from "../../../stores/cvStore.ts";
import Button from "../../common/Button.vue";


const cvStore = useCvStore();
const fileInput = ref<HTMLInputElement | null>(null);

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
  <div>
    <Button variant="text" @click="triggerImport" text="Import JSON" icon="material-symbols-light:file-save-outline"/>
    <input
        type="file"
        ref="fileInput"
        data-testid="importJson-input"
        accept=".json"
        class="hidden"
        @change="importData"
    />
  </div>
</template>